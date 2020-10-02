import React from "react";
import { useParams, useHistory } from "react-router-dom";

export const About = () => {
  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  return (
    <div>
      <h1>About: {id}</h1>
      <button type="button" onClick={() => history.push("/")}>
        Go Home
      </button>
    </div>
  );
};
