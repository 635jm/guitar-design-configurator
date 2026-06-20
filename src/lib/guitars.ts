export type GuitarConfig = {
  bodyShape: string;
  neckShape: string;
  bodyMaterial: string;
  neckMaterial: string;
  hardwareFinish: string;
  bodyColor: string;
  pickups: string;
  bridgeType: string;
  pickguard: string;
  knobs: string;
};

export type GuitarProject = {
  id: string;
  name: string;
  guitarType: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  config: GuitarConfig;
};

export type StorageResult = {
  ok: boolean;
  message: string;
};

export const STORAGE_KEY = "guitar-design-projects";
export const STORAGE_RECOVERY_KEY = "guitar-design-projects-corrupt-backup";

export const defaultConfig: GuitarConfig = {
  bodyShape: "Stratocaster",
  neckShape: "Modern C",
  bodyMaterial: "Alder",
  neckMaterial: "Maple",
  hardwareFinish: "Chrome",
  bodyColor: "Trans Black",
  pickups: "Single Coil SSS",
  bridgeType: "2-Point Tremolo",
  pickguard: "Black 3-Ply",
  knobs: "Volume Taper",
};

export const guitarPresets: Record<string, GuitarConfig> = {
  "Classic Strat": {
    bodyShape: "Stratocaster",
    neckShape: "Modern C",
    bodyMaterial: "Alder",
    neckMaterial: "Maple",
    hardwareFinish: "Chrome",
    bodyColor: "Trans Black",
    pickups: "Single Coil SSS",
    bridgeType: "2-Point Tremolo",
    pickguard: "Black 3-Ply",
    knobs: "Volume Taper",
  },
  "Vintage Tele": {
    bodyShape: "Telecaster",
    neckShape: "U",
    bodyMaterial: "Ash",
    neckMaterial: "Roasted Maple",
    hardwareFinish: "Nickel",
    bodyColor: "Olympic White",
    pickups: "Single Coil SSS",
    bridgeType: "Hardtail",
    pickguard: "Black 3-Ply",
    knobs: "Tone Taper",
  },
  "Modern Metal": {
    bodyShape: "Stratocaster",
    neckShape: "D",
    bodyMaterial: "Mahogany",
    neckMaterial: "Wenge",
    hardwareFinish: "Black",
    bodyColor: "Trans Black",
    pickups: "HH",
    bridgeType: "2-Point Tremolo",
    pickguard: "None",
    knobs: "Dome Metal",
  },
  "Jazz Custom": {
    bodyShape: "Telecaster",
    neckShape: "V",
    bodyMaterial: "Basswood",
    neckMaterial: "Mahogany",
    hardwareFinish: "Gold",
    bodyColor: "Deep Ocean Blue",
    pickups: "P90",
    bridgeType: "Hardtail",
    pickguard: "Tortoise 4-Ply",
    knobs: "Skirted Metal",
  },
};

export const guitarOptions = {
  bodyShape: ["Stratocaster", "Telecaster"],
  neckShape: ["C", "D", "Modern C", "V", "U"],
  bodyMaterial: ["Alder", "Ash", "Mahogany", "Basswood"],
  neckMaterial: ["Maple", "Roasted Maple", "Mahogany", "Wenge"],
  hardwareFinish: ["Chrome", "Nickel", "Black", "Gold", "Satin Gold"],
  bodyColor: ["Sonic Blue", "Olympic White", "Trans Black", "Deep Ocean Blue"],
  pickups: ["Single Coil SSS", "HSS", "HH", "P90"],
  bridgeType: ["2-Point Tremolo", "Hardtail", "6-Saddle Tremolo", "Tune-o-matic"],
  pickguard: ["White 1-Ply", "Black 3-Ply", "Tortoise 4-Ply", "Mint Green 3-Ply", "None"],
  knobs: ["Volume Taper", "Tone Taper", "Dome Metal", "Skirted Metal"],
} as const;

export const optionLabels: Record<keyof GuitarConfig, string> = {
  bodyShape: "Body shape",
  neckShape: "Neck shape",
  bodyMaterial: "Body Material",
  neckMaterial: "Neck material",
  hardwareFinish: "Hardware Finish",
  bodyColor: "Finish",
  pickups: "Pickups",
  bridgeType: "Bridge",
  pickguard: "Pickguard",
  knobs: "Knobs",
};

export const bodyColorSwatches: Record<string, string> = {
  "Sonic Blue": "#c7e5ed",
  "Trans Black": "linear-gradient(135deg, #151515, #050505 55%, #303030)",
  "Deep Ocean Blue": "linear-gradient(135deg, #12384c, #0b516e)",
  Sunburst: "linear-gradient(135deg, #2b1307, #c66a1f 45%, #f5c35c 72%, #1b1008)",
  Black: "#050505",
  "Olympic White": "#f2eee3",
  "Candy Apple Red": "#b91524",
  Natural: "#c9914b",
  "Surf Green": "#8fcfbd",
  "Shell Pink": "#efb8c4",
  "Matte Black": "#171717",
  "Transparent Blue": "#1f65ad",
  "Custom Color": "linear-gradient(135deg, #e45f35, #2788d9, #e4c45f)",
};

const isBrowser = () => typeof window !== "undefined";

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export function readProjects(): GuitarProject[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      throw new Error("Stored project data is not an array.");
    }

    return parsed
      .filter(isStoredProject)
      .map((project) => ({
        ...project,
        config: {
          ...defaultConfig,
          ...project.config,
        },
      }));
  } catch {
    const failedValue = window.localStorage.getItem(STORAGE_KEY);

    if (failedValue) {
      window.localStorage.setItem(STORAGE_RECOVERY_KEY, failedValue);
    }

    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function getAllProjects() {
  return readProjects();
}

export function writeProjects(projects: GuitarProject[]): StorageResult {
  if (!isBrowser()) {
    return { ok: false, message: "Storage is only available in the browser." };
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    return { ok: true, message: "" };
  } catch {
    return {
      ok: false,
      message: "Could not save projects. Browser storage may be full or blocked.",
    };
  }
}

export function getProject(id: string) {
  return readProjects().find((project) => project.id === id);
}

export function createProject(input: {
  name: string;
  guitarType: string;
  notes: string;
  config?: GuitarConfig;
}) {
  const now = new Date().toISOString();
  const project: GuitarProject = {
    id: createId(),
    name: input.name.trim(),
    guitarType: input.guitarType.trim() || "Electric Guitar",
    notes: input.notes.trim(),
    createdAt: now,
    updatedAt: now,
    config: { ...defaultConfig, ...input.config },
  };

  const result = writeProjects([project, ...readProjects()]);
  return { project, result };
}

export function updateProject(updatedProject: GuitarProject) {
  const projects = readProjects();

  const exists = projects.some((project) => project.id === updatedProject.id);

  if (!exists) {
    return {
      project: updatedProject,
      result: {
        ok: false,
        message: "Project no longer exists. Return to dashboard.",
      },
    };
  }

  const nextProject = {
    ...updatedProject,
    updatedAt: new Date().toISOString(),
  };

  const result = writeProjects(
    projects.map((project) =>
      project.id === nextProject.id ? nextProject : project,
    ),
  );

  return { project: nextProject, result };
}

export function duplicateProject(id: string) {
  const projects = readProjects();
  const source = projects.find((project) => project.id === id);

  if (!source) {
    return undefined;
  }

  const now = new Date().toISOString();
  const copy: GuitarProject = {
    ...source,
    id: createId(),
    name: `${source.name} Copy`,
    createdAt: now,
    updatedAt: now,
    config: { ...source.config },
  };

  writeProjects([copy, ...projects]);
  return copy;
}

export function deleteProject(id: string) {
  writeProjects(readProjects().filter((project) => project.id !== id));
}

export function formatProjectDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatProjectDateTime(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function buildSummary(project: GuitarProject) {
  return [
    `Guitar Design: ${project.name}`,
    `Guitar Type: ${project.guitarType}`,
    project.notes ? `Notes: ${project.notes}` : undefined,
    `Body Shape: ${project.config.bodyShape}`,
    `Neck Shape: ${project.config.neckShape}`,
    `Body Wood / Material: ${project.config.bodyMaterial}`,
    `Neck Material: ${project.config.neckMaterial}`,
    `Hardware Finish: ${project.config.hardwareFinish}`,
    `Body Color / Finish: ${project.config.bodyColor}`,
    `Pickups: ${project.config.pickups}`,
    `Bridge Type: ${project.config.bridgeType}`,
    `Pickguard: ${project.config.pickguard}`,
    `Knobs: ${project.config.knobs}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildImagePrompt(project: GuitarProject) {
  const { config } = project;

  return [
    `Create a premium product render for a custom ${project.guitarType} named "${project.name}".`,
    `Design details: ${config.bodyShape} body shape, ${config.bodyMaterial} body material, ${config.bodyColor} body finish, ${config.neckShape} neck profile, ${config.neckMaterial} neck material, ${config.pickups} pickup configuration, ${config.bridgeType} bridge, ${config.hardwareFinish} hardware, ${config.pickguard} pickguard, and ${config.knobs} knobs.`,
    "Composition: front three-quarter view on a clean studio backdrop, realistic wood and metal materials, crisp hardware reflections, accurate guitar proportions, and soft luthier workshop lighting.",
    "Style: high-detail commercial instrument photography, polished but believable, ready for a builder brief or product concept board.",
  ].join(" ");
}

export function buildSummaryFileName(project: GuitarProject) {
  const safeName = project.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${safeName || "guitar-design"}-summary.txt`;
}

export function buildProjectJsonFileName(project: GuitarProject) {
  const safeName = project.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${safeName || "guitar-design"}-project.json`;
}

export function buildProjectsExportFileName() {
  const date = new Date().toISOString().slice(0, 10);

  return `guitar-design-projects-${date}.json`;
}

function isStoredProject(value: unknown): value is GuitarProject {
  if (!value || typeof value !== "object") {
    return false;
  }

  const project = value as Partial<GuitarProject>;

  return (
    typeof project.id === "string" &&
    typeof project.name === "string" &&
    typeof project.guitarType === "string" &&
    typeof project.notes === "string" &&
    typeof project.createdAt === "string" &&
    typeof project.updatedAt === "string" &&
    typeof project.config === "object" &&
    project.config !== null
  );
}
