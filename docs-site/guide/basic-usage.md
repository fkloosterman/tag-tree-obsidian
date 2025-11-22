---
title: Basic Usage
description: Learn the fundamentals of using MetaGrouper - opening the view, understanding the tree structure, and basic navigation.
---

# Basic Usage

Get started with MetaGrouper by learning how to open the view, understand the tree structure, and navigate through your notes.

## Opening the MetaGrouper View

There are several ways to open the MetaGrouper view:

1. **Sidebar Icon**: Click the tree icon (🌳) in the left sidebar
2. **Command Palette**: Press `Ctrl/Cmd + P` and search for "MetaGrouper: Open view"
3. **Ribbon**: Click the MetaGrouper icon in the ribbon (if enabled)

## First Look

When you first open the MetaGrouper view, you'll see:

- **Toolbar**: At the top with view selection, sorting, and expansion controls
- **Tree Container**: The main area displaying your tag hierarchy
- **File Counts**: Numbers in parentheses showing how many files are in each node

## Understanding the Tree View

### Node Types

The tree view displays three types of nodes:

#### 1. Tag Nodes
- **Icon**: Tags icon (🏷️)
- **Represents**: A tag or tag segment in your hierarchy
- **Example**: `#project`, `#project/alpha`, `#project/alpha/feature`

#### 2. Property Group Nodes
- **Icon**: List icon (📋)
- **Represents**: A grouping by frontmatter property value
- **Example**: When grouping by `status: active`

#### 3. File Nodes
- **Icon**: File icon (📄)
- **Represents**: An individual note
- **Behavior**: Clicking opens the file

### Tag Hierarchy

Tags with slashes (`/`) create hierarchies automatically:

```
#project                 → Root tag
#project/alpha          → Child of #project
#project/alpha/feature  → Child of #project/alpha
#project/beta           → Child of #project
```

**Visual Result:**
```
📁 project (3)
  📁 alpha (2)
    📁 feature (1)
      📄 Feature Implementation.md
    📄 Alpha Overview.md
  📁 beta (1)
    📄 Beta Planning.md
```

### File Counts

Numbers in parentheses show the **total** files in that node and all its children:

- `project (3)` means 3 files total under #project
- `alpha (2)` means 2 files under #project/alpha
- `feature (1)` means 1 file under #project/alpha/feature

## Navigation and Interaction

### Mouse Navigation

#### Basic Clicking
- **Click node name**: Toggle expand/collapse (or open file for file nodes)
- **Click chevron icon**: Toggle expand/collapse
- **Hover**: View tooltip with full path and file count

#### File Opening
- **Left click file**: Opens in the current editor pane
- Files are displayed with a file icon (📄)

### Keyboard Navigation

The tree view supports full keyboard navigation for efficiency:

#### Basic Movement
- **↓ (Down Arrow)**: Move to the next visible node
- **↑ (Up Arrow)**: Move to the previous visible node
- **Home**: Jump to the first node
- **End**: Jump to the last node

#### Expand/Collapse
- **→ (Right Arrow)**:
  - Expand the current node if collapsed
  - Move to first child if already expanded
- **← (Left Arrow)**:
  - Collapse the current node if expanded
  - Move to parent node if already collapsed

#### Actions
- **Enter**:
  - Open file (if file node)
  - Toggle expand/collapse (if folder/tag node)
- **Space**: Toggle expand/collapse

#### Focus Management
- **Tab**: Move focus into the tree (from toolbar)
- **Shift + Tab**: Move focus out of the tree
- Focused nodes are highlighted with an outline

### Accessibility

The tree view includes basic accessibility features:

- **ARIA roles**: Proper semantic structure
- **Keyboard accessible**: Full functionality without mouse
- **Focus indicators**: Clear visual feedback
- **Tooltips**: Additional context on hover

## Next Steps

Now that you understand the basics, you can:
- [Create custom views](./custom-views) to organize your notes differently
- [Learn about the toolbar controls](./toolbar) for quick tree manipulation
- [Explore keyboard shortcuts](./keyboard-nav) for efficient navigation