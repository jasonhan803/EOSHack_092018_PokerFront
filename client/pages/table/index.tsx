import * as React from "react";
import styled from "react-emotion";
import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street"
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street"
  }
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];

export class TableGames extends React.Component {
  render() {
    return (
      <Cont>
        <Title>Table of available games</Title>
        <Wrap>
          <Table dataSource={dataSource} columns={columns} />
        </Wrap>
      </Cont>
    );
  }
}

const Cont = styled("div")`
  width: 90%;
  height: 90%;

  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
`;

const Title = styled("h1")`
  text-align: center;
  margin-top: 20px;

  font-size: 20px;
`;

const Wrap = styled("div")`
  text-align: center;
`;
