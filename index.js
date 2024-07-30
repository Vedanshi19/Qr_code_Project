import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
      type: 'input',
      message: 'Type in your URL:',
      name: 'Url'
    }
  ])
  .then((answers) => {
    const url = answers.Url;
    const qr_svg = qr.image(url, { type: 'png' }); // Specify PNG format
    qr_svg.pipe(fs.createWriteStream('qr_img.png')); // Use createWriteStream instead of createReadStream

   fs.writeFile("Url.txt",url,(err)=>{
      if(err) throw err;
      console.log("The file has been saved!");
   })
    //console.log('QR code has been saved to qr_img.png');
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt couldn\'t be rendered in the current environment.');
    } else {
      console.error('Something went wrong:', error);
    }
  });
