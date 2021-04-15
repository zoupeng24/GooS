/**
 * Parser 过程-语法分析
 * @param tokens 令牌流
 * @returns AST
 */
 const tokens2AST = tokens => {
    // 声明一个全时指针，它会一直存在
    let current = -1;
 
    // 指针指向的当前token
    let token = tokens[current];
 
    const parseDeclarations = () => {
 
        // 指针后移
        next();
 
        // 声明
        if (token.type === 'identifier' && ( token.value === 'const' || token.value === 'let')) {
            const variableDeclaration = {
                type: 'VariableDeclaration',
                kind: token.value,
                declarations: [{
                    type: "VariableDeclarator",
                    id:{
                        type: "Identifier"
                    },
                    init:{}
                }]
            };
 
            next();
 
            // const 后面要跟变量的,如果不是则报错
            if (token.type !== 'identifier') {
                throw new Error('Expected Variable after const');
            }
 
            // 我们获取到了变量名称
            variableDeclaration.declarations[0].id.name = token.value;
 
            next();
 
            // 如果跟着 '=' 那么后面应该是个表达式或者常量之类的
            if (token.type === 'operator' && token.value === '=') {
                variableDeclaration.declarations[0].init = parseInitExpression();
            }
 
            return variableDeclaration;
        }
    };
 
    const parseInitExpression = () => {
        next();
 
        let init;
        
        // 数字
        if (token.type === 'number') {
            init = {
                type: 'NumericLiteral',
                value: token.value
            };
        }
        
        // 函数定义
        if (token.type === 'identifier' && token.value === 'function') {
            init = {
                type: 'FunctionExpression',
                "body": {
                    "type": "BlockStatement",
                },
            };
            
            init.params = parseParams();
            init.body = parseExpression();
        }
 
        return init;
    };
 
    const parseParams = () => {
        const params = [];
        next();
        if (token.type === 'parens' && token.value === '(') {
            next();
            while (token.type !== 'parens' && token.value !== ')') {
                if (token.type === 'identifier') {
                    params.push({
                        type: 'Identifier',
                        identifierName: token.value,
                        name: token.value
                    });
                }
                next();
            }
        }
 
        return params;
    };
 
    const parseExpression = () => {
        next();
        let body = {};
        if (token.type === 'punc' && token.value === '{') {
            body.type =  "BlockStatement";
            body.body = [];
            next();
            while (token.type !== 'punc' && token.value !== '}') {
                if (token.type === 'identifier' && token.value === 'return') {
                    let sentence = {}
                    sentence.type = "ReturnStatement";
                    const argument = parseExpression();
                    sentence.argument = argument;
                    body.body.push(sentence)
                }
                next();
            }
        }
        
        // 如果以(开头或者变量开头说明不是 BlockStatement,我们以二元表达式来解析
        if (token.type === 'identifier') {
            body = {
                type: 'BinaryExpression',
                left: {
                    type: 'Identifier',
                    name: token.value
                },
                operator: '',
                right: {
                    type: '',
                    identifierName: ''
                }
            };
            next();
 
            if (token.type === 'operator') {
                body.operator = token.value;
            }
 
            next();
 
            if (token.type === 'identifier') {
                body.right = {
                    type: 'identifier',
                    value: token.value
                };
            }
            if (token.type === 'number') {
                body.right = {
                    type: 'NumericLiteral',
                    value: parseInt(token.value)
                };
            }
        }
 
        return body;
    };
 
    // 指针后移的函数
    const next = () => {
        do {
            ++current;
            token = tokens[current]
                ? tokens[current]
                : {type: 'eof', value: ''};
        } while (token.type === 'whitespace');
    };
 
    const ast = {
        type: 'Program',
        sourceType: "module",
        body: []
    };

    console.log('tokens', tokens)
    while (current < tokens.length) {
        const statement = parseDeclarations();
        if (!statement) {
            break;
        }
        ast.body.push(statement);
    }
    return ast;
};


module.exports = tokens2AST;