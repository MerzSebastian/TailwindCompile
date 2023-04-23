// const fs = require('fs');

// const htmlFilePath = 'src/index.html';
// const htmlOutFilePath = 'dist/index.html';
// let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
// const linkRegex = /<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>/g;
// const linkTags = htmlContent.match(linkRegex);
// let styleSheetPaths = []
// if (linkTags) {
//     linkTags.forEach(linkTag => {
//         const hrefRegex = /href="([^"]+)"/;
//         const hrefMatch = linkTag.match(hrefRegex);
//         if (hrefMatch) {
//         const href = hrefMatch[1];
//         styleSheetPath = 'dist/' + href;
//         styleSheetPaths.push(styleSheetPath)
//         if (fs.existsSync(styleSheetPath)) {
//             const stylesheetContent = fs.readFileSync(styleSheetPath, 'utf-8');
//             htmlContent = htmlContent.replace(linkTag, `<style>${stylesheetContent}</style>`);
//         }
//         }
//     });

//     fs.writeFileSync(htmlOutFilePath, htmlContent, 'utf-8');
//     styleSheetPaths.forEach(path => fs.unlink(path, (err) => { console.log(err) }));
// }





const fs = require('fs');
const UglifyJS = require('uglify-js');

const htmlFilePath = 'src/index.html';
const htmlOutFilePath = 'dist/index.html';
let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
const linkRegex = /<link\s+rel="stylesheet"\s+href="([^"]+)"\s*\/?>/g;
const scriptRegex = /<script\s+src="([^"]+)"\s*><\/script>/g;
const linkTags = htmlContent.match(linkRegex);
const scriptTags = htmlContent.match(scriptRegex);
let styleSheetPaths = [];
let scriptPaths = [];

if (linkTags) {
    linkTags.forEach(linkTag => {
        const hrefRegex = /href="([^"]+)"/;
        const hrefMatch = linkTag.match(hrefRegex);
        if (hrefMatch) {
            const href = hrefMatch[1];
            styleSheetPath = 'dist/' + href;
            styleSheetPaths.push(styleSheetPath);
            if (fs.existsSync(styleSheetPath)) {
                const stylesheetContent = fs.readFileSync(styleSheetPath, 'utf-8');
                htmlContent = htmlContent.replace(linkTag, `<style>${stylesheetContent}</style>`);
            }
        }
    });
}

if (scriptTags) {
    scriptTags.forEach(scriptTag => {
        const srcRegex = /src="([^"]+)"/;
        const srcMatch = scriptTag.match(srcRegex);
        if (srcMatch) {
            const src = srcMatch[1];
            scriptPath = 'src/' + src;
            if (fs.existsSync(scriptPath)) {
                const scriptContent = fs.readFileSync(scriptPath, 'utf-8');
                const minifiedCode = UglifyJS.minify(scriptContent);
                htmlContent = htmlContent.replace(scriptTag, `<script>${minifiedCode.code}</script>`);
            }
        }
    });
}

fs.writeFileSync(htmlOutFilePath, htmlContent, 'utf-8');
styleSheetPaths.forEach(path => fs.unlink(path, (err) => { console.log(err) }));
