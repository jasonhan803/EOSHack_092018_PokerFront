import * as React from "react";
import styled from "react-emotion";
import { Table, Modal, Spin } from "antd";
const { Column, ColumnGroup } = Table;

const data = [
  {
    key: "1",
    id: 122,
    players: 1,
    stake: 10
  },
  {
    key: "2",
    id: 2342,
    players: 1,
    stake: 10
  },
  {
    key: "3",
    id: 242,
    players: 2,
    stake: 10
  }
];

export class TableGames extends React.Component<any> {
  state = {
    loading: true,
    visible: false,
    currentId: null,
    data: null
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ data, loading: false });
    }, 300);
  }

  handleJoin = (record, text) => {
    this.setState({ visible: true, currentId: record.id });
  };
  
  handleSubmit = () => {
    this.props.history.push(`/game/${this.state.currentId}`);
  };
  
  handleCancel = () => {
    this.setState({ visible: false, currentId: null });
  };

  render() {
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
      <Inner>
        <Cont>
          <Modal
            title="Open game"
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={this.handleCancel}
          >
            <p>
              Open this game ID:
              {this.state.currentId}?
            </p>
          </Modal>
          <Title>Table of available games</Title>
          <Wrap>
            <Table dataSource={this.state.data} pagination={false}>
              <Column title="Game ID" dataIndex="id" key="id" />
              <Column title="# Players" dataIndex="players" key="players" />
              <Column title="Stake" dataIndex="stake" key="stake" />
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
  width: 600px;
  height: 400px;

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
