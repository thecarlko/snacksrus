











import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";




class Product 
{
    id: string; 


    constructor(snapshot: QueryDocumentSnapshot<DocumentData>)
    {
        this.id = snapshot.id; 

        console.log(snapshot.data()); 
        // this.name = snapshot.data().name; 
    }

}


export { Product }








