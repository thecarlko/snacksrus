





export { Color };

// #region Color 
// * Format

enum colorFormat
{
    rgb, 
    hex, 
    hsb
}

class HEX 
{
    code: string; 

    constructor(_code : string)
    {
        this.code = _code; 
    }
}


// *RGB
class RGB 
{ 
    red: number; 
    green: number; 
    blue: number; 

    constructor(_red : number, _green : number, _blue : number)
    {
        this.red = _red; 
        this.green = _green; 
        this.blue = _blue; 
    }
}

// * HSL
class HSL 
{
    hue: number; 
    saturation: number; 
    lightness: number; 

    constructor(_hue: number, _saturation: number, _lightness: number)
    {
        this.hue = _hue; 
        this.saturation = _saturation; 
        this.lightness = _lightness; 
    }
}

// ** Color Object
class Color 
{
    RGB : RGB = undefined; 
    HSL : HSL = undefined; 
    HEX : HEX = undefined; 

    constructor(_code: string)
    {
        this.HEX = new HEX(_code); 
        this.RGB = this.hexToRGB(this.HEX.code); 
    }

    hexToRGB(hex: string)
    {
        let r = `0`;
        let g = `0`;
        let b = `0`;

        // 3 digits
        if (hex.length == 4)
        {
            r = "0x" + hex[1] + hex[1];
            g = "0x" + hex[2] + hex[2];
            b = "0x" + hex[3] + hex[3];
            // 6 digits
        }

        else if (hex.length == 7)
        {
            r = "0x" + hex[1] + hex[2];
            g = "0x" + hex[3] + hex[4];
            b = "0x" + hex[5] + hex[6];
        }


        return new RGB(parseInt(r), parseInt(g), parseInt(b));
    }

    rgbToHSL(_rgb: RGB)
    {
        // Make r, g, and b fractions of 1
        let r = _rgb.red /= 255;
        let g = _rgb.green /= 255;
        let b = _rgb.blue /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
        
        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;
        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        // return "hsl(" + h + "," + s + "%," + l + "%)";
        return new HSL(h, s, l);
    }
}





