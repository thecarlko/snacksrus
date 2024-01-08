




import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
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

const App = initializeApp(firebaseConfiguration); 
const database = getFirestore(App);
const storage = getStorage(App);


class Network 
{
    constructor()
    {

    }

    // #region Fetch Categories 
    static async fetchCategories()
    {
        let response : Category[] = []; 
        const categoryCollection = collection(database, `store`);

        await getDocs(categoryCollection)
        .then((snapshot) =>
        {
            response = (snapshot.docs).map((category) => { return new Category(category) });
        })
        .catch((error) => { console.error(`Error fetching categories: ${ error }`) });

        if (!response) { console.error(`Couldn't fetch categories`); return []; }
        return response; 
    }
    // #endregion

    // #region Fetch Category Products 
    static async fetchCategoryProducts(categoryID: string)
    {
        let response : Product[] = [];

        const productCollection = collection(database, `store`, `${ categoryID }`, `items`);
        await getDocs(productCollection)
        .then((snapshot) =>
        {
            // Mapping the response to the snapshots's documents
            response = snapshot.docs.map((productSnapshot) => { return new Product(productSnapshot) });
        })
        .catch((error) => { `Error fetching category products: ${ error }` });


        if (response.length === 0) { console.error(`Couldn't fetch products for ${ categoryID }`); return [];  }
        return response; 
    }
    // #endregion

    // #region Get Product Image Link
    static async getProductImageLink(productID: string, categoryID: string)
    {
        let response : string = ""; 

        const imageReference = ref(storage, `products/${ productID }.png`);
        response = await getDownloadURL(imageReference);

        const documentReference = doc(database, `store`, categoryID, `items`, productID); 

        setDoc(documentReference, 
        {
            imageURL: response

        }, { merge: true }); 


        if (!response) { console.error(`Couldn't get download url for image: ${ productID }`); return ""; }
        return response; 
    }
    // #endregion



}




export { Network }











