import { App, PluginSettingTab, Setting, Modal, Notice, setIcon, MarkdownRenderer } from "obsidian";
import type TagTreePlugin from "../main";
import {
  HierarchyConfig,
  HierarchyLevel,
  TagHierarchyLevel,
  PropertyHierarchyLevel,
  LevelColorMode,
  validateHierarchyConfig,
  createHierarchyConfig,
  createHierarchyLevel,
  createTagLevel,
  createPropertyLevel,
} from "../types/hierarchy-config";
import { SortMode, FileSortMode } from "../types/view-state";
import { DEFAULT_LEVEL_COLORS } from "./plugin-settings";

// Ko-fi logo SVG
const KOFI_SVG = `<svg width="20" height="20" viewBox="0 0 241 194" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_1_219" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="-1" y="0" width="242" height="194">
<path d="M240.469 0.958984H-0.00585938V193.918H240.469V0.958984Z" fill="white"/>
</mask>
<g mask="url(#mask0_1_219)">
<path d="M96.1344 193.911C61.1312 193.911 32.6597 178.256 15.9721 149.829C1.19788 124.912 -0.00585938 97.9229 -0.00585938 67.7662C-0.00585938 49.8876 5.37293 34.3215 15.5413 22.7466C24.8861 12.1157 38.1271 5.22907 52.8317 3.35378C70.2858 1.14271 91.9848 0.958984 114.545 0.958984C151.259 0.958984 161.63 1.4088 176.075 2.85328C195.29 4.76026 211.458 11.932 222.824 23.5955C234.368 35.4428 240.469 51.2624 240.469 69.3627V72.9994C240.469 103.885 219.821 129.733 191.046 136.759C188.898 141.827 186.237 146.871 183.089 151.837L183.006 151.964C172.869 167.632 149.042 193.918 103.401 193.918H96.1281L96.1344 193.911Z" fill="white"/>
<path d="M174.568 17.9772C160.927 16.6151 151.38 16.1589 114.552 16.1589C90.908 16.1589 70.9008 16.387 54.7644 18.4334C33.3949 21.164 15.2058 37.5285 15.2058 67.7674C15.2058 98.0066 16.796 121.422 29.0741 142.107C42.9425 165.751 66.1302 178.707 96.1412 178.707H103.414C140.242 178.707 160.25 159.156 170.253 143.698C174.574 136.874 177.754 130.058 179.801 123.234C205.947 120.96 225.27 99.3624 225.27 72.9941V69.3577C225.27 40.9432 206.631 21.164 174.574 17.9772H174.568Z" fill="white"/>
<path d="M15.1975 67.7674C15.1975 37.5285 33.3866 21.164 54.7559 18.4334C70.8987 16.387 90.906 16.1589 114.544 16.1589C151.372 16.1589 160.919 16.6151 174.559 17.9772C206.617 21.1576 225.255 40.937 225.255 69.3577V72.9941C225.255 99.3687 205.932 120.966 179.786 123.234C177.74 130.058 174.559 136.874 170.238 143.698C160.235 159.156 140.228 178.707 103.4 178.707H96.1264C66.1155 178.707 42.9277 165.751 29.0595 142.107C16.7814 121.422 15.1912 98.4563 15.1912 67.7674" fill="#202020"/>
<path d="M32.2469 67.9899C32.2469 97.3168 34.0654 116.184 43.6127 133.689C54.5225 153.924 74.3018 161.653 96.8117 161.653H103.857C133.411 161.653 147.736 147.329 155.693 134.829C159.558 128.462 162.966 121.417 164.784 112.547L166.147 106.864H174.332C192.521 106.864 208.208 92.09 208.208 73.2166V69.8082C208.208 48.6669 195.024 37.5228 172.058 34.7987C159.102 33.6646 151.372 33.2084 114.538 33.2084C89.7602 33.2084 72.0272 33.4364 58.6152 35.4828C39.7483 38.2134 32.2407 48.8951 32.2407 67.9899" fill="white"/>
<path d="M166.158 83.6801C166.158 86.4107 168.204 88.4572 171.841 88.4572C183.435 88.4572 189.802 81.8619 189.802 70.9523C189.802 60.0427 183.435 53.2195 171.841 53.2195C168.204 53.2195 166.158 55.2657 166.158 57.9963V83.6866V83.6801Z" fill="#202020"/>
<path d="M54.5321 82.3198C54.5321 95.732 62.0332 107.326 71.5807 116.424C77.9478 122.562 87.9515 128.93 94.7685 133.022C96.8147 134.157 98.8611 134.841 101.136 134.841C103.866 134.841 106.134 134.157 107.959 133.022C114.782 128.93 124.779 122.562 130.919 116.424C140.694 107.332 148.195 95.7383 148.195 82.3198C148.195 67.7673 137.286 54.8115 121.599 54.8115C112.28 54.8115 105.912 59.5882 101.136 66.1772C96.8147 59.582 90.2259 54.8115 80.9001 54.8115C64.9855 54.8115 54.5256 67.7673 54.5256 82.3198" fill="#FF5A16"/>
</g>
</svg>`;

/**
 * Modal to display the changelog
 */
class ChangelogModal extends Modal {
  private plugin: TagTreePlugin;

  constructor(app: App, plugin: TagTreePlugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen() {
    const { contentEl, titleEl } = this;
    titleEl.setText(`What's new in Tag Tree View v${this.plugin.manifest.version}`);

    // Create scrollable content container
    const scrollContainer = contentEl.createDiv({
      cls: "tag-tree-changelog-content"
    });
    scrollContainer.style.maxHeight = "60vh";
    scrollContainer.style.overflowY = "auto";
    scrollContainer.style.marginBottom = "var(--size-4-4)";
    scrollContainer.style.paddingRight = "var(--size-4-2)";

    // Load and render changelog
    try {
      const adapter = this.app.vault.adapter;
      const changelogPath = `${this.plugin.manifest.dir}/CHANGELOG.md`;
      const changelogContent = await adapter.read(changelogPath);

      // Render markdown
      await MarkdownRenderer.render(
        this.app,
        changelogContent,
        scrollContainer,
        "",
        this.plugin
      );
    } catch (error) {
      scrollContainer.createEl("p", {
        text: "Could not load changelog.",
        cls: "mod-warning"
      });
      console.error("Failed to load changelog:", error);
    }

    // Support section
    const supportSection = contentEl.createDiv({
      cls: "tag-tree-changelog-footer"
    });
    supportSection.style.borderTop = "1px solid var(--background-modifier-border)";
    supportSection.style.paddingTop = "var(--size-4-3)";
    supportSection.style.marginTop = "var(--size-4-3)";

    supportSection.createEl("p", {
      text: "If you find Tag Tree View helpful, please consider supporting its development."
    });

    // Buttons container
    const buttonsContainer = supportSection.createDiv();
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.gap = "var(--size-4-2)";
    buttonsContainer.style.marginTop = "var(--size-4-2)";

    // Buy me a coffee button
    const kofiButton = buttonsContainer.createEl("button", {
      cls: "mod-cta"
    });
    kofiButton.style.display = "flex";
    kofiButton.style.alignItems = "center";
    kofiButton.style.gap = "var(--size-2-2)";

    const kofiIcon = kofiButton.createDiv();
    kofiIcon.innerHTML = KOFI_SVG;
    kofiIcon.style.display = "flex";
    kofiIcon.style.alignItems = "center";

    kofiButton.createSpan({ text: "Buy me a coffee" });
    kofiButton.addEventListener("click", () => {
      window.open("https://ko-fi.com/fabiankloosterman", "_blank");
    });

    // Thanks button
    const thanksButton = buttonsContainer.createEl("button");
    thanksButton.setText("Thanks!");
    thanksButton.addEventListener("click", () => {
      this.close();
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}

/**
 * Settings tab for Tag Tree plugin
 * Allows users to create, edit, and manage saved views
 */
export class TagTreeSettingsTab extends PluginSettingTab {
  plugin: TagTreePlugin;

  constructor(app: App, plugin: TagTreePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // What's new section
    this.renderWhatsNew(containerEl);

    // Documentation section
    this.renderDocumentation(containerEl);

    // Support development section
    this.renderSupportDevelopment(containerEl);

    // Saved views list (includes default indicator)
    this.renderSavedViewsList(containerEl);

    // Import/Export section
    this.renderImportExport(containerEl);
  }

  /**
   * Render What's new section
   */
  private renderWhatsNew(containerEl: HTMLElement): void {
    new Setting(containerEl)
      .setHeading()
      .setName(`What's new in Tag Tree View v${this.plugin.manifest.version}`);

    new Setting(containerEl)
      .setName("")
      .setDesc("See the latest features and improvements")
      .addButton((button) =>
        button
          .setButtonText("View changelog")
          .onClick(() => {
            new ChangelogModal(this.app, this.plugin).open();
          })
      );
  }

  /**
   * Render Documentation section
   */
  private renderDocumentation(containerEl: HTMLElement): void {
    new Setting(containerEl)
      .setHeading()
      .setName("Documentation");

    new Setting(containerEl)
      .setName("")
      .setDesc("Learn more about using Tag Tree View")
      .addButton((button) =>
        button
          .setButtonText("View documentation")
          .onClick(() => {
            window.open("https://fkloosterman.github.io/tag-tree-obsidian/", "_blank");
          })
      );
  }

  /**
   * Render Support development section
   */
  private renderSupportDevelopment(containerEl: HTMLElement): void {
    new Setting(containerEl)
      .setHeading()
      .setName("Support development");

    new Setting(containerEl)
      .setName("")
      .setDesc("If you find Tag Tree View helpful, please consider supporting its development.");

    const buttonContainer = containerEl.createDiv();
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "var(--size-4-2)";
    buttonContainer.style.marginTop = "var(--size-4-2)";
    buttonContainer.style.marginLeft = "var(--size-4-8)";

    // Sponsor button with filled heart icon
    const sponsorButton = buttonContainer.createEl("button", {
      cls: "mod-cta"
    });
    sponsorButton.style.display = "flex";
    sponsorButton.style.alignItems = "center";
    sponsorButton.style.gap = "var(--size-2-2)";

    const heartIcon = sponsorButton.createSpan();
    setIcon(heartIcon, "heart");
    sponsorButton.createSpan({ text: "Sponsor" });
    sponsorButton.addEventListener("click", () => {
      window.open("https://github.com/sponsors/fkloosterman", "_blank");
    });

    // Buy me a coffee button with ko-fi logo
    const kofiButton = buttonContainer.createEl("button");
    kofiButton.style.display = "flex";
    kofiButton.style.alignItems = "center";
    kofiButton.style.gap = "var(--size-2-2)";

    const kofiIcon = kofiButton.createDiv();
    kofiIcon.innerHTML = KOFI_SVG;
    kofiIcon.style.display = "flex";
    kofiIcon.style.alignItems = "center";

    kofiButton.createSpan({ text: "Buy me a coffee" });
    kofiButton.addEventListener("click", () => {
      window.open("https://ko-fi.com/fabiankloosterman", "_blank");
    });
  }

  /**
   * Render the list of saved views
   */
  private renderSavedViewsList(containerEl: HTMLElement): void {
    new Setting(containerEl).setHeading().setName("Saved Views");

    new Setting(containerEl)
      .setName("")
      .setDesc("Click the star to set a view as default. Default view cannot be deleted.");

    const listContainer = containerEl.createDiv();

    this.plugin.settings.savedViews.forEach((view, index) => {
      const isDefault = view.name === this.plugin.settings.defaultViewName;

      const viewSetting = new Setting(listContainer)
        .setName(view.name)
        .setDesc(this.getViewDescription(view))
        .addExtraButton((button) =>
          button
            .setIcon(isDefault ? "star" : "star-off")
            .setTooltip(isDefault ? "Default view" : "Set as default view")
            .onClick(async () => {
              this.plugin.settings.defaultViewName = view.name;
              await this.plugin.saveSettings();
              this.display(); // Refresh to update star icons
            })
        )
        .addExtraButton((button) =>
          button
            .setIcon("pencil")
            .setTooltip("Edit view")
            .onClick(() => {
              new ViewEditorModal(this.app, this.plugin, view, (edited) => {
                this.plugin.settings.savedViews[index] = edited;
                this.plugin.saveSettings();
                this.plugin.updateViewCommands();
                this.display();
                this.plugin.refreshAllViews(edited.name);
              }).open();
            })
        )
        .addExtraButton((button) =>
          button
            .setIcon("copy")
            .setTooltip("Duplicate view")
            .onClick(async () => {
              const duplicated = {
                ...view,
                name: `${view.name} (Copy)`,
              };
              this.plugin.settings.savedViews.push(duplicated);
              await this.plugin.saveSettings();
              this.plugin.updateViewCommands();
              this.display();
              new Notice(`Duplicated view: ${view.name}`);
            })
        )
        .addExtraButton((button) =>
          button
            .setIcon("trash")
            .setTooltip(isDefault ? "Cannot delete default view" : "Delete view")
            .setDisabled(isDefault || this.plugin.settings.savedViews.length <= 1)
            .onClick(async () => {
              // Confirm deletion
              const confirmed = await this.confirmDelete(view.name);
              if (!confirmed) return;

              // Remove the view
              this.plugin.settings.savedViews.splice(index, 1);
              await this.plugin.saveSettings();
              this.plugin.updateViewCommands();
              this.display();
              new Notice(`Deleted view: ${view.name}`);
            })
        );
    });

    // Add new view button
    new Setting(listContainer).addButton((button) =>
      button
        .setButtonText("+ New View")
        .setCta()
        .onClick(() => {
          new ViewEditorModal(this.app, this.plugin, null, (created) => {
            this.plugin.settings.savedViews.push(created);
            this.plugin.saveSettings();
            this.plugin.updateViewCommands(); // Update commands for new view
            this.display(); // Refresh settings UI
            new Notice(`Created view: ${created.name}`);
          }).open();
        })
    );
  }

  /**
   * Render import/export section
   */
  private renderImportExport(containerEl: HTMLElement): void {
    new Setting(containerEl).setHeading().setName("Import/Export");

    new Setting(containerEl)
      .setName("Export all views")
      .setDesc("Export all saved views to a JSON file")
      .addButton((button) =>
        button.setButtonText("Export").onClick(() => {
          this.exportViews();
        })
      );

    new Setting(containerEl)
      .setName("Import views")
      .setDesc("Import views from a JSON file (will be added to existing views)")
      .addButton((button) =>
        button.setButtonText("Import").onClick(() => {
          this.importViews();
        })
      );
  }

  /**
   * Get a human-readable description of a view
   */
  private getViewDescription(view: HierarchyConfig): string {
    const parts: string[] = [];

    if (view.rootTag) {
      parts.push(`Root: #${view.rootTag}`);
    }

    parts.push(
      `Levels: ${view.levels.map((l) => `${l.type}:${l.key}`).join(" → ")}`
    );

    return parts.join(" | ");
  }

  /**
   * Confirm deletion of a view
   */
  private async confirmDelete(viewName: string): Promise<boolean> {
    return new Promise((resolve) => {
      const modal = new Modal(this.app);
      modal.titleEl.setText("Delete view");
      modal.contentEl.createEl("p", {
        text: `Are you sure you want to delete the view "${viewName}"?`,
      });

      new Setting(modal.contentEl)
        .addButton((button) =>
          button.setButtonText("Cancel").onClick(() => {
            modal.close();
            resolve(false);
          })
        )
        .addButton((button) =>
          button
            .setButtonText("Delete")
            .setWarning()
            .onClick(() => {
              modal.close();
              resolve(true);
            })
        );

      modal.open();
    });
  }

  /**
   * Export all views to JSON
   */
  private exportViews(): void {
    const json = JSON.stringify(this.plugin.settings.savedViews, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tag-tree-views.json";
    a.click();
    URL.revokeObjectURL(url);
    new Notice("Views exported successfully");
  }

  /**
   * Import views from JSON file
   */
  private importViews(): void {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const imported = JSON.parse(text) as HierarchyConfig[];

        // Validate all imported views
        const errors: string[] = [];
        imported.forEach((view, index) => {
          const validation = validateHierarchyConfig(view);
          if (!validation.valid) {
            errors.push(`View ${index + 1} (${view.name}): ${validation.errors.join(", ")}`);
          }
        });

        if (errors.length > 0) {
          new Notice(`Import failed: ${errors.join("; ")}`);
          return;
        }

        // Check for name conflicts and rename if needed
        imported.forEach((view) => {
          let name = view.name;
          let counter = 1;
          while (
            this.plugin.settings.savedViews.some((v) => v.name === name)
          ) {
            name = `${view.name} (${counter})`;
            counter++;
          }
          view.name = name;
        });

        // Add imported views
        this.plugin.settings.savedViews.push(...imported);
        await this.plugin.saveSettings();
        this.plugin.updateViewCommands(); // Update commands for imported views
        this.display(); // Refresh settings UI
        new Notice(`Imported ${imported.length} view(s) successfully`);
      } catch (error) {
        new Notice(
          `Import failed: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    };
    input.click();
  }
}

/**
 * Modal for editing/creating a view
 */
class ViewEditorModal extends Modal {
  private plugin: TagTreePlugin;
  private view: HierarchyConfig | null;
  private onSave: (view: HierarchyConfig) => void;

  // Working copy of the view being edited
  private workingView: HierarchyConfig;

  // Track collapse state to preserve across re-renders
  private collapseState: {
    basic: boolean;
    sorting: boolean;
    colors: boolean;
    levels: boolean;
    levelItems: Map<number, boolean>;
  } = {
    basic: true,
    sorting: true,
    colors: false,
    levels: true,
    levelItems: new Map(),
  };

  constructor(
    app: App,
    plugin: TagTreePlugin,
    view: HierarchyConfig | null,
    onSave: (view: HierarchyConfig) => void
  ) {
    super(app);
    this.plugin = plugin;
    this.view = view;
    this.onSave = onSave;

    // Create working copy
    if (view) {
      this.workingView = JSON.parse(JSON.stringify(view));
      // Set default levelColorMode if not set
      if (!this.workingView.levelColorMode) {
        this.workingView.levelColorMode = "none";
      }
    } else {
      // Create new view with defaults
      this.workingView = createHierarchyConfig({
        name: "New View",
        levels: [createTagLevel({ key: "" })],
        showPartialMatches: false,
      });
    }
  }

  onOpen() {
    const { contentEl, titleEl } = this;

    titleEl.setText(this.view ? "Edit View" : "Create New View");

    this.renderEditor(contentEl);
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }

  /**
   * Render the view editor form
   */
  private renderEditor(containerEl: HTMLElement): void {
    containerEl.empty();

    // View name (at the top, outside of sections)
    new Setting(containerEl)
      .setName("View name")
      .setDesc("Unique name for this view")
      .addText((text) =>
        text
          .setPlaceholder("My Custom View")
          .setValue(this.workingView.name)
          .onChange((value) => {
            this.workingView.name = value;
          })
      );

    // Filter Options Section (collapsible)
    const filterSection = this.createCollapsibleSection(
      containerEl,
      "Filter Options",
      "basic",
      true
    );

    // Root tag filter (optional)
    new Setting(filterSection)
      .setName("Root tag filter")
      .setDesc(
        "Optional: Only include files with this tag (e.g., 'project' for #project)"
      )
      .addText((text) =>
        text
          .setPlaceholder("project")
          .setValue(this.workingView.rootTag || "")
          .onChange((value) => {
            this.workingView.rootTag = value.trim() || undefined;
          })
      );

    // Sorting and Display Options Section (collapsible)
    const sortingSection = this.createCollapsibleSection(
      containerEl,
      "Sorting & Display Options",
      "sorting",
      true
    );

    // Default node sort mode
    new Setting(sortingSection)
      .setName("Default node sort mode")
      .setDesc("How to sort tag and property nodes in the tree")
      .addDropdown((dropdown) => {
        dropdown
          .addOption("alpha-asc", "Alphabetical (A-Z)")
          .addOption("alpha-desc", "Alphabetical (Z-A)")
          .addOption("count-desc", "File count (Most first)")
          .addOption("count-asc", "File count (Least first)")
          .addOption("none", "Unsorted")
          .setValue(this.workingView.defaultNodeSortMode || "alpha-asc")
          .onChange((value) => {
            this.workingView.defaultNodeSortMode = value as SortMode;
          });
      });

    // Default file sort mode
    new Setting(sortingSection)
      .setName("Default file sort mode")
      .setDesc("How to sort files within each group")
      .addDropdown((dropdown) => {
        dropdown
          .addOption("alpha-asc", "Alphabetical (A-Z)")
          .addOption("alpha-desc", "Alphabetical (Z-A)")
          .addOption("created-desc", "Created (Newest first)")
          .addOption("created-asc", "Created (Oldest first)")
          .addOption("modified-desc", "Modified (Newest first)")
          .addOption("modified-asc", "Modified (Oldest first)")
          .addOption("size-desc", "Size (Largest first)")
          .addOption("size-asc", "Size (Smallest first)")
          .addOption("none", "Unsorted")
          .setValue(this.workingView.defaultFileSortMode || "alpha-asc")
          .onChange((value) => {
            this.workingView.defaultFileSortMode = value as FileSortMode;
          });
      });

    // Default expanded depth
    new Setting(sortingSection)
      .setName("Default expansion depth")
      .setDesc("How many levels to expand by default (-1 for all)")
      .addText((text) =>
        text
          .setPlaceholder("2")
          .setValue(String(this.workingView.defaultExpanded ?? 1))
          .onChange((value) => {
            const num = parseInt(value);
            if (!isNaN(num)) {
              this.workingView.defaultExpanded = num;
            }
          })
      );

    // Show partial matches
    new Setting(sortingSection)
      .setName("Show files with partial matches")
      .setDesc("Show files at the deepest level they match (even if they don't match all levels)")
      .addToggle((toggle) =>
        toggle
          .setValue(this.workingView.showPartialMatches ?? false)
          .onChange((value) => {
            this.workingView.showPartialMatches = value;
          })
      );

    // Level colors section (collapsible)
    const colorsSection = this.createCollapsibleSection(
      containerEl,
      "Hierarchy Level Colors",
      "colors",
      false
    );

    // Color mode dropdown
    new Setting(colorsSection)
      .setName("Level color mode")
      .setDesc("How to apply hierarchy level colors (or none to disable)")
      .addDropdown((dropdown) =>
        dropdown
          .addOption("none", "None (disabled)")
          .addOption("background", "Background")
          .addOption("border", "Left border")
          .addOption("icon", "Icon color")
          .setValue(this.workingView.levelColorMode || "none")
          .onChange((value) => {
            this.workingView.levelColorMode = value as LevelColorMode;
            this.renderEditor(this.contentEl); // Re-render to show/hide color options
          })
      );

    // File color (only show if colors are enabled)
    if (this.workingView.levelColorMode && this.workingView.levelColorMode !== "none") {
      new Setting(colorsSection)
        .setName("File color (optional)")
        .setDesc("Custom color for file nodes (no color by default)")
        .addColorPicker((color) =>
          color
            .setValue(this.workingView.fileColor || "#ffffff")
            .onChange((value) => {
              // Don't save white as the default - only save if user explicitly chose a color
              // (white is just the picker's default display value)
              if (this.workingView.fileColor || value.toLowerCase() !== "#ffffff") {
                this.workingView.fileColor = value;
              }
            })
        )
        .addExtraButton((button) =>
          button
            .setIcon("reset")
            .setTooltip("Clear color")
            .onClick(() => {
              this.workingView.fileColor = undefined;
              this.renderEditor(this.contentEl);
            })
        );
    }

    // Hierarchy levels section (collapsible)
    const levelsSection = this.createCollapsibleSection(
      containerEl,
      "Hierarchy Levels",
      "levels",
      true
    );

    new Setting(levelsSection)
      .setName("")
      .setDesc("Define how files are grouped at each level (top to bottom)");

    const levelsContainer = levelsSection.createDiv();
    this.renderLevels(levelsContainer);

    // Save/Cancel buttons
    const buttonsContainer = containerEl.createDiv("modal-button-container");
    buttonsContainer.style.display = "flex";
    buttonsContainer.style.justifyContent = "flex-end";
    buttonsContainer.style.gap = "8px";
    buttonsContainer.style.marginTop = "16px";

    new Setting(buttonsContainer)
      .addButton((button) =>
        button
          .setButtonText("Cancel")
          .onClick(() => {
            this.close();
          })
      )
      .addButton((button) =>
        button
          .setButtonText("Save")
          .setCta()
          .onClick(() => {
            this.saveView();
          })
      );
  }

  /**
   * Create a collapsible section using details/summary with state tracking
   */
  private createCollapsibleSection(
    parent: HTMLElement,
    title: string,
    stateKey: string,
    defaultOpen: boolean = false
  ): HTMLElement {
    const details = parent.createEl("details", { cls: "tag-tree-collapsible-section" });

    // Use stored state if available, otherwise use default
    const isOpen = this.collapseState[stateKey as keyof typeof this.collapseState] ?? defaultOpen;
    if (isOpen) {
      details.setAttribute("open", "");
    }

    const summary = details.createEl("summary", { cls: "tag-tree-section-header" });
    summary.setText(title);

    // Track state changes
    details.addEventListener("toggle", () => {
      (this.collapseState as any)[stateKey] = details.hasAttribute("open");
    });

    const content = details.createDiv("tag-tree-section-content");
    return content;
  }

  /**
   * Get a descriptive title for a hierarchy level
   */
  private getLevelTitle(level: HierarchyLevel, index: number): string {
    const levelNum = index + 1;

    if (level.type === "tag") {
      const tagLevel = level as TagHierarchyLevel;
      const key = level.key || "(empty)";
      const depth = tagLevel.depth === -1 ? "full hierarchy" : `depth ${tagLevel.depth}`;
      return `Level ${levelNum}: #${key} tag (${depth})`;
    } else {
      const key = level.key || "(empty)";
      return `Level ${levelNum}: ${key} property`;
    }
  }

  /**
   * Create a collapsible section for a hierarchy level with controls in header
   */
  private createLevelCollapsible(
    parent: HTMLElement,
    title: string,
    index: number,
    onMoveUp: () => void,
    onMoveDown: () => void,
    onDelete: () => void
  ): HTMLElement {
    const details = parent.createEl("details", { cls: "tag-tree-collapsible-section" });

    // Use stored state if available, otherwise default to collapsed
    const isOpen = this.collapseState.levelItems.get(index) ?? false;
    if (isOpen) {
      details.setAttribute("open", "");
    }

    const summary = details.createEl("summary", { cls: "tag-tree-section-header tag-tree-level-header" });

    // Add title text
    const titleSpan = summary.createSpan({ cls: "tag-tree-level-title" });
    titleSpan.setText(title);

    // Add controls container
    const controls = summary.createDiv({ cls: "tag-tree-level-controls" });

    // Move up button
    const moveUpBtn = controls.createEl("button", {
      cls: "clickable-icon",
      attr: {
        "aria-label": "Move level up",
        "title": "Move level up"
      }
    });
    setIcon(moveUpBtn, "arrow-up");
    if (index === 0) {
      moveUpBtn.addClass("is-disabled");
      moveUpBtn.setAttribute("disabled", "");
    }
    moveUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (index > 0) {
        onMoveUp();
      }
    });

    // Move down button
    const moveDownBtn = controls.createEl("button", {
      cls: "clickable-icon",
      attr: {
        "aria-label": "Move level down",
        "title": "Move level down"
      }
    });
    setIcon(moveDownBtn, "arrow-down");
    if (index === this.workingView.levels.length - 1) {
      moveDownBtn.addClass("is-disabled");
      moveDownBtn.setAttribute("disabled", "");
    }
    moveDownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (index < this.workingView.levels.length - 1) {
        onMoveDown();
      }
    });

    // Delete button
    const deleteBtn = controls.createEl("button", {
      cls: "clickable-icon",
      attr: {
        "aria-label": "Delete level",
        "title": "Delete level"
      }
    });
    setIcon(deleteBtn, "trash");
    if (this.workingView.levels.length <= 1) {
      deleteBtn.addClass("is-disabled");
      deleteBtn.setAttribute("disabled", "");
    }
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (this.workingView.levels.length > 1) {
        onDelete();
      } else {
        new Notice("Cannot delete the last level");
      }
    });

    // Track state changes
    details.addEventListener("toggle", () => {
      this.collapseState.levelItems.set(index, details.hasAttribute("open"));
    });

    const content = details.createDiv("tag-tree-section-content");
    return content;
  }

  /**
   * Render the hierarchy levels list
   */
  private renderLevels(containerEl: HTMLElement): void {
    containerEl.empty();

    this.workingView.levels.forEach((level, index) => {
      // Create collapsible level with descriptive header and controls
      const levelTitle = this.getLevelTitle(level, index);
      const levelContent = this.createLevelCollapsible(
        containerEl,
        levelTitle,
        index,
        () => {
          // Move up
          [this.workingView.levels[index - 1], this.workingView.levels[index]] = [
            this.workingView.levels[index],
            this.workingView.levels[index - 1],
          ];
          this.renderEditor(this.contentEl);
        },
        () => {
          // Move down
          [this.workingView.levels[index], this.workingView.levels[index + 1]] = [
            this.workingView.levels[index + 1],
            this.workingView.levels[index],
          ];
          this.renderEditor(this.contentEl);
        },
        () => {
          // Delete
          this.workingView.levels.splice(index, 1);
          this.renderEditor(this.contentEl);
        }
      );

      const levelContainer = levelContent.createDiv("setting-item-level");

      // Type selector (without action buttons now - they're in the header)
      new Setting(levelContainer)
        .setName("Type")
        .addDropdown((dropdown) =>
          dropdown
            .addOption("tag", "Tag")
            .addOption("property", "Property")
            .setValue(level.type)
            .onChange((value) => {
              // Replace level with new type-specific level
              const newType = value as "tag" | "property";
              if (newType === "tag") {
                this.workingView.levels[index] = createTagLevel({
                  key: level.key,
                  label: level.label,
                });
              } else {
                this.workingView.levels[index] = createPropertyLevel({
                  key: level.key,
                  label: level.label,
                });
              }
              this.renderEditor(this.contentEl); // Re-render to update
            })
        );

      // Key field
      new Setting(levelContainer)
        .setName(level.type === "tag" ? "Tag prefix" : "Property name")
        .setDesc(
          level.type === "tag"
            ? "Tag root to match (empty = all base tags)"
            : "Name of the frontmatter property"
        )
        .addText((text) =>
          text
            .setPlaceholder(
              level.type === "tag" ? "project" : "status"
            )
            .setValue(level.key)
            .onChange((value) => {
              level.key = value;
            })
        );

      // Type-specific fields
      if (level.type === "tag") {
        const tagLevel = level as TagHierarchyLevel;

        // Depth field
        new Setting(levelContainer)
          .setName("Depth")
          .setDesc("Number of tag levels to span (1 or higher for specific depth, -1 for unlimited/full nested hierarchy)")
          .addText((text) =>
            text
              .setPlaceholder("-1")
              .setValue(String(tagLevel.depth ?? -1))
              .onChange((value) => {
                const num = parseInt(value);
                if (!isNaN(num) && (num >= 1 || num === -1)) {
                  tagLevel.depth = num;
                }
              })
          );

        // Virtual toggle
        new Setting(levelContainer)
          .setName("Virtual levels")
          .setDesc("Insert next hierarchy level after each intermediate tag level")
          .addToggle((toggle) =>
            toggle
              .setValue(tagLevel.virtual ?? false)
              .onChange((value) => {
                tagLevel.virtual = value;
              })
          );

        // Show full path toggle
        new Setting(levelContainer)
          .setName("Show full tag path")
          .setDesc("Display full tag path (e.g., 'project/a/task1') instead of just last segment ('task1')")
          .addToggle((toggle) =>
            toggle
              .setValue(tagLevel.showFullPath ?? false)
              .onChange((value) => {
                tagLevel.showFullPath = value;
              })
          );
      } else if (level.type === "property") {
        const propLevel = level as PropertyHierarchyLevel;

        // Separate list values toggle
        new Setting(levelContainer)
          .setName("Separate list values")
          .setDesc("Treat list properties as separate values (true) or single value (false)")
          .addToggle((toggle) =>
            toggle
              .setValue(propLevel.separateListValues ?? true)
              .onChange((value) => {
                propLevel.separateListValues = value;
              })
          );

        // Show property name toggle
        new Setting(levelContainer)
          .setName("Show property name")
          .setDesc("Prepend property name to value (e.g., 'status = active' instead of just 'active')")
          .addToggle((toggle) =>
            toggle
              .setValue(propLevel.showPropertyName ?? false)
              .onChange((value) => {
                propLevel.showPropertyName = value;
              })
          );
      }

      // Optional label
      new Setting(levelContainer)
        .setName("Display label (optional)")
        .setDesc("Custom label to display instead of key")
        .addText((text) =>
          text
            .setPlaceholder(level.key)
            .setValue(level.label || "")
            .onChange((value) => {
              level.label = value.trim() || undefined;
            })
        );

      // Sort override
      new Setting(levelContainer)
        .setName("Sort override (optional)")
        .setDesc("Override the default node sort mode for this specific level")
        .addDropdown((dropdown) => {
          dropdown
            .addOption("", "Use default")
            .addOption("alpha-asc", "Alphabetical (A-Z)")
            .addOption("alpha-desc", "Alphabetical (Z-A)")
            .addOption("count-desc", "File count (Most first)")
            .addOption("count-asc", "File count (Least first)")
            .addOption("none", "Unsorted")
            .setValue(level.sortBy || "")
            .onChange((value) => {
              level.sortBy = value ? (value as SortMode) : undefined;
            });
        });

      // Level color (only show if level colors are enabled for this view)
      if (this.workingView.levelColorMode && this.workingView.levelColorMode !== "none") {
        const defaultColor = DEFAULT_LEVEL_COLORS[index % DEFAULT_LEVEL_COLORS.length];
        new Setting(levelContainer)
          .setName("Level color (optional)")
          .setDesc(`Custom color for level ${index + 1} (default: ${defaultColor})`)
          .addColorPicker((color) =>
            color
              .setValue(level.color || defaultColor)
              .onChange((value) => {
                // Only save if different from default (normalize for comparison)
                if (value.toLowerCase() !== defaultColor.toLowerCase()) {
                  level.color = value;
                } else {
                  level.color = undefined;
                }
              })
          )
          .addExtraButton((button) =>
            button
              .setIcon("reset")
              .setTooltip("Use default color")
              .onClick(() => {
                level.color = undefined;
                this.renderEditor(this.contentEl);
              })
          );
      }
    });

    // Add level button
    new Setting(containerEl).addButton((button) =>
      button
        .setButtonText("+ Add Level")
        .onClick(() => {
          this.workingView.levels.push(
            createTagLevel({ key: "" })
          );
          this.renderEditor(this.contentEl); // Re-render
        })
    );
  }

  /**
   * Save the view
   */
  private saveView(): void {
    // Validate
    const validation = validateHierarchyConfig(this.workingView);
    if (!validation.valid) {
      new Notice(`Validation failed: ${validation.errors.join(", ")}`);
      return;
    }

    // Check for duplicate names (only when creating or renaming)
    if (
      this.view?.name !== this.workingView.name &&
      this.plugin.settings.savedViews.some(
        (v) => v.name === this.workingView.name
      )
    ) {
      new Notice(`A view with the name "${this.workingView.name}" already exists`);
      return;
    }

    // Save
    this.onSave(this.workingView);
    this.close();
  }
}
