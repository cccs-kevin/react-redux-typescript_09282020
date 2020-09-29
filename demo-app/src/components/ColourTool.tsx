import React, { useState } from "react";

import { Colour, NewColour } from "../models/colour";

import { ToolHeader } from "./ToolHeader";
import { ColourList } from "./ColourList";
import { ColourForm } from "./ColourForm";

export type ColourToolProps = {
  colours: Colour[];
};

export function ColourTool(props: ColourToolProps) {
  const [colours, setColours] = useState([...props.colours]);

  const addColour = (newColour: NewColour) => {
    setColours([
      ...colours,
      {
        ...newColour,
        id: Math.max(...colours.map((c) => c.id), 0) + 1,
      },
    ]);
  };

  return (
    <>
      <ToolHeader headerText="Color Tool" />
      <ColourList colours={colours} />
      <ColourForm buttonText="Add Colour" onSubmitColour={addColour} />
    </>
  );
}
