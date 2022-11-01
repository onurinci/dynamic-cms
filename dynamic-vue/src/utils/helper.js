export const replaceChar = (val) => {
    if (!val) {
        return;
    }

    let charMap = {
        Ç: 'C',
        Ö: 'O',
        Ş: 'S',
        İ: 'I',
        I: 'i',
        Ü: 'U',
        Ğ: 'G',
        ç: 'c',
        ö: 'o',
        ş: 's',
        ı: 'i',
        ü: 'u',
        ğ: 'g'
    };

    let str_array = val.split('');


    for (let i = 0, len = str_array.length; i < len; i++) {
        str_array[i] = charMap[str_array[i]] || str_array[i];
    }

    val = str_array.join('');
    console.log(val);
    let clearStr = val.replaceAll(" ", "_").replaceAll("-", "");
    // .replaceAll(/[^a-z0-9-.çöşüğı]/gi, "")
    return clearStr.toLowerCase();
}
