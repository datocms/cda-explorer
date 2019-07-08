import React from "react";
import Explorer from "./Explorer";
import BlankSlate from "./BlankSlate";
import useQueryString from "./useQueryString";

import "./App.sass";

const App = () => {
  const [queryString] = useQueryString();

  return (
    <div id="graphiql">
      {
        queryString.apitoken ?
          <Explorer /> :
          <BlankSlate />
      }
    </div>
  );
};

export default App;
