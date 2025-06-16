// ✅ 백스크롤 시 문구가 모두 돌아오기 전까진 섹션 이동 방지
import React, { useEffect, useRef, useState } from "react";
import "../styles/NoaIntroSection.css";
import ModelOnlyViewer from "./ModelOnlyViewer";

const textList = [
  {
    title: "노아는 누구인가요?",
    desc: "하모니시티의 불협화음을 조율하는 감정의 조율자, 에코튜너(echo tuner)예요. 사람들의 마음속에 숨어 있는 작은 진동을 듣고, 흐트러진 리듬을 하나하나 되짚어 조율하죠. 언제나 조용히 곁에 머무르며, 눈에 보이지 않는 감정을 감지해 그에 맞는 공명을 만들어내요. 노아는 혼란 속에서도 균형을 찾아내는 존재, 그리고 우리가 잊고 있던 평온을 되살리는 작은 수호자입니다.",
  },
  {
    title: "노아는 어떤 존재인가요?",
    desc: "노아는 세상의 흐트러진 감정들을 조용히 수집하는 존재예요. 보이지 않는 리듬 속에서 불안과 슬픔, 기쁨과 평온 같은 감정의 파편들을 하나하나 담아내며, 삐걱거리는 마음의 균형을 다시 맞추는 일을 해요. 사람들이 놓치고 지나가는 미세한 감정의 떨림을 감지하고, 그 떨림에 맞춰 잃어버린 리듬을 되살려주는 감정의 공명 장치이자 수호자죠. 노아가 지나간 자리는 조금 더 따뜻하고, 조금 더 조용해져요. 그렇게 우리 모두가 잊고 있던 내면의 소리를 다시 듣게 됩니다.",
  },
  {
    title: "노아의 임무는 뭔가요?",
    desc: "노아의 임무는 세상 곳곳에 흩어진 감정의 파동을 감지하고, 그 에코를 조율하는 일이에요. 기쁨이 넘쳐서 들뜨거나, 슬픔이 깊어져 멈춰버린 마음의 리듬을 다시 균형 있게 되돌리는 것. 노아는 눈에 보이지 않는 감정의 흐름을 듣고, 그 속에서 왜곡된 진동을 찾아내요. 그리고 아주 섬세하게, 마치 튜너처럼 그 감정들을 원래의 위치로 되돌려주죠. 혼란과 무질서 속에서도 질서를 찾아내는 것, 그것이 노아의 사명이자 존재 이유예요.",
  },
];

export default function NoaScrollSection({ nextSectionRef, prevSectionRef }) {
  const sectionRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const lastScrollTime = useRef(0);
  const DEBOUNCE = 600;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 스크롤 전환 감지
  useEffect(() => {
    const handleWheel = (e) => {
      const now = Date.now();
      if (now - lastScrollTime.current < DEBOUNCE) return;
      lastScrollTime.current = now;

      const delta = e.deltaY;
      e.preventDefault();

      if (delta > 0) {
        // 스크롤 다운
        if (index < textList.length - 1) {
          setIndex((prev) => prev + 1);
        } else {
          nextSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // 스크롤 업
        if (index > 0) {
          setIndex((prev) => prev - 1);
        } else {
          // index === 0일 때만 이전 섹션으로
          if (sectionRef.current.getBoundingClientRect().top >= 0) {
            prevSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    const el = sectionRef.current;
    el?.addEventListener("wheel", handleWheel, { passive: false });
    return () => el?.removeEventListener("wheel", handleWheel);
  }, [index]);

  return (
    <section ref={sectionRef} className="noa-scroll-section">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="noa-cutin-svg"
      >
        <path d="M0,0 L0,100 Q720,0 1440,100 L1440,0 Z" fill="#000" />
      </svg>

      <div className="noa-scroll-inner">
        <div className="noa-text-wrapper">
          {textList.map((t, i) => (
            <div
              key={i}
              className={`noa-text-slide ${
                index === i
                  ? "active"
                  : index > i
                  ? "exit-left"
                  : "exit-right"
              }`}
            >
              <h2>{t.title}</h2>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>

        <div className={`noa-model-drop ${isVisible ? "drop-in" : ""}`}>
          <ModelOnlyViewer />
        </div>
      </div>
    </section>
  );
}
