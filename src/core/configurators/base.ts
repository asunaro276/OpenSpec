import type { Locale } from '../templates/index.js';

export interface ToolConfigurator {
  name: string;
  configFileName: string;
  isAvailable: boolean;
  configure(projectPath: string, openspecDir: string, locale?: Locale): Promise<void>;
}