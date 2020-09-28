import React from "react";

import { Colour } from "../models/colour";

export type ColourToolProps = {
  colours: Colour[];
};

export function ColourTool(props: ColourToolProps) {
  return (
    <>
      <header>
        <h1>Colour Tool</h1>
      </header>
      <ul>
        {props.colours.map((colour) => (
          <li key={colour.id}>{colour.name}</li>
        ))}
      </ul>
    </>
  );
}
