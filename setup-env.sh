#!/bin/bash

# Bake-Ree Environment Variables Setup Script
# This script adds required API keys and environment variables

echo "🚀 Setting up Bake-Ree environment variables..."
echo ""

# Client .env.local file
CLIENT_ENV_FILE="client/.env.local"

# Server .env file
SERVER_ENV_FILE="server/.env"

# Create client .env.local if it doesn't exist
if [ ! -f "$CLIENT_ENV_FILE" ]; then
    echo "Creating $CLIENT_ENV_FILE..."
    touch "$CLIENT_ENV_FILE"
fi

# Create server .env if it doesn't exist
if [ ! -f "$SERVER_ENV_FILE" ]; then
    echo "Creating $SERVER_ENV_FILE..."
    touch "$SERVER_ENV_FILE"
fi

echo "📝 Adding environment variables..."
echo ""

# Add Google Maps API Key to client .env.local
if ! grep -q "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY" "$CLIENT_ENV_FILE"; then
    echo "" >> "$CLIENT_ENV_FILE"
    echo "# Google Maps API Key for Delivery Tracking" >> "$CLIENT_ENV_FILE"
    echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE" >> "$CLIENT_ENV_FILE"
    echo "✅ Added NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to $CLIENT_ENV_FILE"
else
    echo "⚠️  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY already exists in $CLIENT_ENV_FILE"
fi

# Add API URL to client .env.local if not exists
if ! grep -q "NEXT_PUBLIC_API_URL" "$CLIENT_ENV_FILE"; then
    echo "" >> "$CLIENT_ENV_FILE"
    echo "# Backend API URL" >> "$CLIENT_ENV_FILE"
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000" >> "$CLIENT_ENV_FILE"
    echo "✅ Added NEXT_PUBLIC_API_URL to $CLIENT_ENV_FILE"
else
    echo "⚠️  NEXT_PUBLIC_API_URL already exists in $CLIENT_ENV_FILE"
fi

# Add MongoDB URI to server .env if not exists
if ! grep -q "MONGO_URI" "$SERVER_ENV_FILE"; then
    echo "" >> "$SERVER_ENV_FILE"
    echo "# MongoDB Connection String" >> "$SERVER_ENV_FILE"
    echo "MONGO_URI=mongodb://localhost:27017/bakeree" >> "$SERVER_ENV_FILE"
    echo "✅ Added MONGO_URI to $SERVER_ENV_FILE"
else
    echo "⚠️  MONGO_URI already exists in $SERVER_ENV_FILE"
fi

# Add JWT Secret to server .env if not exists
if ! grep -q "JWT_SECRET" "$SERVER_ENV_FILE"; then
    echo "" >> "$SERVER_ENV_FILE"
    echo "# JWT Secret Key for Authentication" >> "$SERVER_ENV_FILE"
    echo "JWT_SECRET=$(openssl rand -base64 32)" >> "$SERVER_ENV_FILE"
    echo "✅ Added JWT_SECRET to $SERVER_ENV_FILE"
else
    echo "⚠️  JWT_SECRET already exists in $SERVER_ENV_FILE"
fi

# Add Port to server .env if not exists
if ! grep -q "PORT" "$SERVER_ENV_FILE"; then
    echo "" >> "$SERVER_ENV_FILE"
    echo "# Server Port" >> "$SERVER_ENV_FILE"
    echo "PORT=5000" >> "$SERVER_ENV_FILE"
    echo "✅ Added PORT to $SERVER_ENV_FILE"
else
    echo "⚠️  PORT already exists in $SERVER_ENV_FILE"
fi

# Add Email Configuration placeholders to server .env if not exists
if ! grep -q "EMAIL_HOST" "$SERVER_ENV_FILE"; then
    echo "" >> "$SERVER_ENV_FILE"
    echo "# Email Configuration (Optional - for order notifications)" >> "$SERVER_ENV_FILE"
    echo "EMAIL_HOST=smtp.gmail.com" >> "$SERVER_ENV_FILE"
    echo "EMAIL_PORT=587" >> "$SERVER_ENV_FILE"
    echo "EMAIL_USER=your_email@gmail.com" >> "$SERVER_ENV_FILE"
    echo "EMAIL_PASS=your_app_password_here" >> "$SERVER_ENV_FILE"
    echo "EMAIL_FROM=\"Bake-Ree\" <your_email@gmail.com>" >> "$SERVER_ENV_FILE"
    echo "✅ Added Email configuration placeholders to $SERVER_ENV_FILE"
else
    echo "⚠️  Email configuration already exists in $SERVER_ENV_FILE"
fi

# Add Frontend URL to server .env if not exists
if ! grep -q "FRONTEND_URL" "$SERVER_ENV_FILE"; then
    echo "" >> "$SERVER_ENV_FILE"
    echo "# Frontend URL (for CORS and email links)" >> "$SERVER_ENV_FILE"
    echo "FRONTEND_URL=http://localhost:3000" >> "$SERVER_ENV_FILE"
    echo "✅ Added FRONTEND_URL to $SERVER_ENV_FILE"
else
    echo "⚠️  FRONTEND_URL already exists in $SERVER_ENV_FILE"
fi

echo ""
echo "✨ Environment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Get your Google Maps API key from: https://console.cloud.google.com/"
echo "2. Replace 'YOUR_GOOGLE_MAPS_API_KEY_HERE' in $CLIENT_ENV_FILE"
echo "3. Configure email settings in $SERVER_ENV_FILE (optional)"
echo "4. Update MongoDB URI if using a remote database"
echo ""
echo "🔐 Important: Never commit .env files to version control!"

