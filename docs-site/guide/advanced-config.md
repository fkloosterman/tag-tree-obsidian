---
title: Advanced Configuration
description: Deep dive into advanced MetaGrouper configuration options, performance tuning, and optimization techniques.
---

# Advanced Configuration

Master the advanced features and configuration options of MetaGrouper to optimize performance and customize behavior for your specific workflow.

## Root Tag Filtering

Limit a view to only notes with a specific tag:

```yaml
name: "Project View"
rootTag: "#project"
```

**Effect**: Only files tagged with `#project` (or child tags) appear in this view

**Use Case**: Create focused views for different areas of your vault

## Default Expansion Depth

Control how many levels open automatically:

```yaml
defaultExpanded: 2
```

- `0`: All collapsed
- `1`: First level only
- `2`: First two levels
- `-1`: All expanded

**Tip**: Use 1-2 for large vaults to avoid overwhelming initial display

## Custom Labels

Override the display name for hierarchy levels:

```yaml
levels:
  - type: property
    key: "status"
    label: "Current Status"
```

The tree will show "Current Status" instead of "status"

## Sorting by Level

*Note: Currently, sorting applies globally. Per-level sorting is planned for future releases.*

## Performance Optimization

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

## Troubleshooting

### Common Issues

#### Tree Not Updating After Changes

**Symptom**: You edited a note's tags but the tree hasn't updated

**Solutions**:
1. Wait 300ms - updates are debounced
2. Check that the tag syntax is correct (`#tag` not `tag`)
3. Try manually refreshing: close and reopen the view

#### View Configuration Not Saving

**Symptom**: Changes in settings don't persist

**Solutions**:
1. Make sure you clicked "Save"
2. Check Obsidian's console for errors (Ctrl/Cmd + Shift + I)
3. Verify your configuration syntax is valid

#### Files Not Appearing in View

**Symptom**: A file doesn't show up where expected

**Possible Causes**:
1. **Root Tag Filter**: The file doesn't have the root tag
2. **Show Files Disabled**: Toggle "Show Files" in toolbar
3. **Property Not Set**: Missing required frontmatter property
4. **Tag Typo**: Check tag spelling and case

**Debug Steps**:
1. Check the file's frontmatter and tags
2. Try viewing in "All Tags" default view
3. Verify property names match exactly (case-sensitive)

#### Keyboard Navigation Not Working

**Symptom**: Arrow keys don't navigate the tree

**Solutions**:
1. Click on a node first to focus the tree
2. Check that focus is in the tree (not toolbar or search)
3. Try pressing Tab to move focus into the tree

#### Performance Issues

**Symptom**: Tree is slow to load or navigate

**Solutions**:
1. Reduce default expansion depth in view settings
2. Use root tag filters to limit scope
3. Create smaller, focused views instead of one large view
4. Consider hiding files initially

### Getting Help

If you encounter issues not covered here:

1. **Check Documentation**: See [Examples](/examples/) for more use cases
2. **GitHub Issues**: Search existing issues or create a new one
3. **Obsidian Forum**: Ask in the community
4. **Enable Debug Mode**: Check browser console for error messages

### Reporting Bugs

When reporting a bug, please include:

1. **Obsidian Version**: Found in Settings → About
2. **Plugin Version**: 0.0.1 (found in Community Plugins)
3. **Steps to Reproduce**: Detailed description
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Console Errors**: Press Ctrl/Cmd + Shift + I, check Console tab
7. **View Configuration**: If relevant, share your view config

## Keyboard Reference Card

Quick reference for all keyboard shortcuts:

| Key | Action |
|-----|--------|
| ↓ | Next node |
| ↑ | Previous node |
| → | Expand node / Move to first child |
| ← | Collapse node / Move to parent |
| Enter | Open file / Toggle node |
| Space | Toggle expand/collapse |
| Home | First node |
| End | Last node |
| Tab | Focus tree (from toolbar) |
| Shift+Tab | Focus toolbar (from tree) |

## Next Steps

- [Explore examples](/examples/) for real-world configurations
- [Check the Configuration reference](../reference/configuration) for developer information
- [Contribute](../support) to the project development