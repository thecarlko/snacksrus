




import * as React from "react";






interface IDropdownProperties
{

}

interface IDropdownStates 
{

}

class Dropdown extends React.Component<IDropdownProperties, IDropdownStates>
{

    constructor(props: IDropdownProperties)
    {
        super(props); 

        this.state = 
        {
             
        }
    }

    render(): React.ReactNode 
    {
        return(
            <p>Dropdown</p>
        )
    }
}

export { Dropdown }


