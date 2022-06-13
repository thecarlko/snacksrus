





import * as React from "react"
import { Network } from "../../admin/network";
import { Region } from "../../components/region";
import { Axis, Scrollview } from "../../components/scrollview"
import { Client } from "../../models/client"
import { Order } from "../../models/order";



// #region Profile 
interface IProfilePageProperties 
{
    client: Client; 
}

function Profile(props: IProfilePageProperties)
{

    const [pendingOrders, setPendingOrders] = React.useState<Order[]>([]); 
    const [purchaseOrders, setPurchaseOrders] = React.useState<Order[]>([]); 

    React.useEffect(() => 
    {
        fetchPending(); 
        fetchPurchased(); 

    }, [props.client]); 



    // #region Fetch Data
    const fetchPending  = React.useCallback(async () => 
    {
        if (!props.client) { return; }

        const values = await Network.fetchClientDeliveries(props.client.user.uid); 
        setPendingOrders(values); 

    }, [props.client]); 


    const fetchPurchased = React.useCallback(async () => 
    {
        if (!props.client) { return; }

        const values = await Network.fetchPurchases(props.client.user.uid); 
        setPurchaseOrders(values); 

    }, [props.client]); 
    // #endregion

    // #region Component
    return (
    <Scrollview id="profile" axes={ Axis.vertical } classes="sheet" content=
    {
    <>
        <div className="header">
            <ProfileAvatar clientInfo={ props.client } />

            <div className="info">
                <p className="subtitle">{ props.client?.user.displayName ? props.client?.user.displayName : `Unnamed` }</p>
                <p className="">{ props.client?.user.uid }</p>
            </div>
        </div>

        <Region header="Deliveries" content=
        {
            (pendingOrders) &&
            (pendingOrders.map((pnd, pndIndex) => 
            <div className="delivery">
                <p>{ pnd.id }</p>
            </div>
            ))
        }/>


        <Region header="Purchases" content=
        {
            (purchaseOrders) &&
            (purchaseOrders.map((purchase, purchaseIndex) => 
            <div className="delivery">
                <p>{ purchase.id }</p>
            </div>
            ))
        }/>

    </>
    }/>

    )
    // #endregion

}
// #endregion

// #region Profile 
interface IProfileAvatarProperties 
{
    clientInfo: Client
}

function ProfileAvatar(props: IProfileAvatarProperties)
{


    return ( 
        <div className="profile">
        {
            (props.clientInfo?.user?.photoURL) ? 
            <img src={ props.clientInfo.user.photoURL }></img>
            :
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9999 12C14.3011 12 16.1666 10.1345 16.1666 7.83329C16.1666 5.53211 14.3011 3.66663 11.9999 3.66663C9.69873 3.66663 7.83325 5.53211 7.83325 7.83329C7.83325 10.1345 9.69873 12 11.9999 12Z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.1582 20.3333C19.1582 17.1083 15.9499 14.5 11.9999 14.5C8.04988 14.5 4.84155 17.1083 4.84155 20.3333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        }
        </div>
    )

}
// #endregion

// #region Featured Order
interface IDeliveryProperties 
{

}


function Delivery(props: IDeliveryProperties)
{
    return (

    <div className="featured-order">

    </div>

    )
}
// #endregion

// #region Order 
interface IOrderProperties 
{

}

function Purchase(props: IOrderProperties)
{

}
// #endregion



export { Profile, ProfileAvatar }









