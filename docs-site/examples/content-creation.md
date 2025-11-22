---
title: Content Creation
description: Organize your writing workflow, blog posts, videos, and content pipeline with MetaGrouper examples.
---

# Content Creation Examples

Learn how to organize your content creation workflow, from blog posts and articles to video production and publishing pipelines.

## Blog Posts by Category and Status

**Use Case**: Managing blog content pipeline with categories and publication workflow.

**Frontmatter Example**:
```yaml
---
category: Technology
subcategory: Web Development
status: draft
publication-date: 2024-03-15
tags: [blog/tech]
---
```

**View Configuration**:
```yaml
name: "Blog Pipeline"
rootTag: "#blog"
levels:
  - type: property
    key: "category"
  - type: property
    key: "status"
  - type: property
    key: "publication-date"
```

**Result**:
```
📋 Technology (15)
  📋 draft (5)
    📋 2024-03-20 (2)
    📋 2024-03-15 (3)
  📋 review (4)
    📋 2024-03-10 (4)
  📋 published (6)
    📋 2024-03-01 (3)
    📋 2024-02-15 (3)
📋 Lifestyle (8)
  ...
```

## YouTube Video Production Pipeline

**Use Case**: Content creator pipeline for video production and publishing.

**Frontmatter Example**:
```yaml
---
series: Tech Tutorials
episode: 15
status: scripting
estimated-length: 10-15 min
tags: [video/tutorial]
---
```

**View Configuration**:
```yaml
name: "Video Production"
rootTag: "#video"
levels:
  - type: property
    key: "status"
    label: "Production Stage"
  - type: property
    key: "series"
  - type: property
    key: "episode"
```

## Article Publishing Workflow

**Use Case**: Track articles through writing, editing, and publication stages.

**Frontmatter Example**:
```yaml
---
title: "Advanced React Patterns"
publication: Dev.to
status: editing
word-count: 2500
tags: [article/tech]
---
```

**View Configuration**:
```yaml
name: "Article Workflow"
rootTag: "#article"
levels:
  - type: property
    key: "status"
  - type: property
    key: "publication"
  - type: property
    key: "word-count"
```

## Content Calendar Management

**Use Case**: Plan and track content across multiple platforms and dates.

**Frontmatter Example**:
```yaml
---
platform: Twitter
content-type: Thread
scheduled-date: 2024-03-20
status: drafted
tags: [social/twitter]
---
```

**View Configuration**:
```yaml
name: "Content Calendar"
levels:
  - type: property
    key: "platform"
  - type: property
    key: "scheduled-date"
  - type: property
    key: "status"
```

## Newsletter Content Organization

**Use Case**: Organize newsletter issues and subscriber content.

**Frontmatter Example**:
```yaml
---
newsletter: Weekly Tech Roundup
issue: 45
status: compiling
send-date: 2024-03-18
tags: [newsletter/tech]
---
```

**View Configuration**:
```yaml
name: "Newsletter Pipeline"
rootTag: "#newsletter"
levels:
  - type: property
    key: "status"
  - type: property
    key: "issue"
  - type: property
    key: "send-date"
```

## Podcast Episode Management

**Use Case**: Track podcast episodes from planning to publishing.

**Frontmatter Example**:
```yaml
---
episode: 23
title: "AI in Content Creation"
status: recorded
length: 45 min
tags: [podcast/ai]
---
```

**View Configuration**:
```yaml
name: "Podcast Episodes"
rootTag: "#podcast"
levels:
  - type: property
    key: "status"
  - type: property
    key: "episode"
  - type: property
    key: "length"
```

## Codeblock Integration

### Content Creator Dashboard

Create a comprehensive content overview:

````markdown
# Content Dashboard

## Blog Pipeline
```metagrouper
view: "Blog Pipeline"
expanded: 2
```

## Video Production
```metagrouper
view: "Video Production"
expanded: 1
```

## Upcoming Schedule
```metagrouper
root: #content
levels:
  - property: "scheduled-date"
  - property: "platform"
sort: alpha-asc
expanded: 2
```
````

### Editorial Calendar

Plan content across all platforms:

````markdown
# Editorial Calendar - March 2024

## This Week
```metagrouper
levels:
  - property: "scheduled-date"
  - property: "platform"
filters:
  scheduled-date: "2024-03-*"
expanded: all
```

## By Platform
```metagrouper
levels:
  - property: "platform"
  - property: "status"
  - property: "scheduled-date"
sort: alpha-asc
expanded: 1
```
````

### Content Performance Tracking

Track engagement and analytics:

````markdown
# Content Performance

## Recent Posts
```metagrouper
root: #content
levels:
  - property: "publication-date"
  - property: "platform"
filters:
  status: "published"
sort: alpha-desc
expanded: 2
```

## Performance Notes
- Track views, engagement, and feedback
- Link to analytics dashboards
- Note successful content patterns
````

## Best Practices for Content Creation

### Consistent Workflow Stages
Define clear status progression:
- `idea` → `researching` → `outlining` → `drafting` → `editing` → `reviewing` → `scheduled` → `published`

### Platform Organization
- Use consistent platform names: `blog`, `twitter`, `youtube`, `newsletter`
- Track content types: `article`, `video`, `thread`, `podcast`
- Include scheduling information

### Content Categories
- Create broad categories: `tech`, `lifestyle`, `tutorials`
- Use subcategories for specificity: `tech/web-dev`, `tech/ai`
- Maintain category consistency across platforms

### Metadata Standards
- Include word counts for written content
- Track estimated lengths for video/audio
- Note target audience or difficulty level

## Advanced Configurations

### Multi-Platform Content Strategy

Track content that appears on multiple platforms:

```yaml
name: "Omni-Channel Content"
levels:
  - type: property
    key: "content-type"
  - type: property
    key: "status"
  - type: property
    key: "platforms"
```

### Content Series Management

Organize content within series or collections:

```yaml
name: "Content Series"
rootTag: "#series"
levels:
  - type: tag
    key: "series"
  - type: property
    key: "episode"
  - type: property
    key: "status"
```

### Collaborative Content Creation

Track content created with team members:

```yaml
name: "Team Content"
levels:
  - type: property
    key: "assignee"
  - type: property
    key: "status"
  - type: property
    key: "deadline"
```

## Performance Tips for Content Creators

### Large Content Libraries
- Use root tag filters to separate draft from published content
- Create separate views for different content types
- Use date-based filtering for current vs archived content

### Workflow Optimization
- Set up recurring calendar views for planning
- Use embedded trees in project boards
- Create status-specific dashboards

### Analytics Integration
- Link content notes to analytics platforms
- Track performance metrics in frontmatter
- Create review templates for published content

## Integration with Content Tools

### Social Media Management
- Connect with Buffer, Hootsuite, or similar tools
- Schedule posts with consistent metadata
- Track engagement metrics

### Writing Tools
- Integrate with Scrivener, Ulysses, or other writing software
- Export outlines and drafts
- Track word count progress

### Video Production
- Link to editing software project files
- Track production assets and resources
- Manage collaboration with editors

## Next Steps

- [Explore Personal Knowledge Examples](./personal-knowledge) for idea organization
- [Learn about Custom Views](../guide/custom-views) for workflow optimization
- [Check Codeblocks Guide](../guide/codeblocks) for dashboard creation