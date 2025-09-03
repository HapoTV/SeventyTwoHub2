// src/types/confirmation.types.ts

/**
 * Defines the structure of the data submitted for a new business registration.
 */
export interface BusinessRegistrationData {
    full_name: string;
    email: string;
    mobile_number: string;
    business_name: string;
    business_category: string;
    business_location: string;
    business_type: 'informal' | 'formal' | string;
    number_of_employees: string;
    monthly_revenue: string;
    years_in_operation: number;
    beee_level: 'not_certified' | string;
    selected_services: string[];
    description: string;
    
}

/**
 * Defines the structure of a program object stored in localStorage.
 */
export interface SelectedProgram {
    id: string;
    name: string;
    // Add other program properties if they exist
}

/**
 * Defines the structure of the successful registration result.
 */
export interface RegistrationResult {
    id: string;
    reference_number: string;
    submitted_at: string;
}

/**
 * Defines the full registration data object retrieved from localStorage.
 */
export interface FullRegistrationData {
    step1?: { fullName: string; emailAddress: string; mobileNumber: string; };
    step2: {
        firstName: string;
        lastName: string;
        gender: string;
        emailAddress: string;
        cellphoneNumber: string;
        businessName: string;
        cityTownship: string;
        businessResidentialCorridor: string;
        businessIndustry: string;
        businessDescription: string;
        consentToShare: boolean;
        declaration: boolean;
        businessCategory?: string;
        businessLocation?: string;
        businessType?: string;
        numberOfEmployees?: string;
        monthlyRevenue?: string;
        yearsInOperation?: string;
        beeeLevel?: string;
    };
    step3?: { [key: string]: File };
    step4?: {
        selectedPrograms: SelectedProgram[];
        selectedTypes: string[];
        description: string;
    };
}

/**
 * Defines the structure of the confirmation email sent to the user.
 */
export interface ConfirmationEmailData {
    email: string;
    fullName: string;
    businessName: string;
    referenceNumber: string;
    submittedAt: string; // ✅ now allowed
}

/**
 * Defines the structure of the notification email sent to the admin.
 */
export interface AdminNotificationData {
    applicantEmail: string; // ✅ now allowed
    fullName: string;
    businessName: string;
    referenceNumber: string;
    submittedAt: string;
    businessType: string;
    location: string;
}

export interface ConfirmationEmailData {
    email: string;
    fullName: string;
    businessName: string;
    referenceNumber: string;
    submittedAt: string; // ✅ Add this line
}

export interface AdminNotificationData {
    applicantEmail: string; // ✅ Add this line
    fullName: string;
    businessName: string;
    referenceNumber: string;
    submittedAt: string;   // ✅ Add this line
    businessType: string;
    location: string;
}
