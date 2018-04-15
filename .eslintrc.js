module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parser: 'babel-eslint',
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "plugins": [
        "react"
    ],
    rules:{
        'generator-star-spacing': 'off',
        "linebreak-style": 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': 0,

    }
};