const express = require("express");
const app = express();
const server = require("http").Server(app);
app.use(express.json())

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'onlyfortherandoms@gmail.com',
        pass: 'rahnyxgoiollfuut',
    },
    secure: true,
});

app.post("/send-mail", (req, res) => {
    const to = req.body.to;
    const mailData = {
        from: "",
        to: to,
        subject: "your payment is due!",
        html: ` <p>
                    Hello ${name},
                </p>
                <p>
                    remember dog you owe - ${amount} and i want it by - ${date}
                </p>
                <p>
                    pay me on time or i will eat yourrmormorm
                </p>
                <p>
                    thanks and regards,
                </p>`
    };
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "boom", message_id: info.messageId });
    });
})

server.listen(process.env.PORT || 3030);