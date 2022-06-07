




import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Category } from "../models/category";

const firebaseConfiguration = 
{

    apiKey: "AIzaSyCg3afjNL7aRHkAGx34qnIngYEJ7T1BLO4",
    authDomain: "snacks-r-us.firebaseapp.com",
    projectId: "snacks-r-us",
    storageBucket: "snacks-r-us.appspot.com",
    messagingSenderId: "604427272720",
    appId: "1:604427272720:web:716ed23ad6c2d0c826c095",
    measurementId: "G-G9VYM9BZ89"
}

const FirebaseApp = initializeApp(firebaseConfiguration); 
const Database = getFirestore(FirebaseApp);


class Network 
{



    constructor()
    {

    }

    // #region Fetch Categories 
    static async fetchCategories()
    {
        let responce : Category[] = undefined; 
        const categoryCollection = collection(Database, `store`);

        await getDocs(categoryCollection)
        .then((snapshot) =>
        {
            responce = (snapshot.docs).map((category) => { return new Category(category) });
        })
        .catch((error) => { console.error(`Error fetching categories: ${ error }`) });

        if (!responce) { console.error(`Couldn't fetch categories`); return; }
        return responce; 
    }
    // #endregion

}


export { Network }













