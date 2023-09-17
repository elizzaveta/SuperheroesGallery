import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {appRouter} from "./routes/AppRouter";
import Header from "./components/Header";
import commonStyles from './assets/css/CommonStyles.module.css'
import './App.css'

function App() {
    return (
        <div>
            <Header/>
            <div className={commonStyles.container}>
                <BrowserRouter>
                    <Routes>
                        {appRouter.map((route) =>
                            <Route path={route.path} key={route.path} element={route.component}/>
                        )}
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
