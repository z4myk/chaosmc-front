import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store/store';
import { Provider } from 'react-redux'
import { ProductsProvider } from './context/ProductsContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { OrderProvider } from './context/OrderContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ProductsProvider>
        <CartProvider>
          <OrderProvider>
    <App />
          </OrderProvider>
        </CartProvider>
      </ProductsProvider>
    </Provider>
  </React.StrictMode>,
)
