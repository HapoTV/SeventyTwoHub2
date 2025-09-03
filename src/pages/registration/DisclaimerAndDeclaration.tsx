import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type DisclaimerFormData = {
  cipcRegistrationDocument: boolean;
  validBBEECertificate: boolean;
  proofOfID: boolean;
  validTaxClearance: boolean;
  businessProfile: boolean;
  declaration: boolean;
};

const DisclaimerAndDeclaration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DisclaimerFormData>({
    cipcRegistrationDocument: false,
    validBBEECertificate: false,
    proofOfID: false,
    validTaxClearance: false,
    businessProfile: false,
    declaration: false
  });

  // Load saved form data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('registrationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.step5) {
          setFormData(parsedData.step5);
        }
      } catch (error) {
        console.error('Error loading saved disclaimer data:', error);
      }
    }
  }, []);

  const handleCheckboxChange = (field: keyof DisclaimerFormData, checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }));
  };

  const handleDeclarationChange = (accepted: boolean) => {
    setFormData(prev => ({ ...prev, declaration: accepted }));
  };

  const handleSubmit = () => {
    // Validate required documents
    const requiredDocs = ['cipcRegistrationDocument', 'validBBEECertificate', 'proofOfID'];
    const missingDocs = requiredDocs.filter(doc => !formData[doc as keyof DisclaimerFormData]);
    
    if (missingDocs.length > 0) {
      alert('Please confirm you have all required documents (CIPC Registration, Valid B-BBEE Certificate, and Proof of ID)');
      return;
    }

    if (!formData.declaration) {
      alert('Please accept the declaration to submit your application');
      return;
    }

    // Save disclaimer data
    const existingData = JSON.parse(localStorage.getItem('registrationData') || '{}');
    localStorage.setItem('registrationData', JSON.stringify({
      ...existingData,
      step5: formData
    }));

    // Navigate to confirmation/thank you page
    navigate('/register/confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/register/application-type')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Disclaimer and Declaration</h1>
        </div>

        <div className="bg-blue-50 rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Disclaimer Section */}
          <div className="mb-8">
            <p className="text-gray-800 mb-4">
              I hereby confirm that my business possesses all the following valid and up-to-date 
              compliance documents. I understand that I must be able to submit these for 
              verification if my application is shortlisted.
            </p>
            
            <p className="text-sm font-medium text-gray-700 mb-4 italic">
              Please tick the box next to each document you confirm is valid and up to date:
            </p>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Application Documents <span className="text-red-500">*</span>
              </h3>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.cipcRegistrationDocument}
                  onChange={(e) => handleCheckboxChange('cipcRegistrationDocument', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">CIPC Registration Document</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.validBBEECertificate}
                  onChange={(e) => handleCheckboxChange('validBBEECertificate', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Valid B-BBEE Certificate/Affidavit</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.proofOfID}
                  onChange={(e) => handleCheckboxChange('proofOfID', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Proof of ID</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.validTaxClearance}
                  onChange={(e) => handleCheckboxChange('validTaxClearance', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Valid Tax Clearance Certificate (Optional)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.businessProfile}
                  onChange={(e) => handleCheckboxChange('businessProfile', e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Business Profile (Optional)</span>
              </label>
            </div>
          </div>

          {/* Declaration Section */}
          <div className="border-t-2 border-gray-400 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Declaration</h3>
            
            <div className="space-y-4 mb-6">
              <div className="text-sm text-gray-700 space-y-3">
                <p>1. I certify that I have read, understood, and agree to all the information and terms detailed in this application.</p>
                
                <p>2. I declare that all answers provided in this application are true and correct to the best of my knowledge. I have not wilfully withheld any information pertinent to this application. I further confirm that I am the duly registered owner of the business and possess full legal authority to commit it to this programme.</p>
                
                <p>3. I hereby confirm that the business is an existing 51% or more black-owned business that has been in full operation for more than 1 year and is located within the Gauteng area.</p>
                
                <p>4. I understand that selection into the programme requires my full commitment to participate in all activities, including in-person training and mentorship sessions, for the entire duration of the programme from October 2025 to November 2025.</p>
                
                <p>5. I acknowledge that I am solely responsible for arranging my own transportation to and from the designated in-person training venue where I will be trained.</p>
                
                <p>6. Company Documents will be required for verification purposes.</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">
                I accept the above mentioned: <span className="text-red-500">*</span>
              </p>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="declaration"
                    checked={formData.declaration === true}
                    onChange={() => handleDeclarationChange(true)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="declaration"
                    checked={formData.declaration === false}
                    onChange={() => handleDeclarationChange(false)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">No</span>
                </label>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t-2 border-gray-400">
            <button
              type="button"
              onClick={() => navigate('/register/application-type')}
              className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-950 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Submit Application
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Fields marked with * are required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerAndDeclaration;
