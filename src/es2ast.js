// e6 转 ast

const fs = require("fs");

const parserOption = {
    sourceType: "module",
    plugins: [
        "classProperties",
        "jsx"
    ]
};

const parser = require("@babel/parser")

const codePath = '/Users/zoupeng/exercise/GooS/files/es6.js';
const codeStream = fs.readFileSync(codePath)
const codeString = codeStream.toString();

const ast = parser.parse(codeString, parserOption)

console.log('生成ast成功，准备写入文件', ast)
const targetPath = '/Users/zoupeng/exercise/GooS/files/demoAST.json';

const tabJSON = require('./tabJSON');
const targetBuffer = tabJSON(JSON.stringify(ast));

fs.writeFile(targetPath, targetBuffer, function(err){
    // if (err) return callback(err);
    // return callback(null);
});


