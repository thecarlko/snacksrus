


import * as React from "react";
import { uuid } from "../utilities/uuid";



enum textfieldType
{
    text = "text",
    email = "email",  
    number = "number", 
    password = "password", 
    search = "search",
    phoneNumber = "tel"
}

interface ITextfieldProperties 
{
    type: textfieldType,
    placeholder : string, 

    leadIcon?: JSX.Element, 
    trailIcon?: JSX.Element, 
    readOnly?: boolean; 
    initialValue?: string; 

    id? : string; 
    class?: string; 
    numbersOnly?: boolean; 


    /**
     * Invoked when the user is about to type
    */
    onTextfieldFocus?: () => void; 

    /**
     * Invoked when the user types in the field
    */
    onTextfieldEdit?: (value: string) => void; 

    /** 
    * Invoked when user has changed the text in the field, but not commited
    */
    onTextfieldChanged?: (value: string) => void; 

    /** 
     * Invoked when the user has commited their change in the text field
     */
    onTextfieldCommit?: (value: string) => void; 
}

interface ITextfieldStates 
{
    focussed: boolean; 
    error: boolean; 
}



function Textfield(props: ITextfieldProperties)
{

    const id : string = uuid(); 

    const [focused, setFocused] = React.useState(false); 
    const [error, setError] = React.useState(false); 

    const inputRef = React.useRef<HTMLInputElement>(undefined); 

    React.useEffect(() => 
    {

        if (!inputRef || (props.initialValue == undefined)) { return; }

        inputRef.current.value = props.initialValue; 

    }, [inputRef]);


    // #region Approvals
    const keyApprovedAsNumber = React.useCallback((event: React.KeyboardEvent<HTMLInputElement>) => 
    {
        let acceptable = false; 

        switch (event.key)
        {
            case "Tab":
                acceptable = true; 
                break;

            case "Backspace":
                acceptable = true; 
                break;

            case "Enter":
                acceptable = true; 
                break;

            case "CapsLock":
                acceptable = true; 
                break;

            case "Shift":
                acceptable = true; 
                break;

            case "Control":
                acceptable = true; 
                break;
        }

        return acceptable; 

    }, []); 
    // #endregion 

    // #region Component
    return (

        <div
        id={ props.id } 
        className={ `textfield${ props.class ? ` ${ props.class }` : `` }${ (error) ? ` error` : `` }` }>

        {
            // - Lead Icon
            props.leadIcon &&
            <div className="icon">
                { props.leadIcon }
            </div>
        }

        {
            // - Inputfield
            <div className="input">
                {/* { (state.focussed == false) ? <label htmlFor={ id }>{ props.placeholder }</label> : <></> } */}
                <input
                    placeholder={ props.placeholder }
                    id={ id }
                    readOnly={ props.readOnly ? props.readOnly : false }
                    type={ props.type } 
                    ref={ inputRef }
                    onFocus = { onFocusInEvent } 
                    onChange = { (event) => { onEditEvent(event.target.value) }} 
                    onBlur = { eve => { onChangedEvent(eve.target.value) }}
                    onKeyDown={ (event) =>
                    {
                        if (!props.numbersOnly) { return; }
                        if (isNaN(parseInt(event.key)))
                        {
                            let passed = keyApprovedAsNumber(event);
                            if (passed == false) { event.preventDefault();  }
                        }
                    }}
                    onKeyUp = { (event) =>
                    {
                        if (event.key == "Enter") { onCommitEvent((event.target as HTMLInputElement).value) }
                    }}
                />
            </div>
        }

        {
            //Trail Icon
            props.trailIcon &&
            <div className="icon">
                { props.trailIcon }
            </div>
        }
        </div>

    )
    // #endregion


    // - Methods    
    // #region Textfield Methods
    function onFocusInEvent()
    {
        setFocused(true); 

        if (props.onTextfieldFocus) { props.onTextfieldFocus(); }

    }

    function onEditEvent(value: string)
    {
        if (props.onTextfieldEdit) { props.onTextfieldEdit(value); }
    }

    function onChangedEvent(value: string)
    {
        if (value == "" && focused == true) 
        {
            setFocused(false); 
        }

        if (props.onTextfieldChanged) { props.onTextfieldChanged(value); }
    }

    function onCommitEvent(value : string)
    {
        if (props.onTextfieldCommit) { props.onTextfieldCommit(value); }
    }
    // #endregion



}


export { Textfield, textfieldType }












