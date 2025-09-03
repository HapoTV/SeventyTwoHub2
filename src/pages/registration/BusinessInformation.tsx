import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Building, MapPin } from 'lucide-react';

type FormDataState = {
  firstName: string;
  lastName: string;
  gender: string;
  emailAddress: string;
  cellphoneNumber: string;
  businessName: string;
  cipcRegistrationNo: string;
  cityTownship: string;
  businessResidentialCorridor: string;
  businessIndustry: string[];
  otherBusinessIndustry: string;
  bbbeeLevel: string;
  yearEstablished: string;
  annualTurnover: string;
  businessDescription: string[];
  businessOverview: string;
  uniqueValueProposition: string;
  declaration: boolean;
  cipcRegistrationDocument: boolean;
  validBBEECertificate: boolean;
  proofOfID: boolean;
  validTaxClearance: boolean;
  businessProfile: boolean;
};

const BusinessInformation: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormDataState>({
    firstName: '',
    lastName: '',
    gender: '',
    emailAddress: '',
    cellphoneNumber: '',
    businessName: '',
    cipcRegistrationNo: '',
    cityTownship: '',
    businessResidentialCorridor: '',
    businessIndustry: [],
    otherBusinessIndustry: '',
    bbbeeLevel: '',
    yearEstablished: '',
    annualTurnover: '',
    businessDescription: [],
    businessOverview: '',
    uniqueValueProposition: '',
    declaration: false,
    cipcRegistrationDocument: false,
    validBBEECertificate: false,
    proofOfID: false,
    validTaxClearance: false,
    businessProfile: false
  });

  // Load saved form data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('registrationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.step2) {
          setFormData(parsedData.step2);
        }
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  const genderOptions = [
    'Male',
    'Female',
    'Non-binary',
    'Prefer not to say'
  ];

  const corridorOptions = [
    'Gauteng North - Atteridgeville, Pretoria Central, Refilwe, Soshanguve, Mamelodi',
    'Gauteng Central - Soweto, Lenasia, Alexandra, Johannesburg',
    'Gauteng East - Thembisa, Alexandra, Tsakani, Springs',
    'Gauteng West - Carletonville, Kagiso, Cosmo City, Krugersdorp',
    'Gauteng South - Sebokeng, Vaal, Vereeniging, Orange Farm'
  ];

  const industryOptions = [
    'Street Vendor/Spaza Shop',
    'Car Wash',
    'Hair Salon and Nail Salon',
    'Logistics and Transportation',
    'Internet Cafe',
    'Farming',
    'Butcher/Meat Cutter',
    'Fashion and Textile',
    'Laundry and Cleaning',
    'Grass Cutter',
    'Tent renters, Mobile Toilet and Fridge',
    'Mechanic and Tyre Services',
    'Phone Sellers/Repairers',
    'Fast Food/Confectioners',
    'Other'
  ];

  const businessDescriptionOptions = [
    'Woman-Owned',
    'Youth-Owned',
    'Black-Owned',
    'Other'
  ];

  // Generate years from 2025 down to 2020
  const yearOptions = Array.from({ length: 6 }, (_, i) => 2025 - i);

  const turnoverOptions = [
    'R0 - R1 Million',
    'R1 Million - R2 Million',
    'R2 Million - R3 Million',
    'R3 Million - R4 Million',
    'R4 Million - R5 Million',
    'R5 Million and more'
  ];

  const bbbeeOptions = [
    'Please Select',
    'BBBEE Level 1 (135% B-BBEE procurement recognition level)',
    'BBBEE Level 2 (125% B-BBEE procurement recognition level)',
    'BBBEE Level 3 (110% B-BBEE procurement recognition level)',
    'BBBEE Level 4 (100% B-BBEE procurement recognition level)',
    'BBBEE Level 5 (80% B-BBEE procurement recognition level)'
  ];

  const handleInputChange = (field: keyof FormDataState, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessIndustryChange = (industry: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      businessIndustry: checked
        ? [...prev.businessIndustry, industry]
        : prev.businessIndustry.filter(item => item !== industry)
    }));
  };

  const handleBusinessDescriptionChange = (description: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      businessDescription: checked
        ? [...prev.businessDescription, description]
        : prev.businessDescription.filter(item => item !== description)
    }));
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/login')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">Business Information</h1>
        </div>

        <div className="bg-blue-50 rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="First name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select gender</option>
                {genderOptions.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cellphone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={formData.cellphoneNumber}
                  onChange={(e) => handleInputChange('cellphoneNumber', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+27 XX XXX XXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your business name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CIPC Company Registration No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.cipcRegistrationNo}
                onChange={(e) => handleInputChange('cipcRegistrationNo', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter your CIPC registration number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City/Township
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={formData.cityTownship}
                  onChange={(e) => handleInputChange('cityTownship', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Soweto, Pretoria"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Residential Corridor <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.businessResidentialCorridor}
                onChange={(e) => handleInputChange('businessResidentialCorridor', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select corridor</option>
                {corridorOptions.map(corridor => (
                  <option key={corridor} value={corridor}>{corridor}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Industry <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {industryOptions.map(industry => (
                  <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.businessIndustry.includes(industry)}
                      onChange={(e) => handleBusinessIndustryChange(industry, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Business Industry's (please specify)
              </label>
              <textarea
                value={formData.otherBusinessIndustry}
                onChange={(e) => handleInputChange('otherBusinessIndustry', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Please specify any other business industries..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                B-BBEE Level Contributor: <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.bbbeeLevel}
                onChange={(e) => handleInputChange('bbbeeLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                {bbbeeOptions.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Established <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.yearEstablished}
                onChange={(e) => handleInputChange('yearEstablished', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Please Select</option>
                {yearOptions.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Turnover (Last Financial Year) <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.annualTurnover}
                onChange={(e) => handleInputChange('annualTurnover', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Please Select</option>
                {turnoverOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select the option that best describes your business: <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {businessDescriptionOptions.map(option => (
                  <label key={option} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.businessDescription.includes(option)}
                      onChange={(e) => handleBusinessDescriptionChange(option, e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe Your Business: (Provide a brief overview of your products or services and the market you serve) <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.businessOverview}
                onChange={(e) => handleInputChange('businessOverview', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Provide a brief overview of your products or services and the market you serve..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your unique value proposition? <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.uniqueValueProposition}
                onChange={(e) => handleInputChange('uniqueValueProposition', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="What makes your business unique? What sets you apart from competitors?"
                required
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => navigate('/welcome')}
                className="px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-950 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  // Validate required fields for this page
                  const requiredFields: (keyof FormDataState)[] = [
                    'firstName', 'lastName', 'gender', 'emailAddress', 'cellphoneNumber', 
                    'businessName', 'cipcRegistrationNo', 'businessResidentialCorridor',
                    'bbbeeLevel', 'yearEstablished', 'annualTurnover', 'businessOverview', 'uniqueValueProposition'
                  ];
                  
                  const missingFields = requiredFields.filter(field => {
                    const value = formData[field];
                    if (field === 'businessIndustry' || field === 'businessDescription') {
                      return Array.isArray(value) ? value.length === 0 : !value;
                    }
                    return !value;
                  });
                  
                  if (missingFields.length > 0) {
                    alert('Please fill in all required fields marked with *');
                    return;
                  }

                  if (formData.businessIndustry.length === 0) {
                    alert('Please select at least one business industry');
                    return;
                  }

                  if (formData.businessDescription.length === 0) {
                    alert('Please select at least one option that describes your business');
                    return;
                  }

                  if (formData.bbbeeLevel === 'Please Select' || !formData.bbbeeLevel) {
                    alert('Please select a B-BBEE Level Contributor');
                    return;
                  }
                  
                  // Save current progress
                  const existingData = JSON.parse(localStorage.getItem('registrationData') || '{}');
                  localStorage.setItem('registrationData', JSON.stringify({
                    ...existingData,
                    step2: formData
                  }));
                  
                  // Navigate to application type selection page
                  navigate('/register/application-type');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            </div>

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

export default BusinessInformation;