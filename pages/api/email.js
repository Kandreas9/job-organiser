import nodemailer from "nodemailer";

export default function handler(req, res) {
    const body = JSON.parse(req.body);

    const message = {
        from: process.env.EMAIL,
        to: body.email,
        subject: "Job Organiser Job Application",
        html: `<div>
<p>${body.intro}</p>
        <p>${body.main}</p>
        <p>${body.outro}</p>
    </div>`,
    };

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    if (req.method === "POST") {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                res.status(404).json({
                    error: `Connection refused at ${err.address}`,
                });
            } else {
                res.status(250).json({
                    success: `Message delivered to ${info.accepted}`,
                });
            }
        });
    }
}
