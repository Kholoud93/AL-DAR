import type {
  Project,
  Country,
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
  {
    id: "c4",
    name: "Red Sea Global",
    logo: "",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-01",
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

export const mockCountries: Country[] = [
  {
    id: "co1",
    name: "Saudi Arabia",
    code: "SA",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "co2",
    name: "United Arab Emirates",
    code: "AE",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "co3",
    name: "Egypt",
    code: "EG",
    createdAt: "2025-01-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "co4",
    name: "Kuwait",
    code: "KW",
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
    countryId: "co1",
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
    countryId: "co1",
    location: "Jeddah, KSA",
    clientId: "c2",
    serviceFieldId: "sf2",
    serviceTypeIds: ["st3"],
    images: [],
    createdAt: "2024-06-01",
    updatedAt: "2025-12-31",
  },
  {
    id: "p3",
    name: "King Abdullah Financial District Hub",
    description: "Mixed-use commercial and retail hub",
    startDate: "2025-03-01",
    endDate: "2027-12-31",
    status: "In Progress",
    countryId: "co1",
    location: "Riyadh, KSA",
    clientId: "c3",
    serviceFieldId: "sf3",
    serviceTypeIds: ["st1"],
    images: [],
    createdAt: "2025-03-01",
    updatedAt: "2025-04-01",
  },
  {
    id: "p4",
    name: "Red Sea Coastal Resort",
    description: "Hospitality and leisure development",
    startDate: "2024-09-01",
    endDate: "2026-03-31",
    status: "On Hold",
    countryId: "co1",
    location: "Tabuk, KSA",
    clientId: "c4",
    serviceFieldId: "sf2",
    serviceTypeIds: ["st3"],
    images: [],
    createdAt: "2024-09-01",
    updatedAt: "2025-02-15",
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
  {
    id: "t4",
    fullName: "Layla Al-Mutairi",
    position: "Lead Engineer",
    specialization: "Structural",
    photo: "",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
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

export const mockDashboardStats = {
  kpis: [
    {
      label: "Active projects",
      value: "12",
      hint: "3 due this quarter",
    },
    {
      label: "Pipeline value",
      value: "SAR 24M",
      hint: "vs last month +8%",
    },
    {
      label: "Team capacity",
      value: "78%",
      hint: "2 roles open",
    },
    {
      label: "Open messages",
      value: "5",
      hint: "2 unread",
    },
  ],
  chartData: [
    { month: "Nov", new: 4, completed: 2 },
    { month: "Dec", new: 5, completed: 3 },
    { month: "Jan", new: 6, completed: 4 },
    { month: "Feb", new: 5, completed: 5 },
    { month: "Mar", new: 7, completed: 4 },
    { month: "Apr", new: 6, completed: 6 },
  ],
};
