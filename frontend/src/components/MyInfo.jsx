import React from 'react';

const mockMyInfo = {
  recipientEmail: "testuser@example.com",
};

const MyInfo = ({ info }) => {
  return (
    <div>
      <p>Email: {info.recipientEmail}</p>
    </div>
  );
};

export default MyInfo;