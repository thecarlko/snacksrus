




import * as React from "react";


enum scrollDirection 
{
    horizontal = "horizontal", 
    vertical = "vertical", 
    all = "horizontal vertical"
}

interface scrollviewProps
{
    id?: string, 
    classes?: string, 

    direction: scrollDirection,
    content: JSX.Element; 
}

 
/*
    - Clean typescript supported scrollview element
    - Lets user scroll the page in either or all 2d orientations
*/
class Scrollview extends React.Component<scrollviewProps>
{

    constructor(props : scrollviewProps)
    {
        super(props); 
    }

    render(): React.ReactNode
    {
        return(
            <div id={ this.props.id } className={`scrollview ${this.props.direction} ${(this.props.classes ? this.props.classes : ``)}`}>
            <div className="viewport">
            <div className="content">
                { this.props.content }
            </div>
            </div>
            </div>
        )
    }
}



export { Scrollview, scrollDirection }




