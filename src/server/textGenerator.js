const fs = require('fs');


class TextGen {
    static setSource(srcFile){
        try {
            return fs.readFileSync(srcFile);
        }
        catch(e){
            return this._srcString = "Ipsum lorem text";
        }
    }
    constructor(srcFile){
       this._srcString = TextGen.setSource(srcFile).toString().toLowerCase();
    }
    generateWord() {
        const wordArr = this._srcString.split(/\W/).filter(el => el.length > 0);
        return wordArr[Math.floor(Math.random() * wordArr.length)];
    }

    get srcString() {
        return this._srcString;
    }

    generateSentence(words = 3, lorem = false, complex =false){
        let str = "";
        if (words > 8) {
            const firstPart = Math.floor(Math.random()*(words-5))+3;
            str += this.generateSentence(firstPart, lorem).slice(0,-1);
            str += ", " + this.generateSentence(words - firstPart, false).toLowerCase();
            return str;
        }
        for(let i = 0; i < words; i++){
            str += this.generateWord();
            if (i === 0){
                str = str.split("").reduce((p1, p2, number, ts) => p1 + (number===0?p2.toUpperCase():p2) , "");
            }
            if (i < words -1)
                str+= " ";
        }
        if (lorem && !str.startsWith("Lorem ipsum "))
            str = "Lorem ipsum " + str.toLowerCase();

        return str + ".";
    }

    generateParagraph(sentences = 10, lorem = false) {
        let str = "";
        for (let i = 0; i < sentences; i++) {
            str += this.generateSentence((Math.floor(Math.random()*8) +5), (i === 0)? lorem : false, Math.round(Math.random()));
            if (i < sentences - 1)
                str += " ";
        }
        return str;
    }
}


 exports = module.exports = TextGen;
