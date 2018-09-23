import * as React from "react";
import { findDOMNode } from "react-dom";
import styled from "react-emotion";

import { Actions } from "./actions";
import { Game } from "./game";

declare var Deck: any;

export class GameMaster extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Actions />
        <Game />
      </React.Fragment>
    );
  }
}
