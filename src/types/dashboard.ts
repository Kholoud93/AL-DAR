export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "In Progress" | "Completed" | "On Hold";
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
