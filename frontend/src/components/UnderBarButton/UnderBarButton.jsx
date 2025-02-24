import React from 'react';

export default function UnderBarButton({ title, onClick }) {
  return <button onClick={onClick}>{title}</button>;
}
