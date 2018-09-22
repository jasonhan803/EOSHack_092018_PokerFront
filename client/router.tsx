import * as React from "react";
import { Route, Switch } from "react-router-dom";

import { Common } from "./layout/Common";
import { Main } from "./pages/main";
import { TableGames } from "./pages/table";
import { Game } from "./pages/game";

export const Routes = () => {
  return (
    <Switch>
      <Common>
        <Route exact path="/" component={Main} />
        <Route path="/table" component={TableGames} />
        <Route path="/game" component={Game} />
      </Common>
    </Switch>
  );
};
