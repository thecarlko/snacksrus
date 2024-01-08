import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";


class User 
{
    id: string; 


    constructor(snapshot: QueryDocumentSnapshot<DocumentData>)
    {
        this.id = snapshot.id; 

        console.log(snapshot.data()); 
        // this.name = snapshot.data().name; 
    }

}


export { User }








