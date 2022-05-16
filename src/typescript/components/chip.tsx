






import * as React from "react";



interface IChipProperties
{
    label: string; 
    icon? : React.ReactNode; 
}

interface IChipStates 
{

}

class Chip extends React.Component<IChipProperties, IChipStates>
{

    constructor(props: IChipProperties)
    {
        super(props); 

        this.state = 
        {
             
        }
    }

    render(): React.ReactNode 
    {
        return(
            <div className="chip">
                <div className="icon">{this.props.icon}</div>
                <p>{ this.props.label }</p>
            </div>
        )
    }
}


export { Chip }



