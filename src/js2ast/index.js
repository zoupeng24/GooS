// e6 转 ast
const fs = require("fs");
const path = require("path");

// 将 产物ast转成es
function init(){
    const codePath = path.resolve(__dirname, '../../files/es6.js');
    const codeStream = fs.readFileSync(codePath, 'utf-8')
    const codeString = codeStream.toString();

    const {getTokens} = require('./getTokens');
    const tokens = getTokens(codeString)
    // console.log('tokens', tokens)

    const tokens2AST = require('./token2ast');
    const ast = tokens2AST(tokens)
    
    consoleToFile(ast)
    
    const ast2es = require('../ast2es');
    console.log('ast 转换 js 结果：')
    console.log(ast2es(ast).code)
}


// 输出结果到文件
function consoleToFile(json, targetPath = path.resolve(__dirname, '../../dist/ast.json')) {
    const tabJSON = require('../tabJSON');
    const targetBuffer = tabJSON(JSON.stringify(json));
    fs.writeFile(targetPath, targetBuffer, function(err){
        if (err) {
            console.log('consoleToFile 报错', targetPath)
        }
        console.log('consoleToFile 成功', targetPath)
    });
}

init();


