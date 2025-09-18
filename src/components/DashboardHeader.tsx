import { GraduationCap } from "lucide-react";
import academicHero from "@/assets/academic-hero.jpg";
import scholarshipLogo from "@/assets/scholarship-logo.svg";

export const DashboardHeader = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-academic text-primary-foreground">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${academicHero})` }}
      />
      <div className="relative z-10 px-6 py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center p-2">
            <img src={scholarshipLogo} alt="Confidential Scholarships Logo" className="w-full h-full object-contain" />
          </div>
        </div>
        <h1 className="text-4xl font-bold font-serif mb-3">
          Support Students, Keep Privacy
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Confidential scholarship distribution system ensuring student grant amounts 
          remain encrypted and secure from unauthorized access.
        </p>
        <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-80">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>End-to-End Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Excellence</span>
          </div>
        </div>
      </div>
    </div>
  );
};