let fs = require('fs');
const path = require('path');
const source = path.join(__dirname, 'files-copy');
const files = './04-copy-directory/files/';

fs.rm(source, { recursive: true, force: true }, err => {
    fs.mkdir(source, { recursive: true }, err => {

        console.log(`Папка ${source} успешно создана`);
        fs.readdir(files, (err, files) => {
            files.forEach(file => {
                let oldFile = path.join(__dirname, 'files', file);
                let newFile = path.join(__dirname, 'files-copy', file);
                fs.copyFile(oldFile, newFile, err => {
                    if (err) throw err;
                    console.log(`Файл ${file} успешно скопирован`);
                });
            });

        });
    });
});






