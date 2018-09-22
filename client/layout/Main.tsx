import * as React from "react";
import styled from "react-emotion";

export const Main: React.SFC<any> = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled("div")`
  background: #eee;
`;
