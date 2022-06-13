




import { FirebaseApp, initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getTokenSourceMapRange } from "typescript";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { Order } from "../models/order";

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

const firebaseApp = initializeApp(firebaseConfiguration); 
const database = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export const authentication = getAuth(firebaseApp); 


class Network 
{


    constructor()
    {

    }

    // #region Fetch Categories 
    static async fetchCategories()
    {
        let responce : Category[] = undefined; 
        const categoryCollection = collection(database, `store`);

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

        const productCollection = collection(database, `store`, `${ categoryID }`, `items`);
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
    static async getProductImageLink(productID: string, categoryID)
    {
        let responce : string = undefined; 

        const imageReference = ref(storage, `products/${ productID }.png`);
        responce = await getDownloadURL(imageReference);

        const documentReference = doc(database, `store`, categoryID, `items`, productID); 

        setDoc(documentReference, 
        {
            imageURL: responce

        }, { merge: true }); 


        if (!responce) { console.error(`Couldn't get download url for image: ${ productID }`); return; }
        return responce; 
    }
    // #endregion


    //  ^ Authentication Flow
    // #region Create Cart 
    static async createCartForUser(userID: string)
    {
        await addDoc(collection(database, `orders`), 
        {
            user: userID
        })
        .then((order) => 
        {
            const documentReference = doc(database, `clients`, userID); 
            return setDoc(documentReference, 
            {
                cart: order.id
            }, { merge: true })
        })
    }
    // #endregion

    // #region Fetch Client Deliveries
    static async fetchClientDeliveries(clientID: string) : Promise<Order[]>
    {
        const deliveryQuery = query(collection(database, `orders`), where(`user`, `==`, clientID), where(`delivered`, "==", false));
        const snapshot = await getDocs(deliveryQuery);

        const orders = snapshot.docs.map((orderSnapshot) => new Order(orderSnapshot)); 
        return orders; 
    }
    // #endregion

    // #region Fetch Purchases
    static async fetchPurchases(clientID: string) : Promise<Order[]>
    {
        const deliveryQuery = query(collection(database, `orders`), where(`user`, `==`, clientID), where(`delivered`, "==", true));
        const snapshot = await getDocs(deliveryQuery);

        const orders = snapshot.docs.map((orderSnapshot) => new Order(orderSnapshot)); 
        return orders; 
    }
    // #endregion

    // #region Sign out
    static async signClientOut()
    {
        authentication.signOut(); 
    }
    // #endregion


}




export { Network }











