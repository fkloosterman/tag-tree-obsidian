---
title: Configuration Schema
description: Complete reference for MetaGrouper configuration options, including view settings, hierarchy levels, and validation rules.
---

# Configuration Schema Reference

This page provides a complete reference for all MetaGrouper configuration options. Configurations are defined in JSON format and can be managed through the plugin settings.

## HierarchyConfig Schema

The main configuration object for a custom view:

```typescript
interface HierarchyConfig {
  name: string;
  filters?: FilterConfig;
  levels: HierarchyLevel[];
  showPartialMatches?: boolean;
  defaultExpanded?: number;
  defaultNodeSortMode?: SortMode;
  defaultFileSortMode?: FileSortMode;
  levelColorMode?: LevelColorMode;
  fileColor?: string;
  toolbarFilterTypes?: FilterType[];
  displayMode?: HierarchyDisplayMode;
}
```

### Required Fields

#### `name` (string)
Unique identifier for the view configuration. Must be non-empty.

#### `levels` (HierarchyLevel[])
Array of hierarchy levels defining how files are grouped. Must contain at least one level.

### Optional Fields

#### `filters` (FilterConfig)
Optional filters to restrict which files appear in this view. See [Filter Configuration](#filter-configuration).

#### `showPartialMatches` (boolean, default: false)
Whether to show files that don't match all hierarchy levels:
- `false`: Only show files that match the complete hierarchy
- `true`: Show all files, placing unmatched files at the root level

#### `defaultExpanded` (number, default: 1)
Default expansion depth when the view loads:
- `0`: All collapsed
- `1`: First level expanded
- `2`: First two levels expanded
- `-1`: Fully expanded

#### `defaultNodeSortMode` (SortMode, default: "alpha-asc")
Default sorting for tag/property nodes. Can be overridden per level.

#### `defaultFileSortMode` (FileSortMode, default: "alpha-asc")
Default sorting for file nodes.

#### `levelColorMode` (LevelColorMode, default: "none")
How to apply visual colors to hierarchy levels:
- `"none"`: No colors
- `"text"`: Colored text
- `"background"`: Colored backgrounds
- `"left-border"`: Left border colors
- `"icon"`: Colored icons

#### `fileColor` (string)
Optional CSS color value for file nodes (e.g., `"#ff6b6b"`).

#### `toolbarFilterTypes` (FilterType[])
Filter types to expose in the toolbar for quick overrides.

#### `displayMode` (HierarchyDisplayMode, default: "tree")
Display format:
- `"tree"`: Nested tree structure
- `"flat"`: Single-level with combined labels

## HierarchyLevel Schema

Base interface for hierarchy levels:

```typescript
interface BaseHierarchyLevel {
  label?: string;
  sortBy?: SortMode;
  color?: string;
}
```

### TagHierarchyLevel

Groups files by tags matching a pattern:

```typescript
interface TagHierarchyLevel extends BaseHierarchyLevel {
  type: "tag";
  key: string;
  depth: number;
  virtual: boolean;
  showFullPath: boolean;
}
```

#### Required Fields

##### `type` (string)
Must be `"tag"`.

##### `key` (string)
Tag prefix to match. Empty string (`""`) matches all base tags.

##### `depth` (number)
Number of tag levels to span:
- `1`: Single level (e.g., `"project"` but not `"project/alpha"`)
- `2+`: Multiple levels
- `-1`: Unlimited depth (full nested hierarchy)

##### `virtual` (boolean)
Whether to insert next hierarchy level after each intermediate tag level.

##### `showFullPath` (boolean)
Whether to show full tag path or just the last segment.

### PropertyHierarchyLevel

Groups files by frontmatter property values:

```typescript
interface PropertyHierarchyLevel extends BaseHierarchyLevel {
  type: "property";
  key: string;
  separateListValues: boolean;
  showPropertyName: boolean;
}
```

#### Required Fields

##### `type` (string)
Must be `"property"`.

##### `key` (string)
Property name to group by. Cannot be empty.

##### `separateListValues` (boolean)
How to handle list properties:
- `true`: Treat each list item as a separate grouping value
- `false`: Treat the entire list as a single value

##### `showPropertyName` (boolean)
Whether to prepend property name to values (e.g., `"status = active"`).

### Common Optional Fields

#### `label` (string)
Display name override. Defaults to the `key` value.

#### `sortBy` (SortMode)
Level-specific sorting override. Inherits from parent config if not specified.

#### `color` (string)
CSS color value for this specific level.

## SortMode Values

Available sorting modes for nodes:

- `"alpha-asc"`: Alphabetical ascending (A-Z)
- `"alpha-desc"`: Alphabetical descending (Z-A)
- `"count-desc"`: By file count (most first)
- `"count-asc"`: By file count (least first)
- `"none"`: No sorting (insertion order)

## FileSortMode Values

Available sorting modes for files:

- `"alpha-asc"`: Alphabetical by filename
- `"alpha-desc"`: Reverse alphabetical
- `"created-desc"`: Newest first (creation date)
- `"created-asc"`: Oldest first (creation date)
- `"modified-desc"`: Recently modified first
- `"modified-asc"`: Least recently modified first
- `"size-desc"`: Largest files first
- `"size-asc"`: Smallest files first
- `"none"`: No sorting

## Filter Configuration

Optional filters to restrict view contents:

```typescript
interface FilterConfig {
  version: number;
  filters: Filter[];
  expression: string;
}
```

### Filter Types

- **Tag filters**: Match files by tags
- **Property filters**: Match files by frontmatter properties
- **Path filters**: Match files by folder paths
- **Content filters**: Match files by content patterns

## Validation Rules

### HierarchyConfig Validation

- `name` must be a non-empty string
- `levels` must be a non-empty array
- `defaultExpanded` must be an integer ≥ -1
- Sort modes must be from the allowed values

### HierarchyLevel Validation

- `type` must be `"tag"` or `"property"`
- `key` must be a string (required for both types)
- Property keys cannot be empty
- Tag `depth` must be an integer ≥ 1 or -1
- Boolean fields must be actual booleans

### Tag Level Overlap Rules

Tag levels must be non-overlapping:
- `"project"` and `"project/work"` overlap (invalid)
- `"project"` and `"status"` don't overlap (valid)
- Empty key (`""`) overlaps with all other tag levels (invalid)

## Example Configurations

### Simple Tag Hierarchy

```json
{
  "name": "All Tags",
  "levels": [
    {
      "type": "tag",
      "key": "",
      "depth": -1,
      "virtual": false,
      "showFullPath": false
    }
  ],
  "defaultExpanded": 2
}
```

### Project Management View

```json
{
  "name": "Projects by Status",
  "levels": [
    {
      "type": "property",
      "key": "status",
      "label": "Status"
    },
    {
      "type": "property",
      "key": "priority",
      "label": "Priority"
    },
    {
      "type": "tag",
      "key": "project",
      "depth": 2
    }
  ],
  "defaultExpanded": 2,
  "defaultNodeSortMode": "alpha-asc"
}
```

### Research Organization

```json
{
  "name": "Research by Topic and Year",
  "levels": [
    {
      "type": "property",
      "key": "topic",
      "label": "Topic"
    },
    {
      "type": "property",
      "key": "year",
      "label": "Year",
      "sortBy": "alpha-desc"
    }
  ],
  "filters": {
    "version": 2,
    "filters": [
      {
        "label": "Research Tag",
        "filter": {
          "id": "research-tag",
          "type": "tag",
          "tag": "research",
          "matchMode": "prefix"
        }
      }
    ],
    "expression": "Research Tag"
  }
}
```

## Migration Notes

When upgrading the plugin, some settings may be automatically migrated:

- `sortMode` → `defaultFileSortMode` and `defaultNodeSortMode`
- `enableLevelColors` → `levelColorMode`
- Global color settings → per-view settings

Check the console for migration messages if you encounter issues.