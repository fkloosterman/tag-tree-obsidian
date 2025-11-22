# Examples

Welcome to the MetaGrouper examples gallery! This section showcases real-world configurations and use cases to help you get inspired and learn how to organize your vault effectively.

## Overview

MetaGrouper's flexibility allows you to create custom views for any organizational scheme. These examples demonstrate common patterns and can be adapted to your specific needs.

## Example Categories

### 🏢 [Project Management](./project-management)
Organize tasks, projects, and deliverables:
- Projects by status and priority
- Agile sprint boards
- Project timelines
- Task tracking with assignees

### 📚 [Research & Academia](./research)
Academic and research organization:
- Papers by field and year
- Reading pipeline management
- Course materials organization
- Research topics and subtopics

### ✍️ [Content Creation](./content-creation)
Writing and content workflows:
- Blog posts by category and status
- YouTube video production pipeline
- Article publishing workflow
- Content calendar management

### 🧠 [Personal Knowledge](./personal-knowledge)
Personal knowledge management:
- Zettelkasten organization
- Book notes and reading lists
- Areas of life tracking
- Learning resources management

## Getting Started with Examples

### 1. Choose an Example
Pick an example that matches your workflow or needs.

### 2. Understand the Configuration
Each example includes:
- **Use Case**: What the view is designed for
- **Frontmatter Structure**: Required properties in your notes
- **View Configuration**: Complete settings to recreate the view
- **Result**: What the organized tree looks like

### 3. Adapt to Your Vault
- Modify property names to match your existing frontmatter
- Adjust tag structures to fit your conventions
- Combine elements from multiple examples

### 4. Create the View
1. Open Obsidian Settings → MetaGrouper
2. Click "Add New View"
3. Copy the configuration from the example
4. Customize as needed
5. Save and test

## Codeblock Examples

All examples include codeblock syntax for embedding trees in notes:

````markdown
```metagrouper
view: "Projects by Status"
expanded: 2
```
````

Or inline configurations:

````markdown
```metagrouper
root: #project
levels:
  - property: "status"
  - property: "priority"
sort: alpha-asc
expanded: 2
```
````

## Tips for Success

### Consistent Metadata
- Use consistent property names across notes
- Establish tag naming conventions early
- Document your metadata schema

### Start Simple
- Begin with basic tag hierarchies
- Add property levels gradually
- Create multiple focused views rather than one complex view

### Performance Considerations
- Use root tag filters to limit scope for large vaults
- Set appropriate default expansion depths
- Consider file visibility settings for overview vs detail views

## Contributing Examples

Have a great MetaGrouper configuration? Share it!
- Open a [GitHub Issue](https://github.com/bright-fakl/metagrouper-obsidian/issues) with your example
- Submit a pull request to add it to the documentation
- Help others discover new ways to organize their vaults

## Need Help?

- [Getting Started](../getting-started) - Installation and basic usage
- [User Guide](../guide/) - Detailed feature documentation
- [Troubleshooting](../reference/troubleshooting) - Common issues and solutions
- [Support](../support) - Get help and contribute back