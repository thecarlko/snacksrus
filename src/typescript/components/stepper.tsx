





import * as React from "react";





enum EStepperOperationType
{
    increment, 
    decrement
}

/**
 * @param value - Has to be a useState variable
 * @param onStepperChange - Has to be a setState Function
 */
interface IStepperProperties
{
    min: number; 
    value: number;
    max: number; 

    onStepperChange : (value, type?: EStepperOperationType) => void; 
}

function Stepper(props: IStepperProperties)
{

    const setValue = React.useCallback((settable: number, type: EStepperOperationType) => 
    {
        props.onStepperChange(settable, type); 

    }, []); 


    return (

        <div className="stepper">

            <button
            disabled={ props.value === props.min }
            onClick={() => 
            {
                setValue(props.value - 1, EStepperOperationType.decrement); 
            }}
            className="icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </button>

            <input
                type="number"
                value={ props.value }
                readOnly
            />

            <button
            disabled={ props.value === props.max }
            onClick={() => 
            {
                setValue(props.value + 1, EStepperOperationType.increment); 
            }}
            className="icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12H18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18V6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>

    )

}


export { Stepper, EStepperOperationType }



