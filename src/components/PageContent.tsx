
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface PageContentProps {
  icon?: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}

const PageContent = ({ icon, title, description, children }: PageContentProps) => {
  return (
    <Card className="p-6 animate-in">
      <div className="text-center mb-6">
        {icon && <div className="text-brand-blue mb-4">{icon}</div>}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
      {children}
    </Card>
  );
};

export default PageContent;
