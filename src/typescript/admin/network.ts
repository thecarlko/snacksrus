




import { FirebaseApp, initializeApp } from "firebase/app";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, Timestamp, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getAuth, User } from "firebase/auth";
import { getTokenSourceMapRange } from "typescript";
import { Category } from "../models/category";
import { CartProduct, Product } from "../models/product";
import { Cart, Order } from "../models/order";
import { ADDRGETNETWORKPARAMS } from "dns";
import { Client } from "../models/client";
import { cli } from "webpack-dev-server";

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

        const categoryCollection = collection(database, `store`);

        const snapshot = await getDocs(categoryCollection); 
        const categories = snapshot.docs.map((catJSON) => new Category(catJSON));

        return categories; 
    }
    // #endregion

    // #region Fetch Category Products 
    static async fetchCategoryProducts(categoryID: string)
    {
        let responce : Product[];

        console.log(`fetching products for: ${ categoryID }`); 
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
        const deliveryQuery = query(collection(database, `orders`), where("orderedTime", "!=", null), where("user", "==", clientID));
        const snapshot = await getDocs(deliveryQuery);

        const orders = snapshot.docs.map((orderSnapshot) => new Order(orderSnapshot)); 
        return orders; 
    }
    // #endregion

    // #region Fetch Client Order
    static async fetchClientOrder(client: Client)
    {
        const orderReference = doc(database, `orders`, client.cartID);
        const object = await getDoc(orderReference); 

        return new Order(object); 
    }
    // #endregion

    // #region Fetch Client 
    static async fetchClient(user: User) : Promise<Client>
    {
        const document = doc(database, `clients`, user.uid);
        const data = await getDoc(document); 

        const responce = new Client(data, user); 
        return responce; 

    }
    // #endregion

    // #region Update Cart Data 
    static async updateCartData(orderID: string, products: CartProduct[])
    {
        const orderReference = doc(database, `orders`, orderID);
        const items = products.map((prod) => { return JSON.stringify(prod) });

        await setDoc(orderReference, 
        {
            products: items

        }, { merge: true }); 

    }
    // #endregion

    // #region Set Order for user
    static async confirmOrder(userID: string, order: Cart)
    {
        const orderReference = doc(database, `orders`, order.id);
        const orderTime = new Timestamp((Date.now() / 1000), 0); 

        await Network.updateCartData(order.id, order.products); 

        await setDoc(orderReference, 
        {
            orderedTime: orderTime,
            delivered: false 

        }, { merge: true }); 

        const documentReference = doc(database, `clients`, userID);
        await setDoc(documentReference, 
        {
            orders: arrayUnion(order.id)

        }, { merge: true });
        
        await Network.createCartForUser(userID);
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











