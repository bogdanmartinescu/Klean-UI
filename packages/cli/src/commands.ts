import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import prompts, { PromptObject } from "prompts";

const componentsJsonPath = path.resolve(process.cwd(), "components.json");
const uiPath = path.resolve(process.cwd(), "src/ui/components");

interface Component {
  name: string;
  repo: string;
  path: string;
  description: string;
  aliases: string[];
}

function getComponentMetadata(name: string): Component | undefined {
  const componentsJson = JSON.parse(
    fs.readFileSync(componentsJsonPath, "utf-8")
  );
  return componentsJson.components.find(
    (component: Component) =>
      component.name.toLowerCase() === name.toLowerCase() ||
      component.aliases.includes(name.toLowerCase())
  );
}

export async function initProject() {
  const projectPath = process.cwd();

  const questions: PromptObject[] = [
    {
      type: "select",
      name: "style",
      message: "Select the style:",
      choices: [
        { title: "default", value: "default" },
        { title: "custom", value: "custom" },
      ],
    },
    {
      type: "confirm",
      name: "rsc",
      message: "Enable RSC:",
      initial: true,
    },
    {
      type: "text",
      name: "tailwindConfig",
      message: "Tailwind config file:",
      initial: "tailwind.config.js",
    },
    {
      type: "text",
      name: "tailwindCSS",
      message: "Tailwind CSS file:",
      initial: "app/globals.css",
    },
    {
      type: "text",
      name: "tailwindBaseColor",
      message: "Tailwind base color:",
      initial: "slate",
    },
    {
      type: "confirm",
      name: "tailwindCSSVariables",
      message: "Enable Tailwind CSS variables:",
      initial: false,
    },
    {
      type: "text",
      name: "componentsAlias",
      message: "Alias for components:",
      initial: "@/components",
    },
    {
      type: "text",
      name: "utilsAlias",
      message: "Alias for utils:",
      initial: "@/lib/utils",
    },
  ];

  const answers = await prompts(questions);

  const config = {
    style: answers.style,
    rsc: answers.rsc,
    tailwind: {
      config: answers.tailwindConfig,
      css: answers.tailwindCSS,
      baseColor: answers.tailwindBaseColor,
      cssVariables: answers.tailwindCSSVariables,
    },
    aliases: {
      components: answers.componentsAlias,
      utils: answers.utilsAlias,
    },
  };

  fs.writeFileSync(componentsJsonPath, JSON.stringify(config, null, 2));

  execSync(`npx create-next-app ${projectPath} --typescript`, {
    stdio: "inherit",
  });
  console.log(
    "Project initialized successfully with the following configuration:"
  );
  console.log(JSON.stringify(config, null, 2));
}

export function addComponent(componentName: string) {
  if (!fs.existsSync(uiPath)) {
    fs.mkdirSync(uiPath, { recursive: true });
  }

  const componentMetadata = getComponentMetadata(componentName);

  if (!componentMetadata) {
    console.error(`Component ${componentName} not found.`);
    return;
  }

  const { repo, path: componentPath } = componentMetadata;

  try {
    execSync(`git clone ${repo} ${path.join(uiPath, componentMetadata.name)}`, {
      stdio: "inherit",
    });
    execSync(
      `mv ${path.join(
        uiPath,
        componentMetadata.name,
        componentPath
      )}/* ${uiPath}`,
      { stdio: "inherit" }
    );
    execSync(`rm -rf ${path.join(uiPath, componentMetadata.name)}`, {
      stdio: "inherit",
    });
    console.log(`Component ${componentMetadata.name} installed successfully.`);
  } catch (error) {
    console.error(
      `Failed to install component ${componentMetadata.name}:`,
      error
    );
  }
}
