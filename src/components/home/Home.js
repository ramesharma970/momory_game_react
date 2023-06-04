import React, { useState, useEffect } from "react";
import CardDeck from "../card/Card";
import "./Home.css";
import { Container, Row, Col } from "react-bootstrap";

const NUM_CARDS = 12;

function Home() {
  const [cards, setCards] = useState(Array(NUM_CARDS).fill(null));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [numMatches, setNumMatches] = useState(0);

  useEffect(() => {
    // Initialize the cards with random values
    let values = Array(NUM_CARDS / 2)
      .fill(null)
      .map((_, i) => i + 1);
    values = values.concat(values);
    values = values.sort(() => Math.random() - 0.5);
    setCards(values);
  }, []);

  useEffect(() => {
    // Check for a match when two cards are flipped
    if (flippedCards.length === 2) {
      const [card1Index, card2Index] = flippedCards;
      if (cards[card1Index] === cards[card2Index]) {
        // Matched
        setMatchedCards([...matchedCards, card1Index, card2Index]);
        setFlippedCards([]);
        setNumMatches(numMatches + 1);
      } else {
        // Not a match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [cards, flippedCards, matchedCards, numMatches]);

  function handleCardClick(index) {
    if (!flippedCards.includes(index) && !matchedCards.includes(index)) {
      setFlippedCards([...flippedCards, index]);
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        {cards.map((value, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <div className="card-container">
              <CardDeck
                title={`Card ${index + 1}`}
                value={
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? value
                    : ""
                }
                hiddenContent={value}
                onClick={() => handleCardClick(index)}
              />
            </div>
          </Col>
        ))}
      </Row>
      {numMatches === NUM_CARDS / 2 && <p>Congratulations! You won!</p>}
    </Container>
  );
}

export default Home;
