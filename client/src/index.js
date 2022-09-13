import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartProvider';
import { DeliveryProvider } from './context/DeliveryProvider';
import { ChatProvider } from './context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <DeliveryProvider>
            <ChatProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </ChatProvider>
          </DeliveryProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
