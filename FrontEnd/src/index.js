import React from 'react';
import ReactDOM from 'react-dom/client';
import {GlobalStyles} from './styles';
import App from '~/App';
import {AppProvider, AdminProvider} from "~/context";
import {HelmetProvider} from 'react-helmet-async';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import '~/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <GlobalStyles>
                <Router>
                    <AppProvider>
                        <AdminProvider>
                            <App/>
                        </AdminProvider>
                    </AppProvider>
                </Router>
            </GlobalStyles>
        </HelmetProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
