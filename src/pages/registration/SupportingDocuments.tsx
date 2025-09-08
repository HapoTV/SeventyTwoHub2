import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FileText, X, ArrowLeft, Building, CreditCard } from 'lucide-react';
import { uploadDocuments } from '../../services/documentService';

const SupportingDocuments: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const referenceNumber = searchParams.get('ref');
    const userEmail = searchParams.get('email');
    const [uploadedFiles, setUploadedFiles] = useState({
        companyRegistration: null,
        idDocument: null,
        beeeCertificate: null,
        taxClearance: null,
        businessProfile: null
    });
    const [isFromEmail, setIsFromEmail] = useState(false);

    useEffect(() => {
        if (referenceNumber) {
            setIsFromEmail(true);
            // Store reference number and email for document association
            localStorage.setItem('documentUploadRef', referenceNumber);
            if (userEmail) {
                localStorage.setItem('documentUploadEmail', userEmail);
            }
            // Debug: log the parameters
            console.log('Reference Number:', referenceNumber);
            console.log('User Email:', userEmail);
            console.log('Current URL:', window.location.href);
        }
    }, [referenceNumber, userEmail]);

    const handleFileUpload = (type: keyof typeof uploadedFiles, file: File | null) => {
        setUploadedFiles(prev => ({ ...prev, [type]: file }));
    };

    const handleFileRemove = (type: keyof typeof uploadedFiles) => {
        setUploadedFiles(prev => ({ ...prev, [type]: null }));
    };

    // Check if all required documents are uploaded
    const areRequiredDocsUploaded = () => {
        return uploadedFiles.companyRegistration && 
               uploadedFiles.idDocument && 
               uploadedFiles.beeeCertificate;
    };

    const handleNext = async () => {
        if (isFromEmail) {
            // Handle document submission for email users ONLY
            // This is completely separate from registration flow
            const documentData = {
                referenceNumber: referenceNumber || '',
                userEmail: userEmail || '',
                uploadedFiles,
                submittedAt: new Date().toISOString(),
                isEmailSubmission: true
            };
            
            try {
                // Upload documents to database and storage
                const success = await uploadDocuments(documentData);
                
                if (success) {
                    // Store document submission data for confirmation page
                    localStorage.setItem('emailDocumentSubmission', JSON.stringify(documentData));
                    
                    // Redirect to standalone confirmation page
                    navigate('/register/documents/confirmation');
                } else {
                    alert('Failed to upload documents. Please try again.');
                }
            } catch (error) {
                console.error('Error uploading documents:', error);
                alert('An error occurred while uploading documents. Please try again.');
            }
            
        } else {
            // Normal registration flow - completely separate
            const existingData = JSON.parse(localStorage.getItem('registrationData') || '{}');
            localStorage.setItem('registrationData', JSON.stringify({
                ...existingData,
                step3: uploadedFiles
            }));
            navigate('/register/application-type');
        }
    };

    const handleSkip = () => {
        navigate('/register/application-type');
    };

    const FileUploadBox: React.FC<{
        title: string;
        description: string;
        icon: React.ReactNode;
        type: keyof typeof uploadedFiles;
        required?: boolean;
    }> = ({ title, description, icon, type, required = false }) => (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
            <div className="text-center">
                <div className="flex justify-center mb-3">
                    {icon}
                </div>
                <h4 className="font-medium text-gray-900 mb-2">
                    {title} {required && <span className="text-red-500">*</span>}
                </h4>
                <p className="text-sm text-gray-600 mb-4">{description}</p>

                {!uploadedFiles[type] ? (
                    <>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(type, e.target.files?.[0] || null)}
                            className="hidden"
                            id={`upload-${type}`}
                        />
                        <label
                            htmlFor={`upload-${type}`}
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors cursor-pointer font-medium"
                        >
                            <span>Choose File</span>
                        </label>
                    </>
                ) : (
                    <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <span className="text-sm text-green-700 font-medium">
                                ✓ {(uploadedFiles[type] as File).name}
                            </span>
                            <button
                                onClick={() => handleFileRemove(type)}
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                title="Remove file"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(type, e.target.files?.[0] || null)}
                            className="hidden"
                            id={`reupload-${type}`}
                        />
                        <label
                            htmlFor={`reupload-${type}`}
                            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer text-sm"
                        >
                            <span>Change File</span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto">
                <div className="flex items-center mb-6">
                    {!isFromEmail && (
                        <button
                            onClick={() => navigate('/register/business')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                    )}
                    <h1 className={`text-xl font-semibold text-gray-900 ${!isFromEmail ? 'ml-4' : ''}`}>Submit Documents - Standard Bank Programme</h1>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    {isFromEmail && referenceNumber && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        Document Upload Request
                                    </h3>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Reference: <span className="font-semibold">{referenceNumber}</span>
                                    </p>
                                    {userEmail ? (
                                        <p className="text-sm text-blue-700 mt-1">
                                            Email: <span className="font-semibold">{userEmail}</span>
                                        </p>
                                    ) : (
                                        <p className="text-sm text-orange-600 mt-1">
                                            Note: Email parameter missing from URL (using old email link)
                                        </p>
                                    )}
                                    <p className="text-sm text-blue-600 mt-1">
                                        Please upload the required supporting documents to verify your business. You must upload at least the necessary documents before submitting
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="mb-6 text-center">
                        <p className="text-gray-600 text-sm">
                            For the next step of your application, please upload the required supporting documents. You must upload at least the necessary documents before submitting.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <FileUploadBox
                            title="CIPC Registration Document"
                            description="Company registration certificate from CIPC"
                            icon={<Building className="w-8 h-8 text-gray-400" />}
                            type="companyRegistration"
                            required={true}
                        />

                        <FileUploadBox
                            title="Valid B-BBEE Certificate/Affidavit"
                            description="Broad-Based Black Economic Empowerment certificate or affidavit"
                            icon={<FileText className="w-8 h-8 text-gray-400" />}
                            type="beeeCertificate"
                            required={true}
                        />

                        <FileUploadBox
                            title="Proof of ID"
                            description="Copy of business owner's South African ID"
                            icon={<CreditCard className="w-8 h-8 text-gray-400" />}
                            type="idDocument"
                            required={true}
                        />

                        <FileUploadBox
                            title="Valid Tax Clearance Certificate (Optional)"
                            description="Tax clearance certificate from SARS"
                            icon={<FileText className="w-8 h-8 text-gray-400" />}
                            type="taxClearance"
                            required={false}
                        />

                        <FileUploadBox
                            title="Business Profile (Optional)"
                            description="Company profile or business overview document"
                            icon={<Building className="w-8 h-8 text-gray-400" />}
                            type="businessProfile"
                            required={false}
                        />
                    </div>

                    <div className="mt-8 space-y-3">
                        <button
                            onClick={handleNext}
                            disabled={!areRequiredDocsUploaded()}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                areRequiredDocsUploaded()
                                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {isFromEmail ? 'Submit Documents' : 'Next'}
                        </button>
                        
                        {!areRequiredDocsUploaded() && (
                            <p className="text-sm text-red-600 text-center">
                                Please upload all required documents before submitting
                            </p>
                        )}

                        {!isFromEmail && (
                            <button
                                onClick={handleSkip}
                                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Skip for Now
                            </button>
                        )}
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            Supported formats: PDF, JPG, PNG (Max 5MB each)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportingDocuments;