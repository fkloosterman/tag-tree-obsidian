---
title: Personal Knowledge Management
description: Organize your personal knowledge base, reading lists, Zettelkasten notes, and lifelong learning with MetaGrouper.
---

# Personal Knowledge Management Examples

Discover how to organize your personal knowledge base, from Zettelkasten systems to reading lists and lifelong learning tracking.

## Zettelkasten Organization

**Use Case**: Organizing atomic notes by topic and connection count in a Zettelkasten system.

**Frontmatter Example**:
```yaml
---
type: permanent-note
topic: Philosophy
subtopic: Ethics
connections: 5
tags: [zettel/philosophy]
---
```

**View Configuration**:
```yaml
name: "Zettelkasten"
rootTag: "#zettel"
levels:
  - type: property
    key: "topic"
  - type: property
    key: "subtopic"
  - type: property
    key: "type"
```

## Book Notes and Reading Lists

**Use Case**: Organizing reading notes, highlights, and book reviews.

**Frontmatter Example**:
```yaml
---
book: Thinking, Fast and Slow
author: Daniel Kahneman
genre: Psychology
read-status: reading
rating: 5
tags: [book/psychology]
---
```

**View Configuration**:
```yaml
name: "Reading Notes"
rootTag: "#book"
levels:
  - type: property
    key: "genre"
  - type: property
    key: "read-status"
  - type: property
    key: "rating"
```

## Areas of Life Tracking (PARA Method)

**Use Case**: Organizing life areas using the PARA method (Projects, Areas, Resources, Archive).

**Tags Structure**:
```
#area/health
#area/health/fitness
#area/health/nutrition
#area/career
#area/career/skills
#area/career/networking
#area/relationships
#area/finance
```

**View Configuration**:
```yaml
name: "Life Areas"
rootTag: "#area"
levels:
  - type: tag
    key: "area"
```

## Learning Resources Management

**Use Case**: Organizing tutorials, courses, and learning materials by topic and progress.

**Frontmatter Example**:
```yaml
---
topic: React
resource-type: tutorial
difficulty: intermediate
completed: false
tags: [learn/react]
---
```

**View Configuration**:
```yaml
name: "Learning Path"
rootTag: "#learn"
levels:
  - type: tag
    key: "learn"
    label: "Topic"
  - type: property
    key: "difficulty"
  - type: property
    key: "completed"
```

## Daily Notes and Journaling

**Use Case**: Organizing daily notes by themes, projects, and time periods.

**Frontmatter Example**:
```yaml
---
date: 2024-03-15
type: daily-note
mood: productive
tags: [daily, journal]
---
```

**View Configuration**:
```yaml
name: "Daily Notes"
rootTag: "#daily"
levels:
  - type: property
    key: "date"
  - type: property
    key: "type"
  - type: property
    key: "mood"
```

## Idea Management and Creativity

**Use Case**: Tracking creative ideas, project concepts, and inspiration.

**Frontmatter Example**:
```yaml
---
idea-type: story-concept
genre: Science Fiction
theme: Time Travel
priority: high
tags: [idea/story]
---
```

**View Configuration**:
```yaml
name: "Idea Garden"
rootTag: "#idea"
levels:
  - type: property
    key: "idea-type"
  - type: property
    key: "priority"
  - type: property
    key: "genre"
```

## Habit Tracking and Goals

**Use Case**: Organizing personal development goals and habit tracking.

**Frontmatter Example**:
```yaml
---
goal-category: Health
goal: Exercise 5x per week
status: active
progress: 80%
tags: [goal/health]
---
```

**View Configuration**:
```yaml
name: "Goals & Habits"
rootTag: "#goal"
levels:
  - type: property
    key: "goal-category"
  - type: property
    key: "status"
  - type: property
    key: "progress"
```

## Codeblock Integration

### Personal Knowledge Dashboard

Create a comprehensive overview of your knowledge system:

````markdown
# Knowledge Dashboard

## Current Reading
```metagrouper
view: "Reading Notes"
expanded: 1
```

## Active Learning
```metagrouper
view: "Learning Path"
filters:
  completed: false
expanded: 2
```

## Recent Notes
```metagrouper
root: #zettel
levels:
  - property: "topic"
sort: alpha-asc
expanded: 1
```
````

### Monthly Review Template

Use embedded trees in monthly review notes:

````markdown
# Monthly Review - March 2024

## Reading Progress
```metagrouper
root: #book
levels:
  - property: "read-status"
filters:
  read-status: "completed"
expanded: all
```

## Goals Update
```metagrouper
view: "Goals & Habits"
expanded: 2
```

## New Connections Made
```metagrouper
root: #zettel
levels:
  - property: "connections"
sort: count-desc
expanded: 1
```
````

### Idea Development Pipeline

Track idea evolution from concept to execution:

````markdown
# Idea Pipeline

## Concepts to Explore
```metagrouper
root: #idea
levels:
  - property: "priority"
filters:
  status: "concept"
expanded: 2
```

## Projects in Development
```metagrouper
root: #idea
levels:
  - property: "status"
filters:
  status: "developing"
expanded: 2
```

## Completed Projects
```metagrouper
root: #idea
levels:
  - property: "completion-date"
sort: alpha-desc
expanded: 1
```
````

## Best Practices for Personal Knowledge

### Consistent Metadata Standards
- Use standardized property names across all notes
- Define clear value ranges (e.g., priority: high/medium/low)
- Include creation and modification dates when relevant

### Tag Naming Conventions
- Use hierarchical tags: `#topic/subtopic/concept`
- Reserve specific prefixes: `#book/`, `#zettel/`, `#idea/`
- Create tag aliases for common variations

### Progressive Organization
- Start with broad categories and refine over time
- Use properties for structured data, tags for flexible organization
- Create multiple views for different access patterns

### Review and Maintenance
- Regularly review and update note metadata
- Archive completed projects and reading
- Create periodic overview notes with embedded trees

## Advanced Configurations

### Spaced Repetition Integration

Track review schedules for important concepts:

```yaml
name: "Review Schedule"
rootTag: "#review"
levels:
  - type: property
    key: "next-review"
  - type: property
    key: "importance"
  - type: property
    key: "topic"
```

### Project-Based Knowledge Organization

Link knowledge to specific projects or goals:

```yaml
name: "Project Knowledge Base"
levels:
  - type: property
    key: "project"
  - type: property
    key: "knowledge-type"
  - type: property
    key: "topic"
```

### Cross-Reference Tracking

Track connections between notes and concepts:

```yaml
name: "Knowledge Graph"
rootTag: "#zettel"
levels:
  - type: property
    key: "connections"
  - type: property
    key: "topic"
  - type: property
    key: "importance"
```

## Performance Tips for Large Knowledge Bases

### Organization Strategies
- Use root tag filters to separate active from archive knowledge
- Create domain-specific views (technical, personal, professional)
- Use property filters to focus on current priorities

### Maintenance Workflows
- Set up weekly review routines with embedded trees
- Create cleanup views for outdated or redundant notes
- Use automated templates for consistent metadata

### Search Integration
- Combine MetaGrouper with Obsidian's search capabilities
- Create MOCs (Maps of Content) with embedded trees
- Use tags for cross-cutting concerns

## Integration with PKM Tools

### Note-Taking Apps
- Import from Roam Research, Notion, or other tools
- Maintain consistent metadata during migration
- Create transition views during migration periods

### Spaced Repetition Systems
- Integrate with Anki or other SRS tools
- Track review statistics in note metadata
- Create review dashboards with embedded trees

### Digital Gardens
- Publish knowledge as web content
- Track publication status and engagement
- Create public vs private knowledge views

## Next Steps

- [Explore Project Management Examples](./project-management) for work organization
- [Learn about Custom Views](../guide/custom-views) for knowledge workflows
- [Check Configuration Reference](../reference/configuration) for advanced options