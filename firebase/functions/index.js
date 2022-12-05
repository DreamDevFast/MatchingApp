const functions = require('firebase-functions');
const SendGrid = require('@sendgrid/mail');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
const SENDGRID_API_KEY =
  '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';
const fromEmail = 'viper.it.dev@gmail.com';

exports.sendEmailVerificationCode = functions.https.onRequest(
  async (request, response) => {
    const {code, email} = request.body;
    SendGrid.setApiKey(SENDGRID_API_KEY);
    const data =
      'アカウント登録のリクエストを受け付けました。<br>アカウント登録を完了するには、アプリ内で次の認証コードをご入力ください。<br>' +
      code +
      '<br><br>このコードの利用期限は、' +
      'までとなっております。' +
      '<br>利用期限内に認証コードのご入力をお願いいたします。' +
      '<br><br>======================        ' +
      '<br>※本メールは送信専用アドレスから配信しています。本メールに直接返信いただいても回答できませんのでご注意ください。' +
      '<br>======================';

    const msg = {
      to: email,
      from: fromEmail,
      subject: '【Okyuin】メール認証コードのお知らせ',
      text: ' ',
      html: data,
    };
    try {
      await SendGrid.send(msg);
    } catch (error) {
      functions.logger.error({message: error});
      return response.status(500).json({message: error});
    }

    response.json({message: 'success'});
  },
);
