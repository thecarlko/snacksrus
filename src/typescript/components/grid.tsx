


import * as React from "react"





interface IGridProperties 
{
    /** Gap is in rem units */
    gap: { x: number; y: number }
    minItemWidth: number; 
    contentItems: React.ReactNode; 

    class?: string;

}


interface IGridStates 
{

}


class Grid extends React.Component<IGridProperties, IGridStates>
{


    constructor(props: IGridProperties)
    {
        super(props); 

        this.state = {  }
    }



    render(): React.ReactNode
    {
        return (

            <div className={ `grid${ this.props.class ? ` ${ this.props.class }` : `` }` } style=
            {{
                gridTemplateColumns:`repeat(auto-fill, minmax(${ this.props.minItemWidth }px, 1fr))`, 
                gap: `${ this.props.gap.x }rem ${ this.props.gap.y }rem`
            }}>
                { this.props.contentItems }
            </div>

        )
    }

}

export { Grid }











