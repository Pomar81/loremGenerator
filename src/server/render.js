const fs = require('fs');
const textGen = new (require('./textGenerator'))('source.txt');


class Rendering {
    constructor() {
        ;
    }
    mergeValues(content, values){
        for(let key in values) {
            //replace all {{key}} with the value from the values object
            content = content.toString().replace(`{{${key}}}`, values[key]);
        }
        return content;
    }

    readHtmlPart(fileName, values) {
        return new Promise((resolve, reject) => {
            fs.readFile(`./View/${fileName}.html`, "utf-8", (err, data) =>{
                if (err)
                    reject(err);
                else
                    if (values)
                        data = this.mergeValues(data, values);
                    resolve(data);
            })
        });
    }

    renderTextPage(query, res){
        let content = "";
        Promise.resolve(content)
            .then((data) => this.readHtmlPart("header"))
            .then((data) => {
                content+=data;
                let text = "";
                if (query.type === "2")
                    text = `<p>${textGen.generateParagraph(query.amount, query.lorem)}</p>`;
                else {
                    for(let i = 0; i < query.amount; i++)
                        text+= `<p>${textGen.generateParagraph(10, i===0 ? query.lorem: false)}</p>`
                }

                return this.readHtmlPart("text", {text: text})
            })
            .then((data) => {
                content+=data;
                return this.readHtmlPart("footer")
            })
            .then((data) => {
                content+=data;
                res.write(content);
                res.end();
            })
            .catch(err => {
                console.error("error" + err.message);
            })

    }

    renderIndexPage(res){
        let content = "";
        Promise.resolve(content)
            .then((data) => this.readHtmlPart("header"))
            .then((data) => {
                content+=data;
                return this.readHtmlPart("form", null)
            })
            .then((data) => {
                content+=data;
                return this.readHtmlPart("script")
            })
            .then((data) => {
                content+=data;
                res.write(content);
                res.end();
            })
            .catch(err => {
                console.error("error" + err.message);
            })
    }

}

module.exports = exports = new Rendering();
