
"use client";

import Image from 'next/image'
import styles from './page.module.css'
import "@/styles/home.css";
import { Category } from '@/models/category';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pagination } from '@/components/pagination';
import { Peacock } from '@/components/peacock';
import { Network } from '@/functions/network';


const fetchCategories = async () => {

  const categories  = await Network.fetchCategories(); 
  const productPromises = categories.map((cat) => Network.fetchCategoryProducts(cat.id));
  const products = await Promise.all(productPromises);

  const mappedCategories = categories.map((cat, index) => {
    cat.items = products[index];
    return cat;
  });

  return {
    categories: mappedCategories
  }
}



export default function Home() {

  const [focusIndex, setFocusIndex] = useState(0); 
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
        const { categories } = await fetchCategories();
        setCategories(categories);
    })();
  }, [])


  return (
    <>
       <main id="home">
            <Descriptor />
            <HomeShowcase index={ focusIndex } setIndex={ setFocusIndex } categories={ categories } />
        </main>

        <HomeFooter index={focusIndex} setIndex={ setFocusIndex } catCount={ categories.length } />
    </>
  );
}


// #region Descriptor 
function Descriptor()
{
    return (
        <div id="descriptor">
            <h1 className="tagline">What are you craving?</h1>
            <p className="instructions">Tap to select</p>
        </div>
    )
}

// #endregion

// #region Showcase 
interface IHomeShowcaseProperties 
{
    index: number; 
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    categories: Category[]; 
}


function HomeShowcase(props: IHomeShowcaseProperties) 
{
    // #region Handle Window Paging
    const handleWindowPaging = useCallback((event: KeyboardEvent) => 
    {
        if (event.key == `ArrowLeft`)
        { 
            if (props.index == 0) { return; } props.setIndex( props.index - 1 ); 

        }
        else if ((event.key == `ArrowRight`))
        {
            if (props.index == props.categories.length - 1) { return; } props.setIndex( props.index + 1 ); 

        };
    }, [props.index]); 
    // #endregion

    const scrollThreshhold : number = 0.4; 
    let startTouch : React.TouchEvent<HTMLElement> | undefined = undefined; 
    let endTouch : React.TouchEvent<HTMLElement> | undefined = undefined; 

    let touchStartTimer : number = 0; 
    let touchEndTimer : number = 0;


    useEffect(() => 
    {
        window.addEventListener((`keydown`), handleWindowPaging);

        return () => 
        {
            window.removeEventListener('keydown', handleWindowPaging);
        }
        
    }, [props.index]); 

    return (

    <>

    <div
    onTouchStart={ (event) => 
    {

        startTouch = event;
        touchStartTimer = Date.now();
    }}
    onTouchEnd={ (event) => 
    {
        endTouch = event;
        touchEndTimer = Date.now();

        let distance = ((endTouch.changedTouches[0].pageX) - (startTouch!.changedTouches[0].pageX));
        let time = (touchEndTimer - touchStartTimer);
        let velocity = (distance / time);


        //Scroll Left
        if ((velocity > scrollThreshhold))
        {
            if (props.index == 0) { return; }
            props.setIndex((ind) => ind - 1); 
        }
        // Scroll Right
        else if ((velocity < -scrollThreshhold))
        {
            if (props.index == props.categories.length - 1) { return; }
            props.setIndex((ind) => ind + 1); 
        }

    }}
    className="scrollview horizontal">
    <div className="viewport">
    <div className="content" style={{ transform: `translateX(-${ 100 * props.index }vw)` }}>
    <>
    {
        (props.categories.map((cat, catIndex) => 

            <Peacock key={catIndex} category={cat} focus={ props.index === catIndex } />

        ))
    }
    </>
    </div>
    </div>
    </div>

    <div id="scrollview-inspector">
    {
        (props.categories[props.index]) &&
        <>
            <h1 className="category-name">{ props.categories[props.index].name }</h1>
            <Pagination count={ props.categories.length } focusIndex={ props.index } />
        </>
    }
    </div>

    
    </>  
    )
}
// #endregion



// #region Footer 
interface IFooterProperties 
{
    catCount: number; 
    index: number;

    setIndex: React.Dispatch<React.SetStateAction<number>>; 
}

function HomeFooter(props: IFooterProperties)
{
    return (
    
    <footer>

        <div className="trailer-leading">
            <div className="location-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.5 10.3178C3.5 5.71789 7.34388 2 11.9934 2C16.6561 2 20.5 5.71789 20.5 10.3178C20.5 12.6357 19.657 14.7876 18.2695 16.6116C16.7388 18.6235 14.8522 20.3765 12.7285 21.7524C12.2425 22.0704 11.8039 22.0944 11.2704 21.7524C9.13474 20.3765 7.24809 18.6235 5.7305 16.6116C4.34198 14.7876 3.5 12.6357 3.5 10.3178ZM9.19423 10.5768C9.19423 12.1177 10.4517 13.3297 11.9934 13.3297C13.5362 13.3297 14.8058 12.1177 14.8058 10.5768C14.8058 9.0478 13.5362 7.77683 11.9934 7.77683C10.4517 7.77683 9.19423 9.0478 9.19423 10.5768Z"></path>
            </svg>                                      
            </div>

            <p>Houston, TX</p>

        </div>

        <div className="trailer-mid">
            <button
            disabled={ props.index == 0 }
            onClick={ () => 
            {
                props.setIndex( props.index - 1 );
            }}
            className="left-page">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.57 5.93005L3.5 12.0001L9.57 18.0701" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M20.5 12H3.66998" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>                    
            </button>

            <p><>&#x0227C;&nbsp;</>scroll<>&nbsp;&#x0227D;</></p>


            <button
            disabled={ props.index == props.catCount - 1 }
            onClick={ () => 
            {
                props.setIndex( props.index + 1 );
            }}
            className="right-page">
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
