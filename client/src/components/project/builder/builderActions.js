import { generateWebsiteCode } from "./builderData";

/*
|--------------------------------------------------------------------------
| VERSION HELPERS
|--------------------------------------------------------------------------
*/

export const createVersion = ({
  name,
  description,
  status = "current",
  code,
  websiteData,
}) => {
  return {
    id: crypto.randomUUID(),
    name,
    description,
    status,
    code,
    websiteData,
    createdAt: new Date().toISOString(),
  };
};

export const markPreviousVersionsAsSaved = (versions) => {
  return versions.map((version) => ({
    ...version,
    status: "saved",
  }));
};

export const hasCodeChanged = (lastSavedCode, currentCode) => {
  return lastSavedCode !== currentCode;
};

export const restoreVersionData = (versions, versionId) => {
  return versions.find((version) => version.id === versionId);
};

/*
|--------------------------------------------------------------------------
| TEXT HELPERS
|--------------------------------------------------------------------------
*/

const normalizeInstruction = (instruction) => {
  return instruction.toLowerCase().trim();
};

const extractQuotedText = (instruction) => {
  const match = instruction.match(/["']([^"']+)["']/);

  return match ? match[1].trim() : null;
};

const extractTextAfterPhrase = (instruction, phrases) => {
  const lowerInstruction = instruction.toLowerCase();

  for (const phrase of phrases) {
    const index = lowerInstruction.indexOf(phrase);

    if (index !== -1) {
      return instruction
        .slice(index + phrase.length)
        .replace(/^["':\s]+|["']+$/g, "")
        .trim();
    }
  }

  return null;
};

const getFeatureName = (feature) => {
  if (typeof feature === "string") {
    return feature;
  }

  if (feature && typeof feature === "object") {
    return feature.name || "";
  }

  return "";
};

const createFeature = (name) => {
  return {
    name,
    description:
      "Designed around your website requirements and visitor experience.",
  };
};

/*
|--------------------------------------------------------------------------
| BUILDER AI ACTION PROCESSOR
|--------------------------------------------------------------------------
*/

export const processBuilderAction = (websiteData, instruction) => {
  const normalizedInstruction = normalizeInstruction(instruction);

  /*
  |--------------------------------------------------------------------------
  | CHANGE HEADLINE
  |--------------------------------------------------------------------------
  */

  if (
    normalizedInstruction.includes("change headline") ||
    normalizedInstruction.includes("change the headline") ||
    normalizedInstruction.includes("update headline") ||
    normalizedInstruction.includes("update the headline") ||
    normalizedInstruction.includes("set headline") ||
    normalizedInstruction.includes("set the headline")
  ) {
    const newHeadline =
      extractQuotedText(instruction) ||
      extractTextAfterPhrase(instruction, [
        "change the headline to",
        "change headline to",
        "update the headline to",
        "update headline to",
        "set the headline to",
        "set headline to",
      ]);

    if (newHeadline) {
      return {
        websiteData: {
          ...websiteData,
          headline: newHeadline,
        },
        actionName: "Changed headline",
        response: "Done. I updated the website headline.",
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | CHANGE DESCRIPTION
  |--------------------------------------------------------------------------
  */

  if (
    normalizedInstruction.includes("change description") ||
    normalizedInstruction.includes("change the description") ||
    normalizedInstruction.includes("update description") ||
    normalizedInstruction.includes("update the description")
  ) {
    const newDescription =
      extractQuotedText(instruction) ||
      extractTextAfterPhrase(instruction, [
        "change the description to",
        "change description to",
        "update the description to",
        "update description to",
      ]);

    if (newDescription) {
      return {
        websiteData: {
          ...websiteData,
          description: newDescription,
        },
        actionName: "Changed description",
        response: "Done. I updated the website description.",
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | CHANGE BRAND NAME
  |--------------------------------------------------------------------------
  */

  if (
    normalizedInstruction.includes("change brand name") ||
    normalizedInstruction.includes("change the brand name") ||
    normalizedInstruction.includes("update brand name") ||
    normalizedInstruction.includes("update the brand name")
  ) {
    const newBrandName =
      extractQuotedText(instruction) ||
      extractTextAfterPhrase(instruction, [
        "change the brand name to",
        "change brand name to",
        "update the brand name to",
        "update brand name to",
      ]);

    if (newBrandName) {
      return {
        websiteData: {
          ...websiteData,
          brandName: newBrandName,
        },
        actionName: "Changed brand name",
        response: "Done. I updated the website brand name.",
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | CHANGE PRIMARY BUTTON
  |--------------------------------------------------------------------------
  */

  if (
    normalizedInstruction.includes("primary button") ||
    normalizedInstruction.includes("main button")
  ) {
    const newButton =
      extractQuotedText(instruction) ||
      extractTextAfterPhrase(instruction, [
        "change the primary button to",
        "change primary button to",
        "update the primary button to",
        "update primary button to",
        "change the main button to",
        "change main button to",
      ]);

    if (newButton) {
      return {
        websiteData: {
          ...websiteData,
          primaryButton: newButton,
        },
        actionName: "Changed primary button",
        response: "Done. I updated the primary button.",
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | CHANGE SECONDARY BUTTON
  |--------------------------------------------------------------------------
  */

  if (
    normalizedInstruction.includes("secondary button") ||
    normalizedInstruction.includes("second button")
  ) {
    const newButton =
      extractQuotedText(instruction) ||
      extractTextAfterPhrase(instruction, [
        "change the secondary button to",
        "change secondary button to",
        "update the secondary button to",
        "update secondary button to",
      ]);

    if (newButton) {
      return {
        websiteData: {
          ...websiteData,
          secondaryButton: newButton,
        },
        actionName: "Changed secondary button",
        response: "Done. I updated the secondary button.",
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | ADD FEATURE
  |--------------------------------------------------------------------------
  */

  if (
    normalizedInstruction.includes("add feature") ||
    normalizedInstruction.includes("add a feature") ||
    normalizedInstruction.includes("add the feature")
  ) {
    const featureName =
      extractQuotedText(instruction) ||
      extractTextAfterPhrase(instruction, [
        "add a feature called",
        "add feature called",
        "add a feature named",
        "add feature named",
        "add the feature called",
        "add the feature named",
      ]);

    if (featureName) {
      const existingFeatures = websiteData.features || [];

      const alreadyExists = existingFeatures.some((feature) => {
        return (
          getFeatureName(feature).toLowerCase().trim() ===
          featureName.toLowerCase().trim()
        );
      });

      if (alreadyExists) {
        return {
          websiteData,
          actionName: "Feature already exists",
          response: `The feature "${featureName}" already exists.`,
        };
      }

      return {
        websiteData: {
          ...websiteData,
          features: [...existingFeatures, createFeature(featureName)],
        },
        actionName: "Added feature",
        response: "Done. I added the new feature to your website.",
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | REMOVE FEATURE
  |--------------------------------------------------------------------------
  */

  if (
    normalizedInstruction.includes("remove feature") ||
    normalizedInstruction.includes("remove the feature") ||
    normalizedInstruction.includes("delete feature") ||
    normalizedInstruction.includes("delete the feature")
  ) {
    const featureName =
      extractQuotedText(instruction) ||
      extractTextAfterPhrase(instruction, [
        "remove the feature",
        "remove feature",
        "delete the feature",
        "delete feature",
      ]);

    if (featureName) {
      const existingFeatures = websiteData.features || [];

      const updatedFeatures = existingFeatures.filter((feature) => {
        return (
          getFeatureName(feature).toLowerCase().trim() !==
          featureName.toLowerCase().trim()
        );
      });

      const removed = updatedFeatures.length !== existingFeatures.length;

      if (removed) {
        return {
          websiteData: {
            ...websiteData,
            features: updatedFeatures,
          },
          actionName: "Removed feature",
          response: `Done. I removed "${featureName}" from your website.`,
        };
      }

      return {
        websiteData,
        actionName: "Feature not found",
        response: `I couldn't find a feature named "${featureName}".`,
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | ADD NAVIGATION ITEM
  |--------------------------------------------------------------------------
  */

  if (
    normalizedInstruction.includes("add navigation") ||
    normalizedInstruction.includes("add a navigation") ||
    normalizedInstruction.includes("add navigation item") ||
    normalizedInstruction.includes("add a navigation item")
  ) {
    const navigationName =
      extractQuotedText(instruction) ||
      extractTextAfterPhrase(instruction, [
        "add a navigation item called",
        "add navigation item called",
        "add a navigation item named",
        "add navigation item named",
        "add a navigation called",
        "add navigation called",
      ]);

    if (navigationName) {
      const existingNavigation = websiteData.navigation || [];

      const alreadyExists = existingNavigation.some(
        (item) =>
          item.toLowerCase().trim() === navigationName.toLowerCase().trim(),
      );

      if (alreadyExists) {
        return {
          websiteData,
          actionName: "Navigation already exists",
          response: `The "${navigationName}" navigation item already exists.`,
        };
      }

      return {
        websiteData: {
          ...websiteData,
          navigation: [...existingNavigation, navigationName],
        },
        actionName: "Added navigation item",
        response: "Done. I added the new navigation item.",
      };
    }
  }

  /*
  |--------------------------------------------------------------------------
  | UNSUPPORTED ACTION
  |--------------------------------------------------------------------------
  */

  return {
    websiteData,
    actionName: "Unsupported action",
    response:
      "I understand the request, but this Builder action is not supported yet. Try changing the headline, description, buttons, brand name, navigation, or features.",
  };
};

/*
|--------------------------------------------------------------------------
| PARSE CODE EDITOR CHANGES
|--------------------------------------------------------------------------
|
| Converts our generated JSX back into websiteData.
|
*/

export const parseWebsiteCode = (newCode, currentWebsiteData) => {
  const updatedWebsiteData = {
    ...currentWebsiteData,
  };

  const cleanText = (value) => {
    if (!value) return "";

    return value.replace(/\s+/g, " ").trim();
  };

  const extract = (regex) => {
    const match = newCode.match(regex);

    return match ? cleanText(match[1]) : null;
  };

  /*
  |--------------------------------------------------------------------------
  | BRAND NAME
  |--------------------------------------------------------------------------
  */

  const brandName = extract(
    /<nav className="navbar">[\s\S]*?<h2>\s*([\s\S]*?)\s*<\/h2>/,
  );

  if (brandName) {
    updatedWebsiteData.brandName = brandName;
  }

  /*
  |--------------------------------------------------------------------------
  | NAVIGATION
  |--------------------------------------------------------------------------
  */

  const navigationMatch = newCode.match(
    /<div className="nav-links">([\s\S]*?)<\/div>/,
  );

  if (navigationMatch) {
    const navigation = [
      ...navigationMatch[1].matchAll(/<span>\s*([\s\S]*?)\s*<\/span>/g),
    ].map((match) => cleanText(match[1]));

    if (navigation.length > 0) {
      updatedWebsiteData.navigation = navigation;
    }
  }

  /*
  |--------------------------------------------------------------------------
  | NAVBAR BUTTON
  |--------------------------------------------------------------------------
  */

  const navbarButton = extract(
    /<nav className="navbar">[\s\S]*?<button>\s*([\s\S]*?)\s*<\/button>/,
  );

  if (navbarButton) {
    updatedWebsiteData.primaryButton = navbarButton;
  }

  /*
  |--------------------------------------------------------------------------
  | AUDIENCE
  |--------------------------------------------------------------------------
  */

  const audience = extract(
    /<section className="hero">[\s\S]*?<span className="audience">\s*([\s\S]*?)\s*<\/span>/,
  );

  if (audience) {
    updatedWebsiteData.audience = audience;
  }

  /*
  |--------------------------------------------------------------------------
  | HEADLINE
  |--------------------------------------------------------------------------
  */

  const headline = extract(
    /<section className="hero">[\s\S]*?<h1>\s*([\s\S]*?)\s*<\/h1>/,
  );

  if (headline) {
    updatedWebsiteData.headline = headline;
  }

  /*
  |--------------------------------------------------------------------------
  | DESCRIPTION
  |--------------------------------------------------------------------------
  */

  const description = extract(
    /<section className="hero">[\s\S]*?<p>\s*([\s\S]*?)\s*<\/p>/,
  );

  if (description) {
    updatedWebsiteData.description = description;
  }

  /*
  |--------------------------------------------------------------------------
  | HERO BUTTONS
  |--------------------------------------------------------------------------
  */

  const heroActionsMatch = newCode.match(
    /<div className="hero-actions">([\s\S]*?)<\/div>/,
  );

  if (heroActionsMatch) {
    const buttons = [
      ...heroActionsMatch[1].matchAll(/<button>\s*([\s\S]*?)\s*<\/button>/g),
    ].map((match) => cleanText(match[1]));

    if (buttons[0]) {
      updatedWebsiteData.primaryButton = buttons[0];
    }

    if (buttons[1]) {
      updatedWebsiteData.secondaryButton = buttons[1];
    }
  }

  /*
  |--------------------------------------------------------------------------
  | FEATURES
  |--------------------------------------------------------------------------
  */

  const featureMatches = [
    ...newCode.matchAll(
      /<article className="feature-card">[\s\S]*?<h3>\s*([\s\S]*?)\s*<\/h3>[\s\S]*?<p>\s*([\s\S]*?)\s*<\/p>[\s\S]*?<\/article>/g,
    ),
  ];

  if (featureMatches.length > 0) {
    updatedWebsiteData.features = featureMatches.map((match) => ({
      name: cleanText(match[1]),
      description: cleanText(match[2]),
    }));
  }

  return updatedWebsiteData;
};

/*
|--------------------------------------------------------------------------
| BUILD CODE
|--------------------------------------------------------------------------
*/

export const buildCodeFromWebsiteData = (websiteData) => {
  return generateWebsiteCode(websiteData);
};

export const applyAIAction = (websiteData, action) => {
  const updatedData = {
    ...websiteData,
  };

  switch (action.action) {
    case "change_headline":
      return {
        ...updatedData,
        headline: action.value,
      };

    case "change_description":
      return {
        ...updatedData,
        description: action.value,
      };

    case "change_brand":
      return {
        ...updatedData,
        brandName: action.value,
      };

    case "change_primary_button":
      return {
        ...updatedData,
        primaryButton: action.value,
      };

    case "change_secondary_button":
      return {
        ...updatedData,
        secondaryButton: action.value,
      };

    case "add_feature":
      return {
        ...updatedData,
        features: [
          ...(Array.isArray(updatedData.features) ? updatedData.features : []),
          action.value,
        ],
      };

    case "remove_feature":
      return {
        ...updatedData,
        features: (Array.isArray(updatedData.features)
          ? updatedData.features
          : []
        ).filter((feature) => {
          const featureName =
            typeof feature === "string" ? feature : feature?.name || "";

          return (
            String(featureName).toLowerCase() !== action.value.toLowerCase()
          );
        }),
      };

    case "add_navigation":
      return {
        ...updatedData,
        navigation: [
          ...(Array.isArray(updatedData.navigation)
            ? updatedData.navigation
            : []),
          action.value,
        ],
      };

    case "change_style":
      return {
        ...updatedData,
        style: action.value,
      };

    case "change_theme":
      return {
        ...updatedData,
        theme: action.value,
      };

    case "change_primary_color":
      return {
        ...updatedData,
        primaryColor: action.value,
      };

    case "change_layout_style":
      return {
        ...updatedData,
        layoutStyle: action.value,
      };

    case "change_spacing":
      return {
        ...updatedData,
        spacing: action.value,
      };

    case "change_card_style":
      return {
        ...updatedData,
        cardStyle: action.value,
      };

    case "unsupported":
      throw new Error(action.message || "This request is not supported yet.");

    default:
      throw new Error(`Unknown AI action: ${action.action}`);
  }
};

export const applyAIActions = (websiteData, actions, message) => {
  if (!Array.isArray(actions) || actions.length === 0) {
    throw new Error("AI did not return any valid actions.");
  }

  if (actions.length > 6) {
    throw new Error("Too many modifications in one request.");
  }

  return actions.reduce((currentData, action) => {
    if (action.action === "unsupported") {
      throw new Error(message || "This modification is not supported yet.");
    }

    return applyAIAction(currentData, action);
  }, websiteData);
};
