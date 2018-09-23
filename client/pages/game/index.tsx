import * as React from "react";
import { findDOMNode } from "react-dom";
import styled from "react-emotion";
import { Spin } from "antd";

import { Actions } from "./actions";
import { Game } from "./game";

declare var Deck: any;

export class GameMaster extends React.Component<any> {
  state = {
    loading: true,
    data: null,
    box: null
  };

  componentDidMount() {
    setTimeout(() => {
      const el: any = findDOMNode(this);

      this.setState({
        data: { some: "data" },
        box: el.getBoundingClientRect(),
        loading: false
      });
    }, 0);
  }

  render() {
    const { params } = this.props.match;

    if (this.state.loading) {
      return (
        <Inner>
          <Cont>
            <Inner>
              <Spin size="large" />
            </Inner>
          </Cont>
        </Inner>
      );
    }

    return (
      <React.Fragment>
        {/* <Actions params={params} /> */}
        <Game data={this.state.data} box={this.state.box} params={params} />
      </React.Fragment>
    );
  }
}

const Inner = styled("div")`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cont = styled("div")`
  width: 90px;
  height: 90px;

  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
`;
