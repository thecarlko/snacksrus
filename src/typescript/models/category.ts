




import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Network } from "../admin/network";
import { Product } from "./product";




class Category 
{
    id: string; 

    name: string;
    items: Product[];  

    constructor(snapshot: QueryDocumentSnapshot<DocumentData>)
    {
        this.id = snapshot.id; 

        // console.log(snapshot.data()); 
        this.name = snapshot.data().name; 
        this.items = []; 
    }


    async setProducts()
    {
        const values = await Network.fetchCategoryProducts(this.id); 

        for (const prod of values)
        {
            if (!prod.imageURL) { prod.getImageURL() }
        }

        this.items = values; 
    }

}


export { Category }







