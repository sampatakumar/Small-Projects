const fs = require("fs");
const path = require("path");

const PROJECTS_DIR = "smallprojects";
const README_PATH = "README.md";
const BASE_URL = "https://sampatakumar.github.io/Small-Projects"; // Updated to match repo name

function readProjectMeta(projectPath, folderName) {
    const metaPath = path.join(projectPath, "project.json");

    if (fs.existsSync(metaPath)) {
        return JSON.parse(fs.readFileSync(metaPath, "utf8"));
    }

    const readmePath = path.join(projectPath, "README.md");
    if (fs.existsSync(readmePath)) {
        const content = fs.readFileSync(readmePath, "utf8");
        const firstLine = content.split("\n")[0].replace("#", "").trim();
        return {
            name: firstLine || folderName,
            description: "UI/UX experiment",
            tech: ["HTML", "CSS", "JavaScript"],
        };
    }

    return {
        name: folderName,
        description: "UI/UX experiment",
        tech: ["HTML", "CSS", "JavaScript"],
    };
}

function techBadges(tech) {
    const badgeMap = {
        HTML: "https://img.shields.io/badge/HTML5-orange?logo=html5",
        CSS: "https://img.shields.io/badge/CSS3-blue?logo=css3",
        JavaScript:
            "https://img.shields.io/badge/JavaScript-yellow?logo=javascript",
    };

    return tech
        .map((t) => badgeMap[t])
        .filter(Boolean)
        .map((url) => `![${url}](${url})`)
        .join(" ");
}

const projects = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((dir, index) => {
        const projectPath = path.join(PROJECTS_DIR, dir.name);
        const meta = readProjectMeta(projectPath, dir.name);

        // Assuming index.html is the entry point
        const liveUrl = `${BASE_URL}/smallprojects/${dir.name}/index.html`;

        return `| ${index + 1} | **${meta.name}** | ${meta.description
            } | ${techBadges(meta.tech)} [Live](${liveUrl}) |`;
    });

const table = `
| # | Project | Description | Tech & Demo |
|---|--------|-------------|-------------|
${projects.join("\n")}
`;

// Read README if it exists, otherwise create a template
let readme;
if (fs.existsSync(README_PATH)) {
    readme = fs.readFileSync(README_PATH, "utf8");
} else {
    // Should not happen if we create README first, but good fallback
    console.error("README.md not found!");
    process.exit(1);
}

const updated = readme.replace(
    /<!-- PROJECTS_TABLE_START -->[\s\S]*<!-- PROJECTS_TABLE_END -->/,
    `<!-- PROJECTS_TABLE_START -->\n${table}\n<!-- PROJECTS_TABLE_END -->`
);

fs.writeFileSync(README_PATH, updated);

console.log("✅ Projects table updated with descriptions & badges");
