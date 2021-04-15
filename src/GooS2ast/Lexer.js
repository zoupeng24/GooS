/**
 * Lexical analyzer，简称Lexer），也叫扫描器（Scanner）
 * @param codeString 待转化的字符串
 * @returns Tokens 令牌流
 */
 function getTokens(codeString) {
    const RESERVED = require('./reservedWord')
    let tokens = []; //存放 token 的数组
 
    let current = 0; //当前的索引
    while (current < codeString.length) {
        let char = codeString[current];
 
        //先处理括号
        if (char === '(' || char === ')') {
            tokens.push({
                type: 'parens',
                value: char
            });
            current++;
            continue;
        }
 
        //处理空格，空格可能是多个连续的，所以需要将这些连续的空格一起放到token数组中
        const WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            let value = '';
            while (current < codeString.length && WHITESPACE.test(char)) {
                value = value + char;
                current++;
                char = codeString[current];
            }
            tokens.push({
                type: 'whitespace',
                value: value
            });
            continue;
        }
 
        //处理连续数字,数字也可能是连续的，原理同上
        let NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
            let value = '';
            while (current < codeString.length && NUMBERS.test(char)) {
                value = value + char;
                current++;
                char = codeString[current];
            }
            tokens.push({
                type: 'number',
                value: value
            });
            continue;
        }
        
        const isResevredOperator = (char === RESERVED['+'].value);
        
        //处理标识符，标识符一般以字母、_、$开头的连续字符
        const LETTERS = /[\u4e00-\u9fa5\$\_]/;
        if (LETTERS.test(char) && !isResevredOperator) {
            let value = '';
            //标识符
            while (current < codeString.length && /[\u4e00-\u9fa50-9\$\_]/.test(char)) {
                value = value + char;
                current++;
                char = codeString[current];
            }
            tokens.push({
                type: 'identifier',
                value: value
            });
            continue;
        }
 
        //处理 , 分隔符
        if (",;(){}[]".indexOf(char) >= 0) {
            tokens.push({
                type: 'punc',
                value: char
            });
            current++;
            continue;
        }
 
        //处理运算符
        const OPERATOR = /=|\+|>|加/;
        if (OPERATOR.test(char)) {
            let value = '';
            while (OPERATOR.test(char)) {
                value += char;
                current++;
                char = codeString[current];
            }
            //如果存在 => 则说明遇到了箭头函数
            if (value === '=>') {
                tokens.push({
                    type: 'ArrowFunctionExpression',
                    value,
                });
                continue;
            }
 
            tokens.push({
                type: 'operator',
                value
            });
            continue;
        }
        throw new TypeError(`还未加入此字符处理 ${char}`);
    }
    return tokens;
}

exports.getTokens = getTokens;