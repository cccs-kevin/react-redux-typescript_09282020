import React, { useState, ChangeEvent } from "react";

import { Car } from "../models/car";

import { ToolHeader } from "./ToolHeader";

export interface CarToolProps {
  cars: Car[];
}

export function CarTool(props: CarToolProps) {
  const [cars, setCars] = useState<Car[]>([...props.cars]);

  const [carForm, setCarForm] = useState({
    make: "",
    model: "",
    year: 1900,
    color: "",
    price: 0,
  });

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setCarForm({
      ...carForm,
      [e.target.name]: e.target.value,
    });
  };

  const addCar = () => {
    setCars(
      cars.concat({
        ...carForm,
        id: Math.max(...(cars.map((c) => c.id) as []), 0) + 1,
      })
    );
  };

  return (
    <>
      <ToolHeader headerText="Car Tool" />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>{car.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <div>
          <label htmlFor="make-input">Make:</label>
          <input
            type="text"
            id="make-input"
            name="make"
            value={carForm.make}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="model-input">Model:</label>
          <input
            type="text"
            id="model-input"
            name="model"
            value={carForm.model}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="year-input">Year:</label>
          <input
            type="number"
            id="year-input"
            name="year"
            value={carForm.year}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="color-input">Color:</label>
          <input
            type="text"
            id="color-input"
            name="color"
            value={carForm.color}
            onChange={change}
          />
        </div>
        <div>
          <label htmlFor="price-input">Price:</label>
          <input
            type="number"
            id="price-input"
            name="price"
            value={carForm.price}
            onChange={change}
          />
        </div>
        <button type="button" onClick={addCar}>
          Add Car
        </button>
      </form>
    </>
  );
}
