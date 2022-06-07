












import * as React from "react"
import { Network } from "../../admin/network";
import { Axis, Scrollview } from "../../components/scrollview";
import { Category } from "../../models/category";
import { Peacock } from "./peacock";



interface IHomeProperties 
{

}



function Home()
{

    const [categories, setCategories] = React.useState<Category[]>([]); 



    React.useEffect(() => 
    {

        setupPage(); 

    }, []); 


    // #region Setup Page 
    const setupPage = React.useCallback( async () => 
    {

        const values  = await Network.fetchCategories(); 
        setCategories(values); 

    }, []); 
    // #endregion



    return (
        <main id="home">
            <Descriptor />
        </main>
    )
}


// #region Descriptor 
function Descriptor()
{
    return (

        <div id="descriptor">
            <h1 className="tagline">Pre-order for ...</h1>
            <p className="instructions">Tap to select</p>
        </div>


    )
}

// #endregion

// #endregion Showcase 
interface IHomeShowcaseProperties 
{
    categories: Category[]; 
}


function HomeShowcase(props: IHomeShowcaseProperties) 
{



    return (

        <Scrollview axes={ Axis.horizontal } content=
        {
            (props.categories) && 
            props.categories.map((cat, catIndex) => <Peacock key={ catIndex } category={ cat } />)

        }/>

    )
}
// #endregion




export { Home }






