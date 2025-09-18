import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Send, CheckCircle } from "lucide-react";

interface ProcessActionsProps {
  scholarships: Array<{
    studentName: string;
    studentId: string;
    amount: string;
    status: "pending" | "approved" | "disbursed";
  }>;
}

export const ProcessActions = ({ scholarships }: ProcessActionsProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleProcessDisbursements = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    const approvedScholarships = scholarships.filter(s => s.status === "approved");
    
    for (let i = 0; i < approvedScholarships.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(((i + 1) / approvedScholarships.length) * 100);
    }
    
    setIsProcessing(false);
    toast({
      title: "Disbursements Processed",
      description: `Successfully processed ${approvedScholarships.length} scholarship disbursements.`,
    });
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reportData = {
      totalStudents: scholarships.length,
      totalAmount: scholarships.reduce((sum, s) => sum + parseFloat(s.amount.replace('$', '').replace(',', '')), 0),
      byStatus: {
        pending: scholarships.filter(s => s.status === "pending").length,
        approved: scholarships.filter(s => s.status === "approved").length,
        disbursed: scholarships.filter(s => s.status === "disbursed").length,
      }
    };
    
    setIsGenerating(false);
    toast({
      title: "Report Generated",
      description: "Scholarship distribution report has been created successfully.",
    });
  };

  const handleExportData = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const csvData = scholarships.map(s => ({
      "Student Name": s.studentName,
      "Student ID": s.studentId,
      "Amount": s.amount,
      "Status": s.status.charAt(0).toUpperCase() + s.status.slice(1)
    }));
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(csvData[0]).join(",") + "\n" +
      csvData.map(row => Object.values(row).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scholarship_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsExporting(false);
    toast({
      title: "Data Exported",
      description: "Scholarship data has been exported to CSV successfully.",
    });
  };

  return (
    <Card className="bg-card shadow-academic border border-academic-gold/10">
      <CardHeader>
        <CardTitle className="font-serif text-lg text-academic-blue">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-academic hover:opacity-90" disabled={isProcessing}>
              <Send className="w-4 h-4 mr-2" />
              Process Disbursements
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-academic-blue">Process Disbursements</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This will process all approved scholarships for disbursement.
              </p>
              {isProcessing && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-xs text-center text-muted-foreground">
                    Processing... {Math.round(progress)}%
                  </p>
                </div>
              )}
              <Button 
                onClick={handleProcessDisbursements} 
                disabled={isProcessing}
                className="w-full bg-gradient-academic"
              >
                {isProcessing ? (
                  "Processing..."
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Process
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Button 
          variant="outline" 
          className="w-full border-academic-gold text-academic-gold hover:bg-academic-gold hover:text-academic-blue"
          onClick={handleGenerateReport}
          disabled={isGenerating}
        >
          <FileText className="w-4 h-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate Report"}
        </Button>

        <Button 
          variant="outline" 
          className="w-full border-academic-blue text-academic-blue hover:bg-academic-blue hover:text-primary-foreground"
          onClick={handleExportData}
          disabled={isExporting}
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? "Exporting..." : "Export Data"}
        </Button>
      </CardContent>
    </Card>
  );
};