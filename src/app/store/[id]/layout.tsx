
"use client";

import "@/styles/store.css"
import { Chip } from "@/components/chip";
import { Scrollview, Axis } from "@/components/scrollview";
import { Network } from "@/functions/network";
import { Category } from "@/models/category";
import { getIDfromURL } from "@/utilities/getId";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useMemo, useState } from "react";

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

export default function StoreLayout({ children }: { children: React.ReactNode }) {

    const router = useRouter(); 
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        (async () => {
            const { categories } = await fetchCategories();
            setCategories(categories);
        })();
    }, [])


    // #region Index
    const index = useMemo(() => 
    {
        if (!categories) { return 0; };

        const id = getIDfromURL(window.location.pathname); 

        const value = categories.findIndex((cat: Category) => cat.id === id); 
        return value; 

    }, [categories]); 
    // #endregion


    return (
        <Scrollview id="store" axes={ Axis.vertical } content=
        {
        <>

            <div id="display-tag">
                <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h1>
            </div>


            <Scrollview id="categories-chips" axes={ Axis.horizontal } content=
            {
                (categories.map((category, categoryIndex) => 
        
                <Chip
                    onClick={ () => 
                    {
                        router.push(`/store/${ category.id }`);
                    }}
                    key={ categoryIndex }
                    label={ category.name }
                    selected={ index === categoryIndex }
                    
                />

                ))
            }/>

            { (categories) && 
            <div id="store-items">
            {


                (categories.map((cat, catIndex) => 
                <React.Fragment key={ catIndex }>
                {
                    (cat.items.map((prod, prodIndex) => 


                        <Link
                        href={ `/${ prod.categoryName.toLocaleLowerCase() }/${ prod.id }` }
                        key={ prodIndex }
                        className={ `product${ (categories[index].id === prod.categoryName.toLocaleLowerCase()) ? ` active` : `` }` }
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