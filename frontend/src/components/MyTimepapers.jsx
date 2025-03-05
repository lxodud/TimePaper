import React from 'react';

const MyTimepapers = ({ timepapers }) => {
  return (
    <ul>
      {timepapers.map((timepaper) => (
        <li key={timepaper.id}>{timepaper.title}</li>
      ))}
    </ul>
  );
};

export default MyTimepapers;