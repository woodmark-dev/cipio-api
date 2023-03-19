const Sib = require('sib-api-v3-sdk');
const { getDateTime } = require('../utils');

const crypto = require('crypto');
const User = require('../models/User');
const Marchant = require('../models/Marchant');

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const tranEmail = new Sib.TransactionalEmailsApi();
const sender = {
  email: 'cipiofinance@gmail.com',
};

const sendUserMail = async (req, res) => {
  const { email, verificationToken } = req.query;
  try {
    const receiverEmail = [
      {
        email,
      },
    ];

    const mailOptions = {
      sender,
      to: receiverEmail,
      subject: 'CIPIO FINANCE Email Verification',
      htmlContent: `<p>Click the link to verify your email:</p> <a href="https://web-production-4e4a.up.railway.app/api/v1/verify-user-email?email=${email}&verificationToken=${verificationToken}">Verify Email</a>`,
    };

    await tranEmail.sendTransacEmail(mailOptions);

    res.json({ msg: 'Mail has been successfully sent' });
  } catch (error) {
    console.log(error);
  }
};

const sendMarchantMail = async (req, res) => {
  const { email, verificationToken } = req.query;
  try {
    const receiverEmail = [
      {
        email,
      },
    ];

    const mailOptions = {
      sender,
      to: receiverEmail,
      subject: 'CIPIO FINANCE Email Verification',
      htmlContent: `<p>Click the link to verify your email:</p> <a href="https://web-production-4e4a.up.railway.app/api/v1/verify-marchant-email?email=${email}&verificationToken=${verificationToken}">Verify Email</a>`,
    };

    await tranEmail.sendTransacEmail(mailOptions);

    res.json({ msg: 'Mail has been successfully sent' });
  } catch (error) {
    console.log(error);
  }
};

const updateUserPassword = async (req, res) => {
  const { email } = req.query;
  const verificationToken = crypto.randomBytes(40).toString('hex');
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError('User does not exist');
  }

  user.verificationToken = verificationToken;
  await user.save();

  const receiverEmail = [
    {
      email,
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE Change Password',
    htmlContent: `<p>Click the link to change your password:</p> <a href="https://cipio.finance/user-forgot-password?email=${email}&verificationToken=${verificationToken}">Change Password</a>`,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Change password link has been sent to your email' });
};

const updateMarchantPassword = async (req, res) => {
  const { email } = req.query;
  const verificationToken = crypto.randomBytes(40).toString('hex');
  const marchant = await Marchant.findOne({ email });

  if (!marchant) {
    throw new BadRequestError('Marchant does not exist');
  }

  marchant.verificationToken = verificationToken;
  await marchant.save();

  const receiverEmail = [
    {
      email,
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE Change Password',
    htmlContent: `<p>Click the link to change your password:</p> <a href="https://cipio.finance/marchant-forgot-password?email=${email}&verificationToken=${verificationToken}">Change password</a>`,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Change password link has been sent to your email' });
};

const sendMessageToAdmin = async (req, res) => {
  const { transactionDetails, email } = req.query;

  const receiverEmail = [
    {
      email,
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE Your Jamb Pin is Here',
    htmlContent: `<p>${transactionDetails}</p>`,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Email has been sent' });
};

const sendRechargeMessageToAdmin = async (req, res) => {
  const { transactionDetails, walletAddress } = req.query;

  const receiverEmail = [
    {
      email: 'cipiocipi973@gmail.com',
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE A recharge transaction has occured',
    htmlContent: `<p>${transactionDetails}</p> <p>Wallet Address: ${walletAddress}</p>`,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Email has been sent' });
};

//send electricty payment email:
async function sendElectricityBillReceipt(req, res) {
  const {
    transaction_id,
    meter_number,
    service_privider,
    amount,
    units,
    token,
    email,
    name,
    address,
  } = req.query;

  const receiverEmail = [
    {
      email,
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE ELECTRICTY PAYMENT RECEIPT',
    htmlContent: `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 620px) {
  .u-row {
    width: 600px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 600px !important;
  }

}

@media (max-width: 620px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_2 .v-font-size { font-size: 17px !important; } #u_content_text_deprecated_1 .v-container-padding-padding { padding: 40px 10px !important; } #u_content_text_deprecated_1 .v-line-height { line-height: 180% !important; } }
    </style>
  
  

<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css2?family=Arvo&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
    

<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
        
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      
      <img align="center" border="0" src="https://i.ibb.co/hX6pCjj/logo.jpg" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 33%;max-width: 191.4px;" width="191.4"/>
      
    </td>
  </tr>
</table>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #f5f5f5;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_heading_2" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <h1 class="v-line-height v-font-size" style="margin: 0px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word; font-family: Arvo; font-size: 22px; ">YOUR ELECTRICITY BILL TRANSACTION WAS SUCCESSFUL</h1>

      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_deprecated_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 30px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="line-height: 180%; text-align: justify; word-wrap: break-word;">
    <p style="line-height: 180%;">Transaction ID: ${transaction_id} </p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;">Meter Number: ${meter_number}</p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;">Meter Type: Prepaid</p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;">Service Provider: ${service_privider} </p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;">Date &amp; Time: ${getDateTime()}</p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;">Amount: ${amount}</p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;">Units: ${units}</p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;"> ${token}</p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;">Customer Name: ${name}</p>
<p style="line-height: 180%;"> </p>
<p style="line-height: 180%;">Customer Address ${address}</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>



<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:'Open Sans',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:'Open Sans',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;">You have received this email as a registered user of <a rel="noopener" href="https://cipio.finance" target="_blank">cipio.finance</a></p>
<p style="font-size: 14px; line-height: 160%;"> </p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
</div>


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>

    
    `,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Email has been sent' });
}

module.exports = {
  sendUserMail,
  sendMarchantMail,
  updateUserPassword,
  updateMarchantPassword,
  sendMessageToAdmin,
  sendRechargeMessageToAdmin,
  sendElectricityBillReceipt,
};
