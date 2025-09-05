


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';


import App from './App.jsx'

import {BrowserRouter as Router} from 'react-router-dom'
import ShopcontextProvider from './context/Shopcontext.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <ShopcontextProvider>
      <App />
    </ShopcontextProvider>
        
  </Router>,

  
)
