# Deployment Guide - Render.com

## Prerequisites
1. Push your code to GitHub
2. Create a free account at [render.com](https://render.com)

## Deployment Steps
1. Visit [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub account when prompted
4. Select your `Deutsch-Karten` repository
5. Render will auto-configure using the `render.yaml` file
6. Click "Create Web Service"
7. Wait 2-5 minutes for deployment
8. Your app will be live at `https://[your-app-name].onrender.com`

## First-time GitHub Setup
If you haven't pushed to GitHub yet:

```bash
git add .
git commit -m "Initial commit - German flashcards app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Deutsch-Karten.git
git push -u origin main
```

## Notes
- Render's free tier may spin down after inactivity (takes ~30s to wake up)
- No environment variables needed - the app uses a local CSV file
- You can add a custom domain later in Render's dashboard under Settings → Custom Domains

## Updating Your App
After making changes locally:
```bash
git add .
git commit -m "Update description"
git push
```
Render will automatically redeploy your changes!