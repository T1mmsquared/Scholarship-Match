#!/bin/bash

# Script to push to GitHub with authentication help

echo "🚀 Pushing Scholarship Matcher to GitHub..."
echo ""
echo "You'll need to authenticate. Here are your options:"
echo ""
echo "Option 1: Use Personal Access Token (Recommended)"
echo "  1. Go to: https://github.com/settings/tokens"
echo "  2. Generate new token (classic) with 'repo' scope"
echo "  3. Copy the token"
echo "  4. Run: git push -u origin main"
echo "  5. Username: T1mmsquared"
echo "  6. Password: [paste your token]"
echo ""
echo "Option 2: Use GitHub CLI"
echo "  Run: gh auth login"
echo "  Then: git push -u origin main"
echo ""
echo "Attempting push now..."
echo ""

git push -u origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Push failed. You need to authenticate."
    echo ""
    echo "Quick fix - Create a Personal Access Token:"
    echo "1. Visit: https://github.com/settings/tokens/new"
    echo "2. Name: 'Scholarship Matcher'"
    echo "3. Expiration: 90 days (or your preference)"
    echo "4. Select scope: ✅ repo (Full control of private repositories)"
    echo "5. Click 'Generate token'"
    echo "6. Copy the token"
    echo "7. Run this command again:"
    echo "   git push -u origin main"
    echo "8. When prompted:"
    echo "   Username: T1mmsquared"
    echo "   Password: [paste your token here]"
    echo ""
fi

