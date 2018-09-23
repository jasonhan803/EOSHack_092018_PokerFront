import * as React from "react";
import { findDOMNode } from "react-dom";
import styled from "react-emotion";
import { Button } from "antd";

declare var Deck: any;

const CARD_WIDTH = 69.75;
const CARD_HEIGHT = 99;
const CARD_MARGIN = 20;
const CARD_NUM = 5;

const YOU = 0.7;
const BANK = 0.45;
const OPP = 0.2;

const LABEL_MARGIN = 45;

export class Game extends React.Component<any> {
  public deck;
  public box: any;

  state = {
    loading: true
  };

  componentDidMount() {
    const el: any = findDOMNode(this);
    this.box = el.getBoundingClientRect();

    this.initGame();

    this.setState({ loading: false });
  }

  private genPoints(pos, num = CARD_NUM) {
    const { width, height } = this.props.box;

    const total_width = CARD_WIDTH * num + CARD_MARGIN * (num - 1);
    const start_width = (width - total_width) / 2;
    const your_height = pos * height;

    return new Array(num).fill(0).map((item, idx) => ({
      x: start_width + CARD_WIDTH * idx + idx * CARD_MARGIN,
      y: your_height
    }));
  }

  private getYourPoints() {
    return this.genPoints(YOU, 2);
  }

  private getBankPoints() {
    return this.genPoints(BANK);
  }

  private getOppPoints() {
    return this.genPoints(OPP, 2);
  }

  private initGame() {
    this.deck = Deck();

    const el = findDOMNode(this);
    this.deck.mount(el);
  }

  private moveCard(card, point) {
    card.animateTo({
      delay: 0,
      duration: 150,
      ease: "quartOut",

      x: -this.box.left + point.x + CARD_WIDTH / 2,
      y: -this.box.top + point.y + CARD_HEIGHT / 2
    });
  }

  private yourPlaces() {
    return this.getYourPoints().map(this.renderPlaces);
  }

  private bankPlaces() {
    return this.getBankPoints().map(this.renderPlaces);
  }

  private oppPlaces() {
    return this.getOppPoints().map(this.renderPlaces);
  }

  private renderPlaces = (item, idx) => {
    return <Place x={item.x} y={item.y} key={idx} />;
  };

  handleStart = () => {
    this.moveCard(this.deck.cards[0], this.getYourPoints()[0]);
  };

  render() {
    return (
      <React.Fragment>
        <Cont />
        <Title top={this.props.box.height * YOU - LABEL_MARGIN}>You</Title>
        <Title top={this.props.box.height * OPP - LABEL_MARGIN}>Opponent</Title>
        {this.yourPlaces()}
        {this.bankPlaces()}
        {this.oppPlaces()}
        <ActionWrap>
          <Stake>Stake: 200 EOS</Stake>
          <Wrap>
            <Button type="primary" onClick={this.handleStart}>
              Start
            </Button>
          </Wrap>
        </ActionWrap>
      </React.Fragment>
    );
  }
}

const Cont = styled("div")`
  position: fixed;
  top: calc(45% + 1.5rem);
  left: 90%;
`;

const Title = styled("h4")`
  position: absolute;
  text-align: center;
  margin-top: 0;

  width: 200px;
  left: calc(50% - 200px / 2);
  top: ${(props: any) => props.top}px;

  font-size: 20px;
`;

const Wrap = styled("div")`
  text-align: center;
`;

const Place = styled("div")`
  width: ${CARD_WIDTH}px;
  height: ${CARD_HEIGHT}px;

  position: absolute;
  top: ${(props: any) => props.y}px;
  left: ${(props: any) => props.x}px;

  border: 3px dashed #333;
`;

const ActionWrap = styled("div")`
  position: absolute;
  width: 400px;
  bottom: 0;
  left: calc(50% - 200px);
  height: 110px;

  color: white;
  padding: 10px 10px 0;

  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px 10px 0 0;

  text-align: center;
`;

const Stake = styled("h3")`
  /* color: white; */
`;
