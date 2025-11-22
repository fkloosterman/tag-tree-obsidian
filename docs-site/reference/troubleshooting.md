---
title: Troubleshooting
description: Common issues and solutions for MetaGrouper, including debugging tips and error resolution.
---

# Troubleshooting Guide

This guide covers common issues and their solutions. If you encounter problems not covered here, check the [GitHub Issues](https://github.com/bright-fakl/metagrouper-obsidian/issues) or create a new issue.

## Tree Not Updating

### Symptom
You edited a note's tags or properties but the tree hasn't updated.

### Solutions

1. **Wait for debouncing**: Updates are batched for performance. Wait 300ms after changes.

2. **Check syntax**: Ensure tags start with `#` and are properly formatted.

3. **Refresh manually**: Close and reopen the MetaGrouper view.

4. **Check file location**: Ensure the file is in an indexed folder (not excluded in Obsidian settings).

## Files Not Appearing

### Symptom
A file doesn't show up in the expected location in the tree.

### Possible Causes

#### Root Tag Filter
**Issue**: The view has a root tag filter but the file doesn't have that tag.

**Solution**: Check the view's root tag filter in settings. Either add the tag to the file or modify the filter.

#### Missing Properties
**Issue**: The view groups by a property that doesn't exist in the file.

**Check**:
- File frontmatter has the required property
- Property name matches exactly (case-sensitive)
- Property value is not empty/null

#### Show Files Toggle
**Issue**: Individual files are hidden.

**Solution**: Click the "Show Files" toggle in the toolbar.

#### Tag Case Sensitivity
**Issue**: Tag matching is case-sensitive.

**Check**: Ensure tag casing matches exactly (`#Project` ≠ `#project`).

### Debug Steps

1. Switch to the "All Tags" default view
2. Check if the file appears there
3. Verify the file's frontmatter and tags
4. Test with a simpler view configuration

## Configuration Issues

### View Configuration Not Saving

**Symptom**: Changes in settings don't persist.

**Solutions**:
1. Click the "Save" button after making changes
2. Check browser console for validation errors (`Ctrl/Cmd + Shift + I`)
3. Verify configuration syntax is valid JSON
4. Restart Obsidian if issues persist

### Invalid Configuration

**Symptom**: Error messages about invalid configuration.

**Common Issues**:
- Missing required fields (`name`, `levels`)
- Invalid sort mode values
- Overlapping tag levels
- Empty property keys

**Solution**: Check the [Configuration Schema](./configuration) for valid options.

## Performance Issues

### Symptom
Tree is slow to load or navigate, especially with large vaults.

### Solutions

#### For Large Vaults (1000+ notes)

1. **Use root tag filters**: Narrow views to relevant subsets
2. **Reduce default expansion**: Start with depth 1-2 instead of fully expanded
3. **Hide files initially**: Use the "Show Files" toggle
4. **Create focused views**: Multiple small views instead of one large view

#### Optimize View Configuration

1. **Limit hierarchy depth**: Don't expand to unnecessary levels
2. **Use efficient sorting**: Avoid complex sorting on large datasets
3. **Minimize levels**: Fewer hierarchy levels = faster processing

#### System Resources

1. **Close other tabs**: Free up memory for Obsidian
2. **Restart Obsidian**: Clear memory and restart indexing
3. **Check disk space**: Ensure adequate free space

## Keyboard Navigation Issues

### Symptom
Arrow keys don't navigate the tree.

### Solutions

1. **Focus the tree**: Click on any node first to establish focus
2. **Check focus location**: Ensure focus is in the tree, not toolbar or search
3. **Use Tab**: Press Tab to move focus into the tree from toolbar
4. **Browser focus**: Some browsers may steal focus - try clicking the tree

### Focus Indicators

- Focused nodes show an outline
- Use Tab/Shift+Tab to move between toolbar and tree
- Arrow keys only work when tree has focus

## Codeblock Issues

### Symptom
Embedded trees don't render or show errors.

### Solutions

#### Syntax Errors
**Check**:
- Codeblock starts with ```` ```metagrouper`
- YAML syntax is valid
- Property names are quoted if needed

#### View Reference
**Issue**: Referenced view doesn't exist.

**Solution**: Ensure the view name matches exactly (case-sensitive).

#### Configuration Errors
**Issue**: Inline configuration has invalid options.

**Solution**: Check [Configuration Schema](./configuration) for valid properties.

#### Rendering Issues
**Issue**: Tree renders but looks wrong.

**Check**:
- Interactive mode setting
- Format setting (tree vs list)
- Expansion settings

## Plugin Conflicts

### Symptom
MetaGrouper conflicts with other plugins.

### Known Conflicts

#### File Explorer Plugins
Some plugins modify the file tree display.

**Solution**: Disable conflicting plugins temporarily to test.

#### Theme Issues
Custom themes may affect styling.

**Solution**: Test with default theme to isolate issues.

#### Other Tree Plugins
Multiple tree plugins may interfere.

**Solution**: Disable other tree plugins when using MetaGrouper.

## Data Corruption

### Symptom
Settings are corrupted or views are missing.

### Recovery

1. **Backup current settings**: Export settings if possible
2. **Reset plugin**: Go to Community Plugins → MetaGrouper → Remove plugin
3. **Reinstall**: Fresh install from Community Plugins
4. **Restore settings**: Manually recreate views (backup any complex configs)

### Prevention

- Don't edit settings files manually
- Use the UI for all configuration changes
- Backup important view configurations

## Error Messages

### Common Errors

#### "Invalid hierarchy configuration"
**Cause**: Configuration doesn't match the schema.

**Solution**: Check [Configuration Schema](./configuration) and fix validation errors.

#### "Tag levels overlap"
**Cause**: Multiple tag levels match the same tags.

**Solution**: Ensure tag keys are non-overlapping (e.g., `"project"` and `"status"`, not `"project"` and `"project/work"`).

#### "Property key cannot be empty"
**Cause**: Property level has empty key.

**Solution**: Provide a valid property name.

#### "Depth must be >= 1 or -1"
**Cause**: Invalid depth value for tag level.

**Solution**: Use positive integers or -1 for unlimited depth.

## Getting Help

### Debug Information

When reporting issues, include:

1. **Obsidian Version**: Settings → About → Current version
2. **Plugin Version**: Community Plugins → MetaGrouper version
3. **Steps to Reproduce**: Detailed reproduction steps
4. **Expected vs Actual**: What should happen vs what does happen
5. **Console Errors**: `Ctrl/Cmd + Shift + I` → Console tab
6. **View Configuration**: Copy the problematic view config
7. **Vault Size**: Approximate number of notes
8. **Operating System**: Windows/macOS/Linux and version

### Console Logging

Enable debug logging:
1. Open Developer Tools (`Ctrl/Cmd + Shift + I`)
2. Go to Console tab
3. Look for MetaGrouper-related messages
4. Copy any error messages

### Minimal Reproduction

Create a minimal test case:
1. New vault with few test notes
2. Simple view configuration
3. Try to reproduce the issue
4. If it works, gradually add complexity

## Still Having Issues?

If these solutions don't help:

1. **Search existing issues**: [GitHub Issues](https://github.com/bright-fakl/metagrouper-obsidian/issues)
2. **Create a new issue**: Include all debug information above
3. **Community help**: Ask in Obsidian forums or Discord
4. **Plugin author**: Tag the maintainer in issues

## Prevention Tips

- Keep Obsidian updated
- Backup your vault regularly
- Test view configurations on small datasets first
- Save working configurations before major changes
- Use descriptive names for views to avoid confusion