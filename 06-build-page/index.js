const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'project-dist');
const FSP = require('fs').promises;

let oldFile = path.join(__dirname, 'template.html');
let newFile = path.join(__dirname, 'project-dist', 'index.html');
const components = path.join(__dirname, 'components');

const assetsDest = path.join(__dirname, 'project-dist', 'assets');;
const assetsSrc = path.join(__dirname, 'assets');

async function resolveIndexHTML() {
    let templateData = (await FSP.readFile(oldFile)).toString();
    const componentFiles = await FSP.readdir(components)
    for (f of componentFiles) {
        const fPath = path.join(components, f)
        let fStat = await FSP.stat(fPath)
        if (fStat.isFile()) {
            let extension = path.extname(f);
            let fileName = path.basename(f, extension);
            let fData = (await FSP.readFile(fPath)).toString();
            let tag = `{{${fileName}}}`;
            templateData = templateData.replaceAll(tag, fData)
            await FSP.writeFile(newFile, templateData)
        }
    }
}

async function resolveStyleCSS() {
    const sourceStyle = path.join(__dirname, 'project-dist', 'style.css');
    const filesStyle = path.join(__dirname, 'styles');
    fs.rm(sourceStyle, { recursive: true, force: true }, (err) => {
        fs.readdir(filesStyle, (err, filesStyle) => {
            filesStyle.forEach(file => {
                let extension = path.extname(file);
                if (extension === '.css') {
                    let oldFileStyle = path.join(__dirname, 'styles', file);
                    fs.readFile(oldFileStyle, (err, data) => {
                        if (err) throw err;
                        fs.appendFile(sourceStyle, data, err => {
                            if (err) throw err;
                            console.log(`Файл ${file} успешно смержен`);
                        });
                    })
                }
            });

        });
    })
}


async function copyDir(src, dest) {
    const entries = await FSP.readdir(src, { withFileTypes: true });
    await FSP.mkdir(dest);
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await FSP.copyFile(srcPath, destPath);
        }
    }
}


async function buildProject() {
    await FSP.rm(source, { recursive: true, force: true });
    await FSP.mkdir(source, { recursive: true });
    resolveIndexHTML();
    resolveStyleCSS();
    copyDir(assetsSrc, assetsDest);
}

buildProject();
 





