# 📧 Email Service Setup Guide

This guide explains how to configure the email service for Bake-Ree.

## Required Environment Variables

Add these variables to your `server/.env` file:

```env
# Email Configuration (for Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_FROM="Bake-Ree" <your_email@gmail.com>

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

## Gmail Setup Instructions

### Option 1: Using Gmail App Password (Recommended for Development)

1. **Enable 2-Step Verification** on your Google Account
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Click "Generate"
   - Copy the 16-character password (no spaces)

3. **Configure .env**
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx  # Use the app password here
   EMAIL_FROM="Bake-Ree" <your_email@gmail.com>
   ```

### Option 2: Using Other Email Providers

#### Outlook/Hotmail
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

#### SendGrid (Recommended for Production)
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
EMAIL_FROM="Bake-Ree" <noreply@yourdomain.com>
```

#### Mailgun (Recommended for Production)
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your_mailgun_smtp_username
EMAIL_PASS=your_mailgun_smtp_password
```

## Testing the Email Service

Once configured, the email service will automatically send:

1. **Welcome Email** - When a new user registers
2. **Order Confirmation Email** - When an order is placed
3. **Order Status Update Email** - When order status changes (Preparing, Ready, Delivered, etc.)

## Troubleshooting

### Emails not sending

1. **Check Environment Variables**
   - Verify all email variables are set in `.env`
   - Make sure there are no extra spaces or quotes

2. **Check Console Logs**
   - Look for email-related error messages in server logs
   - If you see "Email not configured", check your `.env` file

3. **Gmail Specific Issues**
   - Make sure you're using an App Password, not your regular password
   - Verify 2-Step Verification is enabled
   - Check that "Less secure app access" is NOT the issue (App Passwords bypass this)

4. **Firewall/Network Issues**
   - Port 587 should be open
   - Some networks block SMTP ports

### Testing in Development

The email service will gracefully handle errors and won't fail order creation if emails fail to send. Check server logs for email sending status.

## Production Recommendations

For production, consider using:

1. **SendGrid** - Easy setup, good free tier (100 emails/day)
2. **AWS SES** - Cost-effective for high volume
3. **Mailgun** - Developer-friendly, good free tier
4. **Postmark** - Great for transactional emails

These services provide better deliverability, analytics, and reliability than SMTP.

