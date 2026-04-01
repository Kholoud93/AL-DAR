// Placeholder data for development — replace with real content / API
import type { StatItem, Service } from "@/types";

export const stats: StatItem[] = [
  {
    label: "Years of Engineering Heritage",
    labelAr: "سنوات من الخبرة الهندسية",
    value: 30,
    suffix: "+",
    icon: "calendar",
  },
  {
    label: "Global Projects",
    labelAr: "مشاريع عالمية",
    value: 500,
    suffix: "+",
    icon: "building",
  },
  {
    label: "Work Hours",
    labelAr: "ساعات عمل",
    value: 1,
    suffix: "M+",
    icon: "clock",
  },
  {
    label: "Staff Members",
    labelAr: "أعضاء الفريق",
    value: 165,
    suffix: "+",
    icon: "users",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "Construction Management",
    titleAr: "إدارة البناء",
    image: "",
    slug: "construction-management",
  },
  {
    id: "2",
    title: "Structural Engineering",
    titleAr: "الهندسة الإنشائية",
    image: "",
    slug: "structural-engineering",
  },
  {
    id: "3",
    title: "Urban Planning & Design",
    titleAr: "التخطيط العمراني والتصميم",
    image: "",
    slug: "urban-planning",
  },
];

export const navLinks = [
  { label: "About Us", labelAr: "معلومات عنا", href: "#about" },
  { label: "Services", labelAr: "خدماتنا", href: "#services" },
  { label: "Projects", labelAr: "المشاريع", href: "#projects" },
  { label: "Careers", labelAr: "الوظائف", href: "#careers" },
  { label: "Clients", labelAr: "العملاء", href: "#clients" },
  { label: "Certificates", labelAr: "الشهادات", href: "#certificates" },
];
