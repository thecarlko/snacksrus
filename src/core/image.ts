









import { Color } from "./color";

export { ImageAsset } 


class ImageDominantColors
{
    light: Color | undefined; 
    dark: Color | undefined; 
    hue: Color | undefined; 

    constructor()
    {
        this.light = undefined;
        this.dark = undefined;
        this.hue = undefined;
    }

}



class ImageAsset 
{
    constructor()
    {

    }

    getDominantColors(): ImageDominantColors
    {
        return new ImageDominantColors(); 
    }

}









