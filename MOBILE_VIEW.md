# Viewing the App in Mobile Mode

## Quick Start

### Option 1: Using the Run Script
```bash
./run.sh
```

### Option 2: Manual Start
```bash
npm run dev
```

## Viewing Mobile View in Browser

### Chrome/Edge (Recommended)
1. Start the dev server: `npm run dev`
2. Open http://localhost:3000 in Chrome/Edge
3. Press `F12` (Windows/Linux) or `Cmd+Option+I` (Mac) to open DevTools
4. Click the **device toolbar icon** (📱) or press `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows/Linux)
5. Select a device from the dropdown:
   - iPhone 14 Pro (recommended)
   - iPhone SE
   - iPad
   - Or set custom dimensions (375x812 for iPhone)

### Firefox
1. Start the dev server: `npm run dev`
2. Open http://localhost:3000 in Firefox
3. Press `F12` to open DevTools
4. Click the **Responsive Design Mode** icon (📱) or press `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows/Linux)
5. Select a device from the dropdown

### Safari
1. Enable Developer menu: Safari → Preferences → Advanced → "Show Develop menu"
2. Start the dev server: `npm run dev`
3. Open http://localhost:3000 in Safari
4. Go to Develop → Enter Responsive Design Mode
5. Select a device from the dropdown

## Testing on Real Mobile Device

### On Same Network
1. Find your computer's IP address:
   - Mac: `ipconfig getifaddr en0` or check System Preferences → Network
   - Windows: `ipconfig` (look for IPv4 Address)
   - Linux: `hostname -I`

2. Start the dev server (it should be accessible on your network)

3. On your mobile device, open:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

### Using ngrok (External Access)
```bash
# Install ngrok: https://ngrok.com/download
ngrok http 3000
```
Then use the provided URL on your mobile device.

## Recommended Mobile Viewports

- **iPhone 14 Pro**: 393 × 852
- **iPhone SE**: 375 × 667
- **Samsung Galaxy S20**: 360 × 800
- **iPad**: 768 × 1024

## Features to Test in Mobile View

1. **Onboarding Flow** - Test the 3-step process
2. **Bottom Navigation** - Should be fixed at bottom
3. **Scholarship Cards** - Should be touch-friendly
4. **Swipe Gestures** - (Future feature)
5. **Touch Targets** - Buttons should be at least 44x44px
6. **Responsive Layout** - Content should adapt to screen size

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Can't Access from Mobile Device
- Make sure your computer and mobile device are on the same WiFi network
- Check firewall settings
- Try using `0.0.0.0` instead of `localhost` in Next.js config

### Mobile View Not Working
- Clear browser cache
- Try incognito/private mode
- Check that Tailwind responsive classes are working

