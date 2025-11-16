import { SortMode } from "./view-state";

/**
 * Represents a single level in a custom hierarchy
 *
 * Each level defines how files should be grouped at that depth:
 * - 'tag': Group by tag matching the key pattern
 * - 'property': Group by frontmatter property value
 */
export interface HierarchyLevel {
  /** Type of grouping for this level */
  type: "tag" | "property";

  /** Tag prefix or property name to group by */
  key: string;

  /** Optional display name override (defaults to key) */
  label?: string;

  /** Optional sort mode for this level (defaults to parent config's sort mode) */
  sortBy?: SortMode;
}

/**
 * Configuration for a custom hierarchy view
 *
 * Defines how to build a multi-level tree structure from vault files
 * by combining tag-based and property-based grouping.
 */
export interface HierarchyConfig {
  /** Unique name for this view configuration */
  name: string;

  /** Optional root tag to filter files (e.g., "#project" to only include project files) */
  rootTag?: string;

  /** Ordered list of hierarchy levels (top to bottom) */
  levels: HierarchyLevel[];

  /** Default expansion depth (0 = collapsed, -1 = fully expanded) */
  defaultExpanded?: number;

  /** Default sort mode for all levels (can be overridden per level) */
  sortMode?: SortMode;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Default values for hierarchy configuration
 */
export const DEFAULT_HIERARCHY_CONFIG: Partial<HierarchyConfig> = {
  defaultExpanded: 1,
  sortMode: "alpha-asc",
};

/**
 * Default values for hierarchy level
 */
export const DEFAULT_HIERARCHY_LEVEL: Partial<HierarchyLevel> = {
  sortBy: undefined, // Inherits from parent config
};

/**
 * Validates a HierarchyLevel object
 *
 * @param level - The hierarchy level to validate
 * @returns Validation result with any errors
 */
export function validateHierarchyLevel(
  level: any
): ValidationResult {
  const errors: string[] = [];

  // Check if level is an object
  if (typeof level !== "object" || level === null) {
    errors.push("Hierarchy level must be an object");
    return { valid: false, errors };
  }

  // Validate type
  if (!level.type) {
    errors.push("Hierarchy level must have a 'type' field");
  } else if (level.type !== "tag" && level.type !== "property") {
    errors.push(
      `Invalid hierarchy level type: '${level.type}'. Must be 'tag' or 'property'`
    );
  }

  // Validate key
  if (!level.key) {
    errors.push("Hierarchy level must have a 'key' field");
  } else if (typeof level.key !== "string") {
    errors.push("Hierarchy level 'key' must be a string");
  } else if (level.key.trim() === "") {
    errors.push("Hierarchy level 'key' cannot be empty");
  }

  // Validate optional label
  if (level.label !== undefined) {
    if (typeof level.label !== "string") {
      errors.push("Hierarchy level 'label' must be a string");
    }
  }

  // Validate optional sortBy
  if (level.sortBy !== undefined) {
    const validSortModes: SortMode[] = [
      "alpha-asc",
      "alpha-desc",
      "count-desc",
      "count-asc",
      "none",
    ];
    if (!validSortModes.includes(level.sortBy)) {
      errors.push(
        `Invalid sort mode: '${level.sortBy}'. Must be one of: ${validSortModes.join(", ")}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates a HierarchyConfig object
 *
 * @param config - The hierarchy config to validate
 * @returns Validation result with any errors
 */
export function validateHierarchyConfig(
  config: any
): ValidationResult {
  const errors: string[] = [];

  // Check if config is an object
  if (typeof config !== "object" || config === null) {
    errors.push("Hierarchy config must be an object");
    return { valid: false, errors };
  }

  // Validate name
  if (!config.name) {
    errors.push("Hierarchy config must have a 'name' field");
  } else if (typeof config.name !== "string") {
    errors.push("Hierarchy config 'name' must be a string");
  } else if (config.name.trim() === "") {
    errors.push("Hierarchy config 'name' cannot be empty");
  }

  // Validate optional rootTag
  if (config.rootTag !== undefined) {
    if (typeof config.rootTag !== "string") {
      errors.push("Hierarchy config 'rootTag' must be a string");
    } else if (config.rootTag.trim() === "") {
      errors.push("Hierarchy config 'rootTag' cannot be empty");
    }
  }

  // Validate levels
  if (!config.levels) {
    errors.push("Hierarchy config must have a 'levels' field");
  } else if (!Array.isArray(config.levels)) {
    errors.push("Hierarchy config 'levels' must be an array");
  } else if (config.levels.length === 0) {
    errors.push("Hierarchy config must have at least one level");
  } else {
    // Validate each level
    config.levels.forEach((level: any, index: number) => {
      const levelResult = validateHierarchyLevel(level);
      if (!levelResult.valid) {
        levelResult.errors.forEach((error) => {
          errors.push(`Level ${index + 1}: ${error}`);
        });
      }
    });
  }

  // Validate optional defaultExpanded
  if (config.defaultExpanded !== undefined) {
    if (typeof config.defaultExpanded !== "number") {
      errors.push("Hierarchy config 'defaultExpanded' must be a number");
    } else if (
      config.defaultExpanded < -1 ||
      !Number.isInteger(config.defaultExpanded)
    ) {
      errors.push(
        "Hierarchy config 'defaultExpanded' must be an integer >= -1 (use -1 for fully expanded)"
      );
    }
  }

  // Validate optional sortMode
  if (config.sortMode !== undefined) {
    const validSortModes: SortMode[] = [
      "alpha-asc",
      "alpha-desc",
      "count-desc",
      "count-asc",
      "none",
    ];
    if (!validSortModes.includes(config.sortMode)) {
      errors.push(
        `Invalid sort mode: '${config.sortMode}'. Must be one of: ${validSortModes.join(", ")}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Creates a hierarchy level with default values
 *
 * @param level - Partial hierarchy level
 * @returns Complete hierarchy level with defaults applied
 */
export function createHierarchyLevel(
  level: Partial<HierarchyLevel> & Pick<HierarchyLevel, "type" | "key">
): HierarchyLevel {
  return {
    ...DEFAULT_HIERARCHY_LEVEL,
    ...level,
  };
}

/**
 * Creates a hierarchy config with default values
 *
 * @param config - Partial hierarchy config
 * @returns Complete hierarchy config with defaults applied
 */
export function createHierarchyConfig(
  config: Partial<HierarchyConfig> & Pick<HierarchyConfig, "name" | "levels">
): HierarchyConfig {
  return {
    ...DEFAULT_HIERARCHY_CONFIG,
    ...config,
  };
}

/**
 * Example hierarchy configurations for common use cases
 */
export const EXAMPLE_HIERARCHY_CONFIGS: HierarchyConfig[] = [
  {
    name: "All Tags",
    levels: [{ type: "tag", key: "" }],
    defaultExpanded: 2,
    sortMode: "alpha-asc",
  },
  {
    name: "Projects by Status",
    rootTag: "project",
    levels: [
      { type: "property", key: "status", label: "Status" },
      { type: "property", key: "priority", label: "Priority" },
      { type: "tag", key: "project", label: "Project" },
    ],
    defaultExpanded: 2,
    sortMode: "alpha-asc",
  },
  {
    name: "Research by Topic and Year",
    rootTag: "research",
    levels: [
      { type: "property", key: "topic", label: "Topic" },
      { type: "property", key: "year", label: "Year", sortBy: "alpha-desc" },
      { type: "tag", key: "research", label: "Subtopic" },
    ],
    defaultExpanded: 1,
    sortMode: "alpha-asc",
  },
  {
    name: "Tasks by Status and Project",
    rootTag: "task",
    levels: [
      {
        type: "property",
        key: "status",
        label: "Status",
        sortBy: "count-desc",
      },
      { type: "property", key: "project", label: "Project" },
    ],
    defaultExpanded: 1,
    sortMode: "count-desc",
  },
];
