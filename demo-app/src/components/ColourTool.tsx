import React from "react";

import { Colour } from "../models/colour";

import { useList } from "../hooks/useList";
import { ToolHeader } from "./ToolHeader";
import { ItemList } from "./ItemList";
import { ColourForm } from "./ColourForm";

export type ColourToolProps = {
  colours: Colour[];
};

export function ColourTool(props: ColourToolProps) {
  const [colours, appendColour] = useList([...props.colours]);

  return (
    <>
      <ToolHeader headerText="Color Tool" />
      <ItemList
        items={colours}
        keyFn={(item) => item.id}
        contentFn={(item) => item.name}
      />
      <ColourForm buttonText="Add Colour" onSubmitColour={appendColour} />
    </>
  );
}
