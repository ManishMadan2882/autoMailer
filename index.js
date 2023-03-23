require('dotenv').config()
const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET);
OAuth2_client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});

function sendMail(name, recepient)
{
    const accessToken = OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport(
       {
        service:'gmail',
        auth:
        {
            type : 'OAuth2',
            user : process.env.EMAIL,
            clientId : process.env.CLIENT_ID,
            clientSecret : process.env.CLIENT_SECRET,
            refreshToken : process.env.REFRESH_TOKEN,
            accessToken : accessToken
        }
       }
    )

    const mailOptions = {
        from: process.env.EMAIL,
        to: recepient,
        subject:"This is a NodeMailer response",
        html:get_html_msg(name)
    }

    transport.sendMail(mailOptions,(err,res) =>{
        if(err)
            console.log('Error: ',err);
        else 
            console.log('Success: ',res);
    })
    transport.close();

}
function get_html_msg(name)
{
    return `
    <h3>This is a auto generated response</h3>
    <br>
    <p>
     Hi ${name},
     This is a testing mail.
     Thanks.
    </p>
    `
}
sendMail('Manish','manishmadan321@gmail.com')