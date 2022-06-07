




import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { Product } from "./product";




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

}


export { Category }







