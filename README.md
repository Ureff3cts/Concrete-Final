# TJ's Asphalt and Concrete Repair Website

A professional website for TJ's Asphalt and Concrete Repair services featuring a contact form with email notifications.

## Repository

https://github.com/Ureff3cts/Concrete-Final

## Features

- Responsive design for all devices
- Service showcase with before/after galleries
- Contact form with email notifications
- Rate limiting for security
- CORS protection

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Email**: Nodemailer with Office365 SMTP
- **Security**: Helmet, CORS, Express Rate Limit
- **Deployment**:
  - Frontend: GitHub Pages
  - Backend: Railway

## Prerequisites

- Node.js 18 or higher
- npm
- Office365 email account (for SMTP)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ureff3cts/Concrete-Final.git
cd Concrete-Final
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
MAIL_FROM=your-email@outlook.com
MAIL_TO=recipient@example.com
PORT=3000
```

## Running Locally

Start the development server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Deployment

### Frontend (GitHub Pages)

1. Push your code to GitHub
2. Go to Settings → Pages
3. Select Source: GitHub Actions
4. The `static.yml` workflow will automatically deploy your site

### Backend (Railway)

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `MAIL_FROM`
   - `MAIL_TO`
4. Deploy automatically on push to main branch

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_HOST` | SMTP server hostname | smtp.office365.com |
| `SMTP_PORT` | SMTP server port | 587 |
| `SMTP_USER` | Email account username | your-email@outlook.com |
| `SMTP_PASS` | Email account password | your-password |
| `MAIL_FROM` | Sender email address | your-email@outlook.com |
| `MAIL_TO` | Recipient email address | recipient@example.com |
| `PORT` | Server port (optional) | 3000 |

## Domain Configuration

If using a custom domain with GitHub Pages:

1. Go to your repository Settings → Pages
2. Enter your custom domain
3. Configure DNS records with your domain provider:
   - Type: `A` Record
   - Host: `@` or `www`
   - Value: GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

## Security Features

- **Helmet**: Sets security headers
- **CORS**: Restricts cross-origin requests to allowed domains
- **Rate Limiting**: Limits requests to 20 per 15 minutes per IP
- **Environment Variables**: Sensitive data stored securely

## File Structure

```
Concrete-Final/
├── .github/
│   └── workflows/
│       ├── static.yml       # GitHub Pages deployment
│       └── deploy.yml       # Railway deployment
├── images/                  # All project images
├── .env                     # Environment variables (not in git)
├── .gitignore              # Git ignore rules
├── index.html              # Main website file
├── server.js               # Express backend server
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## Contact Form

The contact form sends emails using Nodemailer through Office365 SMTP. Make sure to:

1. Configure your Office365 account to allow SMTP
2. Set correct environment variables
3. Test the form after deployment

## Support

For issues or questions, please open an issue on GitHub:
https://github.com/Ureff3cts/Concrete-Final/issues

## License

© 2024 TJ's Asphalt and Concrete Repair. All rights reserved.
