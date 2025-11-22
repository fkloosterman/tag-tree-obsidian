---
title: Custom Views
description: Create and manage custom views to organize your notes in different ways beyond simple tag hierarchies.
---

# Creating Custom Views

Custom views allow you to organize notes in different ways beyond simple tag hierarchies. Learn how to create, configure, and manage multiple views for different purposes.

## Accessing View Configuration

1. Open Obsidian Settings (`Ctrl/Cmd + ,`)
2. Navigate to "MetaGrouper" in the plugin settings
3. You'll see a list of saved views and controls to add/edit/delete

## View Configuration Basics

Each view has:
- **Name**: Display name in the view selector
- **Root Tag** (optional): Filter to only notes with this tag
- **Hierarchy Levels**: Define how notes are grouped
- **Default Expansion**: How many levels to expand initially

## Adding Hierarchy Levels

Levels are processed top-to-bottom. Each level groups files by either a tag or property.

### Tag Level
Groups files by tags matching a pattern:

```yaml
type: tag
key: "project"        # Groups by #project/* tags
label: "Projects"     # Optional display name
```

### Property Level
Groups files by frontmatter property values:

```yaml
type: property
key: "status"         # Groups by 'status' property
label: "Status"       # Optional display name
```

## Example Configuration Flow

Let's create a view that organizes project notes:

**Goal**: Group by project name → status → priority

**Notes Example:**
```yaml
---
project: Website Redesign
status: active
priority: high
tags: [project/frontend]
---
```

**View Configuration:**
1. **Name**: "Projects Dashboard"
2. **Root Tag**: `#project` (optional filter)
3. **Levels**:
   - Level 1: Property `project`
   - Level 2: Property `status`
   - Level 3: Property `priority`

**Result:**
```
📋 Website Redesign (5)
  📋 active (3)
    📋 high (2)
      📄 Homepage Mockup.md
      📄 Color Scheme.md
    📋 medium (1)
      📄 Footer Design.md
  📋 planning (2)
    📋 low (2)
      📄 Research.md
      📄 Competitors.md
```

## Mixing Tags and Properties

You can combine tag and property levels for sophisticated organizations:

**Example: Content Creation Workflow**

```yaml
name: "Content Pipeline"
root: "#article"
levels:
  - type: tag
    key: "article"
  - type: property
    key: "category"
  - type: property
    key: "status"
```

This creates a hierarchy: Article Type → Category → Status

## Managing Multiple Views

You can create multiple views for different purposes:

- **All Tags**: Simple tag hierarchy (default)
- **Projects**: Project management view
- **Research**: Academic organization
- **Daily Notes**: Date-based organization
- **Content**: Writing workflow

Switch between them using the view selector in the toolbar.

## Advanced Configuration

### Root Tag Filtering

Limit a view to only notes with a specific tag:

```yaml
name: "Project View"
rootTag: "#project"
```

**Effect**: Only files tagged with `#project` (or child tags) appear in this view

**Use Case**: Create focused views for different areas of your vault

### Default Expansion Depth

Control how many levels open automatically:

```yaml
defaultExpanded: 2
```

- `0`: All collapsed
- `1`: First level only
- `2`: First two levels
- `-1`: All expanded

**Tip**: Use 1-2 for large vaults to avoid overwhelming initial display

### Custom Labels

Override the display name for hierarchy levels:

```yaml
levels:
  - type: property
    key: "status"
    label: "Current Status"
```

The tree will show "Current Status" instead of "status"

## Tips and Best Practices

### Organizing Your Vault

#### Use Consistent Nested Tags

**Good**:
```
#project/alpha
#project/beta
#project/alpha/feature-a
```

**Avoid**:
```
#project-alpha
#beta-project
#feature_a
```

Consistent nesting creates cleaner hierarchies.

#### Combine Tags and Properties

Use tags for broad categories and properties for specific attributes:

```yaml
---
tags: [project/website]
status: active
priority: high
assignee: Alice
---
```

This allows flexible view configurations.

#### Create Context-Specific Views

Don't try to make one view do everything. Create multiple:

- **All Tags**: Browse everything
- **Active Projects**: Filter by `status: active`
- **My Tasks**: Filter by `assignee: Your Name`
- **Archive**: View completed work

### Workflow Integration

#### Morning Review

Create a "Today's Focus" view:

```yaml
name: "Today"
root: "#daily"
levels:
  - property: "date"
  - property: "priority"
```

#### Project Management

Weekly status view:

```yaml
name: "Weekly Status"
root: "#project"
levels:
  - property: "project"
  - property: "status"
  - property: "assignee"
```

#### Research Organization

Paper tracking:

```yaml
name: "Research Papers"
root: "#research/paper"
levels:
  - property: "field"
  - property: "year"
  - property: "read-status"
```

## Next Steps

- [Learn about toolbar controls](./toolbar) for quick tree manipulation
- [Embed trees in your notes](./codeblocks) using codeblocks
- [Explore advanced configuration options](./advanced-config)