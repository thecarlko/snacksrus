import { useMemo } from "react";

interface IPaginationProperties 
{
    id? : string; 

    count: number; 
    focusIndex: number; 
}


function Pagination(props: IPaginationProperties)
{

    const dummyArray = useMemo<number[]>(() => 
    {
        const item = []; 
        for (let index = 0; index < props.count; index++)
        {
            item.push(1); 
        }

        return item; 

    }, [props.count]); 


    return (

    <div id={ ``} className="pagination">
    {
        (dummyArray.map((_, index) => <div key={ index } className={ `ellipse${ (props.focusIndex == index) ? ` selected` : ``}` }></div>))
    }
    </div>

    )

}

export {  Pagination }











