



import * as React from "react"
import { Link } from "react-router-dom"
import { Client } from "../../models/client";
import { Product } from "../../models/product";
import { modalPage } from "../app/app";
import { ProfileAvatar } from "../modal/profile";


interface INavBarProperties
{
    client: Client; 
    cartCount: number; 
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalPage: React.Dispatch<React.SetStateAction<modalPage>>;
}

interface INavBarStates 
{

}

class NavBar extends React.Component<INavBarProperties, INavBarStates>
{
    render(): React.ReactNode
    {
        return (
            <nav>
                <Logo backButton={ false } />

                <div className="trailing">
                    
                    <div
                    onClick={ () => 
                    {
                        this.props.setModal(true); 
                    }}
                    id="cart">
                    <div className="icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5425 5.5L6.375 8.67625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15.125 5.5L18.2925 8.67625" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M10.54 12.5V15.6062" strokeLinecap="round"></path>
                    <path d="M14.565 12.5V15.6062" strokeLinecap="round"></path>
                    <path d="M5.0625 9L6.29625 16.56C6.57625 18.2575 7.25 19.5 9.7525 19.5H15.0288C17.75 19.5 18.1525 18.31 18.4675 16.665L19.9375 9" strokeLinecap="round"></path>
                    <path d="M3.75 9H21.25" strokeLinecap="round"></path>
                    </svg>
                    </div>

                    <p id="cart-count">{ this.props.cartCount }</p>
                    </div>



                    <ProfileAvatar clientInfo={ this.props.client }/>
                </div>
            </nav>
        )
    }
}

// #region Logo
interface ILogoProperties 
{
    backButton: boolean; 
}

function Logo(props: ILogoProperties)
{
    return (
        <Link to={ `/` } className="leading" children=
        {
            (props.backButton) ?
            <>
                <div className="icon back" id="logo">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.5 12H3.67004" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>        
                </div>

                <div className="wordmark">
                    <p></p>
                    <p>Back</p>
                </div>
            </>

            : 

            <>
            <div className="icon" id="logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.65761 10.2419C7.77191 9.91936 8.22809 9.91936 8.34239 10.2419L8.65494 11.124C8.69152 11.2272 8.77275 11.3085 8.87601 11.3451L9.75807 11.6576C10.0806 11.7719 10.0806 12.2281 9.75807 12.3424L8.87601 12.6549C8.77275 12.6915 8.69152 12.7728 8.65494 12.876L8.34239 13.7581C8.22809 14.0806 7.77191 14.0806 7.65761 13.7581L7.34506 12.876C7.30848 12.7728 7.22725 12.6915 7.12399 12.6549L6.24193 12.3424C5.91936 12.2281 5.91936 11.7719 6.24193 11.6576L7.12399 11.3451C7.22725 11.3085 7.30848 11.2272 7.34506 11.124L7.65761 10.2419Z" fill="#363853"></path>
            <path d="M12.6576 15.2419C12.7719 14.9194 13.2281 14.9194 13.3424 15.2419L13.6549 16.124C13.6915 16.2272 13.7728 16.3085 13.876 16.3451L14.7581 16.6576C15.0806 16.7719 15.0806 17.2281 14.7581 17.3424L13.876 17.6549C13.7728 17.6915 13.6915 17.7728 13.6549 17.876L13.3424 18.7581C13.2281 19.0806 12.7719 19.0806 12.6576 18.7581L12.3451 17.876C12.3085 17.7728 12.2272 17.6915 12.124 17.6549L11.2419 17.3424C10.9194 17.2281 10.9194 16.7719 11.2419 16.6576L12.124 16.3451C12.2272 16.3085 12.3085 16.2272 12.3451 16.124L12.6576 15.2419Z" fill="#363853"></path>
            <path d="M13.9796 5.36772C14.1533 4.87743 14.8467 4.87743 15.0204 5.36772L15.6158 7.04814C15.6715 7.20508 15.7949 7.32855 15.9519 7.38415L17.6323 7.97958C18.1226 8.15331 18.1226 8.84669 17.6323 9.02042L15.9519 9.61585C15.7949 9.67146 15.6715 9.79492 15.6158 9.95186L15.0204 11.6323C14.8467 12.1226 14.1533 12.1226 13.9796 11.6323L13.3842 9.95186C13.3285 9.79492 13.2051 9.67146 13.0481 9.61585L11.3677 9.02042C10.8774 8.84669 10.8774 8.15331 11.3677 7.97958L13.0481 7.38415C13.2051 7.32855 13.3285 7.20508 13.3842 7.04814L13.9796 5.36772Z"></path>
            </svg>
            </div>

            <div className="wordmark">
                <p>Snacks</p>
                <p>R Us</p>
            </div>
            </>
        }/>
    )
}
// #endregion





export { NavBar }





