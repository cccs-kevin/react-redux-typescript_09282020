import React, { useState, ChangeEvent } from "react";

import { NewColour } from "../models/colour";

export type ColourFormProps = {
  buttonText: string;
  onSubmitColour: (colour: NewColour) => void;
};

export function ColourForm(props: ColourFormProps) {
  const [colourForm, setColourForm] = useState({
    name: "",
    hexcode: "",
  });

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setColourForm({
      ...colourForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitColour = () => {
    props.onSubmitColour({
      ...colourForm,
    });

    setColourForm({
      name: "",
      hexcode: "",
    });
  };

  return (
    <form>
      <div>
        <label htmlFor="colour-name-input">Colour Name:</label>
        <input
          type="text"
          id="colour-name-input"
          name="name"
          value={colourForm.name}
          onChange={change}
        />
      </div>
      <div>
        <label htmlFor="colour-hexcode-input">Colour Hexcode:</label>
        <input
          type="text"
          id="colour-hexcode-input"
          name="hexcode"
          value={colourForm.hexcode}
          onChange={change}
        />
      </div>
      <button type="button" onClick={submitColour}>
        {props.buttonText}
      </button>
    </form>
  );
}
