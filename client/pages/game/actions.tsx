import * as React from "react";
import styled from "react-emotion";

export class Actions extends React.Component<any> {
  render() {
    const { id } = this.props.params;
    return (
      <Header>
        <Title>Hello hacker in game: {id}</Title>
      </Header>
    );
  }
}

const Header = styled("div")`
  flex: 0 0 60px;
  background: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  padding-top: 15px;
`;

const Title = styled("h1")``;
