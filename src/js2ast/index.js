// e6 转 ast
const fs = require("fs");

// 将 产物ast转成es
function init(){
    const codePath = '/Users/zoupeng/exercise/GooS/files/es6.js';
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

// 将标准ast转成es
function transformFromStandardAst() {
    const codePath = '/Users/zoupeng/exercise/GooS/files/demoAST2.json';
    const codeStream = fs.readFileSync(codePath, 'utf-8')
    const ast = JSON.parse(codeStream.toString());

    const ast2es = require('../ast2es');
    console.log('ast2es', ast2es(ast).code)
}


// 输出结果到文件
function consoleToFile(json, targetPath = '/Users/zoupeng/exercise/GooS/dist/ast.json') {
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


