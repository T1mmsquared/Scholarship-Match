#!/bin/bash
# Quick script to open the app in mobile view

echo "Opening Scholarship Matcher in mobile view..."
echo ""
echo "If the server isn't running, start it with: ./run.sh"
echo ""

# Open Chrome with mobile view
if command -v open >/dev/null 2>&1; then
    # macOS
    open -a "Google Chrome" "http://localhost:3000" 2>/dev/null || \
    open -a "Microsoft Edge" "http://localhost:3000" 2>/dev/null || \
    open "http://localhost:3000"
    
    echo "✅ Opened in browser"
    echo ""
    echo "📱 To enable mobile view:"
    echo "   1. Press Cmd+Option+I to open DevTools"
    echo "   2. Press Cmd+Shift+M to toggle device toolbar"
    echo "   3. Select 'iPhone 14 Pro' from device dropdown"
else
    echo "Please open http://localhost:3000 in your browser"
    echo "Then press F12 and toggle device toolbar"
fi
