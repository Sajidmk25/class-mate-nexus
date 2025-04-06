
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type DonationStep = 1 | 2 | 3;

interface DonationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const DonationDialog = ({ isOpen, onOpenChange }: DonationDialogProps) => {
  const [currentStep, setCurrentStep] = useState<DonationStep>(1);
  
  // Step 1 data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Step 2 data
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1
      if (!name || !email || !phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all the required fields",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Validate step 2
      if (!cardNumber || !expiryDate || !cvv || !amount) {
        toast({
          title: "Missing information",
          description: "Please fill in all the payment details",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep(3);
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep === 3 ? 2 : 1);
    }
  };
  
  const handleDonationSubmit = () => {
    toast({
      title: "Thank you for your donation!",
      description: `You have donated $${amount}. We appreciate your support.`,
    });
    onOpenChange(false);
    // Reset form
    setCurrentStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    setAmount("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-white/20">
        <DialogHeader>
          <DialogTitle className="text-gradient">Make a Donation</DialogTitle>
          <DialogDescription>
            {currentStep === 1 && "Please provide your contact information."}
            {currentStep === 2 && "Please enter your payment details."}
            {currentStep === 3 && "Confirm your donation details."}
          </DialogDescription>
        </DialogHeader>
        
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary/50 border-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary/50 border-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-secondary/50 border-white/20"
              />
            </div>
          </div>
        )}
        
        {/* Step 2: Payment Details */}
        {currentStep === 2 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Donation Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary/50 border-white/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card">Card Number</Label>
              <Input
                id="card"
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="bg-secondary/50 border-white/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="bg-secondary/50 border-white/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="bg-secondary/50 border-white/20"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-4 py-4">
            <div className="bg-secondary/50 p-4 rounded-lg border border-white/20">
              <h3 className="font-medium mb-2 text-gradient">Donation Summary</h3>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-400">Name:</span>
                <span>{name}</span>
                <span className="text-gray-400">Email:</span>
                <span>{email}</span>
                <span className="text-gray-400">Phone:</span>
                <span>{phone}</span>
                <span className="text-gray-400">Amount:</span>
                <span>${amount}</span>
                <span className="text-gray-400">Card:</span>
                <span>**** **** **** {cardNumber.slice(-4)}</span>
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePreviousStep} className="border-white/20">
              Previous
            </Button>
          )}
          {currentStep < 3 ? (
            <Button onClick={handleNextStep}>Next</Button>
          ) : (
            <Button onClick={handleDonationSubmit}>Confirm Donation</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
