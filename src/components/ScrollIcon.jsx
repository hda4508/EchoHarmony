// src/components/ScrollIcon.jsx
import React from "react";
import "../styles/ScrollIcon.css";

export default function ScrollIcon() {
  return (
    <div className="scroll-icon">
      {/* 상단이 둥근 U자형 틀 */}
      <div className="u-shape"></div>

      {/* 화살표: 세로 선 + 좌우 화살촉 */}
      <div className="arrow">
        <div className="arrow-line"></div>
        <div className="arrow-head left"></div>
        <div className="arrow-head right"></div>
      </div>
    </div>
  );
}
