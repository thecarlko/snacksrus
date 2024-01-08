import { Category } from "@/models/category";
import { useRouter } from "next/navigation";
import { useMemo } from "react";


interface IPeacockProperties 
{
    focus: boolean; 
    category: Category;
}


function Peacock(props: IPeacockProperties)
{

    const router = useRouter();

    const classList = useMemo(() => 
    {
        const response = []; 
        response.push(`peacock`); 

        if (props.focus) { response.push(`selected`) }; 
        return response.join(` `);

    }, [props.focus]);

    return (

        <div
        onClick={ (event) => 
        {
            if ( (event.target as HTMLElement).tagName != `IMG` )  { return; }
            router.push(`/store/${ props.category.id }`);

        }}
        className={ classList }>
            <div className="tail">
                <div className="feather primary">{ <img src={ props.category.items[0].imageURL } alt="" /> }</div>
                <div className="feather secondary">{ <img src={ props.category.items[1].imageURL } alt="" /> }</div>
                <div className="feather tertiary">{ <img src={ props.category.items[2].imageURL } alt="" /> }</div>
            </div>

            <div className="dropshadow"></div>
        </div>
    )

}

export { Peacock }

