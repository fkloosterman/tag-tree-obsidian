# User Guide

Welcome to the comprehensive MetaGrouper user guide! This section covers all features and capabilities of the plugin.

## Overview

MetaGrouper organizes your notes into hierarchical tree views by performing sequential group-by operations on tags and frontmatter properties. Unlike traditional file browsers, it creates dynamic, multi-dimensional views of your knowledge base.

## Key Features

### 🏷️ Nested Tag Hierarchies
- Automatically builds tree structures from nested tags (e.g., `#project/alpha/feature`)
- Visual organization that mirrors your tag structure
- File counts at each level showing total notes in subtrees

### 🎨 Custom View Configurations
- Create multiple saved views with different organizational schemes
- Mix tags and frontmatter properties in multi-level hierarchies
- Example: Group by `project` → `status` → `priority`

### 🎯 Interactive Tree UI
- Collapsible/expandable nodes with smooth animations
- Click to navigate to notes
- File visibility toggle to show/hide individual files
- Multiple sorting options (alphabetical, by file count)
- Expand to specific depths (1, 2, 3, or all levels)

### ⌨️ Keyboard Navigation
- **Arrow Keys**: Navigate up/down through tree, expand/collapse with left/right
- **Enter**: Open files or toggle folders
- **Space**: Toggle expand/collapse
- **Home/End**: Jump to first/last item

### 📝 Markdown Codeblock Support
Embed tree views directly in your notes:

````markdown
```metagrouper
view: "My Custom View"
```
````

Or define inline configurations:

````markdown
```metagrouper
root: #project
levels:
  - tag: "project"
  - property: "status"
sort: alpha-asc
expanded: 2
```
````

### 💾 Persistent State
- Remembers which nodes are expanded/collapsed
- Preserves scroll position
- Maintains settings per view

### ⚡ Performance Optimized
- Incremental index updates (only re-indexes changed files)
- Debounced batch updates for multiple rapid changes
- Smart partial DOM updates (only re-renders affected nodes)
- Efficient data structures for fast lookups

## Getting Started

If you're new to MetaGrouper, start with:
1. [Getting Started](../getting-started) - Installation and first steps
2. [Basic Usage](./basic-usage) - How to use the tree view
3. [Creating Custom Views](./custom-views) - Build your first custom organization

## Advanced Topics

Once you're comfortable with the basics:
- [Using the Toolbar](./toolbar) - All toolbar controls explained
- [Keyboard Navigation](./keyboard-nav) - Full keyboard shortcuts reference
- [Embedding Trees](./codeblocks) - Codeblock syntax and options
- [Advanced Configuration](./advanced-config) - Fine-tuning and customization

## Examples

See MetaGrouper in action with real-world examples:
- [Project Management](../examples/project-management)
- [Research & Academia](../examples/research)
- [Content Creation](../examples/content-creation)
- [Personal Knowledge](../examples/personal-knowledge)

## Reference

- [Configuration Schema](../reference/configuration) - Complete settings reference
- [Troubleshooting](../reference/troubleshooting) - Common issues and solutions

## Need Help?

- [Open an Issue](https://github.com/bright-fakl/metagrouper-obsidian/issues) for bugs or feature requests
- [Support This Project](../support) - Ways to contribute and show appreciation