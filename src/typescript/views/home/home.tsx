import * as React from "react"
import { Chip } from "../../components/chip"
import { Dropdown } from "../../components/dropdown"
import { Scope } from "../../components/scope"
import { Axis, Scrollview } from "../../components/scrollview"
import { Slider } from "../../components/slider"
import { Stepper } from "../../components/stepper"
import { Textfield, textfieldType } from "../../components/textfield"



function Home() : JSX.Element
{
    return (
        <Scrollview axes={ Axis.vertical } content=
        {
        <>
            <Chip label={""} />
            <Dropdown />
            <Scope />
            <Slider />
            <Stepper value={ 50 } max={ 100 } />
            <Textfield type={ textfieldType.text } placeholder={ "Testing placeholder" } />
        </>
        } />
    )
}


export { Home }






