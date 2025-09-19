import {Resend} from "resend";

export async function sendEmail(email) {
    const resend = new Resend("");
    const {data, error} = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [`${email}`],
        subject: "hello world",
        html: "<strong>it works!</strong>",
    });

    if (error) {
        console.error(error);
    }

    console.log("email:", data)
}
