import * as React from "react";
import { findDOMNode } from "react-dom";
import styled from "react-emotion";
import { Button } from "antd";

import { Actions } from "./actions";

declare var Deck: any;

const CARD_WIDTH = 69.75;
const CARD_HEIGHT = 99;
const CARD_MARGIN = 20;
const CARD_NUM = 5;

const YOU = 0.7;
const BANK = 0.45;
const OPP = 0.2;

const LABEL_MARGIN = 45;
const BID = 2;

export class Game extends React.Component<any, any> {
  public deck;
  public box: any;

  public cardIdx = -1;

  public yourCards = [];
  public opCards = [];
  public tableCards = [];

  state = {
    loading: true,
    state: "start",
    tableCards: 0,
    yourStake: 200,
    opStake: 200,
    bankStake: 0,
    msg: null
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

  private getCard(num?) {
    let idx: number = !num ? this.cardIdx++ : num;
    return this.deck.cards[idx];
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
    if (this.state.state === "win") return null;
    return this.getYourPoints().map(this.renderPlaces);
  }

  private bankPlaces() {
    if (this.state.state === "win") return null;
    return this.getBankPoints().map(this.renderPlaces);
  }

  private oppPlaces() {
    if (this.state.state === "win") return null;
    return this.getOppPoints().map(this.renderPlaces);
  }

  private renderPlaces = (item, idx) => {
    return <Place x={item.x} y={item.y} key={idx} />;
  };

  handleStart = () => {
    this.processMoves([
      () => {
        return this.bed();
      },
      () => {
        return this.actionToPromise("carding");
      },
      () => {
        return new Promise(res => {
          this.deck.shuffle();
          setTimeout(res, 500);
        });
      },
      () => {
        return new Promise(res => {
          this.deck.shuffle();
          setTimeout(res, 500);
        });
      },
      () => {
        return new Promise(res => {
          this.deck.sort();
          setTimeout(res, 1300);
        });
      },
      () => {
        const card = this.getCard();
        this.moveCard(card, this.getYourPoints()[0]);
        card.setSide("front");

        this.yourCards.push(card);
        return Promise.resolve();
      },
      () => {
        const card = this.getCard();
        this.moveCard(card, this.getYourPoints()[1]);
        card.setSide("front");

        this.yourCards.push(card);
        return Promise.resolve();
      },
      () => {
        const card = this.getCard();
        this.moveCard(card, this.getOppPoints()[0]);
        this.opCards.push(card);
        return Promise.resolve();
      },
      () => {
        const card = this.getCard();
        this.moveCard(card, this.getOppPoints()[1]);
        this.opCards.push(card);
        return Promise.resolve();
      },
      () => {
        return this.actionToPromise("action");
      }
    ]);
  };

  bed = () => {
    return new Promise(res => {
      this.setState(
        state => ({
          ...state,
          yourStake: state.yourStake - BID,
          opStake: state.opStake - BID,
          bankStake: state.bankStake + 2 * BID
        }),
        res
      );
    });
  };

  processMoves = (actions: any[], timeout = 150) => {
    return actions.reduce((acc, item) => {
      return acc.then(() => {
        return new Promise(res => item().then(() => setTimeout(res, timeout)));
      });
    }, Promise.resolve());
  };

  actionToPromise = action => {
    return new Promise(res => this.setState({ state: action }, res));
  };

  cantTurn = () => {
    return false;
  };

  handleCheck = () => {
    if (this.state.tableCards == 0) {
      this.processMoves([
        this.actionToPromise.bind(this, "carding"),
        this.addCardToTable,
        this.addCardToTable,
        this.addCardToTable,
        this.actionToPromise.bind(this, "action")
      ]);
    } else if (this.state.tableCards == 3) {
      this.processMoves([
        this.actionToPromise.bind(this, "carding"),
        this.addCardToTable,
        this.actionToPromise.bind(this, "action")
      ]);
    } else if (this.state.tableCards == 4) {
      this.processMoves([
        this.actionToPromise.bind(this, "carding"),
        this.addCardToTable,
        this.actionToPromise.bind(this, "action")
      ]);
    } else {
      this.opCards.forEach(card => card.setSide("front"));

      this.showMsg("Checked");
      this.actionToPromise("win");
    }
  };

  addCardToTable = () => {
    return new Promise(res => {
      const { tableCards } = this.state;
      const card = this.getCard();
      this.moveCard(card, this.getBankPoints()[tableCards]);
      card.setSide("front");

      this.tableCards.push(card);

      this.setState({ tableCards: tableCards + 1 }, res);
    });
  };

  handleRaise = () => {
    return new Promise(res => {
      this.setState(
        state => ({
          ...state,
          yourStake: state.yourStake - BID,
          bankStake: state.bankStake + BID
        }),
        () => {
          setTimeout(() => {
            this.showMsg("Called");
            this.setState(
              state => ({
                ...state,
                opStake: state.opStake - BID,
                bankStake: state.bankStake + BID
              }),
              res
            );
          }, 2000);
        }
      );
    });
  };

  showMsg = msg => {
    this.setState(
      state => ({
        msg
      }),
      () => {
        setTimeout(() => {
          this.setState(state => ({
            msg: null
          }));
        }, 2000);
      }
    );
  };

  upliftCard = (cards: any[]) => {
    cards.forEach(card => {
      card.animateTo({
        delay: 0,
        duration: 150,
        ease: "quartOut",

        x: card.x,
        y: card.y - 20
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Cont />
        <Actions params={this.props.params} state={this.state.state} />
        <Title top={this.props.box.height * YOU - LABEL_MARGIN}>You</Title>
        <Title top={this.props.box.height * OPP - LABEL_MARGIN}>Opponent</Title>
        {this.yourPlaces()}
        {this.bankPlaces()}
        {this.oppPlaces()}
        <TableBank>
          <Stake>Stake: {this.state.bankStake} EOS</Stake>
        </TableBank>
        <OpWrap>
          <Stake>Stake: {this.state.opStake} EOS</Stake>
        </OpWrap>
        <OpMsg>
          <Stake>{this.state.msg}</Stake>
        </OpMsg>
        <ActionWrap>
          <Stake>Stake: {this.state.yourStake} EOS</Stake>
          <Wrap>
            {this.state.state === "start" && (
              <Button type="primary" onClick={this.handleStart}>
                Start
              </Button>
            )}
            {this.state.state === "action" && [
              <Button
                type="primary"
                onClick={this.handleCheck}
                key="1"
                disabled={this.cantTurn()}
              >
                Check
              </Button>,
              <Button type="primary" onClick={this.handleRaise} key="2">
                Raise
              </Button>,
              <Button type="primary" onClick={this.handleStart} key="3">
                Fold
              </Button>
            ]}
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
  display: flex;
  justify-content: space-around;
`;

const Place = styled("div")`
  width: ${CARD_WIDTH + 2}px;
  height: ${CARD_HEIGHT + 2}px;

  position: absolute;
  top: ${(props: any) => props.y - 1}px;
  left: ${(props: any) => props.x - 1}px;

  border: 2px dashed #333;
`;

const OpWrap = styled("div")`
  position: absolute;
  width: 200px;
  height: 40px;
  left: calc(50% - 100px);
  top: 110px;
`;

const OpMsg = styled("div")`
  position: absolute;
  width: 200px;
  height: 40px;
  left: calc(50% - 100px);
  top: 320px;
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
  text-align: center;
`;

const TableBank = styled("div")`
  position: absolute;
  left: 20px;
  top: 45%;

  width: 120px;
`;
