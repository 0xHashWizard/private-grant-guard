import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, GraduationCap } from "lucide-react";

interface ScholarshipCardProps {
  studentName: string;
  studentId: string;
  amount: string;
  encryptedAmount: string;
  status: "pending" | "approved" | "disbursed";
  gpa: number;
  major: string;
}

export const ScholarshipCard = ({
  studentName,
  studentId,
  amount,
  encryptedAmount,
  status,
  gpa,
  major,
}: ScholarshipCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-academic-gold text-academic-blue";
      case "disbursed":
        return "bg-academic-blue text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group hover:shadow-elevated transition-all duration-300 border-encrypted-border bg-gradient-to-br from-card to-encrypted-bg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-serif text-academic-blue flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            {studentName}
          </CardTitle>
          <Badge className={getStatusColor(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">ID: {studentId}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-encrypted-bg rounded-lg border border-encrypted-border">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-academic-blue" />
            <span className="text-sm font-medium text-academic-blue">Encrypted Amount</span>
          </div>
          <code className="text-sm font-mono bg-card px-2 py-1 rounded border">
            {encryptedAmount}
          </code>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Major</p>
            <p className="font-medium text-foreground">{major}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">GPA</p>
            <p className="font-medium text-foreground">{gpa.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Shield className="w-4 h-4 text-academic-gold" />
          <span className="text-xs text-muted-foreground">
            Privacy Protected • End-to-End Encrypted
          </span>
        </div>
      </CardContent>
    </Card>
  );
};