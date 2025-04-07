
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AccountSettingCardProps {
  title: string;
  description: string;
  onClick: () => void;
  buttonText: string;
}

const AccountSettingCard = ({ 
  title, 
  description, 
  onClick, 
  buttonText 
}: AccountSettingCardProps) => {
  return (
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-3">
        {description}
      </p>
      <Button variant="outline" className="w-full" onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default AccountSettingCard;
