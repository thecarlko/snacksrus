




import * as React from "react";


interface IScopeProperties
{

}

interface IScopeStates 
{

}

class Scope extends React.Component<IScopeProperties, IScopeStates>
{
    constructor(props: IScopeProperties)
    {
        super(props); 

        this.state = 
        {
             
        }
    }

    render(): React.ReactNode 
    {
        return(
            <p>Scope</p>
        )
    }
}

export { Scope }



