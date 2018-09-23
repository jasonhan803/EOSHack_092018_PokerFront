import * as React from "react";
import { findDOMNode } from "react-dom";
import styled from "react-emotion";

declare var Deck: any;

export class Game extends React.Component {
  public deck;

  componentDidMount() {
    this.initGame();
  }

  initGame() {
    this.deck = Deck();

    const el = findDOMNode(this);
    this.deck.mount(el);

    setTimeout(() => {
      this.startGame();
    }, 300);
  }

  startGame() {
    this.deck.shuffle();
    this.deck.poker();
  }

  render() {
    return <Cont />;
  }
}

const Cont = styled("div")`
  position: fixed;
  top: calc(50% + 1.5rem);
  left: 50%;
`;

const Title = styled("h1")`
  text-align: center;
  margin-top: 40px;

  font-size: 30px;
`;

const Wrap = styled("div")`
  text-align: center;
`;
