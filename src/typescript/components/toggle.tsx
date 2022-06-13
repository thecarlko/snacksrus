





import * as React from "react";
import { uuid } from "../utilities/uuid";



interface IToggleProperties 
{
    value: boolean; 
    setValue: (status: boolean) => any; 

    labelText?: string; 
}


function Toggle(props: IToggleProperties)
{



    // #region Component
    return (
        
        <label className="toggle">

            <div className="element">
                <input
                    type="checkbox"
                    name="check"
                    checked={ props.value }
                    onChange={ (event: React.ChangeEvent< HTMLInputElement >) => 
                    {
                        props.setValue(event.target.checked) }
                    }
                />
                <div className="indicator"></div>
            </div>

            <p className="label">{ props.labelText }</p>

        </label>

    )
    // #endregion
}


export { Toggle }









