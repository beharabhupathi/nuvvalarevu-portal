#!/bin/bash
# Smart Nuvvalarevu Portal Deployment Script

# Step 1: Initialize Git repo
git init
git branch -M main

# Step 2: Add all files
git add .

# Step 3: Commit changes
git commit -m "Deploy Smart Nuvvalarevu portal files"

# Step 4: Connect to GitHub repo (replace with your repo URL if different)
git remote add origin https://github.com/beharabhupathi/nuvvalarevu-portal.git

# Step 5: Push to GitHub
git push -u origin main

echo "✅ Deployment complete! Now enable GitHub Pages in repo settings."