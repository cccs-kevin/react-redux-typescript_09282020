import React, { useState, ChangeEvent } from "react";

import { Colour } from "../models/colour";

export type ColourToolProps = {
  colours: Colour[];
};

export function ColourTool(props: ColourToolProps) {
  // array destructuring
  // using the array as a tuple
  const [
    colourForm /* state data */,
    setColourForm /* state update function, also triggers the re-render */,
  ] = useState(
    {
      colourName: "",
      colourHexcode: "",
    } /* initial state data */
  );

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setColourForm({
      // object spread operator
      ...colourForm,
      // computed property
      [e.target.name]: e.target.value,
    });
  };

  console.log(colourForm);

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
      <form>
        <div>
          <label htmlFor="colour-name-input">Colour Name:</label>
          <input
            type="text"
            id="colour-name-input"
            name="colourName"
            value={colourForm.colourName}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="colour-hexcode-input">Colour Hexcode:</label>
          <input
            type="text"
            id="colour-hexcode-input"
            name="colourHexcode"
            value={colourForm.colourHexcode}
            onChange={change}
          />
        </div>
      </form>
    </>
  );
}
