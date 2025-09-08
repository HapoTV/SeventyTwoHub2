import React, { useEffect, useState } from 'react';
import { CheckCircle, FileText, Calendar, Hash } from 'lucide-react';

const DocumentSubmissionConfirmation: React.FC = () => {
    const [submissionData, setSubmissionData] = useState<any>(null);

    useEffect(() => {
        // Only load email document submissions, not registration flow data
        const data = localStorage.getItem('emailDocumentSubmission');
        if (data) {
            setSubmissionData(JSON.parse(data));
        }
    }, []);

    const getUploadedFileCount = () => {
        if (!submissionData?.uploadedFiles) return 0;
        return Object.values(submissionData.uploadedFiles).filter(file => file !== null).length;
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Documents Submitted Successfully!
                        </h1>
                        <p className="text-gray-600">
                            Thank you for uploading your documents. We have received your submission.
                        </p>
                    </div>

                    {submissionData && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <h3 className="font-medium text-gray-900 mb-3">Submission Details</h3>
                            
                            <div className="space-y-2">
                                <div className="flex items-center text-sm">
                                    <Hash className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-gray-600">Reference:</span>
                                    <span className="font-semibold ml-2">{submissionData.referenceNumber}</span>
                                </div>
                                
                                {submissionData.userEmail && (
                                    <div className="flex items-center text-sm">
                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        <span className="text-gray-600">Email:</span>
                                        <span className="font-semibold ml-2">{submissionData.userEmail}</span>
                                    </div>
                                )}
                                
                                <div className="flex items-center text-sm">
                                    <FileText className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-gray-600">Documents Uploaded:</span>
                                    <span className="font-semibold ml-2">{getUploadedFileCount()} files</span>
                                </div>
                                
                                <div className="flex items-center text-sm">
                                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-gray-600">Submitted:</span>
                                    <span className="font-semibold ml-2">
                                        {new Date(submissionData.submittedAt).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Our team will review your submitted documents</li>
                            <li>• You'll receive an email update within 3-5 business days</li>
                            <li>• If additional documents are needed, we'll contact you</li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={() => window.close()}
                            className="w-full py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors mb-3"
                        >
                            Close Window
                        </button>
                        
                        <p className="text-xs text-gray-500">
                            This document submission is complete. Check your email for updates.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentSubmissionConfirmation;
