











import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Network } from "../admin/network";
import { Color } from "../core/color";



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

    }

}
// #endregion


// #region Cart Product
class CartProduct
{
    id: string; 

    imageURL: string; 

    quantity: number; 
    stock: number; 

    constructor(item: Product)
    {
        this.id = item.id; 

        this.imageURL = item.imageURL; 

        this.quantity = 0; 
        this.stock = item.stock; 
    }
}
// #endregion




export { Product, CartProduct }









