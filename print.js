var html_to_pdf = require('html-pdf-node');
const ptp = require("pdf-to-printer")
const path = require('path');
const fs = require('fs');
let options = { format: 'A4' };
const cliSelect = require('cli-select');
const chalk = require('chalk');
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
// var printer = require("@thiagoelg/node-printer"),
//     util = require('util');
// console.log("installed printers:\n"+util.inspect(printer.getPrinters(), {colors:true, depth:10}));


let file = { content: "<h1>ADIT ASUUUUU</h1>" };
// or //
// let file = { url: "https://example.com" };

html_to_pdf.generatePdf(file, options).then(async pdfBuffer => {
//   console.log("PDF Buffer:-", pdfBuffer);
//   console.log('data type is: '+typeof(pdfBuffer) + ', is buffer: ' + Buffer.isBuffer(pdfBuffer));
  const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);

  let data = await ptp.getPrinters ();
  let printers = [];
  data.forEach((itm)=>{
    printers.push(itm.name);
  })
  console.log("PILIH PRINTER: ");
  cliSelect({
    values: printers,
    valueRenderer: (value, selected) => {
        if (selected) {
            return chalk.underline(value);
        }
 
        return value;
    },
}).then(async (printer_dipilih)=>{

    fs.writeFileSync(tmpFilePath, pdfBuffer);
    const options2 = {
        printer: printer_dipilih.value
      };
      await ptp.print(tmpFilePath, options2);
      fs.unlinkSync(tmpFilePath);
});


});


