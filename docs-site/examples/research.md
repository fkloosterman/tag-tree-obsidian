---
title: Research & Academia
description: Organize academic papers, research materials, course notes, and scholarly work with MetaGrouper.
---

# Research & Academia Examples

Discover how to organize academic research, papers, course materials, and scholarly work using MetaGrouper's flexible hierarchy system.

## Research Papers by Field and Year

**Use Case**: Organizing academic papers and literature reviews by research field and publication year.

**Frontmatter Example**:
```yaml
---
type: paper
field: Machine Learning
subfield: Computer Vision
year: 2023
read-status: read
tags: [research/paper]
---
```

**View Configuration**:
```yaml
name: "Research Library"
rootTag: "#research/paper"
levels:
  - type: property
    key: "field"
  - type: property
    key: "subfield"
  - type: property
    key: "year"
```

**Result**:
```
📋 Machine Learning (24)
  📋 Computer Vision (15)
    📋 2023 (8)
      📄 Attention Mechanisms.md
      📄 Object Detection.md
      ...
    📋 2022 (7)
      📄 CNN Architectures.md
      ...
  📋 Natural Language Processing (9)
    📋 2023 (5)
    📋 2022 (4)
```

## Reading Pipeline Management

**Use Case**: Track reading progress and prioritize literature review.

**View Configuration**:
```yaml
name: "Reading Pipeline"
rootTag: "#research"
levels:
  - type: property
    key: "read-status"
    label: "Status"
  - type: property
    key: "priority"
  - type: property
    key: "field"
```

**Result**:
```
📋 to-read (12)
  📋 high (5)
  📋 medium (7)
📋 reading (3)
  📋 high (2)
  📋 low (1)
📋 read (45)
  📋 high (20)
  📋 medium (25)
```

## Course Materials Organization

**Use Case**: Organizing lecture notes, assignments, and course materials.

**Frontmatter Example**:
```yaml
---
course: CS101
semester: Fall 2024
type: lecture
week: 3
tags: [course/cs101]
---
```

**View Configuration**:
```yaml
name: "Course Materials"
rootTag: "#course"
levels:
  - type: tag
    key: "course"
    label: "Course"
  - type: property
    key: "type"
    label: "Type"
  - type: property
    key: "week"
    label: "Week"
```

## Research Topics and Subtopics

**Use Case**: Organizing research by topic hierarchy and methodology.

**Frontmatter Example**:
```yaml
---
topic: Climate Change
subtopic: Mitigation Strategies
methodology: Quantitative
status: in-progress
tags: [research/topic]
---
```

**View Configuration**:
```yaml
name: "Research Topics"
rootTag: "#research/topic"
levels:
  - type: property
    key: "topic"
  - type: property
    key: "subtopic"
  - type: property
    key: "methodology"
```

## Academic Writing Workflow

**Use Case**: Track thesis chapters, paper drafts, and writing progress.

**Frontmatter Example**:
```yaml
---
project: PhD Thesis
chapter: Literature Review
status: drafting
word-count: 2500
tags: [writing/thesis]
---
```

**View Configuration**:
```yaml
name: "Writing Progress"
rootTag: "#writing"
levels:
  - type: property
    key: "project"
  - type: property
    key: "status"
  - type: property
    key: "chapter"
```

## Conference and Publication Tracking

**Use Case**: Track conference submissions, reviews, and publication status.

**Frontmatter Example**:
```yaml
---
title: "Deep Learning Applications"
conference: ICML 2024
status: submitted
decision: pending
tags: [publication/conference]
---
```

**View Configuration**:
```yaml
name: "Publications"
rootTag: "#publication"
levels:
  - type: property
    key: "status"
  - type: property
    key: "conference"
  - type: property
    key: "decision"
```

## Codeblock Integration

### Research Dashboard

Create a comprehensive research overview page:

````markdown
# Research Dashboard

## Reading Status
```metagrouper
view: "Reading Pipeline"
expanded: 1
```

## Papers by Field
```metagrouper
view: "Research Library"
expanded: 2
sort: count-desc
```

## Current Projects
```metagrouper
root: #research
levels:
  - property: "status"
  - property: "topic"
expanded: 2
```
````

### Literature Review Page

Embed relevant papers in your literature review:

````markdown
# Literature Review: Machine Learning

## Key Papers This Year
```metagrouper
root: #research/paper
levels:
  - property: "field"
  - property: "year"
filters:
  field: "Machine Learning"
  year: 2023
expanded: all
```

## Reading Progress
```metagrouper
root: #research
levels:
  - property: "read-status"
filters:
  field: "Machine Learning"
expanded: 1
```
````

## Best Practices for Academic Organization

### Consistent Citation Metadata
- Include DOI, authors, journal/conference
- Track publication year and venue
- Note access status (open access, paywall, etc.)

### Reading Workflow
- Use consistent read-status values: `to-read`, `reading`, `read`, `skimmed`
- Track reading priority: `high`, `medium`, `low`
- Note key insights or quotes

### Course Organization
- Use consistent course codes (CS101, BIO200)
- Track by week or module number
- Separate lecture notes from assignments

### Research Project Management
- Break down large projects into manageable tasks
- Track methodology and data collection status
- Link to related papers and notes

## Advanced Configurations

### Multi-Disciplinary Research View

Track research across multiple fields:

```yaml
name: "Interdisciplinary Research"
levels:
  - type: property
    key: "field"
  - type: property
    key: "topic"
  - type: property
    key: "status"
```

### Grant and Funding Tracking

Manage research funding and proposals:

```yaml
name: "Grants & Funding"
rootTag: "#grant"
levels:
  - type: property
    key: "status"
  - type: property
    key: "agency"
  - type: property
    key: "amount"
```

### Peer Review Management

Track reviews for conferences and journals:

```yaml
name: "Peer Reviews"
rootTag: "#review"
levels:
  - type: property
    key: "deadline"
  - type: property
    key: "venue"
  - type: property
    key: "status"
```

## Performance Tips for Large Libraries

### For Research Libraries (1000+ papers)
- Use root tag filters to separate active research from archive
- Create separate views for different research areas
- Use property filters to focus on current projects
- Consider list format for broad overviews

### Efficient Searching
- Combine MetaGrouper with Obsidian's search
- Use consistent tagging for cross-referencing
- Create MOCs (Maps of Content) with embedded trees

## Integration with Academic Tools

### Zotero Integration
- Export citations with consistent metadata
- Use tags to link Zotero entries with notes
- Create reading lists with embedded trees

### Reference Management
- Track citation status and notes
- Organize by topic and importance
- Link to full-text PDFs

### Collaboration
- Share view configurations with research teams
- Use consistent metadata schemas across collaborators
- Create shared dashboards for group projects

## Next Steps

- [Explore Content Creation Examples](./content-creation) for publishing workflows
- [Learn about Custom Views](../guide/custom-views) for advanced configurations
- [Check Configuration Reference](../reference/configuration) for all options