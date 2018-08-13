module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "rules": {
        "prop-types": [1],
        "react/boolean-prop-naming": true
    },
    "plugins": [
        "react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        }
    }
};