---
title: Toolbar Controls
description: Learn how to use the MetaGrouper toolbar for quick tree manipulation, view switching, sorting, and expansion controls.
---

# Using the Toolbar

The toolbar provides quick access to tree controls and is located at the top of the MetaGrouper view. Learn how to use each control effectively.

## View Selector

**Location**: Top left of toolbar

**Function**: Switch between saved views

**Usage**:
1. Click the dropdown
2. Select a view name
3. Tree rebuilds with the new configuration

**Tip**: Create views for different work contexts and switch as needed

## Sort Mode

**Location**: Toolbar, Sort dropdown

**Options**:
- **A→Z**: Alphabetical ascending
- **Z→A**: Alphabetical descending
- **9→1**: By file count (most first)
- **1→9**: By file count (least first)

**Usage**: Click dropdown and select desired sort mode

**Note**: Sorting applies to all levels of the tree

## Expand to Depth

**Location**: Toolbar, depth buttons (1, 2, 3, All)

**Function**: Quickly expand tree to a specific depth

**Depths**:
- **1**: Only first level visible
- **2**: First and second levels
- **3**: First three levels
- **All**: Everything expanded

**Usage**: Click a depth button

**Tip**: Use "1" to get an overview, then manually expand areas of interest

## Collapse/Expand All

**Location**: Toolbar buttons

**Functions**:
- **Collapse All**: Closes all nodes
- **Expand All**: Opens all nodes

**Usage**: Click the respective button

**Warning**: "Expand All" on large vaults may take a moment and create a very long list

## Show Files Toggle

**Location**: Toolbar toggle button

**Function**: Show or hide individual file nodes in the tree

**States**:
- **Enabled** (default): Files shown under their parent nodes
- **Disabled**: Only tag/property group nodes visible

**Usage**: Click the toggle button

**Use Case**: Hide files to see just the organizational structure

## Performance Tips

### For Large Vaults (1000+ notes)

1. **Use Root Tag Filters**: Narrow views to relevant subsets
2. **Keep Default Expansion Low**: Start with depth 1-2
3. **Hide Files Initially**: Use Show Files toggle when needed
4. **Create Multiple Specific Views**: Instead of one huge view

### Tag Indexing

The plugin automatically re-indexes when files change, but:

- **Debounced Updates**: Rapid changes are batched (300ms delay)
- **Incremental**: Only changed files are re-indexed
- **Efficient**: Uses optimized data structures

## Next Steps

- [Learn about keyboard navigation](./keyboard-nav) for efficient tree traversal
- [Create custom views](./custom-views) for different organizational needs
- [Embed trees in notes](./codeblocks) using codeblocks