const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const cssnanoPlugin = require('cssnano');

//const data = fs.readFileSync('./styles.css', 'utf8');


const minify = process.argv.includes('--minify');
let temp = process.argv.includes('--output');
const output = temp ? process.argv[process.argv.indexOf('--output')+1] : false;
temp = process.argv.includes('--config');
const config = temp ? process.argv[process.argv.indexOf('--config')+1] : false;

temp = process.argv.includes('--input');
const inputCSS = temp ? process.argv[process.argv.indexOf('--input')+1] : false;


let postcssAddons = [];
if (minify) {
    postcssAddons.push(cssnanoPlugin());
}


let tw_config = {
    content: ["./src/**/*.html", "./src/**/*.js"],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [],
};
if (config) {
    tw_config = require(`${process.cwd()}/${config}`);
}
let css = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
if (inputCSS) {
    css = fs.readFileSync(inputCSS);
}

postcss([tailwindcss(tw_config), autoprefixer()].concat(postcssAddons))
    .process(css)
    .then(result => {
        fs.writeFileSync(output, result.css)
    });
