export interface Country {
  id: string;
  name: string;
  /** ISO 3166-1 alpha-2 (e.g. SA, AE) */
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "In Progress" | "Completed" | "On Hold";
  countryId: string;
  location: string;
  clientId: string;
  serviceFieldId: string;
  serviceTypeIds: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  position: string;
  specialization: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceField {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceType {
  id: string;
  name: string;
  serviceFieldId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  isRead: boolean;
  receivedAt: string;
}

export type CertificateStatus = "Active" | "Expiring soon" | "Expired";

/** Company credential / accreditation record (mock data for dashboard). */
export interface Certificate {
  id: string;
  /** Full official title on the certificate */
  title: string;
  /** Short label for lists */
  shortName: string;
  /** Issuing authority or registrar */
  issuingBody: string;
  /** Registration, license, or credential identifier */
  credentialId: string;
  issueDate: string;
  /** Empty string if no expiry (lifetime) */
  expiryDate: string;
  /** Standard, scope of accreditation, or field of recognition */
  scope: string;
  category: string;
  status: CertificateStatus;
  /** Public verification or registry URL, if applicable */
  verificationUrl: string;
  /** Registered office or certificate holder address */
  registeredAddress: string;
  additionalNotes: string;
}
