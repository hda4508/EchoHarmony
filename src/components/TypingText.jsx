import React, { useState, useEffect, useRef } from "react";

const TypingText = () => {
  const lines = [
    "노아는 오염된 공간을 정화했습니다.",
    "하지만 문제는 여전히 도시 곳곳에 남아 있습니다.",
    "이제는 우리 모두가 정화의 일부가 되어야 할 때입니다.",
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState(["", "", ""]);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);

  // ⬇ 관찰 시작: 요소가 화면에 들어오면 시작
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.6 } // 60% 보이면 시작
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [hasStarted]);

  // ⬇ 타이핑 로직
  useEffect(() => {
    if (!hasStarted || currentLineIndex >= lines.length) return;

    const timeout = setTimeout(() => {
      const currentLine = lines[currentLineIndex];
      const nextChar = currentLine.slice(0, currentCharIndex + 1);

      setDisplayedLines((prev) => {
        const newLines = [...prev];
        newLines[currentLineIndex] = nextChar;
        return newLines;
      });

      if (currentCharIndex < currentLine.length - 1) {
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, 40);

    return () => clearTimeout(timeout);
  }, [hasStarted, currentCharIndex, currentLineIndex]);

  return (
    <div ref={containerRef} className="typing-text">
      {displayedLines.map((line, i) => (
        <p key={i}>
          {line}
          {i === currentLineIndex && hasStarted && <span className="cursor">|</span>}
        </p>
      ))}
    </div>
  );
};

export default TypingText;
