












import * as React from "react"



interface IPagigationProperties 
{
    id? : string; 

    count: number; 
    focusIndex: number; 
}



function Pagigation(props: IPagigationProperties)
{

    const dummyArray = React.useMemo<number[]>(() => 
    {
        const item = []; 
        for (let index = 0; index < props.count; index++)
        {
            item.push(1); 
        }

        return item; 

    }, [props.count]); 


    return (

    <div id={ ``} className="pagigation">
    {
        (dummyArray.map((_, index) => <div key={ index } className={ `ellipse${ (props.focusIndex == index) ? ` selected` : ``}` }></div>))
    }
    </div>

    )

}



export {  Pagigation }











