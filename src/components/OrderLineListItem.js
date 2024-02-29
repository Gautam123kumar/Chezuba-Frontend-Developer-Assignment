import React from 'react';
const OrderLineListItem = ({ orderLine }) => {
  function packageTypeColor(packageTypeID){
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#f0f0f0', '#0f0f0f', '#123456', '#654321', '#abcdef', '#fedcba', '#135790', '#246801'];
    return colors[packageTypeID % colors.length];
  }
  return (
    <tr>
      <td>{orderLine.OrderLineID}</td>
      <td>{orderLine.OrderID}</td>
      <td>{orderLine.StockItemID}</td>
      <td>{orderLine.Description}</td>
      <td style={{ backgroundColor: packageTypeColor(orderLine.PackageTypeID), padding: '4px' }}>{orderLine.PackageTypeID}</td>
      <td>{orderLine.Quantity}</td>
      <td>{orderLine.UnitPrice}</td>
    </tr>
  );
};

export default OrderLineListItem;
