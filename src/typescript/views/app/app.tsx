

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../home/home";


interface IAppProperties 
{

}


class App extends React.Component 
{
    constructor(props: IAppProperties)
    {
        super(props); 
    }

    render(): React.ReactNode 
    {
        return (
        <>
            <NavBar />

            <Routes>
                <Route exact index element={ <Home /> } />
            </Routes>
        </>
        )
    }
}


export { App }





