




import * as React from "react"


interface IRegionProperties 
{
    articleID?: string; 
    contentClass?: string; 

    header: string; 

    content: React.ReactNode; 
}


interface IRegionStates 
{

}



class Region extends React.Component<IRegionProperties, IRegionStates>
{



    constructor(props: IRegionProperties)
    {
        super(props); 
        this.state = {  }
    }

    render(): React.ReactNode
    {
        
        return (

            <article id={ this.props.articleID } className="region">
                <p className="subtitle">{ this.props.header }</p>

                <div className={ `content${ this.props.contentClass ? ` ${this.props.contentClass}` : `` }` }>
                { this.props.content }
                </div>
            </article>
        )
    }

}



export { Region }








