import nodemailer from "nodemailer"

const getIndexPage =(req,res)=>{
    res.status(200).render(`index`,{page_name:`index`})
}
const getLoginPage =(req,res)=>{
    res.status(200).render(`login`,{page_name:`login`})
}
const getRegisterPage =(req,res)=>{
    res.status(200).render(`reg`,{page_name:`reg`})
}

const getContactPage =(req,res)=>{
    res.status(200).render(`contact`,{page_name:`contact`})
}

const getAboutPage =(req,res)=>{
    res.status(200).render(`about`,{page_name:`about`})
}


const sendEmail=  async (req,res)=>{
  try {
    const outputMessage=`
    <h1> Mail Details</h1>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>LastName:${req.body.lastname}</li>
    <li>Email:${req.body.email}</li>
    <li>Phone Nummber:${req.body.phone}</li>
    </ul>
    <h1>Message Details</h1>
    <p>${req.body.message}</p>
    `

    // create reusable transporter object using the default SMTP transport
  let transporter =  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "enesmuhammedozbunar@gmail.com", // generated ethereal user
      pass: "ojetwjocftqhwsfd", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart Edu Contact Form" <enesmuhammedozbunar@gmail.com>', // sender address
    to: "m.enesozbunar@gmail.com," ,
    subject: "Smart Edu Contact Form New Mesaage", // Subject line
    
    html:outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  req.flash("success","mailiniz basarili bir sekilde gonderildi")

  res.status(200).redirect("/contact")
} catch (error) {
  //req.flash("error",`mailiniz  gonderilemedi${error}`)
  req.flash("error",`mailiniz  gonderilemedi`)
  res.status(200).redirect("/contact")
  
}
}
export {getIndexPage,getAboutPage,getLoginPage,getRegisterPage,getContactPage,sendEmail}


