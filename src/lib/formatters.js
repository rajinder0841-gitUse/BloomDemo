export const formatMoney = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

export const formatDate = (dateValue) => {
  const date = new Date(`${dateValue}T12:00:00`);
  return {
    day: date.getDate(),
    month: date.toLocaleString('en-US', { month: 'short' }),
    full: date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  };
};
