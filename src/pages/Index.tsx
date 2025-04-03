
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Video, MessageSquare, ClipboardList, Calendar, Users, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-brand-blue font-bold text-xl">EduConnect</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-brand-blue">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-brand-blue">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-brand-blue">About</a>
            <a href="#contact" className="text-gray-600 hover:text-brand-blue">Contact</a>
          </nav>
          <div className="flex space-x-2">
            <Link to="/dashboard">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Virtual Classroom for <span className="text-brand-blue">Modern Education</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Connect, collaborate, and learn with our all-in-one virtual classroom platform
          designed for students and educators.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">Get Started</Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Learn More</Button>
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need for Virtual Learning
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card">
              <div className="text-brand-blue mb-4">
                <Video className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Virtual Classrooms</h3>
              <p className="text-gray-600">
                Real-time video conferencing with interactive whiteboards for engaging lessons.
              </p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-brand-blue mb-4">
                <MessageSquare className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Messaging & Chat</h3>
              <p className="text-gray-600">
                Connect with instructors and classmates through private and group chats.
              </p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-brand-blue mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Course Management</h3>
              <p className="text-gray-600">
                Organize and access course materials, lectures, and resources in one place.
              </p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-brand-blue mb-4">
                <ClipboardList className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Assignments & Quizzes</h3>
              <p className="text-gray-600">
                Create, submit, and grade assignments with automatic feedback.
              </p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-brand-blue mb-4">
                <Users className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Study Groups</h3>
              <p className="text-gray-600">
                Collaborate with peers in virtual study rooms for group learning.
              </p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-brand-blue mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                End-to-end encryption and privacy controls to protect your learning experience.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <p className="italic text-gray-600 mb-4">
                "EduConnect has transformed our online learning experience. The interactive features and ease of use make teaching remotely a pleasure."
              </p>
              <div className="font-semibold">Dr. Sarah Johnson</div>
              <div className="text-sm text-gray-500">University Professor</div>
            </Card>
            
            <Card className="p-6">
              <p className="italic text-gray-600 mb-4">
                "As a student, I love how I can access all my courses, assignments, and study groups in one place. The video quality is excellent too!"
              </p>
              <div className="font-semibold">Michael Chen</div>
              <div className="text-sm text-gray-500">Graduate Student</div>
            </Card>
            
            <Card className="p-6">
              <p className="italic text-gray-600 mb-4">
                "The platform's reliability and security features give us peace of mind when conducting classes online. Highly recommended!"
              </p>
              <div className="font-semibold">Emily Rodriguez</div>
              <div className="text-sm text-gray-500">School Administrator</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Join thousands of students and educators who are already using EduConnect.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary">Get Started for Free</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EduConnect</h3>
              <p className="text-gray-400">
                Making virtual education accessible and engaging for everyone.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">hello@educonnect.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EduConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
