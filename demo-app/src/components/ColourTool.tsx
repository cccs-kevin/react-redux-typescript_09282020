import React from "react";

import { Colour } from "../models/colour";

export function ColourTool() {
  const colours: Colour[] = [
    { id: 1, name: "pink", hexcode: "ffc0cb" },
    { id: 2, name: "blue", hexcode: "0000ff" },
    { id: 3, name: "purple", hexcode: "800080" },
    { id: 4, name: "cyan", hexcode: "00ffff" },
  ];

  // const colourListItems: React.ReactNode[] = [];

  // colours.forEach((colour) => {
  //   colourListItems.push(<li>{colour.name}</li>);
  // });

  // const colourListItems = colours.map((colour) => <li>{colour.name}</li>);

  return (
    <>
      <header>
        <h1>Colour Tool</h1>
      </header>
      <ul>
        {colours.map((colour) => (
          <li key={colour.id}>{colour.name}</li>
        ))}
      </ul>
    </>
  );
}
