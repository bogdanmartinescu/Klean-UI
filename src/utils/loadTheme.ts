import themes from "@/themes.json";

export function loadTheme(themeName: string) {
  const theme = themes[themeName];

  if (theme) {
    const linkElement = document.getElementById("theme-link");

    if (linkElement) {
      // Update existing theme link
      linkElement.setAttribute("href", theme.path);
    } else {
      // Create new theme link
      const link = document.createElement("link");
      link.id = "theme-link";
      link.rel = "stylesheet";
      link.href = theme.path;
      document.head.appendChild(link);
    }
  } else {
    console.error(`Theme ${themeName} not found`);
  }
}
