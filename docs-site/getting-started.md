# Getting Started

Welcome to MetaGrouper! This guide will help you get up and running with the plugin quickly.

## Installation

### From Obsidian Community Plugins (Coming Soon)
1. Open Obsidian Settings
2. Navigate to Community Plugins
3. Search for "MetaGrouper"
4. Click Install, then Enable

### Manual Installation
1. Download the latest release from the [Releases page](https://github.com/bright-fakl/metagrouper-obsidian/releases)
2. Extract the files to your vault's `.obsidian/plugins/metagrouper/` directory
3. Reload Obsidian
4. Enable the plugin in Settings → Community Plugins

### For Development
```bash
# Clone the repository
git clone https://github.com/bright-fakl/metagrouper-obsidian.git
cd metagrouper-obsidian

# Install dependencies
npm install

# Build the plugin
npm run build

# For development with auto-reload
npm run dev
```

## First Steps

### 1. Open the MetaGrouper View
- Click the tree icon (🌳) in the left sidebar
- Or use the command palette: `Ctrl/Cmd + P` and search for "MetaGrouper: Open view"

### 2. Basic Usage
The plugin automatically indexes all tags in your vault and displays them in a tree structure. Click on any tag to expand/collapse it, or click on a file name to open it.

### 3. Create Your First Custom View
1. Open Settings → MetaGrouper
2. Click "Add New View"
3. Configure your hierarchy:
   - Add levels (tags or properties)
   - Set sorting preferences
   - Define a root tag filter (optional)
4. Save and switch to your new view

## Quick Example

Let's create a simple project view:

1. **Add some test notes** with frontmatter:
   ```yaml
   ---
   project: Website Redesign
   status: active
   priority: high
   ---
   ```

2. **Create a view** in settings:
   - Name: "Active Projects"
   - Levels: Property `project`, Property `status`
   - Root tag: (leave empty)

3. **View the result** - your notes organized by project and status!

## Next Steps

- [Explore the User Guide](./guide/) for detailed features
- [Check out Examples](./examples/) for real-world configurations
- [Learn about Codeblocks](./guide/codeblocks) for embedding trees in notes

Need help? Check the [troubleshooting guide](./reference/troubleshooting) or [open an issue](https://github.com/bright-fakl/metagrouper-obsidian/issues).