import * as React from "react";
import styled from "react-emotion";
import { push } from "connected-react-router";
import { Table, Divider, Tag, Modal } from "antd";
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

export class TableGames extends React.Component<any> {
  state = {
    visible: false
  };

  handleJoin = (record, text) => {
    this.setState({ visible: true });
  };

  handleSubmit = () => {
    this.props.history.push("/game");
  };

  handleCancel = () => {};

  render() {
    return (
      <Inner>
        <Cont>
          <Modal
            title="Open game"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
          />
          <Title>Table of available games</Title>
          <Wrap>
            <Table dataSource={data}>
              <ColumnGroup title="Name">
                <Column
                  title="First Name"
                  dataIndex="firstName"
                  key="firstName"
                />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
              </ColumnGroup>
              <Column title="Age" dataIndex="age" key="age" />
              <Column title="Address" dataIndex="address" key="address" />
              <Column
                title="Tags"
                dataIndex="tags"
                key="tags"
                render={tags => (
                  <span>
                    {tags.map(tag => (
                      <Tag color="blue" key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </span>
                )}
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <a onClick={() => this.handleJoin(record, text)}>Join</a>
                )}
              />
            </Table>
          </Wrap>
        </Cont>
      </Inner>
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
