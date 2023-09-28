import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom';

// On utilise la méthode render de ReactDOM pour afficher notre composant App dans la div root

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
)
