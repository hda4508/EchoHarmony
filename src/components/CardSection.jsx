import React, { useState } from "react";
import "../styles/CardSection.css";

export default function CardSection({ cards, nextSectionRef }) {
  const [goneCount, setGoneCount] = useState(0);

  const handleCardClick = () => {
    if (goneCount < cards.length - 1) {
      setGoneCount((prev) => prev + 1);
    } else {
      nextSectionRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const visibleCards = cards.slice(goneCount, goneCount + 3);

  return (
    <section className="card-section">
      <div className="card-stack">
        {visibleCards.map((cardContent, idx) => (
          <div
            key={goneCount + idx}
            className={`card-item ${idx === 0 ? "clickable" : ""}`}
            onClick={idx === 0 ? handleCardClick : undefined}
            style={{
              transform: `translateY(${idx * 20}px)`,
              zIndex: 3 - idx,
              backgroundColor: `hsl(0, 0%, ${100 - idx * 15}%)`,
              opacity: idx === 0 ? 1 : 0.95,
              cursor: idx === 0 ? "pointer" : "default",
            }}
          >
            <div className="card-inner">{cardContent}</div>
          </div>
        ))}
      </div>
    </section>
  );
}