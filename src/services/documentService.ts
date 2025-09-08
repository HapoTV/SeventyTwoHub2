import { supabase } from '../lib/supabase';

export interface DocumentUpload {
  referenceNumber: string;
  userEmail: string;
  uploadedFiles: {
    companyRegistration?: File | null;
    idDocument?: File | null;
    beeeCertificate?: File | null;
    taxClearance?: File | null;
    businessProfile?: File | null;
  };
  submittedAt: string;
  isEmailSubmission: boolean;
}

export interface DocumentRecord {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  registration_id: string;
  uploaded_at: string;
}

const documentTypeMapping = {
  companyRegistration: 'CIPC Registration Document',
  idDocument: 'Proof of ID',
  beeeCertificate: 'Valid B-BBEE Certificate/Affidavit',
  taxClearance: 'Valid Tax Clearance Certificate (Optional)',
  businessProfile: 'Business Profile (Optional)'
};

export const uploadDocuments = async (documentData: DocumentUpload): Promise<boolean> => {
  try {
    // Find the registration by reference number
    const { data: registration, error: regError } = await supabase
      .from('business_registrations')
      .select('id')
      .eq('reference_number', documentData.referenceNumber)
      .single();

    if (regError || !registration) {
      console.error('Registration not found:', regError);
      return false;
    }

    const registrationId = registration.id;
    
    // First, delete any existing documents for this registration to prevent duplicates
    await supabase
      .from('registration_documents')
      .delete()
      .eq('registration_id', registrationId);

    const uploadedDocuments: DocumentRecord[] = [];

    // Process each uploaded file
    for (const [fileType, file] of Object.entries(documentData.uploadedFiles)) {
      if (file && file instanceof File) {
        try {
          // Generate unique file name
          const fileExtension = file.name.split('.').pop();
          const fileName = `${documentData.referenceNumber}_${fileType}_${Date.now()}.${fileExtension}`;
          
          // Upload file to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('registration-documents')
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            console.error(`Error uploading ${fileType}:`, uploadError);
            continue;
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from('registration-documents')
            .getPublicUrl(fileName);

          // Save document record to database
          const { data: docRecord, error: docError } = await supabase
            .from('registration_documents')
            .insert({
              registration_id: registrationId,
              document_type: documentTypeMapping[fileType as keyof typeof documentTypeMapping],
              file_name: file.name,
              file_url: urlData.publicUrl,
              uploaded_at: new Date().toISOString()
            })
            .select()
            .single();

          if (docError) {
            console.error(`Error saving document record for ${fileType}:`, docError);
          } else {
            uploadedDocuments.push(docRecord);
          }

        } catch (error) {
          console.error(`Error processing ${fileType}:`, error);
        }
      }
    }

    // Update registration status if documents were uploaded
    if (uploadedDocuments.length > 0) {
      await supabase
        .from('business_registrations')
        .update({
          status: 'under_review',
          reviewed_at: new Date().toISOString()
        })
        .eq('id', registrationId);
    }

    console.log(`Successfully uploaded ${uploadedDocuments.length} documents for registration ${documentData.referenceNumber}`);
    return uploadedDocuments.length > 0;

  } catch (error) {
    console.error('Error uploading documents:', error);
    return false;
  }
};

export const getDocumentsByRegistration = async (registrationId: string): Promise<DocumentRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('registration_documents')
      .select('*')
      .eq('registration_id', registrationId)
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching documents:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

export const deleteDocument = async (documentId: string): Promise<boolean> => {
  try {
    // Get document info first
    const { data: document, error: fetchError } = await supabase
      .from('registration_documents')
      .select('file_url')
      .eq('id', documentId)
      .single();

    if (fetchError || !document) {
      console.error('Document not found:', fetchError);
      return false;
    }

    // Extract file name from URL
    const fileName = document.file_url.split('/').pop();
    
    if (fileName) {
      // Delete from storage
      await supabase.storage
        .from('registration-documents')
        .remove([fileName]);
    }

    // Delete from database
    const { error: deleteError } = await supabase
      .from('registration_documents')
      .delete()
      .eq('id', documentId);

    if (deleteError) {
      console.error('Error deleting document record:', deleteError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    return false;
  }
};
