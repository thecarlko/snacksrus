



import * as React from "react";
import * as ReactDOM from "react-dom";
import {  } from "react-dom"
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";


const rootElement = document.getElementById(`root`);

onload 
{
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
        
    , rootElement)
}



