#!/bin/bash

# Open Localhost - Quick Access Script
# Opens the scholarship matcher app in your default browser

echo "🚀 Opening Scholarship Matcher..."
echo ""
echo "📍 Localhost URL: http://localhost:3000"
echo ""

# Try to get network IP for mobile access
NETWORK_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | head -1 | awk '{print $2}' || ipconfig getifaddr en0 2>/dev/null)

if [ ! -z "$NETWORK_IP" ]; then
    echo "📱 Network URL: http://$NETWORK_IP:3000"
    echo "   (Use this on mobile devices on the same WiFi)"
    echo ""
fi

# Check if server is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Server is running!"
    echo ""
    
    # Open in browser
    if command -v open > /dev/null; then
        open http://localhost:3000
        echo "🌐 Opened in your default browser"
    elif command -v xdg-open > /dev/null; then
        xdg-open http://localhost:3000
        echo "🌐 Opened in your default browser"
    else
        echo "⚠️  Please open http://localhost:3000 in your browser"
    fi
else
    echo "⚠️  Server is not running!"
    echo ""
    echo "To start the server, run:"
    echo "  npm run dev"
    echo ""
    echo "Or for network access (mobile testing):"
    echo "  npm run dev:network"
fi

echo ""
echo "📚 For more info, see LOCALHOST_GUIDE.md"

