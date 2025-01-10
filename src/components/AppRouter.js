import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "../pages/WeatherPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/weather' element={<Home/>}/>
        </Routes>
    );
};

export default AppRouter;