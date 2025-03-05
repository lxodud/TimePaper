import { ClockLoader, HashLoader, PacmanLoader, SyncLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div style={spinnerStyle}>
      <ClockLoader color="#d87728" loading={true} size={60} />
    </div>
  );
};

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
};

export default LoadingSpinner;
