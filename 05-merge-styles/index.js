let fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'project-dist', 'bundle.css');
const files = './05-merge-styles/styles/';
fs.rm(source, { recursive: true }, (err) => {
    fs.readdir(files, (err, files) => {
        files.forEach(file => {
            let extension = path.extname(file);
            if (extension === '.css') {
                let oldFile = path.join(__dirname, 'styles', file);
                fs.readFile(oldFile, (err, data) => {
                    if (err) throw err;
                    fs.appendFile(source, data, err => {
                        if (err) throw err;
                        console.log(`Файл ${file} успешно смержен`);
                    });
                })

            }
        });

    });
})

