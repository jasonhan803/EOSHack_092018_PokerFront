import * as React from "react";
import { findDOMNode } from "react-dom";
import styled from "react-emotion";

import * as Deck from "deck-of-cards";

console.log(Deck);

declare var Deck: any;

export class Game extends React.Component {
  componentDidMount() {
    this.initGame();
  }

  initGame() {
    const el = findDOMNode(this);

    console.log(el);
    const deck = Deck();
    deck.mount(el);

    deck.cards.forEach(function(card, i) {
      card.setSide("front");

      // explode
      card.animateTo({
        delay: 1000 + i * 2, // wait 1 second + i * 2 ms
        duration: 500,
        ease: "quartOut",

        x: Math.random() * window.innerWidth - window.innerWidth / 2,
        y: Math.random() * window.innerHeight - window.innerHeight / 2
      });
    });
  }

  render() {
    return <Cont />;
  }
}

const Cont = styled("div")`
  width: 100%;
  height: 100%;
`;

const Title = styled("h1")`
  text-align: center;
  margin-top: 40px;

  font-size: 30px;
`;

const Wrap = styled("div")`
  text-align: center;
`;
