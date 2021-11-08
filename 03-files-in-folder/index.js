const fs = require('fs');
const path = require('path');
const testFolder = './03-files-in-folder/secret-folder/';

fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
        let newFile = `${testFolder}${file}`;
        fs.stat(newFile, (err, stats) => {
            if (stats.isFile()) {
                let extension = path.extname(newFile);
                let fileName = path.basename(newFile, extension);
                let fileSize = stats.size;
                console.log(`${fileName}-${extension.replace('.', '')}-${fileSize}b`);
            }
        });
    });
});





