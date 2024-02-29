
const API_URL = 'https://minizuba-fn.azurewebsites.net/api/orderlines';

export const fetchOrderLines = async (typeId, quantity) => {
  const queryParams = quantity ? `?type_id=${typeId}&quantity=${quantity}` : `?type_id=${typeId}`;
  const response = await fetch(`${API_URL}${queryParams}`);
  const data = await response.json();
  return data;
};
