



function getIDfromURL(url: string)
{
    const parts = url.split(`/`);
    return parts[parts.length - 1]; 
}


export  { getIDfromURL }



