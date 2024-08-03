// utils/loadTheme.ts
import themes from "../../themes.json";

interface Themes {
  [key: string]: string;
}

export const loadTheme = (themeName: string): void => {
  const themeConfig: Themes = themes.themes;
  const themePath = themeConfig[themeName] || themeConfig.default;

  // Remove existing theme link if it exists
  const existingLink = document.getElementById(
    "theme-stylesheet"
  ) as HTMLLinkElement | null;
  if (existingLink) {
    existingLink.parentNode?.removeChild(existingLink);
  }

  // Create a new link element to load the selected theme
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = themePath;
  link.id = "theme-stylesheet";
  document.head.appendChild(link);

  console.log(`${themeName} theme loaded`);
};
