// All tool templates now use locale-aware root stub templates

// Import locale-specific templates
import { agentsTemplate as agentsTemplateEn } from './locales/en/agents.js';
import { projectTemplate as projectTemplateEn, ProjectContext } from './locales/en/project.js';
import { getSlashCommandBody as getSlashCommandBodyEn, SlashCommandId } from './locales/en/slash-commands.js';
import { agentsRootStubTemplate as agentsRootStubTemplateEn } from './locales/en/agents-root-stub.js';

import { agentsTemplate as agentsTemplateJa } from './locales/ja/agents.js';
import { projectTemplate as projectTemplateJa } from './locales/ja/project.js';
import { getSlashCommandBody as getSlashCommandBodyJa } from './locales/ja/slash-commands.js';
import { agentsRootStubTemplate as agentsRootStubTemplateJa } from './locales/ja/agents-root-stub.js';

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

  static getClaudeTemplate(locale: Locale = 'en'): string {
    // CLAUDE.md uses the same content as the root AGENTS.md stub
    const agentsRootStubTemplate = locale === 'ja' ? agentsRootStubTemplateJa : agentsRootStubTemplateEn;
    return agentsRootStubTemplate;
  }

  static getClineTemplate(locale: Locale = 'en'): string {
    // CLINE.md uses the same content as the root AGENTS.md stub
    const agentsRootStubTemplate = locale === 'ja' ? agentsRootStubTemplateJa : agentsRootStubTemplateEn;
    return agentsRootStubTemplate;
  }

  static getCostrictTemplate(locale: Locale = 'en'): string {
    // COSTRICT.md uses the same content as the root AGENTS.md stub
    const agentsRootStubTemplate = locale === 'ja' ? agentsRootStubTemplateJa : agentsRootStubTemplateEn;
    return agentsRootStubTemplate;
  }

  static getAgentsStandardTemplate(locale: Locale = 'en'): string {
    const agentsRootStubTemplate = locale === 'ja' ? agentsRootStubTemplateJa : agentsRootStubTemplateEn;
    return agentsRootStubTemplate;
  }

  static getSlashCommandBody(id: SlashCommandId, locale: Locale = 'en'): string {
    const getBody = locale === 'ja' ? getSlashCommandBodyJa : getSlashCommandBodyEn;
    return getBody(id);
  }
}

export { ProjectContext } from './locales/en/project.js';
export type { SlashCommandId } from './locales/en/slash-commands.js';
