import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { Car } from '../models/car';
import { CarViewRow } from '../components/CarViewRow';

test('snapshot CarViewRow component', () => {
  const car: Car = {
    id: 1,
    make: 'Ford',
    model: 'Fusion Hybrid',
    year: 2020,
    color: 'red',
    price: 45000,
  };

  expect(
    renderer
      .create(
        <CarViewRow
          car={car}
          onEditCar={() => null}
          onDeleteCar={() => null}
        />,
      )
      .toJSON(),
  ).toMatchSnapshot();
});

describe('CarViewRow testing library', () => {
  test('render CarViewRow component', () => {
    const car = {
      id: 1,
      make: 'Ford',
      model: 'Fusion Hybrid',
      year: 2020,
      color: 'red',
      price: 45000,
    };

    const carKeys = Object.keys(car);
    const renderResult = render(
      <table>
        <tbody>
          <CarViewRow
            car={car}
            onEditCar={() => null}
            onDeleteCar={() => null}
          />
        </tbody>
      </table>,
    );

    const cells = renderResult.getAllByRole('cell');

    expect(cells.length).toBe(7);

    cells.slice(0, 6).map((element, index) => {
      expect(element.textContent).toBe(String(car[carKeys[index]]));
    });
  });
});
