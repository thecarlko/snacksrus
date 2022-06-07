












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
        for (const cat of values)
        {
            await cat.setProducts();    

        }

        setCategories(values); 

    }, []); 
    // #endregion


    return (
        <main id="home">
            <Descriptor />
            <HomeShowcase categories={ categories } />
            <HomeFooter />
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

// #region Showcase 
interface IHomeShowcaseProperties 
{
    categories: Category[]; 
}


function HomeShowcase(props: IHomeShowcaseProperties) 
{

    const [focusIndex, setFocusIndex] = React.useState<number>(0); 


    return (

        <Scrollview axes={ Axis.horizontal } content=
        {
            (props.categories) && 
            (props.categories.map((cat, catIndex) => 
            
            <Peacock category={ cat } key={ catIndex } focus={ focusIndex === catIndex } />
                
            ))

        }/>

    )
}
// #endregion

// #region Footer 
function HomeFooter()
{
    return (
    
    <footer>

        <div className="trailer-leading">
            <div className="location-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.5 10.3178C3.5 5.71789 7.34388 2 11.9934 2C16.6561 2 20.5 5.71789 20.5 10.3178C20.5 12.6357 19.657 14.7876 18.2695 16.6116C16.7388 18.6235 14.8522 20.3765 12.7285 21.7524C12.2425 22.0704 11.8039 22.0944 11.2704 21.7524C9.13474 20.3765 7.24809 18.6235 5.7305 16.6116C4.34198 14.7876 3.5 12.6357 3.5 10.3178ZM9.19423 10.5768C9.19423 12.1177 10.4517 13.3297 11.9934 13.3297C13.5362 13.3297 14.8058 12.1177 14.8058 10.5768C14.8058 9.0478 13.5362 7.77683 11.9934 7.77683C10.4517 7.77683 9.19423 9.0478 9.19423 10.5768Z"></path>
            </svg>                                      
            </div>

            <p>Tag line ...</p>

        </div>

        <div className="trailer-mid">
            <button className="left-page">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.57 5.93005L3.5 12.0001L9.57 18.0701" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M20.5 12H3.66998" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>                    
            </button>

            <p>&prcue; swipe &sccue;</p>


            <button className="right-page">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.43 5.93005L20.5 12.0001L14.43 18.0701" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3.5 12H20.33" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>                    
            </button>
        </div>

        <div className="trailer-trailing">
            <p>2022 &copy;</p>
        </div>

    </footer>
    )
}
// #endregion


export { Home }






