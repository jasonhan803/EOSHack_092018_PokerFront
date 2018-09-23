import * as React from "react";
import { findDOMNode } from "react-dom";
import styled from "react-emotion";

import { Actions } from "./actions";
import { Game } from "./game";

declare var Deck: any;

export class GameMaster extends React.Component<any> {
  render() {
    const { params } = this.props.match;
    return (
      <React.Fragment>
        <Actions params={params} />
        <Game />
      </React.Fragment>
    );
  }
}
