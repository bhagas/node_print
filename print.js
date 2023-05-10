var html_to_pdf = require('html-pdf-node');
const ptp = require("pdf-to-printer")
const path = require('path');
const fs = require('fs');
let options = { width: '58mm', preferCSSPageSize: true };
const moment = require("moment")
var cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
// const ip_be= 'http://103.121.123.87:8004/';

const ip_be= 'http://194.169.46.107:8004/';
moment.locale("ID")
const tgl = moment(new Date).format("dddd, DD MMMM YYYY")
const jam = moment(new Date).format("HH:mm:ss")
app.use(cors())
app.get('/print', (req, res) => {
//     let file = { content: `
//     <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// <style>
//     .container {
//         /* background-color: 25%; */
//         /* border:2px solid red; */
//         max-width:100%;
//         box-sizing:border-box;
//     }

//     header{
//         border-top:2px solid black;
//         border-bottom: 2px dashed black;
//         text-align: center;
//     }
//     .tanggal{
//         margin-top:10px;
//     }
//     .contain_nomor{
//         text-align: center;
//         border-bottom: 2px solid black;
//     }
//     .contain_nomor .nomor{
//         font-size: 70px;
//         font-weight: bold;
//     }
    
//     .contain_nomor .loket{
//         font-size: 20px;
//         /* font-weight: bold; */
//     }
// </style>
// </head>

// <body>
//     <div class="container">
//         <header>
//             <p>RSUD <br>
//             R.A.A Tjokronegoro</p>
//         </header>
//         <section class="tanggal">
//             <small >${tgl}</small>
//             <small style="float: right; "> ${jam} </small>
//         </section>
//         <section class="contain_nomor">
//            <span class="nomor"> ${req.query.no_antrian} </span><br>
//            <span class="loket">ANTRIAN ${req.query.tempat}</span><br><br>
//            <small>
//             Jumlah Antrian Yang belum Dipanggil: ${req.query.sisa_antrian} <br>
//             <br>
//             <br>
//             <br>
//            </small>
//         </section>
//     </div>
// </body>
// </html>` };
    // or //
    let file = { url: ip_be+`print/printAntrian?tgl=${tgl}&jam=${jam}&no_antrian=${req.query.no_antrian}&tempat=${req.query.tempat}&sisa_antrian=${req.query.sisa_antrian}&poli_nama=${req.query.poli_nama}` };

    
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
  app.get('/print_sep', (req, res) => {

    // or //
    let file = { url: ip_be+`print/printSEP?no_sep=${req.query.no_sep}` };

    
    
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

