import type {
  Project,
  Client,
  TeamMember,
  ServiceField,
  ServiceType,
  ContactMessage,
} from "@/types/dashboard";

export const mockClients: Client[] = [
  {
    id: "c1",
    name: "Ministry of Housing",
    logo: "",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "c2",
    name: "Saudi Aramco",
    logo: "",
    createdAt: "2025-02-20",
    updatedAt: "2025-03-01",
  },
  {
    id: "c3",
    name: "NEOM Development",
    logo: "",
    createdAt: "2025-03-10",
    updatedAt: "2025-03-10",
  },
];

export const mockServiceFields: ServiceField[] = [
  {
    id: "sf1",
    name: "Architectural Engineering",
    description:
      "Complete architectural design and planning services",
    image: "",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "sf2",
    name: "Interior Design",
    description: "Modern interior design and space planning",
    image: "",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "sf3",
    name: "Construction Management",
    description: "Full construction oversight and management",
    image: "",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
];

export const mockServiceTypes: ServiceType[] = [
  {
    id: "st1",
    name: "Design",
    serviceFieldId: "sf1",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "st2",
    name: "Supervision",
    serviceFieldId: "sf1",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "st3",
    name: "Consultation",
    serviceFieldId: "sf2",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "Al Noor Tower",
    description:
      "A 40-story mixed-use tower in downtown Riyadh",
    startDate: "2025-01-01",
    endDate: "2026-06-30",
    status: "In Progress",
    location: "Riyadh, KSA",
    clientId: "c1",
    serviceFieldId: "sf1",
    serviceTypeIds: ["st1", "st2"],
    images: [],
    createdAt: "2025-01-15",
    updatedAt: "2025-03-20",
  },
  {
    id: "p2",
    name: "Marina Bay Residences",
    description: "Luxury waterfront residential complex",
    startDate: "2024-06-01",
    endDate: "2025-12-31",
    status: "Completed",
    location: "Jeddah, KSA",
    clientId: "c2",
    serviceFieldId: "sf2",
    serviceTypeIds: ["st3"],
    images: [],
    createdAt: "2024-06-01",
    updatedAt: "2025-12-31",
  },
];

export const mockTeam: TeamMember[] = [
  {
    id: "t1",
    fullName: "Ahmed Al-Rashid",
    position: "Senior Architect",
    specialization: "BIM",
    photo: "",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "t2",
    fullName: "Sara Hassan",
    position: "Project Manager",
    specialization: "Construction",
    photo: "",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
  },
  {
    id: "t3",
    fullName: "Omar Khalil",
    position: "Interior Designer",
    specialization: "Landscape",
    photo: "",
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
];

export const mockMessages: ContactMessage[] = [
  {
    id: "m1",
    senderName: "Abdullah Al-Faisal",
    email: "abdullah@example.com",
    phone: "+966501234567",
    subject: "Project Inquiry",
    body: "We are interested in your architectural services for a new commercial project in Riyadh.",
    isRead: false,
    receivedAt: "2026-04-03",
  },
  {
    id: "m2",
    senderName: "Fatima Al-Saud",
    email: "fatima@example.com",
    phone: "+966509876543",
    subject: "Partnership Proposal",
    body: "We would like to discuss a potential partnership for upcoming government projects.",
    isRead: true,
    receivedAt: "2026-04-01",
  },
  {
    id: "m3",
    senderName: "Khalid Ibrahim",
    email: "khalid@example.com",
    phone: "+966507654321",
    subject: "Consultation Request",
    body: "We need consultation services for our new residential development.",
    isRead: false,
    receivedAt: "2026-04-02",
  },
];
