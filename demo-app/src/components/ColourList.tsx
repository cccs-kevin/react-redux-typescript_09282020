import React from "react";

import { Colour } from "../models/colour";

export type ColourListProps = {
  colours: Colour[];
};

export function ColourList(props: ColourListProps) {
  return (
    <ul>
      {props.colours.map((colour) => (
        <li key={colour.id}>{colour.name}</li>
      ))}
    </ul>
  );
}
