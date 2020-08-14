const functions = require('firebase-functions');
const admin = require('firebase-admin');


var serviceAccount = require("./margaritky-service-account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://margaritky-9d201.firebaseio.com"
});

exports.generatePdf = functions.https.onCall(async (data) => {
    console.log("-----------------\n------------------\n-----------------")
    console.log(admin);

    var letters = []
    var results = await admin.firestore().collection('lidi').doc(data.person.id).collection('letters').get()
    results.forEach(function (doc) {
        letters.push(doc.data())
    })
    var personPdfFile = null;
    try {
        personPdfFile = admin.storage().bucket("gs://margaritky-9d201.appspot.com").file('margaritas/Margaretka Hrdinství 2020 – ' + data.person.name + ".pdf")
    } catch (e) {
        console.log(e);
    }

    const PDFDocument = require('pdfkit');
    var doc = new PDFDocument({ layout: 'landscape', autoFirstPage: false });

    try {
        doc.pipe(personPdfFile.createWriteStream({ contentType: 'application/pdf', public: true }));
    } catch (e) {
        console.log(e)
    }

    for (letter of letters) {
        doc.addPage()
        // doc.font('workspace/fonts/EBGaramond-Regular.ttf').fontSize(20)
        doc.font('/home/adam/fonts/EBGaramond-Regular.ttf').fontSize(20)
            .text(letter.text).moveDown(0.5);
        // doc.font('workspace/fonts/EBGaramond-Italic.ttf').fontSize(20)
        doc.font('/home/adam/fonts/EBGaramond-Italic.ttf').fontSize(20)
            .text(letter.signature, { align: 'right' });
    }

    doc.end();

    var url = await personPdfFile.getSignedUrl({
        action: 'read',
        expires: '01-01-2100'
    })

    var results = await admin.firestore().collection('lidi').doc(data.person.id).set({
        pdf_url: url[0]
    },
        { merge: true });

    return url[0];
});

const EMAIL_ADRESS = "krivka.adam@gmail.com" 
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ADRESS,
        pass: 'vnvpgbbuwgxigpaf'
    }
});

exports.sendPdf = functions.https.onCall(async (data) => {
    const mailOptions = {
        from: 'Hrdinství 2020 ' + EMAIL_ADRESS,
        to: data.person.email,
        subject: '💌 Margaretka Hrdinství 2020 – ' + data.person.name,
        text: `Ahoj,

v příloze najdeš svoji "margaretku", ve které na tebe čekají milé dopisy a zprávičky od ostatních. 
        
Nezapomeň si pdfko někam dobře uložit nebo si jej dokonce vytisknout (doporučuju 2 nebo 4 strany na list).
        
A že jsi nestihl/a napsat dopisy ostatním, ale máš jim teď chuť poděkovat? Pořád můžeš! Napiš jim na Facebooku nebo přes e-mail (v prvním e-mailu o margaretkách šel i kontaktníček).
        
A pamatuj: jeden z poznatků Zimbarda o trénování hrdinství je, že je potřeba jej v prvé řadě oceňovat – zkus tedy být vděčný/á i ve svém každodenním životě. ;-)
        
S pozdravem
Adam & tým`,
        attachments: [{
            filename: "Margaretka Hrdinství 2020 – " + data.person.name + ".pdf",
            path: data.person.pdf_url
        }]
    };

    // returning result
    var results = await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return err;
        }
        return console.log('Send to ' + data.person.name);
    });
    
    return "Sent to " + data.person.name;

});