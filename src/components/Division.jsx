import React from "react";
import "../styles/Division.css";
import chapter1 from "../img/chapter1-bg.jpg";
import chapter2 from "../img/chapter2-bg.jpg";

export default function Division() {
  return (
    <section className="chapter-section">
      <div
        className="chapter half dark"
        style={{
          backgroundImage: `url(${chapter1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3>CHAPTER 1</h3>
        <p>
          식당의 쓰레기통에 남은 음식이 끊임이 없어집니다.<br />
          썩어가는 음식물은 도시의 에너지 흐름을 오염시키고,<br />
          공기는 점점 무거운 악취를 가득 채웁니다.
        </p>
      </div>
      <div
        className="chapter half light"
        style={{
          backgroundImage: `url(${chapter2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3>CHAPTER 2</h3>
        <p>
          밤새 꺼지지 않는 빌딩의 불빛과 멈추지 않는 기계들.<br />
          과도한 전력 사용은 도시의 균형을 무너뜨리고,<br />
          하모니시티는 소음과 전력 속에 잠겨갑니다.
        </p>
      </div>
    </section>
  );
}
