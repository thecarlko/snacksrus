





import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as React from "react"
import { Link } from "react-router-dom";
import { convertToObject } from "typescript";
import { authentication, Network, storage } from "../../admin/network";
import { Chip } from "../../components/chip";
import { Grid } from "../../components/grid";
import { Region } from "../../components/region";
import { Axis, Scrollview } from "../../components/scrollview"
import { Textfield, textfieldType } from "../../components/textfield";
import { Client } from "../../models/client"
import { Order } from "../../models/order";



// #region Profile 
interface IProfilePageProperties 
{
    client: Client; 
    setModal: React.Dispatch<React.SetStateAction<boolean>>; 
    setAppClient: React.Dispatch<React.SetStateAction<Client>>;
}

function Profile(props: IProfilePageProperties)
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [name, setName] = React.useState(undefined); 

    const [email, setEmailText] = React.useState(""); 
    const [emailError, setEmailError] = React.useState(undefined); 

    const [password, setPasswordText] = React.useState(""); 
    const [hidePassword, setHidePassword] = React.useState(true); 
    const [passwordError, setPasswordError] = React.useState(undefined); 


    const [showAuthentication, setShowAuthentication] = React.useState(false); 

    const [pendingOrders, setPendingOrders] = React.useState<Order[]>([]); 

    React.useEffect(() => 
    {
        fetchPending(); 

    }, [props.client]); 



    // #region Fetch Data
    const fetchPending  = React.useCallback(async () => 
    {
        if (!props.client) { return; }

        const values = await Network.fetchClientDeliveries(props.client.user.uid); 
        setPendingOrders(values); 

    }, [props.client]); 
    // #endregion

    // #region Authenticate User
    const formApproved = React.useMemo<boolean>(() => 
    {
        if (!props.client || props.client.user === undefined) { return false }

        const emailApproved = emailRegex.test(email); 
        const passwordApproved = password.length > 6; 

        const changed = (email !== props.client.user.email);

        return (emailApproved === true && passwordApproved === true && changed);

    }, [email, password, props.client]); 




    const handleAuthentication = React.useCallback(async () => 
    {
        if (!props.client) { return }
        const anonymous = props.client.user.isAnonymous; 

        // #region Anonymous
        if (anonymous)
        { 
            const user = await Network.createAccountEmailPassword(email, password);

            const client = await Network.fetchClient(user); 
            props.setAppClient(client); 

            setTimeout(() => {

                setShowAuthentication(false);
                props.setModal(false);

            }, 500);

            return; 
        }
        // #endregion

        try 
        {
            updateEmail(authentication.currentUser, email); 
            updatePassword(authentication.currentUser, password); 

        } catch (error) { console.log(`Error updating user: ${ error }`) }


    }, [props.client, email, password]);
    // #endregion

    // #region Set Profile Picture
    const setProfilePicture = React.useCallback(async (file: File) => 
    {
        const profilePictureReference = ref(storage, `profiles/${ authentication.currentUser.uid }`);
        const uploadSnapshot = await uploadBytes(profilePictureReference, file); 

        const url = await getDownloadURL(uploadSnapshot.ref); 
    
        await updateProfile(authentication.currentUser, { photoURL: url })

        const client = await Network.fetchClient(authentication.currentUser); 
        props.setModal(false); 
        props.setAppClient(client); 

    }, []); 
    // #endregion

    // #region Component
    return (
    <Scrollview id="profile" axes={ Axis.vertical } content=
    {
    <>
        <div className="header">

            <label className="profile" htmlFor="pfp">
            <ProfileAvatar clientInfo={ props.client } />
            </label>

            <input
                type="file"
                style={{ display: "none" }}
                id="pfp"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => 
                {
                    setProfilePicture(event.target.files[0]); 
                }}
            ></input>

            <div className="info">
                <Textfield
                    readOnly
                    type={ textfieldType.text }
                    initialValue={ props.client?.user.isAnonymous ? "Anonymous" : `Unnamed` }
                    placeholder=""
                    setValue={ setName }
                />

                <Chip
                    label={ (props.client?.user.isAnonymous) ? `Create account` : `Edit account`}
                    selected={ false }
                    onClick={ () => 
                    {
                        setShowAuthentication((value) => !value); 
                    }}
                />
            </div>
        </div>

        {
            showAuthentication &&
            <div id="authentication">
            <Grid gap={{ x: 1, y: 0.5 }} minItemWidth={ 300 } contentItems=
            {
                <>
                <Textfield
                error={ emailError }
                leadIcon={ 
                    <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3939 12.5C15.3939 11.5999 15.0364 10.7366 14.3999 10.1001C13.7634 9.46365 12.9001 9.10607 12 9.10607C11.0999 9.10607 10.2366 9.46365 9.60012 10.1001C8.96363 10.7366 8.60606 11.5999 8.60606 12.5C8.60606 13.4001 8.96363 14.2634 9.60012 14.8999C10.2366 15.5364 11.0999 15.8939 12 15.8939C12.9001 15.8939 13.7634 15.5364 14.3999 14.8999C15.0364 14.2634 15.3939 13.4001 15.3939 12.5ZM15.3939 12.5V13.7727C15.3939 14.3353 15.6174 14.8749 16.0152 15.2727C16.413 15.6705 16.9526 15.8939 17.5151 15.8939C18.0777 15.8939 18.6173 15.6705 19.0151 15.2727C19.4129 14.8749 19.6364 14.3353 19.6364 13.7727V12.5C19.6364 10.9897 19.1885 9.51327 18.3494 8.25748C17.5103 7.00168 16.3177 6.02291 14.9223 5.44493C13.5269 4.86696 11.9915 4.71573 10.5102 5.01038C9.02891 5.30503 7.66824 6.03232 6.60027 7.10029C5.53231 8.16825 4.80502 9.52892 4.51037 11.0102C4.21572 12.4915 4.36694 14.027 4.94492 15.4223C5.5229 16.8177 6.50167 18.0103 7.75746 18.8494C9.01326 19.6885 10.4897 20.1364 12 20.1364C13.3408 20.1377 14.658 19.7852 15.8182 19.1131" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
                type={ textfieldType.email }
                placeholder="Set email address"
                class="border"
                auditor={ (email: string) => 
                {
                    const passed = emailRegex.test(email);
                    setEmailError(passed ? undefined : `Please enter a valid email address`); 

                    return passed; 
                }}
                setValue={ setEmailText }
                />

                {
                
                props.client.user.isAnonymous && 
                <Textfield
                leadIcon={
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.4917 14.4416C16.775 16.1499 14.3167 16.6749 12.1584 15.9999L8.23337 19.9166C7.95004 20.2083 7.39171 20.3833 6.99171 20.3249L5.17504 20.0749C4.57504 19.9916 4.01671 19.4249 3.92504 18.8249L3.67504 17.0083C3.61671 16.6083 3.80837 16.0499 4.08337 15.7666L8.00004 11.8499C7.33337 9.68327 7.85004 7.22494 9.56671 5.5166C12.025 3.05827 16.0167 3.05827 18.4834 5.5166C20.95 7.97494 20.95 11.9833 18.4917 14.4416Z" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.7417 16.575L9.65837 18.4916" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14.0833 11.1666C14.7737 11.1666 15.3333 10.607 15.3333 9.91663C15.3333 9.22627 14.7737 8.66663 14.0833 8.66663C13.393 8.66663 12.8333 9.22627 12.8333 9.91663C12.8333 10.607 13.393 11.1666 14.0833 11.1666Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
                type={ (hidePassword === true) ? textfieldType.password : textfieldType.text }
                placeholder="Set password"
                class="border"
                setValue={ setPasswordText }
                error={ passwordError }
                auditor={(password) => 
                {
                    const passed = password.length > 6;
                    setPasswordError(passed ? undefined : `Password must be at least 6 charachters long`);

                    return passed; 
                }}
                trailIcon=
                {
                    (hidePassword == true) ? 
                    <div
                    onClick={() => 
                    {
                        setHidePassword((val) => !val)
                    }}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>

                    : 

                    <div
                    onClick={ () => 
                    {
                        setHidePassword((val) => !val); 
                    }}
                    >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.53 9.47004L9.47004 14.53C8.82004 13.88 8.42004 12.99 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C12.99 8.42004 13.88 8.82004 14.53 9.47004Z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.82 5.76998C16.07 4.44998 14.07 3.72998 12 3.72998C8.46997 3.72998 5.17997 5.80998 2.88997 9.40998C1.98997 10.82 1.98997 13.19 2.88997 14.6C3.67997 15.84 4.59997 16.91 5.59997 17.77" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.42004 19.5301C9.56004 20.0101 10.77 20.2701 12 20.2701C15.53 20.2701 18.82 18.1901 21.11 14.5901C22.01 13.1801 22.01 10.8101 21.11 9.40005C20.78 8.88005 20.42 8.39005 20.05 7.93005" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.47 14.53L2 22" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 2L14.53 9.47" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>

                }
                /> }
        
            </>
            }/>

            <div className="confirm">
            <button
            disabled={ !formApproved }
            onClick={ () => { handleAuthentication() }}
            >Confirm changes</button>
            </div>

            </div>
        }

        {
            (pendingOrders.length > 0) ? 
            <Region articleID="deliveries" header="Purchases" content=
            {
                
                (pendingOrders.sort((a, b) => b.orderedTime.toDate().getTime() - a.orderedTime.toDate().getTime()).map((order, pndIndex) => 
                <div key={ pndIndex } className="delivery">

                    <Scrollview axes={ Axis.horizontal } content=
                    {
                        (order.cart.products.map((product, productIndex) => 

                            <div key={ productIndex } className="image">
                                <img src={ product.imageURL } alt="" />
                            </div>
                        ))
                    }/>

                    <div className="info">
                        <p className="truncated">{ order.getFormatedDate() }</p>
                        <p className="small truncated">{ order.cart.products.length } items</p>
                    </div>

                </div>
                ))

            }/> 
        
            :

            <div className="empty-state">
                <h2>You have no purchases</h2>

                <div className="illustration">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="896" height="747.97143" viewBox="0 0 896 747.97143" xmlnsXlink="http://www.w3.org/1999/xlink"><title>empty_cart</title><path d="M193.634,788.75225c12.42842,23.049,38.806,32.9435,38.806,32.9435s6.22712-27.47543-6.2013-50.52448-38.806-32.9435-38.806-32.9435S181.20559,765.7032,193.634,788.75225Z" transform="translate(-152 -76.01429)" fill="#2f2e41"/><path d="M202.17653,781.16927c22.43841,13.49969,31.08016,40.3138,31.08016,40.3138s-27.73812,4.92679-50.17653-8.57291S152,772.59636,152,772.59636,179.73811,767.66958,202.17653,781.16927Z" transform="translate(-152 -76.01429)" fill="#fddd48"/><rect x="413.2485" y="35.90779" width="140" height="2" fill="#f2f2f2"/><rect x="513.2485" y="37.40779" width="2" height="18.5" fill="#f2f2f2"/><rect x="452.2485" y="37.40779" width="2" height="18.5" fill="#f2f2f2"/><rect x="484.2485" y="131.90779" width="140" height="2" fill="#f2f2f2"/><rect x="522.2485" y="113.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="583.2485" y="113.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="670.2485" y="176.90779" width="140" height="2" fill="#f2f2f2"/><rect x="708.2485" y="158.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="769.2485" y="158.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="656.2485" y="640.90779" width="140" height="2" fill="#f2f2f2"/><rect x="694.2485" y="622.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="755.2485" y="622.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="417.2485" y="319.90779" width="140" height="2" fill="#f2f2f2"/><rect x="455.2485" y="301.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="516.2485" y="301.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="461.2485" y="560.90779" width="140" height="2" fill="#f2f2f2"/><rect x="499.2485" y="542.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="560.2485" y="542.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="685.2485" y="487.90779" width="140" height="2" fill="#f2f2f2"/><rect x="723.2485" y="469.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="784.2485" y="469.90779" width="2" height="18.5" fill="#f2f2f2"/><polygon points="362.06 702.184 125.274 702.184 125.274 700.481 360.356 700.481 360.356 617.861 145.18 617.861 134.727 596.084 136.263 595.347 146.252 616.157 362.06 616.157 362.06 702.184" fill="#2f2e41"/><circle cx="156.78851" cy="726.03301" r="17.88673" fill="#3f3d56"/><circle cx="333.10053" cy="726.03301" r="17.88673" fill="#3f3d56"/><circle cx="540.92726" cy="346.153" r="11.07274" fill="#3f3d56"/><path d="M539.38538,665.76747H273.23673L215.64844,477.531H598.69256l-.34852,1.10753Zm-264.8885-1.7035H538.136l58.23417-184.82951H217.95082Z" transform="translate(-152 -76.01429)" fill="#2f2e41"/><polygon points="366.61 579.958 132.842 579.958 82.26 413.015 418.701 413.015 418.395 413.998 366.61 579.958" fill="#f2f2f2"/><polygon points="451.465 384.7 449.818 384.263 461.059 341.894 526.448 341.894 526.448 343.598 462.37 343.598 451.465 384.7" fill="#2f2e41"/><rect x="82.2584" y="458.58385" width="345.2931" height="1.7035" fill="#2f2e41"/><rect x="101.45894" y="521.34377" width="306.31852" height="1.7035" fill="#2f2e41"/><rect x="254.31376" y="402.36843" width="1.7035" height="186.53301" fill="#2f2e41"/><rect x="385.55745" y="570.79732" width="186.92877" height="1.70379" transform="translate(-274.73922 936.23495) rotate(-86.24919)" fill="#2f2e41"/><rect x="334.45728" y="478.18483" width="1.70379" height="186.92877" transform="translate(-188.46866 -52.99638) rotate(-3.729)" fill="#2f2e41"/><rect y="745" width="896" height="2" fill="#2f2e41"/><path d="M747.41068,137.89028s14.61842,41.60627,5.62246,48.00724S783.39448,244.573,783.39448,244.573l47.22874-12.80193-25.86336-43.73993s-3.37348-43.73992-3.37348-50.14089S747.41068,137.89028,747.41068,137.89028Z" transform="translate(-152 -76.01429)" fill="#a0616a"/><path d="M747.41068,137.89028s14.61842,41.60627,5.62246,48.00724S783.39448,244.573,783.39448,244.573l47.22874-12.80193-25.86336-43.73993s-3.37348-43.73992-3.37348-50.14089S747.41068,137.89028,747.41068,137.89028Z" transform="translate(-152 -76.01429)" opacity="0.1"/><path d="M722.87364,434.46832s-4.26731,53.34138,0,81.07889,10.66828,104.5491,10.66828,104.5491,0,145.08854,23.4702,147.22219,40.53945,4.26731,42.6731-4.26731-10.66827-12.80193-4.26731-17.06924,8.53462-19.20289,0-36.27213,0-189.8953,0-189.8953l40.53945,108.81641s4.26731,89.61351,8.53462,102.41544-4.26731,36.27213,10.66827,38.40579,32.00483-10.66828,40.53945-14.93559-12.80193-4.26731-8.53462-6.401,17.06924-8.53462,12.80193-10.66828-8.53462-104.54909-8.53462-104.54909S879.69728,414.1986,864.7617,405.664s-24.537,6.16576-24.537,6.16576Z" transform="translate(-152 -76.01429)" fill="#2f2e41"/><path d="M761.27943,758.78388v17.06924s-19.20289,46.39942,0,46.39942,34.13848,4.8083,34.13848-1.59266V763.05119Z" transform="translate(-152 -76.01429)" fill="#2f2e41"/><path d="M887.16508,758.75358v17.06924s19.20289,46.39941,0,46.39941-34.13848,4.80831-34.13848-1.59266V763.02089Z" transform="translate(-152 -76.01429)" fill="#2f2e41"/><circle cx="625.28185" cy="54.4082" r="38.40579" fill="#a0616a"/><path d="M765.54674,201.89993s10.66828,32.00482,27.73752,25.60386l17.06924-6.401L840.22467,425.9337s-23.47021,34.13848-57.60869,12.80193S765.54674,201.89993,765.54674,201.89993Z" transform="translate(-152 -76.01429)" fill="#fddd48"/><path d="M795.41791,195.499l9.60145-20.26972s56.54186,26.67069,65.07648,35.20531,8.53462,21.33655,8.53462,21.33655l-14.93559,53.34137s4.26731,117.351,4.26731,121.61834,14.93559,27.73751,4.26731,19.20289-12.80193-17.06924-21.33655-4.26731-27.73751,27.73752-27.73751,27.73752Z" transform="translate(-152 -76.01429)" fill="#3f3d56"/><path d="M870.09584,349.12212l-6.401,59.74234s-38.40579,34.13848-29.87117,36.27214,12.80193-6.401,12.80193-6.401,14.93559,14.93559,23.47021,6.401S899.967,355.52309,899.967,355.52309Z" transform="translate(-152 -76.01429)" fill="#a0616a"/><path d="M778.1,76.14416c-8.51412-.30437-17.62549-.45493-24.80406,4.13321a36.31263,36.31263,0,0,0-8.5723,8.39153c-6.99153,8.83846-13.03253,19.95926-10.43553,30.92537l3.01633-1.1764a19.75086,19.75086,0,0,1-1.90515,8.46261c.42475-1.2351,1.84722.76151,1.4664,2.01085L733.543,139.792c5.46207-2.00239,12.25661,2.05189,13.08819,7.80969.37974-12.66123,1.6932-27.17965,11.964-34.59331,5.17951-3.73868,11.73465-4.88,18.04162-5.8935,5.81832-.935,11.91781-1.82659,17.49077.08886s10.31871,7.615,9.0553,13.37093c2.56964-.88518,5.44356.90566,6.71347,3.30856s1.33662,5.2375,1.37484,7.95506c2.73911,1.93583,5.85632-1.9082,6.97263-5.07112,2.62033-7.42434,4.94941-15.32739,3.53783-23.073s-7.72325-15.14773-15.59638-15.174a5.46676,5.46676,0,0,0,1.42176-3.84874l-6.48928-.5483a7.1723,7.1723,0,0,0,4.28575-2.25954C802.7981,84.73052,782.31323,76.29477,778.1,76.14416Z" transform="translate(-152 -76.01429)" fill="#2f2e41"/><path d="M776.215,189.098s-17.36929-17.02085-23.62023-15.97822S737.80923,189.098,737.80923,189.098s-51.20772,17.06924-49.07407,34.13848S714.339,323.51826,714.339,323.51826s19.2029,100.28179,2.13366,110.95006,81.07889,38.40579,83.21254,25.60386,6.401-140.82123,0-160.02412S776.215,189.098,776.215,189.098Z" transform="translate(-152 -76.01429)" fill="#3f3d56"/><path d="M850.89294,223.23648h26.38265S895.6997,304.31537,897.83335,312.85s6.401,49.07406,4.26731,49.07406-44.80675-8.53462-44.80675-2.13365Z" transform="translate(-152 -76.01429)" fill="#3f3d56"/><path d="M850,424.01429H749c-9.85608-45.34-10.67957-89.14649,0-131H850C833.70081,334.115,832.68225,377.62137,850,424.01429Z" transform="translate(-152 -76.01429)" fill="#f2f2f2"/><path d="M707.93806,368.325,737.80923,381.127s57.60868,8.53462,57.60868-14.93559-57.60868-10.66827-57.60868-10.66827L718.60505,349.383Z" transform="translate(-152 -76.01429)" fill="#a0616a"/><path d="M714.339,210.43455l-25.60386,6.401L669.53227,329.91923s-6.401,29.87117,4.26731,32.00482S714.339,381.127,714.339,381.127s4.26731-32.00483,12.80193-32.00483L705.8044,332.05288,718.60633,257.375Z" transform="translate(-152 -76.01429)" fill="#3f3d56"/><rect x="60.2485" y="352.90779" width="140" height="2" fill="#f2f2f2"/><rect x="98.2485" y="334.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="159.2485" y="334.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="109.2485" y="56.90779" width="140" height="2" fill="#f2f2f2"/><rect x="209.2485" y="58.40779" width="2" height="18.5" fill="#f2f2f2"/><rect x="148.2485" y="58.40779" width="2" height="18.5" fill="#f2f2f2"/><rect x="250.2485" y="253.90779" width="140" height="2" fill="#f2f2f2"/><rect x="350.2485" y="255.40779" width="2" height="18.5" fill="#f2f2f2"/><rect x="289.2485" y="255.40779" width="2" height="18.5" fill="#f2f2f2"/><rect x="12.2485" y="252.90779" width="140" height="2" fill="#f2f2f2"/><rect x="112.2485" y="254.40779" width="2" height="18.5" fill="#f2f2f2"/><rect x="51.2485" y="254.40779" width="2" height="18.5" fill="#f2f2f2"/><rect x="180.2485" y="152.90779" width="140" height="2" fill="#f2f2f2"/><rect x="218.2485" y="134.90779" width="2" height="18.5" fill="#f2f2f2"/><rect x="279.2485" y="134.90779" width="2" height="18.5" fill="#f2f2f2"/></svg>
                </div> 

                <Link 
                to={ `/store/` }
                children=
                {
                    <button
                    onClick={ () => 
                    {
                        props.setModal(false); 
                    }}
                    className="secondary">View store</button>
                }/>
            </div>
        }

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
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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









