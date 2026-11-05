export const createWebsitePlan = (project, requirements) => {
  const description =
    requirements?.description ||
    `A professional ${project.type || "website"} designed around the project's goals.`;

  const audience =
    requirements?.audience ||
    "General website visitors";

  const features = requirements?.features || [];

  const style =
    requirements?.style ||
    "Modern and professional";

  const websiteType = project.type || "Website";

  const pages = [
    {
      name: "Home",
      description:
        "A strong introduction to the brand with a clear value proposition and primary call to action.",
    },
    {
      name: "About",
      description:
        "A section explaining the brand, business, mission and unique value.",
    },
    {
      name: "Features",
      description:
        "A detailed presentation of the main capabilities and benefits.",
    },
    {
      name: "Contact",
      description:
        "A simple way for visitors to get in touch or take the next step.",
    },
  ];

  if (
    websiteType.toLowerCase().includes("saas") ||
    websiteType.toLowerCase().includes("startup")
  ) {
    pages.push({
      name: "Pricing",
      description:
        "Clear pricing plans designed to help visitors choose the right option.",
    });
  }

  return {
    overview: {
      title: project.name,
      description,
      websiteType,
      targetAudience: audience,
    },

    designDirection: {
      style,
      layout: "Clean, responsive and conversion-focused",
      visualDirection:
        "Strong typography, clear spacing, modern cards and focused calls to action.",
    },

    pages,

    features: features.map((feature) => ({
      name: feature,
      description:
        "A core website capability designed around the project's requirements.",
    })),

    structure: {
      navigation: pages.map((page) => page.name),

      sections: [
        "Navigation",
        "Hero",
        "Core value proposition",
        "Features",
        "Call to action",
        "Footer",
      ],
    },
  };
};