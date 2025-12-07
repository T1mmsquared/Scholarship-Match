#!/bin/bash

# Scholarship Matcher - Run Script
# This script starts the development server

echo "🚀 Starting Scholarship Matcher..."
echo ""
echo "📱 To view in mobile mode in browser:"
echo "   1. Open http://localhost:3000 in Chrome/Edge"
echo "   2. Press F12 (or Cmd+Option+I on Mac) to open DevTools"
echo "   3. Click the device toolbar icon (📱) or press Cmd+Shift+M"
echo "   4. Select a mobile device (iPhone 14 Pro recommended)"
echo ""
echo "📲 To view on your mobile device:"
echo "   1. Make sure your phone is on the same WiFi network"
echo "   2. Find your computer's IP address (run: ipconfig getifaddr en0)"
echo "   3. Open http://YOUR_IP:3000 on your phone"
echo ""
echo "🌐 The app will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "$(dirname "$0")"

# Check if port 3000 is in use
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  Port 3000 is already in use. Stopping existing process..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

npm run dev

