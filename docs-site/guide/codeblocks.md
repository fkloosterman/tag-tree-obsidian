---
title: Embedding Trees
description: Learn how to embed MetaGrouper tree views directly in your notes using codeblocks for dynamic, interactive content.
---

# Embedding Trees in Notes

You can embed tree views directly in your notes using codeblocks. This allows you to create dynamic, interactive content that stays up-to-date with your vault.

## Basic Syntax

````markdown
```metagrouper
view: "View Name"
```
````

This references a saved view and displays it inline.

## Inline Configuration

Define a tree structure without creating a saved view:

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

## Configuration Options

### Reference Saved View
```yaml
view: "My Custom View"
```

### Define Hierarchy Inline
```yaml
root: #research              # Optional root tag filter
levels:                      # Hierarchy definition
  - tag: "research"
  - property: "field"
  - property: "year"
```

### Display Options
```yaml
sort: alpha-asc             # alpha-asc, alpha-desc, count-asc, count-desc
expanded: 2                 # Default expansion depth (number or "all")
format: tree                # "tree" (default) or "list"
interactive: true           # Enable clicking (default: true)
```

## Output Formats

### Tree Format (Default)
Interactive tree with expand/collapse functionality:

```
🌳 project
  └─ alpha
     └─ Feature.md
```

### List Format
Simple nested list:

```
• project (2)
  • alpha (1)
    • Feature.md
  • beta (1)
    • Planning.md
```

## Examples

### Project Status Board

````markdown
# Project Status

```metagrouper
view: "Projects Dashboard"
expanded: 2
```
````

### Research Papers by Year

````markdown
# My Publications

```metagrouper
root: #research/papers
levels:
  - property: "year"
  - property: "status"
sort: count-desc
expanded: all
```
````

### Simple Tag Index

````markdown
# Note Index

```metagrouper
root: #moc
levels:
  - tag: "moc"
format: list
```
````

## Non-Interactive Mode

For read-only displays:

````markdown
```metagrouper
view: "All Tags"
interactive: false
```
````

This disables clicking and hover effects, useful for exported/printed notes.

## Use Cases

### Dynamic Documentation
Embed project hierarchies in README files or project documentation that automatically update as you add new files.

### Status Dashboards
Create overview pages that show current project status, active tasks, or research progress.

### Knowledge Maps
Build interconnected maps of concepts, where each embedded tree shows relationships from different perspectives.

### Progress Tracking
Show completion status or work-in-progress across multiple projects or research areas.

## Best Practices

### Choose Appropriate Views
- Use saved views for frequently used configurations
- Use inline configuration for one-off displays
- Consider your audience when choosing interactive vs non-interactive mode

### Performance Considerations
- Limit expansion depth for large hierarchies
- Use root tag filters to narrow scope
- Consider list format for simpler presentations

### Integration with Workflows
- Embed in daily notes for quick status checks
- Include in project documentation for context
- Use in meeting notes to show current work structure

## Next Steps

- [Create custom views](./custom-views) to use in your embedded trees
- [Learn about advanced configuration](./advanced-config) options
- [Explore examples](/examples/) for inspiration