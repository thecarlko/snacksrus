

import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Network } from "../../admin/network";
import { Home } from "../home/home";
import { NavBar } from "../nav/navbar";


interface IAppProperties 
{

}


function App(props: IAppProperties)
{


    React.useEffect(() => 
    {


    }, []); 

    return (
    <>
        <NavBar />

        <Routes>
            <Route exact index element={ <Home /> } />
        </Routes>
    </>
    )
}


export { App }





