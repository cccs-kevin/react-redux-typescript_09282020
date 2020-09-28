import React, { useState, ChangeEvent } from "react";

import { Colour } from "../models/colour";

export type ColourToolProps = {
  colours: Colour[];
};

export function ColourTool(props: ColourToolProps) {
  const [colours, setColours] = useState([...props.colours]);
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

  const addColour = () => {
    setColours([
      ...colours,
      {
        name: colourForm.colourName,
        hexcode: colourForm.colourHexcode,
        id: Math.max(...colours.map((c) => c.id), 0) + 1,
      },
    ]);

    setColourForm({
      colourName: "",
      colourHexcode: "",
    });
  };

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
        <button type="button" onClick={addColour}>
          Add Colour
        </button>
      </form>
    </>
  );
}
