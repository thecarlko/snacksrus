








import { UserProfile, User } from "firebase/auth";
import { QueryDocumentSnapshot, DocumentData, query, collection } from "firebase/firestore";
import { Network } from "../admin/network";




class Client 
{
    user: User; 


    constructor(user: User)
    {
        this.user = user; 
        
    }

}


export { Client }








