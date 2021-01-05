module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "no-alert":2, //在这里可以更新规则 2表示报错 1表示警告 0 表示不检查这个  //node_module/bin/eslint --init
        "no-unused-vars":0
    }
};
