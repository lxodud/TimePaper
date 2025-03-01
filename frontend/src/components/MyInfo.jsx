import React from 'react';

const MyInfo = ({ info }) => {
  return (
    <div>
      <p>Email: {info.recipientEmail}</p>
    </div>
  );
};

export default MyInfo;