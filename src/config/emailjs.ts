// EmailJS Configuration for Admin Status Updates
// This is a separate EmailJS service dedicated to admin status update emails
// The existing EmailJS for user confirmations and admin notifications remains unchanged

export const ADMIN_STATUS_EMAILJS_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_ADMIN_EMAILJS_SERVICE_ID || 'service_8g3fegs',
  TEMPLATE_ID: import.meta.env.VITE_ADMIN_EMAILJS_TEMPLATE_ID || 'template_4w8sjiw', 
  PUBLIC_KEY: import.meta.env.VITE_ADMIN_EMAILJS_PUBLIC_KEY || 'QH0vUOSO3afuhMUi_'
};

// EmailJS Template Structure
// Your EmailJS template should include the following variables:
// - {{to_email}} - Recipient email address
// - {{to_name}} - Recipient name
// - {{subject}} - Email subject
// - {{html_content}} - HTML email content (this will contain the full email template)
// - {{business_name}} - Business name for reference
// - {{reference_number}} - Application reference number
// - {{status}} - Application status
// - {{admin_notes}} - Admin review notes

export const EMAIL_TEMPLATE_VARIABLES = [
  'to_email',
  'to_name', 
  'subject',
  'html_content',
  'business_name',
  'reference_number',
  'status',
  'admin_notes'
] as const;
