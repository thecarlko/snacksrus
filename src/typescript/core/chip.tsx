





import * as React from "react";



interface chipElementProps
{
    label: string, 
    active? : boolean, 
    onClick?: () => void; 
}


class Chip extends React.Component<chipElementProps>
{
    constructor(props: chipElementProps)
    {
        super(props);
    }

    render()
    {
        return (
            <p className={ `chip ${(this.props.active) ? "active" : ""}` } onClick={ () => 
            {
                if (this.props.onClick) { this.onClickEvent();  }
            }}>
                {this.props.label}
            </p>
        )
    }

    onClickEvent()
    {
        if (this.props.onClick) { this.props.onClick();  }
    }

}

export { Chip, chipElementProps } 


