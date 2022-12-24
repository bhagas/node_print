var html_to_pdf = require('html-pdf-node');
const ptp = require("pdf-to-printer")
const path = require('path');
const fs = require('fs');
let options = { format: 'A4' };
const cliSelect = require('cli-select');
const chalk = require('chalk');


let file = { content: "<h1>ADIT ASUUUUU</h1>" };
// or //
// let file = { url: "https://example.com" };

html_to_pdf.generatePdf(file, options).then(async pdfBuffer => {
//   console.log("PDF Buffer:-", pdfBuffer);
//   console.log('data type is: '+typeof(pdfBuffer) + ', is buffer: ' + Buffer.isBuffer(pdfBuffer));
  const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);

  let data = await ptp.getPrinters ();

  console.log("PILIH PRINTER: ");
  cliSelect({
    values: data,
    valueRenderer: (value, selected) => {
        if (selected) {
            return chalk.underline(value.name);
        }
 
        return value.name;
    },
}).then(async (printer_dipilih)=>{
    fs.writeFileSync(tmpFilePath, pdfBuffer);
    const options2 = {
        printer: printer_dipilih.value.name
      };
      await ptp.print(tmpFilePath, options2);
      fs.unlinkSync(tmpFilePath);
});


});


