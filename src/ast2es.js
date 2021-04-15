// 将ast 转成 es


module.exports = function(ast) {
    var babel = require("@babel/core");
    const output = babel.transformFromAst(ast);
    return output;
}