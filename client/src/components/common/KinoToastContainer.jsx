import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyle = {
  background: '#1E0039',
  color: '#ffffff',
  border: '1px solid #712CB0',
  boxShadow: '0 0 12px #712CB0',
  borderRadius: '8px',
  fontFamily: 'inherit',
  fontSize: '1.1rem',
  padding: '30px 34px', 
};

const toastProgressStyle = {
  background: 'linear-gradient(to right, #712CB0, #a855f7)',
};

export default function KinoToastContainer() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      toastStyle={toastStyle}
      progressStyle={toastProgressStyle}
      closeButton={false}
    />
  );
}