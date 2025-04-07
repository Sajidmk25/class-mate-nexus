
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProfilePhoto from "./ProfilePhoto";
import { useAuth } from "@/context/AuthContext";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

const ProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: ""
  });
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  useEffect(() => {
    if (user) {
      // Split name into first and last
      const nameParts = user.name.split(' ');
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(' ') || "";
      
      setFormData({
        firstName,
        lastName,
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || ""
      });
      
      setProfilePhotoUrl(user.photoURL || "");
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    updateProfile({
      name: fullName,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      photoURL: profilePhotoUrl
    });
  };

  const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`;

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <ProfilePhoto 
          profilePhotoUrl={profilePhotoUrl} 
          setProfilePhotoUrl={setProfilePhotoUrl} 
          initials={initials} 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
          />
          <p className="text-xs text-gray-500">
            Brief description about yourself that will be visible to instructors and classmates.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
