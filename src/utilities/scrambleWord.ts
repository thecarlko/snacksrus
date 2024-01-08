

import { randomInteger } from "./randomInt";

// #region Sramble word
/**
 * 
 * @param word The word to shuffle
 * @param shed Should the function shed the first and last letters
 * @returns String with the middle letters shuffled around
 * 
 * - Logic 
 * The word is split into a dummy array
 * A letter is sequencially plucked and added to a new array wit the word intact
 * 
 * 
 */
function scrambleWord(word: string, shed: boolean = false) : string
{
    const scrambled : string[] = []; 
    const value = word.slice(1, word.length - 1).split(``); // "Sheds" the first and last letters of the word so that only the middle letters can be scrambled

    while (value.length > 0)
    {
        const randomIndex = randomInteger(value.length);
        const letter = String(value.splice(randomIndex, 1)); // Cuts the random letter that matches the index from the value

        scrambled.push(letter); // Adds that letter to the shuffledArray
    }

    // IF the word is still the same, it is reversed to ensure a shuffle 
    const shuffled = (scrambled.join(``) == word.slice(1, word.length - 1)) ? scrambled.reverse().join(``) : scrambled.join(``);

    // Returns the first letter, the array of shuffled middle letters, and the last letter
    return (`${ word.charAt(0) }${ shuffled }${ word.charAt( word.length - 1 ) }`);
}
// #endregion



export { scrambleWord }

