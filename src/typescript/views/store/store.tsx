







import * as React from "react"; 
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Chip } from "../../components/chip";
import { Axis, Scrollview } from "../../components/scrollview";
import { Category } from "../../models/category";
import { getIDfromURL } from "../../utilities/getId";


interface IStoreProperties 
{
    cats: Category[]; 
}



function Store(props: IStoreProperties) 
{

    const navigate = useNavigate(); 
    const location = useLocation(); 


    // #region Index
    const index = React.useMemo(() => 
    {
        if (!props.cats) { return 0; };

        const id = getIDfromURL(window.location.pathname); 

        const value = props.cats.findIndex((cat) => cat.id === id);
        if (value === -1) { return 0; }
        return value; 

    }, [location, props.cats]); 
    // #endregion


    return (


    <Scrollview id="store" axes={ Axis.vertical } content=
    {
    <>

        <div id="display-tag">
            <h1>Hoc est pro dulcis bonitas quae facit vitae pretium vitae</h1>
        </div>


        <Scrollview id="categories-chips" axes={ Axis.horizontal } content=
        {
            (props.cats.map((category, categoryIndex) => 
    
            <Chip
                onClick={ () => 
                {
                    navigate(`/store/${ category.id }`);
                }}
                key={ categoryIndex }
                label={ category.name }
                selected={ index === categoryIndex }
                
            />

            ))
        }/>

        { (props.cats) && 
        <div id="store-items">
        {


            (props.cats.map((cat, catIndex) => 
            <React.Fragment key={ catIndex }>
            {
                (cat.items.map((prod, prodIndex) => 
                
                <Link
                to={ `/${ prod.categoryName.toLocaleLowerCase() }/${ prod.id }` }
                key={ prodIndex }
                className={ `product${ (props.cats[index].id === prod.categoryName.toLocaleLowerCase()) ? ` active` : `` }` }
                children=
                {
                <>

                    <div className="image"><img src={ prod.imageURL }></img></div>

                    <p className="name">{ prod.name }</p>
                    <p className="price">${ prod.price.toFixed(2) }</p>

                </>
                }/>
                ))

            }
            </React.Fragment>
            ))
        }
        </div> }


    </>
    }/>
    




    )

}


export { Store }














