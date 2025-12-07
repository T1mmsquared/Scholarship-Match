# 🚀 Localhost Development Guide

## Quick Start

The development server is now running! Access your application at:

### **Primary URL:**
```
http://localhost:3000
```

### **Network Access (for mobile testing):**
```
http://[YOUR-IP]:3000
```

To find your IP address:
- **macOS/Linux:** Run `ifconfig | grep "inet "` or `ipconfig getifaddr en0`
- **Windows:** Run `ipconfig` and look for IPv4 Address

---

## 🎯 Access Points

### Main Dashboard
- **URL:** `http://localhost:3000/`
- **Description:** Main landing page with onboarding or dashboard

### Browse Scholarships
- **URL:** `http://localhost:3000/scholarships`
- **Description:** Browse and filter all available scholarships

### My Applications
- **URL:** `http://localhost:3000/applications`
- **Description:** View your saved and in-progress applications

### Profile
- **URL:** `http://localhost:3000/profile`
- **Description:** View and edit your user profile

### Apply to Scholarship
- **URL:** `http://localhost:3000/apply/[scholarship-id]`
- **Description:** Application page for a specific scholarship

---

## 🛠️ Development Commands

### Start Development Server
```bash
npm run dev
```
Starts the server on `http://localhost:3000`

### Start with Network Access (for mobile testing)
```bash
npm run dev:network
```
Starts the server accessible from your network at `http://[YOUR-IP]:3000`

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Linter
```bash
npm run lint
```

---

## 📱 Mobile Testing

### Option 1: Network Access
1. Start server with network access:
   ```bash
   npm run dev:network
   ```
2. Find your computer's IP address
3. On your mobile device, connect to the same WiFi network
4. Open browser and navigate to: `http://[YOUR-IP]:3000`

### Option 2: Localhost Tunnel (ngrok)
1. Install ngrok: `npm install -g ngrok`
2. Start your dev server: `npm run dev`
3. In another terminal: `ngrok http 3000`
4. Use the ngrok URL on any device

---

## 🔧 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Server Not Starting
1. Check Node.js version: `node --version` (should be 18+)
2. Install dependencies: `npm install`
3. Clear Next.js cache: `rm -rf .next`
4. Try again: `npm run dev`

### Cannot Access from Mobile
1. Ensure both devices are on the same WiFi network
2. Check firewall settings (allow port 3000)
3. Use `npm run dev:network` instead of `npm run dev`
4. Verify IP address is correct

---

## 📊 Development Features

### Hot Reload
- Changes to files automatically reload the browser
- No need to manually refresh

### Error Overlay
- Errors appear as an overlay in the browser
- Click to see full stack trace

### Fast Refresh
- React components update without losing state
- Form inputs and scroll positions preserved

---

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

---

## 🎨 Features to Test

### Dark Mode
- Click the theme toggle in the navigation
- Should persist across page refreshes

### Form Validation
- Try the onboarding flow
- Enter invalid GPA (e.g., 5.0) to see validation
- Enter invalid state code to see format validation

### Toast Notifications
- Save a scholarship to see success toast
- Submit an application to see confirmation toast

### Animations
- Hover over scholarship cards
- Click buttons to see active states
- Navigate between pages to see transitions

---

## 📝 Notes

- The server runs in the background
- To stop the server, press `Ctrl+C` in the terminal
- Changes to code automatically trigger rebuilds
- First build may take 30-60 seconds
- Subsequent builds are much faster

---

## 🚀 Production Deployment

When ready for production:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

3. Or deploy to Vercel (recommended):
   ```bash
   npm install -g vercel
   vercel
   ```

---

**Happy Coding! 🎉**

