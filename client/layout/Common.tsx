import * as React from "react";
import styled from "react-emotion";

export const Common: React.SFC<any> = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled("div")`
  height: 100%;
  background: #45a173;
  display: flex;
  align-items: center;
  justify-content: center;
`;
