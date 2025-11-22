---
title: Project Management
description: Organize projects, tasks, and deliverables with MetaGrouper - from agile sprints to project timelines.
---

# Project Management Examples

Learn how to organize projects, tasks, and deliverables using MetaGrouper. These examples show different approaches to project management workflows.

## Projects by Status and Priority

**Use Case**: Track multiple projects with different statuses and priorities.

**Frontmatter Example**:
```yaml
---
project: Website Redesign
status: active
priority: high
assignee: Alice
tags: [project]
---
```

**View Configuration**:
```yaml
name: "Projects Dashboard"
rootTag: "#project"
levels:
  - type: property
    key: "project"
  - type: property
    key: "status"
  - type: property
    key: "priority"
```

**Result**:
```
📋 Website Redesign (8)
  📋 active (5)
    📋 high (3)
      📄 Homepage Mockup.md
      📄 Color Scheme.md
      📄 Navigation Design.md
    📋 medium (2)
      📄 Footer Layout.md
      📄 About Page.md
  📋 planning (2)
    📋 low (2)
      📄 Future Features.md
      📄 SEO Strategy.md
  📋 completed (1)
    📋 high (1)
      📄 Logo Design.md
```

## Agile Sprint Board

**Use Case**: Managing tasks in agile sprints with story points and assignees.

**Frontmatter Example**:
```yaml
---
project: Mobile App
sprint: Sprint 23
status: in-progress
story-points: 5
assignee: Bob
tags: [sprint/s23]
---
```

**View Configuration**:
```yaml
name: "Sprint Board"
rootTag: "#sprint"
levels:
  - type: tag
    key: "sprint"
    label: "Sprint"
  - type: property
    key: "status"
    label: "Status"
  - type: property
    key: "assignee"
    label: "Assigned To"
```

## Project Timeline

**Use Case**: Organizing project tasks by deadline and quarter.

**Frontmatter Example**:
```yaml
---
project: Product Launch
quarter: Q2-2024
month: April
status: active
tags: [project/launch]
---
```

**View Configuration**:
```yaml
name: "Project Timeline"
rootTag: "#project"
levels:
  - type: property
    key: "quarter"
  - type: property
    key: "month"
  - type: property
    key: "project"
```

## Task Tracking with Assignees

**Use Case**: Track tasks by assignee and project for team management.

**Frontmatter Example**:
```yaml
---
project: API Development
task: Authentication Module
assignee: Charlie
status: in-review
priority: critical
tags: [task/api]
---
```

**View Configuration**:
```yaml
name: "Team Tasks"
rootTag: "#task"
levels:
  - type: property
    key: "assignee"
    label: "Team Member"
  - type: property
    key: "status"
    label: "Status"
  - type: property
    key: "project"
```

## Codeblock Integration

### Project Status Dashboard

Embed project status in meeting notes or dashboards:

````markdown
# Weekly Project Status

## Active Projects
```metagrouper
view: "Projects Dashboard"
expanded: 2
```

## Sprint Progress
```metagrouper
view: "Sprint Board"
expanded: 1
```
````

### Project Overview Page

Create a comprehensive project overview:

````markdown
# Project Portfolio

## By Status
```metagrouper
root: #project
levels:
  - property: "status"
  - property: "priority"
sort: count-desc
expanded: 2
```

## By Timeline
```metagrouper
root: #project
levels:
  - property: "quarter"
  - property: "status"
sort: alpha-asc
expanded: 1
```
````

## Best Practices for Project Management

### Consistent Metadata
- Use standardized status values: `active`, `planning`, `completed`, `on-hold`
- Define priority levels: `critical`, `high`, `medium`, `low`
- Include assignees for team projects

### Multiple Views
Create different views for different stakeholders:
- **Executive View**: High-level project status
- **Manager View**: Detailed task tracking
- **Team View**: Individual assignments
- **Timeline View**: Deadline-focused organization

### Tag Organization
- Use `#project/[name]` for project-specific notes
- Use `#sprint/[number]` for sprint organization
- Use `#task/[type]` for task categorization

### Performance Tips
- Use root tag filters to separate active from archived projects
- Set appropriate expansion depths (1-2 levels for overviews)
- Create separate views for current vs historical projects

## Advanced Configurations

### Multi-Project Portfolio View

Track projects across multiple clients or departments:

```yaml
name: "Portfolio Overview"
levels:
  - type: property
    key: "client"
  - type: property
    key: "project"
  - type: property
    key: "status"
```

### Resource Allocation View

Track team member workloads:

```yaml
name: "Team Workload"
levels:
  - type: property
    key: "assignee"
  - type: property
    key: "status"
  - type: property
    key: "priority"
```

## Next Steps

- [Try Research Examples](./research) for academic project management
- [Learn about Custom Views](../guide/custom-views) for more configuration options
- [Explore Codeblocks](../guide/codeblocks) for embedding in project documentation