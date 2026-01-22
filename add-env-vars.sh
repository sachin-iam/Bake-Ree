#!/bin/bash

# Bake-Ree Environment Variables Quick Setup
# Run this script from the project root directory

echo "🚀 Setting up Bake-Ree environment variables..."
echo ""

# Create .env files if they don't exist
touch client/.env.local
touch server/.env

# Client Environment Variables
echo "📝 Adding client environment variables..."
echo "" >> client/.env.local
echo "# Google Maps API Key for Delivery Tracking" >> client/.env.local
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE" >> client/.env.local
echo "" >> client/.env.local
echo "# Backend API URL" >> client/.env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" >> client/.env.local

# Server Environment Variables
echo "📝 Adding server environment variables..."
echo "" >> server/.env
echo "# MongoDB Connection String" >> server/.env
echo "MONGO_URI=mongodb://localhost:27017/bakeree" >> server/.env
echo "" >> server/.env
echo "# JWT Secret Key for Authentication" >> server/.env
echo "JWT_SECRET=$(openssl rand -base64 32)" >> server/.env
echo "" >> server/.env
echo "# Server Port" >> server/.env
echo "PORT=5000" >> server/.env
echo "" >> server/.env
echo "# Frontend URL (for CORS and email links)" >> server/.env
echo "FRONTEND_URL=http://localhost:3000" >> server/.env
echo "" >> server/.env
echo "# Email Configuration (Optional - for order notifications)" >> server/.env
echo "EMAIL_HOST=smtp.gmail.com" >> server/.env
echo "EMAIL_PORT=587" >> server/.env
echo "EMAIL_USER=your_email@gmail.com" >> server/.env
echo "EMAIL_PASS=your_app_password_here" >> server/.env
echo "EMAIL_FROM=\"Bake-Ree\" <your_email@gmail.com>" >> server/.env

echo ""
echo "✅ Environment variables added successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Get your Google Maps API key from: https://console.cloud.google.com/"
echo "2. Replace 'YOUR_GOOGLE_MAPS_API_KEY_HERE' in client/.env.local"
echo "3. Configure email settings in server/.env (optional)"
echo "4. Update MongoDB URI if using a remote database"
echo ""

