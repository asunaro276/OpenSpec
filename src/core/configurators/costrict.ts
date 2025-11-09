import path from 'path';
import { ToolConfigurator } from './base.js';
import { FileSystemUtils } from '../../utils/file-system.js';
import { TemplateManager, Locale } from '../templates/index.js';
import { OPENSPEC_MARKERS } from '../config.js';

export class CostrictConfigurator implements ToolConfigurator {
  name = 'CoStrict';
  configFileName = 'COSTRICT.md';
  isAvailable = true;

  async configure(projectPath: string, openspecDir: string, locale: Locale = 'en'): Promise<void> {
    const filePath = path.join(projectPath, this.configFileName);
    const content = TemplateManager.getCostrictTemplate(locale);

    await FileSystemUtils.updateFileWithMarkers(
      filePath,
      content,
      OPENSPEC_MARKERS.start,
      OPENSPEC_MARKERS.end
    );
  }
}