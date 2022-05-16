





import * as React from "react";





interface IStepperProperties
{
    min? : number; 
    value : number;
    max : number; 

    onChange? : () => any
}

interface IStepperStates 
{

}

class Stepper extends React.Component<IStepperProperties, IStepperStates>
{

    constructor(props: IStepperProperties)
    {
        super(props); 

        this.state = 
        {
             
        }
    }

    render(): React.ReactNode 
    {
        return(
            <div className="stepper">
                <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <input type="number" min={(this.props.min) ? this.props.min : 0}  value={this.props.value} max={this.props.max}/>

                <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        )
    }
}


export { Stepper }



