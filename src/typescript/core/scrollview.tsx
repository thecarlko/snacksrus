




import * as React from "react"


enum Axis
{
    horizontal = `horizontal`, 
    vertical = `vertical`, 
    both = `horizontal vertical`
}


interface IScrollviewProperties
{
    axes : Axis, 
    content: React.ReactNode
}

interface IScrollviewStates 
{

}

class Scrollview extends React.Component<IScrollviewProperties, IScrollviewStates>
{

    constructor(props: IScrollviewProperties)
    {
        super(props); 

        this.state = 
        {
             
        }
    }

    render(): React.ReactNode 
    {
        return(
            <div className={`scrollview ${this.props.axes}`}>
            <div className="viewport">
            <div className="content">
                { this.props.content }
            </div>
            </div>
            </div>
        )
    }
}



export { Axis, Scrollview }




