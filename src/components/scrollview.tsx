





enum Axis
{
    horizontal = `horizontal`, 
    vertical = `vertical`, 
    both = `horizontal vertical`
}


interface IScrollviewProperties
{
    axes : Axis, 
    id?: string, 
    classes?: string,
    content: React.ReactNode
}


function Scrollview({ id, axes, classes, content }: IScrollviewProperties) {
    return(
        <div id={ (id) ? id : `` } className={`scrollview ${ axes}${(classes) ? ` ${ classes}` : ``}`}>
        <div className="viewport">
        <div className="content">
            { content }
        </div>
        </div>
        </div>
    )
}



export { Axis, Scrollview }




