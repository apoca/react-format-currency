"use strict";

module.exports = {
    env: {
        es6: true,
        node: true,
        "browser": true,
        "node": true,
        "mocha": true
    },
    extends: [
        "airbnb",
    ],
    plugins: [
        "prettier", "react", "import"
    ],
    parser: "babel-eslint",
    rules: {
        curly: "error",
        "import/no-extraneous-dependencies": [
            "error", {
                devDependencies: ["test*/**", "scripts/**"]
            }
        ],
        "import/no-extraneous-dependencies": [
            2, {
                "devDependencies": true
            }
        ],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-a11y/no-static-element-interactions": 0,
        "class-methods-use-this": 0,
        "max-len": ["error", 120, 2],
        "no-console": 1,
    },
};
