import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import {BrowserRouter as Router} from 'react-router-dom';
import { MovieContextProvider } from './context/movieContext/MovieContext';
import { ListContextProvider } from './context/listContext/ListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <MovieContextProvider>
    <ListContextProvider>

    <Router>
    <App />
    </Router>
    
    </ListContextProvider>
    </MovieContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);

