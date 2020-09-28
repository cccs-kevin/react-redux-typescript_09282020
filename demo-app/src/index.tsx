import React from "react";
import ReactDOM from "react-dom";

import { ColourTool } from "./components/ColourTool";
import { CarTool } from "./components/CarTool";

ReactDOM.render(
  <>
    <ColourTool />
    <CarTool />
  </>,
  document.querySelector("#root")
);
