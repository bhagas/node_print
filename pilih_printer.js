
const ptp = require("pdf-to-printer")
const fs = require('fs');
const cliSelect = require('cli-select');
const chalk = require('chalk');



//   console.log("PDF Buffer:-", pdfBuffer);
//   console.log('data type is: '+typeof(pdfBuffer) + ', is buffer: ' + Buffer.isBuffer(pdfBuffer));

(async ()=>{
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
     
      const options2 = {
          printer: printer_dipilih.value.name
        };
  
  
    
  fs.writeFile("printer.json", JSON.stringify(options2), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("Printer disimpan\n");
  
    }
  });
  
  })
})()
  

