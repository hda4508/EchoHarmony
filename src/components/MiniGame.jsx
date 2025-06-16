import React, { useState } from "react";
import "../styles/MiniGame.css";

const allParts = [
  { id: "body", label: "박스" },
  { id: "neck", label: "플라스틱 통" },
  { id: "string", label: "버려진 끈" },
  { id: "drum-skin", label: "헤진 천" },
  { id: "drum-ring", label: "깡통" },
  { id: "drum-stick", label: "버려진 나무 조각" },
];

const recipes = {
  guitar: ["body", "neck", "string"],
  drum: ["drum-skin", "drum-ring", "drum-stick"],
};

export default function MiniGame() {
  const [currentInstrument, setCurrentInstrument] = useState(null);
  const [assembled, setAssembled] = useState([]);
  const [hintUsed, setHintUsed] = useState({ guitar: false, drum: false });
  const [showHint, setShowHint] = useState(false);
  const [stage, setStage] = useState("intro");

  const handleStart = (instrument) => {
    setCurrentInstrument(instrument);
    setStage("assemble");
    setAssembled([]);
    setShowHint(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const partId = e.dataTransfer.getData("text/plain");
    if (!assembled.includes(partId)) {
      setAssembled([...assembled, partId]);
    }
  };

  const handleDragStart = (e, partId) => {
    e.dataTransfer.setData("text/plain", partId);
  };

  const handleHint = () => {
    if (!hintUsed[currentInstrument]) {
      setShowHint(true);
      setHintUsed({ ...hintUsed, [currentInstrument]: true });
    }
  };

  const handleComplete = () => {
    const correct = recipes[currentInstrument];
    const isCorrect =
      assembled.length === correct.length &&
      correct.every((part) => assembled.includes(part));
    setStage(isCorrect ? "success" : "fail");
  };

  const handleRestart = () => {
    setStage("intro");
    setCurrentInstrument(null);
    setAssembled([]);
    setShowHint(false);
  };

  return (
    <section className="mini-game-section">
      <div className="mini-game-outer">
        <div className="mini-game-wrapper">
          <h2>노아가 임무를 수행할 수 있게 악기를 만들어 주세요.</h2>

          {stage === "intro" && (
            <div className="intro">
              <p>조립할 악기를 선택하세요</p>
              <div className="intro-button">
                <button onClick={() => handleStart("guitar")}>기타</button>
                <button onClick={() => handleStart("drum")}>드럼</button>
              </div>
            </div>
          )}

          {stage === "assemble" && (
            <>
              <h3>{currentInstrument.toUpperCase()} 조립</h3>
              <button
                className="hint-button"
                onClick={handleHint}
                disabled={hintUsed[currentInstrument]}
              >
                힌트 보기
              </button>
              {showHint && (
                <ul className="hint-list">
                  {recipes[currentInstrument].map((id) => {
                    const part = allParts.find((p) => p.id === id);
                    return <li key={id}>{part.label}</li>;
                  })}
                </ul>
              )}

              <div className="part-list">
                {allParts.map((part) => (
                  <div
                    key={part.id}
                    className="draggable-part"
                    draggable
                    onDragStart={(e) => handleDragStart(e, part.id)}
                  >
                    {part.label}
                  </div>
                ))}
              </div>

              <div
                className="drop-zone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <h4>조립 영역</h4>
                {assembled.length === 0 ? (
                  <p>여기에 부품을 드래그하세요</p>
                ) : (
                  <ul>
                    {assembled.map((id) => {
                      const part = allParts.find((p) => p.id === id);
                      return <li key={id}>{part.label}</li>;
                    })}
                  </ul>
                )}
              </div>

              <button className="complete-button" onClick={handleComplete}>
                완성 물약 클릭하기
              </button>
            </>
          )}

          {stage === "success" && (
            <>
              <p className="success-message">🎉 악기 조립 성공!</p>

              <img
                src={
                  currentInstrument === "guitar"
                    ? require("../img/g1.png")
                    : require("../img/d1.png")
                }
                alt={`${currentInstrument} 완성 이미지`}
                className="instrument-image"
              />
              <br /><br /><br/><br/>
              <button className="complete-button" onClick={handleRestart}>
                다시 시작하기
              </button>
            </>
          )}


          {stage === "fail" && (
            <>
              <p className="fail-message">❌ 조립이 틀렸어요! 다시 도전해 보세요.</p>
              <button className="complete-button" onClick={handleRestart}>
                다시 시작하기
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
