import React from "react";
import ReactDOM from "react-dom";

import { Colour } from "./models/colour";
import { ColourTool } from "./components/ColourTool";
import { CarTool } from "./components/CarTool";

const colourList: Colour[] = [
  { id: 1, name: "pink", hexcode: "ffc0cb" },
  { id: 2, name: "blue", hexcode: "0000ff" },
  { id: 3, name: "purple", hexcode: "800080" },
  { id: 4, name: "cyan", hexcode: "00ffff" },
];

ReactDOM.render(
  <>
    {/* React.createElement(ColourTool, Object.freeze({ colours: colourList })) */}
    <ColourTool colours={colourList} />
    <CarTool />
  </>,
  document.querySelector("#root")
);
