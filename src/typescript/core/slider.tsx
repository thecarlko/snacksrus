


import * as React from "react";



interface ISliderProperties
{

}

interface ISliderStates 
{

}

class Slider extends React.Component<ISliderProperties, ISliderStates>
{
    constructor(props: ISliderProperties)
    {
        super(props); 

        this.state = 
        {
             
        }
    }

    render(): React.ReactNode 
    {
        return(
            <p>Hello world</p>
        )
    }
}

export { Slider }






