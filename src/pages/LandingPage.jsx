// LandingPage.jsx 전체 수정 버전
import React, { useRef, useState, useEffect } from "react";
import "../styles/landing.css";

import ScrollIcon from "../components/ScrollIcon";
import CardSection from "../components/CardSection";
import MyModelViewer from "../components/MyModelViewer";
import NoaIntroSection from "../components/NoaIntroSection";
import Division from "../components/Division";
import MiniGame from "../components/MiniGame";
import TypingText from "../components/TypingText";
import img1 from "../img/img1.png";
import img2 from "../img/img2.png";
import img3 from "../img/img3.png";

const navItems = ["Intro", "Voices", "Noa", "MiniGame", "Scene"];

export default function LandingPage() {
  const nextRef = useRef();
  const [isModelHovered, setIsModelHovered] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".third-section");
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.6) {
        setScrollTriggered(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sampleCards = [
    <div key="card1" className="card-content">
      <img src={img1} alt="홍X동 일러스트" className="card-img" />
      <h3>홍X동 / 31세</h3><br />
      <h4>택배 물류 기사</h4><br />
      <p>출근길마다 공기 정화 마스크를 꼭 써야 해요.</p>
      <p>벗으면 바로 어지럽고, 숨쉬는 게 불편해지거든요.</p>
      <p>이게 언제까지 계속될지 모르겠어요.</p>
    </div>,
    <div key="card2" className="card-content">
      <img src={img2} alt="김X수 일러스트" className="card-img" />
      <h3>김X수 / 28세</h3><br />
      <h4>사무직 (디자이너)</h4><br />
      <p>음식물 쓰레기로 항상 썩는 냄새가 진동해요.</p>
      <p>벌레가 들끓고, 지나가다 보면 토할 것 같아요.</p>
      <p>아이랑 같이 걷기도 두렵습니다.</p>
    </div>,
    <div key="card3" className="card-content">
      <img src={img3} alt="이X희 일러스트" className="card-img" />
      <h3>이X희 / 35세</h3><br />
      <h4>무직</h4><br />
      <p>밤에 꺼지지 않는 건물 불빛이 창문 사이로 들어와요.</p>
      <p>수면장애가 생겼고, 정전도 점점 잦아지고 있어요.</p>
      <p>도시가 쉴 수 있는 시간도 필요해 보여요.</p>
    </div>
  ];

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="music-icon">♪</div>
        <nav className="top-nav">
          {navItems.map((item, i) => (
            <button key={i} onClick={() => scrollToSection(item)}>{item}</button>
          ))}
        </nav>
      </header>

      <main className="landing-main" id="Intro">
        <div className="neon-title">
          <span className="neon-line1">ECHO</span>
          <span className="neon-line2">HARMONY</span>
        </div>
        <div className="subtitle-wrap">
          <div className="subtitle-line" />
          <div className="subtitle-text">
            <p>Bring balance to the dissonance.</p>
            <p>불협 속의 균형을 되찾아 주세요.</p>
          </div>
          <div className="subtitle-line" />
        </div>
        <ScrollIcon />
      </main>

      <section className="sub-main">
        <div className="submain-title">
          <div className="sub-title">Restore the</div>
          <div className="sub-title">Rhythm of Life</div>
        </div>
        <div className="subtitle-sub">
          <p>생명의 리듬을 되살리다.</p>
        </div>
      </section>

      <section id="Voices">
        <CardSection cards={sampleCards} nextSectionRef={nextRef} />
      </section>

      <section className="model-section fixed-noa" id="Noa">
        <div className="noa-sticky-wrapper">
          <MyModelViewer
            isHovered={isModelHovered}
            setIsHovered={setIsModelHovered}
          />
        </div>
      </section>

      <section className="noa-intro-section">
        <NoaIntroSection />
      </section>

      <Division />

      <div className="GLITCH">GLITCH</div>
      <div className="GLITCH-text">
        <p>모든 건 작고 천천히 시작되었습니다.</p>
        <p>그게 가장 무서운 방식이라는 걸, 이제야 알게 되었습니다.</p>
      </div>

      <section className="mini-game-wrapper" id="MiniGame">
        <MiniGame />
      </section>

      <section className="video" id="Scene">
        <div className="youtube-container">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/-kir2Pl6dac?si=i9Puog5nUFzU_ZxK"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="typing-message">
        <TypingText />
      </section>

      <footer className="footer">
        <div className="footer-left">
          <p>Team. <span className="footer-left-text">다행다복</span></p>
          <p>hda4508@gaywon.ac.kr</p>
        </div>

        <div className="footer-right">
          <div className="member">
            <p><span className="footer-text">백다나</span> Dana Baek</p>
            <p>planner / designer</p>
          </div>
          <div className="member">
            <p><span className="footer-text">구다혜</span> Dahye Koo</p>
            <p>designer / programmer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}