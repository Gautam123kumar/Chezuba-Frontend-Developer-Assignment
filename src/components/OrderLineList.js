// OrderLineList.js
import React, { useState, useEffect } from 'react';
import OrderLineListItem from './OrderLineListItem';
import { fetchOrderLines } from '../services/minizubaApi';

const OrderLineList = ({ typeId }) => {
  const [loading, setLoading] = useState(true);
  const [orderLines, setOrderLines] = useState([]);
  const [filteredOrderLines, setFilteredOrderLines] = useState([]);
  const [filterQuantity, setFilterQuantity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchOrderLines(typeId);
      setOrderLines(data);
      setLoading(false);
    };

    fetchData();
  }, [typeId]);

  const filterByQuantity = () => {
    const quantity = parseInt(filterQuantity);
    const filtered = orderLines.filter(orderLine => orderLine.Quantity === quantity);
    setFilteredOrderLines(filtered);
  };

  const resetFilter = () => {
    setFilterQuantity('');
    setFilteredOrderLines([]);
  };

  return (
    <div>
      <div className='filter_box'>
        <h1>Minizuba Order Lines</h1>
        <div>
          <label htmlFor="quantityFilter">Filter by Quantity</label>&nbsp;&nbsp;&nbsp;
          <input type='number' id='quantityFilter' value={filterQuantity} onChange={(e) => setFilterQuantity(e.target.value)} />
          <button onClick={filterByQuantity}>Apply</button> &nbsp;&nbsp;
          <button onClick={resetFilter}>Reset</button>
        </div>
      </div>
      <div className='table-data'>
        <table>
          <thead>
            <tr>
              <th>OrderLineID</th>
              <th>OrderID</th>
              <th>StockItemID</th>
              <th>Description</th>
              <th>PackageTypeID</th>
              <th>Quantity</th>
              <th>UnitPrice</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              // Display loading skeleton inside table body
              [...Array(10)].map((_, index) => (
                <tr key={index}>
                  <td colSpan="7" className="loading-row" />
                </tr>
              ))
            ) : (
              (filteredOrderLines.length > 0 ? filteredOrderLines : orderLines)?.map(orderLine => (
                <OrderLineListItem key={orderLine.OrderLineID} orderLine={orderLine} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderLineList;
