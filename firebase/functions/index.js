const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
 * Here we're using Gmail to send
 */
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dream.dev1215@gmail.com',
    pass: 'qapvozeqidrnescw',
  },
});
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // getting dest email by query string
    const dest = req.query.dest;
    const code = req.query.code;
    const data =
      '<html><body>アカウント登録のリクエストを受け付けました。<br>アカウント登録を完了するには、アプリ内で次の認証コードをご入力ください。<br>' +
      code +
      '<br><br>======================        ' +
      '<br>※本メールは送信専用アドレスから配信しています。本メールに直接返信いただいても回答できませんのでご注意ください。' +
      '<br>======================</body><html>';

    const mailOptions = {
      from: 'Okyuin <dream.dev1215@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: "'【Okyuin】メール認証コードのお知らせ", // email subject
      html: data, // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        if (error.status === 200) {
          return res.send('Sended');
        }
        return res.send(error.toString());
      }
      return res.send('Sended');
    });
  });
});
