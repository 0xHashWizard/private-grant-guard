import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Shield, CheckCircle } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const WalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <Card className="border-academic-blue/20 bg-gradient-to-br from-card to-academic-gold-light/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-academic-blue">
          <Wallet className="w-5 h-5" />
          Wallet Connection
        </CardTitle>
        <CardDescription>
          Connect your wallet to enable secure scholarship disbursements
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Secure, encrypted transactions only</span>
        </div>
        <ConnectButton />
        {isConnected && address && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-academic-blue">
              <CheckCircle className="w-4 h-4" />
              <span>Wallet Connected</span>
            </div>
            <div className="p-3 bg-encrypted-bg rounded-lg border border-encrypted-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Connected Address
              </p>
              <code className="text-sm font-mono text-academic-blue break-all">
                {address}
              </code>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};