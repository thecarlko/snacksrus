




import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Product } from "./product";
import { Network } from "@/functions/network";




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







