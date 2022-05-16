



import * as React from "react"


interface INavBarProperties
{

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
                <div id="logo"><p>Logo</p></div>
            </nav>
        )
    }
}

export { NavBar }





