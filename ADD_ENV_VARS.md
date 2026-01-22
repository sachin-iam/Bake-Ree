# 🔧 Adding Environment Variables

## Quick Setup Commands

Run these commands in your terminal from the project root:

### Option 1: Use the Setup Script (Recommended)

```bash
# Make script executable (if not already)
chmod +x setup-env.sh

# Run the setup script
./setup-env.sh
```

### Option 2: Manual Setup with Echo Commands

#### For Client (Next.js) - `.env.local`

```bash
# Navigate to client directory
cd client

# Add Google Maps API Key
echo "" >> .env.local
echo "# Google Maps API Key for Delivery Tracking" >> .env.local
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE" >> .env.local

# Add API URL
echo "" >> .env.local
echo "# Backend API URL" >> .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" >> .env.local

cd ..
```

#### For Server (Express.js) - `.env`

```bash
# Navigate to server directory
cd server

# Add MongoDB URI
echo "" >> .env
echo "# MongoDB Connection String" >> .env
echo "MONGO_URI=mongodb://localhost:27017/bakeree" >> .env

# Add JWT Secret (generates a random secret)
echo "" >> .env
echo "# JWT Secret Key for Authentication" >> .env
echo "JWT_SECRET=$(openssl rand -base64 32)" >> .env

# Add Server Port
echo "" >> .env
echo "# Server Port" >> .env
echo "PORT=5000" >> .env

# Add Email Configuration (Optional)
echo "" >> .env
echo "# Email Configuration (Optional - for order notifications)" >> .env
echo "EMAIL_HOST=smtp.gmail.com" >> .env
echo "EMAIL_PORT=587" >> .env
echo "EMAIL_USER=your_email@gmail.com" >> .env
echo "EMAIL_PASS=your_app_password_here" >> .env
echo "EMAIL_FROM=\"Bake-Ree\" <your_email@gmail.com>" >> .env

# Add Frontend URL
echo "" >> .env
echo "# Frontend URL (for CORS and email links)" >> .env
echo "FRONTEND_URL=http://localhost:3000" >> .env

cd ..
```

## All-in-One Command (Run from Project Root)

```bash
# Client environment variables
echo "" >> client/.env.local && \
echo "# Google Maps API Key for Delivery Tracking" >> client/.env.local && \
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE" >> client/.env.local && \
echo "" >> client/.env.local && \
echo "# Backend API URL" >> client/.env.local && \
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" >> client/.env.local && \

# Server environment variables
echo "" >> server/.env && \
echo "# MongoDB Connection String" >> server/.env && \
echo "MONGO_URI=mongodb://localhost:27017/bakeree" >> server/.env && \
echo "" >> server/.env && \
echo "# JWT Secret Key for Authentication" >> server/.env && \
echo "JWT_SECRET=$(openssl rand -base64 32)" >> server/.env && \
echo "" >> server/.env && \
echo "# Server Port" >> server/.env && \
echo "PORT=5000" >> server/.env && \
echo "" >> server/.env && \
echo "# Frontend URL (for CORS and email links)" >> server/.env && \
echo "FRONTEND_URL=http://localhost:3000" >> server/.env && \

echo "✅ Environment variables added successfully!"
```

## Required API Keys

### 1. Google Maps API Key (Required for Delivery Tracking)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable these APIs:
   - Maps JavaScript API
   - Directions API
   - Geocoding API (optional)
4. Create credentials → API Key
5. Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` in `client/.env.local`

### 2. Email Configuration (Optional)

For order confirmation emails, configure email settings in `server/.env`:

- **Gmail**: Use App Password (see `server/EMAIL_SETUP.md`)
- **SendGrid**: Use SMTP credentials
- **Mailgun**: Use SMTP credentials

## Verify Setup

After adding variables, verify they're set:

```bash
# Check client env
cat client/.env.local

# Check server env
cat server/.env
```

## Important Notes

⚠️ **Never commit `.env` or `.env.local` files to version control!**

These files are already in `.gitignore`, but always double-check before committing.

## Troubleshooting

### Google Maps Not Loading

1. Verify API key is correct in `client/.env.local`
2. Check API key restrictions in Google Cloud Console
3. Ensure Maps JavaScript API is enabled
4. Check browser console for errors

### Server Not Starting

1. Verify MongoDB is running
2. Check `MONGO_URI` is correct
3. Ensure `JWT_SECRET` is set
4. Check `PORT` is not in use

### Email Not Sending

1. Verify email credentials in `server/.env`
2. For Gmail, use App Password (not regular password)
3. Check email service logs
4. See `server/EMAIL_SETUP.md` for detailed setup

---

**Last Updated:** December 2024

