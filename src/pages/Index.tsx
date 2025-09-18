import { DashboardHeader } from "@/components/DashboardHeader";
import { ScholarshipCard } from "@/components/ScholarshipCard";
import { WalletConnection } from "@/components/WalletConnection";
import { ProcessActions } from "@/components/ProcessActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Users, DollarSign, Shield } from "lucide-react";

const mockScholarships = [
  {
    studentName: "Emma Thompson",
    studentId: "ST-2024-001",
    amount: "$5,000",
    encryptedAmount: "0xA7F2E9B1C4D8F3E2A9B7C1F4E8D2A5B9",
    status: "approved" as const,
    gpa: 3.85,
    major: "Computer Science"
  },
  {
    studentName: "Marcus Rodriguez",
    studentId: "ST-2024-002", 
    amount: "$3,500",
    encryptedAmount: "0xC2E8A9D5F1B7E4A3C8D2F9B1E5A7C3F6",
    status: "disbursed" as const,
    gpa: 3.92,
    major: "Engineering"
  },
  {
    studentName: "Sophia Chen",
    studentId: "ST-2024-003",
    amount: "$4,200",
    encryptedAmount: "0xB9F3C7E1A5D8B2F6C9E3A7D1F4B8C5E2",
    status: "pending" as const,
    gpa: 3.78,
    major: "Mathematics"
  },
  {
    studentName: "James Wilson",
    studentId: "ST-2024-004",
    amount: "$6,000",
    encryptedAmount: "0xE4A8C2F7B3D9E1A6C4F8B2D5E9A3C7F1",
    status: "approved" as const,
    gpa: 3.95,
    major: "Physics"
  },
  {
    studentName: "Isabella Garcia",
    studentId: "ST-2024-005",
    amount: "$2,800",
    encryptedAmount: "0xF1C5B9E2A7D3F8C1B6E4A9D2F7C3B8E5",
    status: "disbursed" as const,
    gpa: 3.69,
    major: "Chemistry"
  },
  {
    studentName: "David Kim",
    studentId: "ST-2024-006",
    amount: "$4,750",
    encryptedAmount: "0xA3F8C1E6B4D7A2F9C5E8B1D4A7F2C9E3",
    status: "pending" as const,
    gpa: 3.87,
    major: "Biology"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg p-6 shadow-academic border border-academic-blue/10">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-academic-blue" />
              <div>
                <p className="text-2xl font-bold text-academic-blue">127</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-academic border border-academic-gold/10">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-academic-gold" />
              <div>
                <p className="text-2xl font-bold text-academic-gold">$847K</p>
                <p className="text-sm text-muted-foreground">Total Distributed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-academic border border-encrypted-border">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-academic-blue" />
              <div>
                <p className="text-2xl font-bold text-academic-blue">100%</p>
                <p className="text-sm text-muted-foreground">Privacy Protected</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Dashboard Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-lg shadow-academic">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search students by name or ID..." 
                  className="pl-10 border-academic-blue/20 focus:border-academic-blue"
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px] border-academic-blue/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="disbursed">Disbursed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="border-academic-blue/20">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Scholarship Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {mockScholarships.map((scholarship, index) => (
                <ScholarshipCard key={index} {...scholarship} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WalletConnection />
            <ProcessActions scholarships={mockScholarships} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;