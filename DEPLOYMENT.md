# Deployment Guide

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IPs (0.0.0.0/0) or Vercel IPs
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   ```

## Vercel Deployment

### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `./` (keep default)
   - Build Command: `npm run vercel-build`
   - Output Directory: `frontend/dist`

6. Add Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key
   JWT_REFRESH_SECRET=your-refresh-secret
   NODE_ENV=production
   FRONTEND_URL=https://your-app.vercel.app
   ```

7. Deploy!

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/genfitx8/JB-GOLF)

## Environment Variables

### Required Variables

#### MongoDB Atlas
- `MONGODB_URI`: Your MongoDB Atlas connection string
  ```
  mongodb+srv://username:password@cluster.mongodb.net/jb-golf?retryWrites=true&w=majority
  ```

#### JWT Secrets
Generate strong secrets using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

- `JWT_SECRET`: For access tokens
- `JWT_REFRESH_SECRET`: For refresh tokens

#### URLs
- `FRONTEND_URL`: Your Vercel app URL (e.g., https://jb-golf.vercel.app)
- `NODE_ENV`: Set to `production`

### Optional Variables

#### Email (for notifications)
- `SMTP_HOST`: smtp.gmail.com
- `SMTP_PORT`: 587
- `SMTP_USER`: your-email@gmail.com
- `SMTP_PASS`: your-app-password

#### OAuth
- `KAKAO_CLIENT_ID`
- `KAKAO_CLIENT_SECRET`
- `NAVER_CLIENT_ID`
- `NAVER_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

#### Payment
- `TOSS_SECRET_KEY`: For Toss Payments integration

## Post-Deployment

### 1. Test Your Deployment

Visit your deployed URL and test:
- ✅ User registration
- ✅ Login/Logout
- ✅ Create booking
- ✅ View bookings
- ✅ Cancel booking

### 2. Create Sample Data

Use MongoDB Compass or Atlas UI to add:
- Sample locations (golf ranges)
- Sample pros
- Test users

### 3. Monitor

- Check Vercel deployment logs
- Monitor MongoDB Atlas metrics
- Set up error tracking (optional: Sentry)

## Troubleshooting

### Build Errors

If build fails, check:
1. All dependencies are in package.json
2. Environment variables are set
3. MongoDB connection is working

### Runtime Errors

Common issues:
1. **MongoDB Connection Failed**
   - Check MONGODB_URI format
   - Verify IP whitelist in MongoDB Atlas
   - Check username/password

2. **CORS Errors**
   - Update FRONTEND_URL in backend
   - Check cors configuration

3. **Authentication Issues**
   - Verify JWT secrets are set
   - Check token expiration

## Scaling

### Database
- Upgrade MongoDB Atlas tier for more storage
- Add database indexes for performance
- Enable MongoDB Atlas backup

### Application
- Vercel automatically scales
- Consider adding Redis for caching
- Use CDN for static assets

## Security Checklist

- ✅ Use strong JWT secrets
- ✅ Enable HTTPS only
- ✅ Set secure CORS policy
- ✅ Enable rate limiting
- ✅ Use environment variables
- ✅ Keep dependencies updated
- ✅ Enable MongoDB Atlas monitoring

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Visit [MongoDB Atlas Support](https://www.mongodb.com/docs/atlas/)
- Open an issue on GitHub
