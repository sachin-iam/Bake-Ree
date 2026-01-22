#!/bin/bash

echo "🔄 Restarting Bake Ree Server..."

# Find and kill existing server process
PID=$(lsof -ti:5000 2>/dev/null)
if [ ! -z "$PID" ]; then
    echo "⏹️  Stopping existing server (PID: $PID)..."
    kill $PID
    sleep 2
fi

# Start the server
echo "🚀 Starting server..."
cd server
npm start

