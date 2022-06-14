





import { QueryDocumentSnapshot, DocumentData, Timestamp } from "firebase/firestore";
import moment from "moment";
import { CartProduct } from "./product";


class Order
{

    id: string; 

    userID: string; 
    cart: Cart; 

    orderedTime : Timestamp | undefined; 

    constructor(snapshot: QueryDocumentSnapshot<DocumentData>)
    {
        this.id = snapshot.id; 
        this.userID = snapshot.data().user;

        this.orderedTime = snapshot.data().orderedTime ? snapshot.data().orderedTime : undefined; 
        
        const data = (snapshot.data().products as any[]).map((json) => JSON.parse(json)); 
        const items = data.map((cartData) => new CartProduct(cartData));

        this.cart = new Cart(snapshot.id, this.userID, items); 
    }

    getFormatedDate()
    {
        const date = moment(this.orderedTime.toDate()); 
        return date.fromNow(); 
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



