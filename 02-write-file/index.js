const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path'); 
const source = path.join(__dirname, 'usertext.txt');
const output = fs.createWriteStream(source);
stdout.write('Введите Ваш текст\n');

stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
        process.exit();
    }
    output.write(data);

})
process.on('exit', () => stdout.write('Досвидания!'));
process.on('SIGINT', () => process.exit()); 