




import { FirebaseApp, initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getTokenSourceMapRange } from "typescript";
import { Category } from "../models/category";
import { Product } from "../models/product";

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
const Storage = getStorage(FirebaseApp);


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

    // #region Fetch Category Products 
    static async fetchCategoryProducts(categoryID: string)
    {
        let responce : Product[];

        const productCollection = collection(Database, `store`, `${ categoryID }`, `items`);
        await getDocs(productCollection)
        .then((snapshot) =>
        {
            // Mapping the responce to the snapshots's documents
            responce = snapshot.docs.map((productSnapshot) => { return new Product(productSnapshot) });
        })
        .catch((error) => { `Error fetching category products: ${ error }` });


        if (!responce) { console.error(`Couldn't fetch products for ${ categoryID }`); return;  }
        return responce; 
    }
    // #endregion

    // #region Get Product Image Link
    static async getProductImageLink(productID: string)
    {
        let responce : string = undefined; 

        const imageReference = ref(Storage, `products/${ productID }.png`);
        responce = await getDownloadURL(imageReference);

        if (!responce) { console.error(`Couldn't get download url for image: ${ productID }`); return; }
        return responce; 
    }
    // #endregion

}


export { Network }











