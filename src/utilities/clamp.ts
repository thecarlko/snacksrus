


function clamp(number: number, min: number, max: number)
{   
    if (isNaN(number)) { return min }
    return Math.max(min, Math.min(number, max));
}

export { clamp }


