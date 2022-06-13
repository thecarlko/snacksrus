



import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {  } from "react-dom"
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";


const rootElement = document.getElementById(`root`);

onload 
{
    const root = createRoot(rootElement);
    root.render(
        <BrowserRouter>
        { <App /> }
        </BrowserRouter>
    );
}





