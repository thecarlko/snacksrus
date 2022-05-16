





// #region Phone formatter
function formatPhoneNumber(num: string)
{
    if (!num) return num;
    const phoneNumber = num.replace(/[^\d]/g, '');

    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
    )}-${phoneNumber.slice(6, 9)}`;
}
// #endregion

// #region Tel acceptable
function isKeyPhonenumberAcceptable(key: string)
{
    let acceptable = false; 

    switch (key)
    {
        case "Tab":
            acceptable = true; 
            break;

        case "Backspace":
            acceptable = true; 
            break;

        case "Enter":
            acceptable = true; 
            break;

        case "CapsLock":
            acceptable = true; 
            break;

        case "Shift":
            acceptable = true; 
            break;

        case "Control":
            acceptable = true; 
            break;
    }

    return acceptable; 
}
// #endregion

// #region Reverse phone fomratt
function reversePhoneNumberFormat(tel: string)
{
    return tel.replaceAll(` `, ``).replaceAll(`-`, ``).replaceAll(`(`, ``).replaceAll(`)`, ``);
}
// #endregion


export { formatPhoneNumber, isKeyPhonenumberAcceptable, reversePhoneNumberFormat }





