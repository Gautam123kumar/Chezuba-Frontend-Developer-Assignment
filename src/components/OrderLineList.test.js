import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderLineList from './OrderLineList';

jest.mock('../services/minizubaApi', () => ({
  fetchOrderLines: jest.fn(() => Promise.resolve([
    { OrderLineID: 1, OrderID: 101, StockItemID: 201, Description: "Product A", PackageTypeID: 1, Quantity: 10, UnitPrice: 5 },
    { OrderLineID: 2, OrderID: 102, StockItemID: 202, Description: "Product B", PackageTypeID: 2, Quantity: 20, UnitPrice: 10 },
  ])),
}));

describe('OrderLineList', () => {
  it('renders all order lines initially', async () => {
    render(<OrderLineList typeId={1} />);
    // Wait for order lines to be loaded
    await screen.findByTestId('order-line-list-item');

    // Check if all order lines are rendered
    expect(screen.getByTestId('order-line-list-item', { exact: false })).toBeInTheDocument();
    expect(screen.getByTestId('order-line-list-item', { exact: false })).toHaveTextContent('Product A');
    expect(screen.getByTestId('order-line-list-item', { exact: false })).toHaveTextContent('Product B');
  });
});
