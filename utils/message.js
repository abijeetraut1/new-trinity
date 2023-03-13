const {
    Vonage
} = require('@vonage/server-sdk')
const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
})

module.exports = async (req, res, next) => {
    const from = "Vonage APIs"
    const to = process.env.ALERT_NUMBER
    const text = 'you got and order    \n\n\n'

    await vonage.sms.send({
            to,
            from,
            text
        })
        .then(resp => {
            // res.s
            console.log('Message sent successfully');
            next();
        })
        .catch(err => {
            console.log('There was an error sending the messages.');
            console.error(err);
        });
}