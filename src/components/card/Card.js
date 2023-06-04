import React, { useState } from "react";
import "./Card.css";

function CardDeck({ id, title, value }) {
  const [isFlipped, setIsFlipped] = useState(true);

  function handleClick() {
    setIsFlipped(!isFlipped);
  }
  return (
    <div
      className={`card ${isFlipped ? "is-flipped" : ""}`}
      onClick={handleClick}
    >
      <div className="card-front">
        <p className="card-title">{title}</p>
        <p className="card-number">{value}</p>
      </div>
      <div className="card-back"></div>
    </div>
  );
}

export default CardDeck;
