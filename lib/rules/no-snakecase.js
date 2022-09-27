"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rule = void 0;
exports.rule = {
    meta: {
        type: 'problem',
    },
    create: (context) => {
        const isSnakeCaseVariable = (name) => {
            // 先頭と末尾の_を取り除く
            const nameBody = name.replace(/^_+|_+$/gu, '');
            // 定数（ex: TEST_VARIABLE）の場合は該当させない
            return nameBody.includes('_') && nameBody !== nameBody.toUpperCase();
        };
        return {
            VariableDeclarator: (node) => {
                context.getDeclaredVariables(node).forEach((variable) => {
                    if (isSnakeCaseVariable(variable.name)) {
                        context.report({
                            message: 'camelcaseで定義してください',
                            node,
                        });
                    }
                });
            },
            FunctionDeclaration: (node) => {
                context.getDeclaredVariables(node).forEach((variable) => {
                    variable.identifiers.forEach((identifier) => {
                        if (isSnakeCaseVariable(identifier.name)) {
                            context.report({
                                message: 'camelcaseで定義してください',
                                node,
                            });
                        }
                    });
                });
            },
        };
    },
};
