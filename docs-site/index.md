---
layout: home

hero:
  name: MetaGrouper
  text: Obsidian Plugin
  tagline: Organize notes into hierarchical tree views by grouping on tags and frontmatter properties
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View Examples
      link: /examples/
    - theme: alt
      text: View on GitHub
      link: https://github.com/bright-fakl/metagrouper-obsidian
    - theme: alt
      text: ❤️ Sponsor
      link: /support

features:
  - icon: 🏷️
    title: Nested Tag Hierarchies
    details: Automatically builds tree structures from nested tags (e.g., #project/alpha/feature) with visual organization mirroring your tag structure
  - icon: 🎨
    title: Custom View Configurations
    details: Create multiple saved views with different organizational schemes mixing tags and frontmatter properties in multi-level hierarchies
  - icon: 🎯
    title: Interactive Tree UI
    details: Collapsible/expandable nodes with smooth animations, click to navigate, multiple sorting options, and keyboard navigation
  - icon: 📝
    title: Markdown Codeblock Support
    details: Embed tree views directly in your notes with inline configurations or reference saved views
  - icon: 💾
    title: Persistent State
    details: Remembers which nodes are expanded/collapsed, preserves scroll position, and maintains settings per view
  - icon: ⚡
    title: Performance Optimized
    details: Incremental index updates, debounced batch updates, smart partial DOM updates, and efficient data structures
---

## Quick Example

Create hierarchical organizations using tags and properties:

```yaml
---
project: Website Redesign
status: active
priority: high
tags: [project/frontend]
---
```

View organized by: Project → Status → Priority

Or embed trees directly in notes:

````markdown
```metagrouper
view: "Projects Dashboard"
expanded: 2
```
````

---

## Support This Project

If you find MetaGrouper useful, consider supporting its development:

<div style="display: flex; gap: 1rem; align-items: center; margin-top: 1rem;">
  <a href="https://github.com/sponsors/fkloosterman" target="_blank">
    <img src="https://img.shields.io/badge/Sponsor-%E2%9D%A4-red?style=for-the-badge&logo=github" alt="GitHub Sponsors">
  </a>
  <a href="https://ko-fi.com/fabiankloosterman" target="_blank">
    <img src="https://img.shields.io/badge/Ko--fi-Buy%20me%20a%20coffee-ff5e5b?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Ko-fi">
  </a>
</div>