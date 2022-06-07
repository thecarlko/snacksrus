







import * as React from "react"; 
import { Category } from "../../models/category"








interface IPeacockProperties 
{
    category: Category;
}


function Peacock(props: IPeacockProperties)
{

    return (

        <div className="peacock">
            <div className="tail">
                <div className="feather primary"></div>
                <div className="feather secondary"></div>
                <div className="feather tertiary"></div>
            </div>

            <div className="dropshadow"></div>
        </div>
    )

}

export { Peacock }











