import * as React from "react";
import styled from "react-emotion";
import { Button } from "antd";

export class Main extends React.Component {
  render() {
    return (
      <Cont>
        <Title>EOS Poker</Title>
        <Wrap>
          <Button type="primary">Find table</Button>
        </Wrap>
      </Cont>
    );
  }
}

const Cont = styled("div")`
  width: 400px;
  height: 200px;

  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
`;

const Title = styled("h1")`
  text-align: center;
  margin-top: 40px;

  font-size: 30px;
`;

const Wrap = styled("div")`
  text-align: center;
`;
