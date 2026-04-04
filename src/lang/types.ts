export interface HomeTranslations {
  meta: {
    languageName: string;
    dir: "ltr" | "rtl";
  };
  nav: {
    home: string;
    aboutUs: string;
    services: string;
    projects: string;
    clients: string;
    certificates: string;
    contactUs: string;
  };
  hero: {
    items:{title: string;subtitle: string;}[];
    primaryCta: string;
    secondaryCta: string;
  };
  about: {
    sectionLabel: string;
    title: string;
    stats: {
      years: string;
      globalProjects: string;
      workHours: string;
      staffMembers: string;
    };
  };
  services: {
    sectionLabel: string;
    title: string;
    description: string;
    items: {
      constructionManagement: string;
      structuralEngineering: string;
      urbanPlanningAndDesign: string;
    };
    itemTags: {
      constructionManagement: string;
      structuralEngineering: string;
      urbanPlanningAndDesign: string;
    };
  };
  certificates: {
    sectionLabel: string;
    title: string;
    items: {
      iso9001: string;
      iso14001: string;
      iso45001: string;
      engineeringExcellence: string;
    };
  };
  clients: {
    sectionLabel: string;
    title: string;
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    sections: {
      company: string;
      services: string;
      resources: string;
      contact: string;
    };
    copyright: string;
  };
}

export interface LanguagePack {
  home: HomeTranslations;
}
