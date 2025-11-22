import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MetaGrouper',
  description: 'Organize notes into hierarchical tree views by grouping on tags and frontmatter properties',
  base: '/metagrouper-obsidian/',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/examples/' },
      { text: '❤️ Sponsor', link: '/support' },
      { text: 'GitHub', link: 'https://github.com/bright-fakl/metagrouper-obsidian' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Features Overview', link: '/guide/' }
        ]
      },
      {
        text: 'User Guide',
        items: [
          { text: 'Basic Usage', link: '/guide/basic-usage' },
          { text: 'Creating Custom Views', link: '/guide/custom-views' },
          { text: 'Using the Toolbar', link: '/guide/toolbar' },
          { text: 'Keyboard Navigation', link: '/guide/keyboard-nav' },
          { text: 'Embedding Trees', link: '/guide/codeblocks' },
          { text: 'Advanced Configuration', link: '/guide/advanced-config' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Overview', link: '/examples/' },
          { text: 'Project Management', link: '/examples/project-management' },
          { text: 'Research & Academia', link: '/examples/research' },
          { text: 'Content Creation', link: '/examples/content-creation' },
          { text: 'Personal Knowledge', link: '/examples/personal-knowledge' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Configuration Schema', link: '/reference/configuration' },
          { text: 'Troubleshooting', link: '/reference/troubleshooting' }
        ]
      },
      {
        text: 'Support',
        items: [
          { text: '❤️ Support This Project', link: '/support' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/bright-fakl/metagrouper-obsidian' }
    ],

    footer: {
      message: 'Released under the MIT License. • <a href="/support">❤️ Support This Project</a>',
      copyright: 'Copyright © 2024-present <a href="https://github.com/bright-fakl">Fabian Kloosterman</a>'
    },

    search: {
      provider: 'local'
    }
  }
})