





import * as React from "react";
import { uuid } from "../utilities/uuid";



interface IToggleProperties 
{
    labelText?: string; 
    onToggleSwitch?: (status: boolean) => any; 
}

interface IToggleStates 
{

}


class Toggle extends React.Component <IToggleProperties, IToggleStates>
{


    constructor(props: IToggleProperties)
    {
        super(props);

        this.state = 
        {

        }
    }



    render(): React.ReactNode
    {
       return (
        <label className="toggle">

            <div className="element">
                <input
                    type="checkbox"
                    name="check"
                    value="check"
                    onChange={ (event: React.ChangeEvent< HTMLInputElement >) => 
                    {
                        if (this.props.onToggleSwitch) { this.props.onToggleSwitch(event.target.checked); }
                    }}
                />
                <div className="indicator"></div>
            </div>

            <p className="label">{ this.props.labelText }</p>

        </label>

       )
    }

}


export { Toggle }









