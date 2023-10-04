let input = 'pnfnbogfuswdpgalrbeaon';
let passkey = 'old tavern';
const gridChars = 'abcdefghijklmnopqrstuvwxyz0123465789';
let output = '';

//Removes duplicate characters from string.
const removeDuplicateCharacters = (string) => {
    return string
        .split('')
        .filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
        .join('');
}

//Does what it says. Cleans a string.
const stringCleaner = (string) => {
    string = string.toLowerCase().replace(/[^a-z0-9]/g, '');
    return string;
}

//inserts an insertString at a particular index in an originalString
const putStringInString = (insertString, indexNum, oString) => {
    let beginning = oString.slice(0, indexNum);
    let end = oString.slice(indexNum);
    let output = beginning + insertString + end;
    return output;
}

//To clean double characters
const noDoubleChars = (string) => {
    for (i = 0; i < string.length; i++) {
        if (string[i] === string[i + 1]) {
            return putStringInString('q', i + 1, string);
        };
    }
};


const encrypt = (plainText, keyPhrase) => {

    // Clean input
    plainText = noDoubleChars(plainText);
    plainText = stringCleaner(plainText);
    /*Cipher divides the input into pairs, so will not work with a string of odd number length*/
    if (plainText.length % 2 != 0) {
        plainText += 'z';
    };

    //Group characters into pairs for encoding
    let inputArray = [];
    for (let i = 0; i < plainText.length; i += 2) {
        let subArray = [plainText[i], plainText[i + 1]];
        inputArray.push(subArray);
    };

    //Clean passkey and generate characters for grid
    keyPhrase = stringCleaner(keyPhrase);
    keyPhrase = keyPhrase += gridChars;
    keyPhrase = removeDuplicateCharacters(keyPhrase);

    //Generates playfair grid
    let playfairArray = [];
    for (let i = 0; i < keyPhrase.length; i += 6) {
        let subArray = [keyPhrase[i], keyPhrase[i + 1], keyPhrase[i + 2], keyPhrase[i + 3], keyPhrase[i + 4], keyPhrase[i + 5]];
        playfairArray.push(subArray);
    }

    // this iterates through the playfairArray to set the playfair coordinates of each character in each input subarray
    const getCoord = (char) => {
        let row;
        let col;

        for (y = 0; y < playfairArray.length; y++) {
            for (x = 0; x < playfairArray[y].length; x++) {
                if (char === playfairArray[y][x]) {
                    row = y;
                    col = x;
                }
            }
        };
        return { row: row, col: col };
    };

    // need to find playfair coordinates of input character pairs stored in each input subarray, and manipulate them based on rules
    // outer loop iterates through input pairs
    inputArray.forEach(digram => {
        let char1 = digram[0];
        let char2 = digram[1];

        let coord1 = getCoord(char1);
        let coord2 = getCoord(char2);

        //now to manipulate those coordinates based on rules
        if (coord1.row == coord2.row) {
            coord1.col = (coord1.col + 1) % 6;
            coord2.col = (coord2.col + 1) % 6;
        } else if (coord1.col == coord2.col) {
            coord1.row = (coord1.row + 1) % 6;
            coord2.row = (coord2.row + 1) % 6;
        } else {
            let colDiff = Math.abs(coord1.col - coord2.col);
            if (coord1.col > coord2.col) {
                coord1.col = coord1.col - colDiff;
                coord2.col = coord2.col + colDiff;
            } else if (coord2.col > coord1.col) {
                coord2.col = coord2.col - colDiff;
                coord1.col = coord1.col + colDiff;
            } else return 'large error';
        };

        let newChar1 = playfairArray[coord1.row][coord1.col];
        let newChar2 = playfairArray[coord2.row][coord2.col];
        output += newChar1 + newChar2;
    });

    return output;

};

//decrypt function will decrypt any message encrypted with same rules as encrypt function
const decrypt = (plainText, keyPhrase) => {

    // Clean input (double chars allowed now)
    plainText = stringCleaner(plainText);
    /*Cipher divides the input into pairs, so will not work with a string of odd number length 
    (all previously encrypted messages should be even numbered length already)*/
    if (plainText.length % 2 != 0) {
        plainText += 'z';
    };

    //Group characters into pairs
    let inputArray = [];
    for (let i = 0; i < plainText.length; i += 2) {
        let subArray = [plainText[i], plainText[i + 1]];
        inputArray.push(subArray);
    };

    //Clean passkey and generate characters for grid
    keyPhrase = stringCleaner(keyPhrase);
    keyPhrase = keyPhrase += gridChars;
    keyPhrase = removeDuplicateCharacters(keyPhrase);

    //Generates playfair grid
    let playfairArray = [];
    for (let i = 0; i < keyPhrase.length; i += 6) {
        let subArray = [keyPhrase[i + 5], keyPhrase[i + 4], keyPhrase[i + 3], keyPhrase[i + 2], keyPhrase[i + 1], keyPhrase[i]];
        playfairArray.unshift(subArray);
    }

    // this iterates through the playfairArray to set the playfair coordinates of each character in each input subarray
    const getCoord = (char) => {
        let row;
        let col;

        for (y = 0; y < playfairArray.length; y++) {
            for (x = 0; x < playfairArray[y].length; x++) {
                if (char === playfairArray[y][x]) {
                    row = y;
                    col = x;
                }
            }
        };
        return { row: row, col: col };
    };

    // need to find playfair coordinates of input character pairs stored in each input subarray, and manipulate them based on rules
    // outer loop iterates through input pairs
    inputArray.forEach(digram => {
        let char1 = digram[0];
        let char2 = digram[1];

        let coord1 = getCoord(char1);
        let coord2 = getCoord(char2);

        //now to manipulate those coordinates based on rules
        if (coord1.row == coord2.row) {
            coord1.col = (coord1.col + 1) % 6;
            coord2.col = (coord2.col + 1) % 6;
        } else if (coord1.col == coord2.col) {
            coord1.row = (coord1.row + 1) % 6;
            coord2.row = (coord2.row + 1) % 6;
        } else {
            let colDiff = Math.abs(coord1.col - coord2.col);
            if (coord1.col > coord2.col) {
                coord1.col = coord1.col - colDiff;
                coord2.col = coord2.col + colDiff;
            } else if (coord2.col > coord1.col) {
                coord2.col = coord2.col - colDiff;
                coord1.col = coord1.col + colDiff;
            } else return 'large error';
        };

        let newChar1 = playfairArray[coord1.row][coord1.col];
        let newChar2 = playfairArray[coord2.row][coord2.col];
        output += newChar1 + newChar2;
    });
    return output;
};

decrypt(input, passkey);
console.log(output);