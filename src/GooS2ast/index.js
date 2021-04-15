// e6 转 ast

const fs = require("fs");

const codePath = '/Users/zoupeng/exercise/GooS/files/Goos.js';
const codeStream = fs.readFileSync(codePath, 'utf-8')
const codeString = codeStream.toString();

const {getTokens} = require('./Lexer');
const tokens = getTokens(codeString)
console.log('tokens', tokens)

const tokens2AST = require('./parse');
const ast = tokens2AST(tokens)

consoleToFile(ast).then((targetPath) => {
    console.log('ast结构输出日志：', targetPath)
    
    const ast2es = require('../ast2es');
    console.log('ast 转换 js 结果：')
    console.log(ast2es(ast).code)
})
    

// 输出结果到文件
function consoleToFile(json, targetPath = '/Users/zoupeng/exercise/GooS/dist/GooS_ast.json') {
    return new Promise((resolve, reject) => {
        const tabJSON = require('../tabJSON');
        const targetBuffer = tabJSON(JSON.stringify(json));
        fs.writeFile(targetPath, targetBuffer, function(err){
            if (err) {
                reject(targetPath);
            }
            resolve(targetPath)
        });
    })
}
