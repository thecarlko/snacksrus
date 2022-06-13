





import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";


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


export { Order }



