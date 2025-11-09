import { claudeTemplate } from './claude-template.js';
import { clineTemplate } from './cline-template.js';
import { costrictTemplate } from './costrict-template.js';
import { agentsRootStubTemplate } from './agents-root-stub.js';

// Import locale-specific templates
import { agentsTemplate as agentsTemplateEn } from './locales/en/agents.js';
import { projectTemplate as projectTemplateEn, ProjectContext } from './locales/en/project.js';
import { getSlashCommandBody as getSlashCommandBodyEn, SlashCommandId } from './locales/en/slash-commands.js';

import { agentsTemplate as agentsTemplateJa } from './locales/ja/agents.js';
import { projectTemplate as projectTemplateJa } from './locales/ja/project.js';
import { getSlashCommandBody as getSlashCommandBodyJa } from './locales/ja/slash-commands.js';

export type Locale = 'en' | 'ja';

export interface Template {
  path: string;
  content: string | ((context: ProjectContext) => string);
}

export class TemplateManager {
  static getTemplates(context: ProjectContext = {}, locale: Locale = 'en'): Template[] {
    const agentsTemplate = locale === 'ja' ? agentsTemplateJa : agentsTemplateEn;
    const projectTemplate = locale === 'ja' ? projectTemplateJa : projectTemplateEn;

    return [
      {
        path: 'AGENTS.md',
        content: agentsTemplate
      },
      {
        path: 'project.md',
        content: projectTemplate(context)
      }
    ];
  }

  static getClaudeTemplate(): string {
    return claudeTemplate;
  }

  static getClineTemplate(): string {
    return clineTemplate;
  }

  static getCostrictTemplate(): string {
    return costrictTemplate;
  }

  static getAgentsStandardTemplate(): string {
    return agentsRootStubTemplate;
  }

  static getSlashCommandBody(id: SlashCommandId, locale: Locale = 'en'): string {
    const getBody = locale === 'ja' ? getSlashCommandBodyJa : getSlashCommandBodyEn;
    return getBody(id);
  }
}

export { ProjectContext } from './locales/en/project.js';
export type { SlashCommandId } from './locales/en/slash-commands.js';
