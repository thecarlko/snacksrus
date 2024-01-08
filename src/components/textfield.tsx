


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

class Textfield extends React.Component<ITextfieldProperties, ITextfieldStates>
{
    private id : string = uuid(); 

    constructor(props: ITextfieldProperties)
    {
        super(props); 

        this.state = 
        {
            focussed: false, 
            error: false
        }

        this.onFocusInEvent = this.onFocusInEvent.bind(this);
        this.onEditEvent = this.onEditEvent.bind(this);
        this.onChangedEvent = this.onChangedEvent.bind(this); 
        this.onCommitEvent = this.onCommitEvent.bind(this);
    }

    render(): React.ReactNode 
    {
        return (
            <div className={ `textfield${ (this.state.error) ? ` error` : `` }` }>

            {
                // - Lead Icon
                this.props.leadIcon &&
                <div className="icon">
                    { this.props.leadIcon }
                </div>
            }

            {
                // - Inputfield
                <div className="input">
                    {/* { (this.state.focussed == false) ? <label htmlFor={ this.id }>{ this.props.placeholder }</label> : <></> } */}
                    <input
                        placeholder={ this.props.placeholder }
                        id={ this.id }
                        type={ this.props.type } 
                        onFocus = { this.onFocusInEvent } 
                        onChange = { (event) => { this.onEditEvent(event.target.value) }} 
                        onBlur = { eve => { this.onChangedEvent(eve.target.value) }}
                        onKeyUp = { (event) =>
                        {
                            if (event.key == "Enter") { this.onCommitEvent((event.target as HTMLInputElement).value) }
                        }}
                    />
                </div>
            }

            {
                //Trail Icon
                this.props.trailIcon &&
                <div className="icon">
                    { this.props.trailIcon }
                </div>
            }
            </div>

        );
    }

    // - Methods    
    // * Edit methods
    onFocusInEvent()
    {
        this.setState({ focussed: true }); 

        if (this.props.onTextfieldFocus) { this.props.onTextfieldFocus(); }

    }

    onEditEvent(value: string)
    {
        if (this.props.onTextfieldEdit) { this.props.onTextfieldEdit(value); }
    }

    onChangedEvent(value: string)
    {
        if (value == "" && this.state.focussed == true) 
        {
            this.setState({ focussed: false });
        }

        if (this.props.onTextfieldChanged) { this.props.onTextfieldChanged(value); }
    }

    onCommitEvent(value : string)
    {
        if (this.props.onTextfieldCommit) { this.props.onTextfieldCommit(value); }
    }
}


export { Textfield, textfieldType }












