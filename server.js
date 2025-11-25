const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

const allowedOrigins = [
  "https://ureff3cts.github.io",
  "https://www.tjsasphaltandconcreterepair.com",
  "http://www.tjsasphaltandconcreterepair.com",
  "https://concrete-final-production.up.railway.app"
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  }
}));

app.use("/contact", rateLimit({ windowMs: 60 * 1000, max: 20 }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/contact", async (req, res) => {
  console.log("Contact request received:", req.body);
  const { name, email, phone, message } = req.body;
  if (!email || !message) return res.status(400).json({ error: "Email and message are required." });

  console.log("Environment check:", {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER ? "SET" : "MISSING",
    SMTP_PASS: process.env.SMTP_PASS ? "SET" : "MISSING",
    MAIL_FROM: process.env.MAIL_FROM,
    MAIL_TO: process.env.MAIL_TO
  });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM || "tjsasphaltandconcreterepair@outlook.com",
      replyTo: email,
      to: process.env.MAIL_TO,
      subject: `New contact from ${name || "Unknown"}`,
      text: `From: ${name || "Unknown"} <${email}>
Phone: ${phone || "Not provided"}

Message:
${message}`
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send message.", details: err.message });
  }
});

// Serve index.html for root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
