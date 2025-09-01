import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/SBSA Pic.png';
import newBackground from '../assets/1-cc9e8162.png';
import cocLogo from '../assets/COC LOGO.png';
import gptLogo from '../assets/Gauteng Gov.png';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${newBackground})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

     {/* Navigation */}
<nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4">
  {/* Left Logo - Standard Bank - Made bigger */}
  <div className="flex items-center">
    <img
      src={logo}
      alt="Standard Bank Logo"
      className="w-auto h-16 sm:h-20 md:h-24 object-contain" // Increased size
    />
  </div>

  {/* Center Text Block - Gauteng Township Business - White text with a solid dark green background */}
  <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white bg-green-950 px-4 py-2 rounded-lg shadow-lg tracking-wide">
      Gauteng Township Business
    </h1>
  </div>

  {/* Login Button */}
  <div className="flex items-center">
    <button
      onClick={() => navigate('/login')}
      className="bg-white text-green-800 px-4 py-2 rounded-md hover:bg-green-50 transition-colors font-medium"
    >
      LogIn
    </button>
  </div>
</nav>

      {/* Content Section */}
      <div className="relative z-10 flex justify-center px-4 pt-2 pb-8 sm:pb-12">
        <div className="max-w-4xl w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 flex flex-col space-y-6 sm:space-y-8 border border-gray-100">
    
          {/* Welcome Title - Updated color to match logo */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 tracking-wide">
              Welcome to the Standard Bank Township Business Development Programme
            </h2>
          </div>

          {/* Intro Section */}
          <div className="text-gray-800 text-center space-y-3 sm:space-y-4">
            <h1 className="text-base sm:text-lg md:text-xl leading-snug font-medium">
              Are you a registered township business owner in the Gauteng Province
              that is ready to learn and grow?
            </h1>
            <p className="text-sm sm:text-base leading-relaxed">
              Join our <span className="font-semibold">6-Week Business Development Programme</span> and 
              take the next step towards growing your business with expert guidance,
              mentorship, and practical tools.
            </p>
          </div>

          {/* Scrollable Content Area */}
          <div className="max-h-72 sm:max-h-80 overflow-y-auto pr-2 space-y-4 sm:space-y-6 custom-scrollbar">
            
            {/* Programme Intro */}
            <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
              Standard Bank Enterprise Development, in collaboration with the 
              Gauteng Provincial Treasury, is proud to announce the return of the 
              Gauteng Township Business Development Programme, in partnership with 
              Classic Oriental Consultancy.
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
              This 6-week programme will equip <span className="font-medium">100 selected township-based businesses</span> 
              with essential business skills, mentorship, and tools to thrive in today's 
              competitive market.
            </p>

            {/* Qualifying Criteria */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Qualifying Criteria</h3>
              <ul className="space-y-1 ml-4 list-disc text-xs sm:text-sm text-gray-700">
                <li>Gauteng-based business</li>
                <li>51% or more Black-owned business</li>
                <li>Registered on CSD with vendor number</li>
                <li>Business operational for 1–5 years</li>
                <li>Annual Revenue: R0 – R5 million</li>
                <li>Beneficiary must be a Black South African citizen</li>
              </ul>
            </div>

            {/* Exclusions */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Exclusions</h3>
              <ul className="space-y-1 ml-4 list-disc text-xs sm:text-sm text-gray-700">
                <li>Non-Profit Organisations, NGOs, Co-operatives, and Joint Ventures</li>
                <li>Standard Bank staff members</li>
              </ul>
            </div>

            {/* Required Documents */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base">Required Documents</h3>
              <ul className="space-y-1 ml-4 list-disc text-xs sm:text-sm text-gray-700">
                <li>CIPC Registration Documents</li>
                <li>Valid B-BBEE Certificate / Affidavit</li>
                <li>Certified Proof of ID</li>
                <li>Valid Tax Clearance Certificate (Optional)</li>
                <li>Business Profile (Optional)</li>
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/register/account-validated')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition font-medium shadow-sm"
            >
              Register My Business
            </button>
          </div>

          {/* Partnership Logos Inside Container */}
          <div className="pt-6 mt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
              {/* Standard Bank Logo */}
              <div className="flex justify-center sm:justify-start flex-1">
                <img 
                  src={logo} 
                  alt="Standard Bank" 
                  className="h-10 md:h-14 w-auto object-contain" 
                />
              </div>
              
              {/* Gauteng Provincial Treasury Logo */}
              <div className="flex justify-center flex-1">
                <img 
                  src={gptLogo} 
                  alt="Gauteng Provincial Treasury" 
                  className="h-10 md:h-14 w-auto object-contain" 
                />
              </div>
              
              {/* Classic Oriental Consultancy Logo */}
              <div className="flex justify-center sm:justify-end flex-1">
                <img 
                  src={cocLogo} 
                  alt="Classic Oriental Consultancy" 
                  className="h-10 md:h-14 w-auto object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;