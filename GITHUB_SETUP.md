# GitHub Repository Setup

Your local repository is now connected to: **https://github.com/T1mmsquared/Scholarship-Match.git**

## Push Your Code to GitHub

You need to authenticate to push code. Choose one of these methods:

### Option 1: Personal Access Token (Recommended)

1. **Create a Personal Access Token**:
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Name it: "Scholarship Matcher"
   - Select scopes: `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push using the token**:
   ```bash
   git push -u origin main
   ```
   - Username: `T1mmsquared`
   - Password: **Paste your personal access token** (not your GitHub password)

### Option 2: GitHub CLI (Easiest)

If you have GitHub CLI installed:
```bash
gh auth login
gh repo set-default T1mmsquared/Scholarship-Match
git push -u origin main
```

### Option 3: SSH Key (Most Secure)

1. **Generate SSH key**:
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add to GitHub**:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
   - Copy the output
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste and save

3. **Update remote to SSH**:
   ```bash
   git remote set-url origin git@github.com:T1mmsquared/Scholarship-Match.git
   git push -u origin main
   ```

## Verify Connection

Check your remote:
```bash
git remote -v
```

Should show:
```
origin  https://github.com/T1mmsquared/Scholarship-Match.git (fetch)
origin  https://github.com/T1mmsquared/Scholarship-Match.git (push)
```

## Future Pushes

Once authenticated, you can simply use:
```bash
git add .
git commit -m "Your commit message"
git push
```

## View Your Repository

After pushing, view it at:
**https://github.com/T1mmsquared/Scholarship-Match**

