








import { UserProfile, User } from "firebase/auth";
import { QueryDocumentSnapshot, DocumentData, query, collection, DocumentSnapshot } from "firebase/firestore";
import { Network } from "../admin/network";




class Client 
{
    user: User; 

    cartID: string; 
    orders: string[]; 



    constructor(data: DocumentSnapshot<DocumentData>, user: User)
    {
        this.user = user; 

        this.cartID = data.data().cart; 
        this.orders = data.data().orders as string[]; 

        console.log(data.data()); 
        
    }

}


export { Client }








