import * as React from "react";
import styled from "react-emotion";

import img from "./back.jpg";

export const Common: React.SFC<any> = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled("div")`
  height: 100%;
  background: url(${img});
  display: flex;
  flex-direction: column;
`;
