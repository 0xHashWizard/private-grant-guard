# Vercel Deployment Guide for Private Grant Guard

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare your configuration values

## Step-by-Step Deployment

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `0xHashWizard/private-grant-guard`
4. Select the repository and click "Import"

### Step 2: Configure Build Settings

1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Leave as default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel dashboard, go to Settings > Environment Variables and add:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

### Step 4: Deploy

1. Click "Deploy" button
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### Step 5: Custom Domain (Optional)

1. Go to Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### Smart Contract Deployment

1. **Deploy Contract to Sepolia**:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

2. **Update Contract Address**:
   - Copy the deployed contract address
   - Update `src/hooks/useContract.ts` with the new address
   - Commit and push changes
   - Redeploy on Vercel

### Environment Variables for Production

Ensure these are set in Vercel dashboard:

- `NEXT_PUBLIC_CHAIN_ID`: 11155111 (Sepolia)
- `NEXT_PUBLIC_RPC_URL`: Your Infura or Alchemy endpoint
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect project ID
- `NEXT_PUBLIC_INFURA_API_KEY`: Your Infura API key

### Monitoring and Analytics

1. **Vercel Analytics**: Enable in dashboard for performance monitoring
2. **Error Tracking**: Consider adding Sentry for error monitoring
3. **Uptime Monitoring**: Set up monitoring for your domain

## Troubleshooting

### Common Issues

1. **Build Failures**:
- Check that all dependencies are in `package.json`
- Ensure build command is correct
- Check for TypeScript errors

2. **Environment Variables**:
- Verify all required variables are set
- Check variable names match exactly
- Ensure no trailing spaces

3. **Contract Connection**:
- Verify contract is deployed
- Check contract address is correct
- Ensure RPC URL is accessible

### Performance Optimization

1. **Image Optimization**: Use Vercel's image optimization
2. **Caching**: Configure appropriate cache headers
3. **CDN**: Vercel automatically provides global CDN

## Security Considerations

1. **API Keys**: Never commit API keys to repository
2. **Environment Variables**: Use Vercel's secure environment variable storage
3. **HTTPS**: Vercel automatically provides SSL certificates
4. **Access Control**: Implement proper authentication if needed

## Maintenance

1. **Regular Updates**: Keep dependencies updated
2. **Monitoring**: Check Vercel dashboard for performance metrics
3. **Backups**: Ensure code is backed up in GitHub
4. **SSL Certificates**: Vercel handles automatic renewal

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issues in the repository
- **Community Support**: Check Vercel community forums

## Additional Resources

- [Vercel CLI](https://vercel.com/cli) for local development
- [Vercel Functions](https://vercel.com/docs/functions) for serverless functions
- [Vercel Edge Functions](https://vercel.com/docs/edge-functions) for edge computing
