


import * as React from "react";



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
    leadIcon?: string, 
    trailIcon?: string, 

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
    focussed: boolean
}

class Textfield extends React.Component<ITextfieldProperties, ITextfieldStates>
{
    constructor(props: ITextfieldProperties)
    {
        super(props); 

        this.state = 
        {
            focussed: false
        }
    }

    render(): React.ReactNode 
    {
        return (


        <div className={`input-field ${(this.state.focussed) ? "focus" : ""}`} >
            <p className="placeholder">{ this.props.placeholder }</p>

            { (this.props.leadIcon) && <div className="icon lead">{ this.props.leadIcon }</div> }
            <input type={this.props.type}
                onFocus = {this.onFocusInEvent} 
                onChange = { (event) => { this.onEditEvent(event.target.value) }} 
                onBlur = { eve => { this.onChangedEvent(eve.target.value) }}
                onKeyUp = { (event) =>
                {
                    // Commit logic
                    if (event.key == "Enter") { this.onCommitEvent((event.target as HTMLInputElement).value) }
                }}

            />
            { (this.props.trailIcon) && <div className="icon trail">{ this.props.trailIcon }</div> }
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












