const Footer = () => {
  return <footer className="py-12 backdrop-blur-md text-white border-t border-white/10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gradient text-zinc-950">Virtual Classrom</h3>
            <p className="text-zinc-900">
              Making virtual education accessible and engaging for everyone.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gradient">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 bg-slate-50">info@sajidmk.com</li>
              <li className="text-black-400 rounded-lg">+971 582424005</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Sajid Mehmood. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;