import emailjs from '@emailjs/browser';

import { ADMIN_STATUS_EMAILJS_CONFIG } from '../config/emailjs';

// Initialize EmailJS for admin status updates (separate from existing EmailJS)
emailjs.init(ADMIN_STATUS_EMAILJS_CONFIG.PUBLIC_KEY);

interface RegistrationData {
  id: string;
  full_name: string;
  email: string;
  business_name: string;
  business_category: string;
  business_location: string;
  business_type: string;
  reference_number: string;
  submitted_at: string;
}

interface EmailTemplateData {
  to_email: string;
  to_name: string;
  business_name: string;
  reference_number: string;
  status: string;
  admin_notes?: string;
  html_content: string;
  subject: string;
  [key: string]: unknown;
}

// HTML Email Templates
const createApprovalEmailTemplate = (registration: RegistrationData, adminNotes?: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Approved - Standard Bank Township Business Development Programme</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { background-color: #10b981; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px; }
        .logo { font-size: 24px; font-weight: bold; }
        .content { padding: 20px 0; }
        .status-badge { background-color: #d1fae5; color: #065f46; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
        .info-section { background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #6b7280; }
        .notes-section { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb; margin-top: 30px; color: #6b7280; }
        .button { background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🎉 Standard Bank Township Business Development Programme</div>
          <h1>Congratulations! Your Application is Approved</h1>
        </div>
        
        <div class="content">
          <p>Dear ${registration.full_name},</p>
          
          <p>We are pleased to inform you that your business registration application has been <strong>approved</strong>!</p>
          
          <div class="status-badge">✅ APPROVED</div>
          
          <div class="info-section">
            <h3>Application Details:</h3>
            <div class="info-row">
              <span class="label">Reference Number:</span>
              <span class="value">${registration.reference_number}</span>
            </div>
            <div class="info-row">
              <span class="label">Business Name:</span>
              <span class="value">${registration.business_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Category:</span>
              <span class="value">${registration.business_category}</span>
            </div>
            <div class="info-row">
              <span class="label">Location:</span>
              <span class="value">${registration.business_location}</span>
            </div>
            <div class="info-row">
              <span class="label">Submitted:</span>
              <span class="value">${new Date(registration.submitted_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          ${adminNotes ? `
          <div class="notes-section">
            <h4>📝 Admin Notes:</h4>
            <p>${adminNotes}</p>
          </div>
          ` : ''}
          
          <p>Welcome to the Standard Bank Township Business Development Programme community! You can now access all our services and programs.</p>
          
          <a href="#" class="button">Access Your Dashboard</a>
          
          <p>We appreciate your interest in the Standard Bank Township Business Development Programme and look forward to supporting your business growth.</p>
          
          <p>Best regards,<br><strong>Standard Bank Township Business Development Programme Team</strong></p>
        </div>
        
        <div class="footer">
          <p style="margin: 10px 0;">This email was sent automatically upon application status update.</p>
          <p style="margin: 10px 0;"><strong>Contact:</strong> businesssupport@classicoriental.co.za</p>
          <p style="margin: 10px 0;">© Standard Bank Township Business Development Programme</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createRejectionEmailTemplate = (registration: RegistrationData, adminNotes?: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Update - SeventyTwo Hub</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { background-color: #ef4444; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px; }
        .logo { font-size: 24px; font-weight: bold; }
        .content { padding: 20px 0; }
        .status-badge { background-color: #fee2e2; color: #991b1b; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
        .info-section { background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #6b7280; }
        .notes-section { background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 15px 0; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb; margin-top: 30px; color: #6b7280; }
        .button { background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Standard Bank Township Business Development Programme</div>
          <h1>Application Status Update</h1>
        </div>
        
        <div class="content">
          <p>Dear ${registration.full_name},</p>
          
          <p>Thank you for your interest in joining the Standard Bank Township Business Development Programme. After careful review, we regret to inform you that your application has not been approved at this time.</p>
          
          <div class="status-badge">❌ NOT APPROVED</div>
          
          <div class="info-section">
            <h3>Application Details:</h3>
            <div class="info-row">
              <span class="label">Reference Number:</span>
              <span class="value">${registration.reference_number}</span>
            </div>
            <div class="info-row">
              <span class="label">Business Name:</span>
              <span class="value">${registration.business_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Category:</span>
              <span class="value">${registration.business_category}</span>
            </div>
            <div class="info-row">
              <span class="label">Submitted:</span>
              <span class="value">${new Date(registration.submitted_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          ${adminNotes ? `
          <div class="notes-section">
            <h4>📝 Reason for Decision:</h4>
            <p>${adminNotes}</p>
          </div>
          ` : ''}
          
          <p>We encourage you to review the feedback provided and consider reapplying in the future once you've addressed the areas mentioned.</p>
          
          <a href="#" class="button">Submit New Application</a>
          
          <p>We appreciate your interest in the Standard Bank Township Business Development Programme and look forward to supporting your business growth.</p>
          
          <p>Best regards,<br><strong>Standard Bank Township Business Development Programme Team</strong></p>
        </div>
        
        <div class="footer">
          <p style="margin: 10px 0;">This email was sent automatically upon application status update.</p>
          <p style="margin: 10px 0;"><strong>Contact:</strong> businesssupport@classicoriental.co.za</p>
          <p style="margin: 10px 0;">© Standard Bank Township Business Development Programme</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createUnderReviewEmailTemplate = (registration: RegistrationData, adminNotes?: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application Under Review - SeventyTwo Hub</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { background-color: #3b82f6; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px; }
        .logo { font-size: 24px; font-weight: bold; }
        .content { padding: 20px 0; }
        .status-badge { background-color: #dbeafe; color: #1e40af; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
        .info-section { background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #6b7280; }
        .notes-section { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 15px 0; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb; margin-top: 30px; color: #6b7280; }
        .timeline { background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Standard Bank Township Business Development Programme</div>
          <h1>Application Under Review</h1>
        </div>
        
        <div class="content">
          <p>Dear ${registration.full_name},</p>
          
          <p>Thank you for your business registration application. We wanted to update you that your application is currently under review by our team.</p>
          
          <div class="status-badge">🔍 UNDER REVIEW</div>
          
          <div class="info-section">
            <h3>Application Details:</h3>
            <div class="info-row">
              <span class="label">Reference Number:</span>
              <span class="value">${registration.reference_number}</span>
            </div>
            <div class="info-row">
              <span class="label">Business Name:</span>
              <span class="value">${registration.business_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Category:</span>
              <span class="value">${registration.business_category}</span>
            </div>
            <div class="info-row">
              <span class="label">Submitted:</span>
              <span class="value">${new Date(registration.submitted_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          ${adminNotes ? `
          <div class="notes-section">
            <h4>📝 Review Notes:</h4>
            <p>${adminNotes}</p>
          </div>
          ` : ''}
          
          <div class="timeline">
            <h4>What happens next?</h4>
            <ul>
              <li>Our team is carefully reviewing your application</li>
              <li>We may contact you if additional information is needed</li>
              <li>You'll receive an email once the review is complete</li>
              <li>Expected review time: 3-5 business days</li>
            </ul>
          </div>
          
          <p>We appreciate your interest in the Standard Bank Township Business Development Programme and look forward to supporting your business growth.</p>
          
          <p>Best regards,<br><strong>Standard Bank Township Business Development Programme Team</strong></p>
        </div>
        
        <div class="footer">
          <p style="margin: 10px 0;">This email was sent automatically upon application status update.</p>
          <p style="margin: 10px 0;"><strong>Contact:</strong> businesssupport@classicoriental.co.za</p>
          <p style="margin: 10px 0;">© Standard Bank Township Business Development Programme</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createNeedDocumentsEmailTemplate = (registration: RegistrationData, adminNotes?: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Additional Documents Required - SeventyTwo Hub</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { background-color: #f59e0b; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px; }
        .logo { font-size: 24px; font-weight: bold; }
        .content { padding: 20px 0; }
        .status-badge { background-color: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: bold; margin: 10px 0; }
        .info-section { background-color: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .info-row { display: flex; justify-content: space-between; margin: 8px 0; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #6b7280; }
        .notes-section { background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; }
        .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb; margin-top: 30px; color: #6b7280; }
        .button { background-color: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 0; }
        .urgent { background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Standard Bank Township Business Development Programme</div>
          <h1>Additional Documents Required</h1>
        </div>
        
        <div class="content">
          <p>Dear ${registration.full_name},</p>
          
          <p>Thank you for your business registration application. To proceed with your application, we need some additional documents from you.</p>
          
          <div class="status-badge">📄 DOCUMENTS REQUIRED</div>
          
          <div class="info-section">
            <h3>Application Details:</h3>
            <div class="info-row">
              <span class="label">Reference Number:</span>
              <span class="value">${registration.reference_number}</span>
            </div>
            <div class="info-row">
              <span class="label">Business Name:</span>
              <span class="value">${registration.business_name}</span>
            </div>
            <div class="info-row">
              <span class="label">Category:</span>
              <span class="value">${registration.business_category}</span>
            </div>
            <div class="info-row">
              <span class="label">Submitted:</span>
              <span class="value">${new Date(registration.submitted_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          ${adminNotes ? `
          <div class="notes-section">
            <h4>📋 Required Documents:</h4>
            <p>${adminNotes}</p>
          </div>
          ` : ''}
          
          <div class="urgent">
            <h4>⚠️ Action Required</h4>
            <p>Please upload the requested documents as soon as possible to avoid delays in processing your application.</p>
          </div>
          
          <a href="${window.location.origin}/register/documents?ref=${registration.reference_number}&email=${encodeURIComponent(registration.email)}" class="button">Upload Documents</a>
          
          <p><strong>Important:</strong> Please ensure all documents are clear, legible, and in PDF or image format (JPG, PNG).</p>
          
          <p>We appreciate your interest in the Standard Bank Township Business Development Programme and look forward to supporting your business growth.</p>
          
          <p>Best regards,<br><strong>Standard Bank Township Business Development Programme Team</strong></p>
        </div>
        
        <div class="footer">
          <p style="margin: 10px 0;">This email was sent automatically upon application status update.</p>
          <p style="margin: 10px 0;"><strong>Contact:</strong> businesssupport@classicoriental.co.za</p>
          <p style="margin: 10px 0;">© Standard Bank Township Business Development Programme</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Main email sending function
export const sendStatusUpdateEmail = async (
  registration: RegistrationData,
  status: string,
  adminNotes?: string
): Promise<boolean> => {
  try {
    let htmlContent = '';
    let subject = '';

    // Generate appropriate HTML template based on status
    switch (status) {
      case 'approved':
        htmlContent = createApprovalEmailTemplate(registration, adminNotes);
        subject = '🎉 Your Application Has Been Approved - Standard Bank Township Business Development Programme';
        break;
      case 'rejected':
        htmlContent = createRejectionEmailTemplate(registration, adminNotes);
        subject = 'Application Status Update - Standard Bank Township Business Development Programme';
        break;
      case 'under_review':
        htmlContent = createUnderReviewEmailTemplate(registration, adminNotes);
        subject = '🔍 Your Application is Under Review - Standard Bank Township Business Development Programme';
        break;
      case 'requires_documents':
        htmlContent = createNeedDocumentsEmailTemplate(registration, adminNotes);
        subject = '📄 Additional Documents Required - Standard Bank Township Business Development Programme';
        break;
      default:
        throw new Error(`Unsupported status: ${status}`);
    }

    // Prepare email data for EmailJS
    const templateParams: EmailTemplateData = {
      to_email: registration.email,
      to_name: registration.full_name,
      business_name: registration.business_name,
      reference_number: registration.reference_number,
      status: status,
      admin_notes: adminNotes || '',
      html_content: htmlContent,
      subject: subject
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      ADMIN_STATUS_EMAILJS_CONFIG.SERVICE_ID,
      ADMIN_STATUS_EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return true;

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Export templates for testing purposes
export {
  createApprovalEmailTemplate,
  createRejectionEmailTemplate,
  createUnderReviewEmailTemplate,
  createNeedDocumentsEmailTemplate
};
