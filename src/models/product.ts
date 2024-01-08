











import { Color } from "@/core/color";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";



// #region Product
class Product 
{
    id: string; 

    title: string; 
    name: string; 
    categoryName: string; 

    price: number; 
    stock: number; 

    imageURL: string; 
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

        this.imageURL = data.imageURL; 
        this.color = new Color("")

    }

    getImageURL() {
        return this.imageURL;
    }

}
// #endregion


// #region Cart Product
class CartProduct
{
    id: string; 

    title: string; 
    name: string; 

    imageURL: string; 

    quantity: number; 
    stock: number; 

    price: number; 

    constructor(item: Product)
    {
        this.id = item.id; 

        this.title = item.title; 
        this.name = item.name; 

        this.imageURL = item.imageURL; 

        this.quantity = 0; 
        this.stock = item.stock; 
        this.price = item.price; 
    }
}
// #endregion




export { Product, CartProduct }









