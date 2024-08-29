import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const toastConfig: ToastContainerProps = {
 
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  rtl: false,
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToastContainer {...toastConfig} />
  </StrictMode>,
)
