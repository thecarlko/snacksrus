






import * as React from "react";
import { BlockLike } from "typescript";



interface IChipProperties
{
    label: string; 
    selected: boolean; 
    onClick?: (event) => void; 
    icon? : React.ReactNode; 
}


function Chip(props: IChipProperties)
{
    return (

        <div
        onClick={ (event) => 
        {
            if (props.onClick) { props.onClick(event) }
        }}
        className={ `chip${ (props.selected) ? ` active` : `` }` }>
            { props.icon && <div className="icon">{ props.icon }</div> }
            <p>{ props.label }</p>
        </div>

    )
}



export { Chip }



