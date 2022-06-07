











import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Network } from "../admin/network";
import { Color } from "../core/color";




class Product 
{
    id: string; 

    title: string; 
    name: string; 
    categoryName: string; 

    price: number; 
    stock: number; 

    imageURL: string | undefined; 
    color: Color; 



    constructor(snapshot: QueryDocumentSnapshot<DocumentData>)
    {
        this.id = snapshot.id; 

        const data = snapshot.data(); 

        this.title = data.title;
        this.name = data.name; 
        this.categoryName = data.category; 

        this.price = data.price; 
        this.stock = data.stock; 

    }

    async getImageURL()
    {
        this.imageURL = await Network.getProductImageLink(this.id); 
    }

    

}


export { Product }









