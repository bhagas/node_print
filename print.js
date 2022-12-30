var html_to_pdf = require('html-pdf-node');
const ptp = require("pdf-to-printer")
const path = require('path');
const fs = require('fs');
let options = { format: 'A4' };

var cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

app.use(cors())
app.get('/print', (req, res) => {
    let file = { content: `<h1>${req.query.no_antrian} ${req.query.tempat} ${req.query.sisa_antrian}</h1>` };
    // or //
    // let file = { url: "https://example.com" };
    
    html_to_pdf.generatePdf(file, options).then(async pdfBuffer => {
    //   console.log("PDF Buffer:-", pdfBuffer);
    //   console.log('data type is: '+typeof(pdfBuffer) + ', is buffer: ' + Buffer.isBuffer(pdfBuffer));
      const tmpFilePath = path.join(`./tmp/${Math.random().toString(36).substr(7)}.pdf`);
    
    
      fs.readFile('printer.json', 'utf8',async function(err, data_string){
          if(err){
            res.json({status:'gagal printer belum di set'})
          }else{
            fs.writeFileSync(tmpFilePath, pdfBuffer);
            let printer_dipilih = JSON.parse(data_string);
            const options2 = {
                printer: printer_dipilih.printer
              };
              await ptp.print(tmpFilePath, options2);
              fs.unlinkSync(tmpFilePath);
              res.json({status:'berhasil'})
          }
    });
    })
    
  })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

