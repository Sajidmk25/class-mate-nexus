
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface PageContentProps {
  icon?: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

const PageContent = ({ icon, title, description, children, className = "" }: PageContentProps) => {
  return (
    <Card className={`p-6 animate-in card-hover bg-gradient-to-b from-card/70 to-background backdrop-blur-md border border-white/10 ${className}`}>
      <div className="text-center mb-8">
        {icon && (
          <div className="text-accent mb-4 inline-block p-4 bg-accent/10 rounded-full">
            {icon}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-3 font-playfair text-gradient">{title}</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
      </div>
      <div className="animate-fade-in">
        {children}
      </div>
    </Card>
  );
};

export default PageContent;
