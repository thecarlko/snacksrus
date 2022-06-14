





import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { CartProduct } from "./product";


class Order
{

    id: string; 

    userID: string; 

    constructor(data: QueryDocumentSnapshot<DocumentData>)
    {
        this.id = data.id; 

        this.userID = data.data().data; 
    }
}

class Cart 
{
    id: string; 

    userID: string; 
    products: CartProduct[]; 

    constructor(id : string, userid : string, items: CartProduct[])
    {
        this.id = id; 

        this.userID = userid;  
        this.products = items; 
    }
}

export { Order, Cart }



