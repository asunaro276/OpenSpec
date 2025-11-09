import fs from 'fs/promises';
import path from 'path';
import type { Locale } from './templates/index.js';

export const OPENSPEC_DIR_NAME = 'openspec';
export const OPENSPEC_CONFIG_FILE = '.openspec.json';

export const OPENSPEC_MARKERS = {
  start: '<!-- OPENSPEC:START -->',
  end: '<!-- OPENSPEC:END -->'
};

export interface OpenSpecConfig {
  aiTools: string[];
  locale?: Locale;
}

export interface AIToolOption {
  name: string;
  value: string;
  available: boolean;
  successLabel?: string;
}

export const AI_TOOLS: AIToolOption[] = [
  { name: 'Auggie (Augment CLI)', value: 'auggie', available: true, successLabel: 'Auggie' },
  { name: 'Claude Code', value: 'claude', available: true, successLabel: 'Claude Code' },
  { name: 'Cline', value: 'cline', available: true, successLabel: 'Cline' },
  { name: 'CodeBuddy Code (CLI)', value: 'codebuddy', available: true, successLabel: 'CodeBuddy Code' },
  { name: 'CoStrict', value: 'costrict', available: true, successLabel: 'CoStrict' },
  { name: 'Crush', value: 'crush', available: true, successLabel: 'Crush' },
  { name: 'Cursor', value: 'cursor', available: true, successLabel: 'Cursor' },
  { name: 'Factory Droid', value: 'factory', available: true, successLabel: 'Factory Droid' },
  { name: 'OpenCode', value: 'opencode', available: true, successLabel: 'OpenCode' },
  { name: 'Kilo Code', value: 'kilocode', available: true, successLabel: 'Kilo Code' },
  { name: 'Qoder (CLI)', value: 'qoder', available: true, successLabel: 'Qoder' },
  { name: 'Windsurf', value: 'windsurf', available: true, successLabel: 'Windsurf' },
  { name: 'Codex', value: 'codex', available: true, successLabel: 'Codex' },
  { name: 'GitHub Copilot', value: 'github-copilot', available: true, successLabel: 'GitHub Copilot' },
  { name: 'Amazon Q Developer', value: 'amazon-q', available: true, successLabel: 'Amazon Q Developer' },
  { name: 'Qwen Code', value: 'qwen', available: true, successLabel: 'Qwen Code' },
  { name: 'AGENTS.md (works with Amp, VS Code, …)', value: 'agents', available: false, successLabel: 'your AGENTS.md-compatible assistant' }
];

/**
 * Read the OpenSpec configuration file from the project root
 */
export async function readOpenSpecConfig(projectPath: string): Promise<OpenSpecConfig | null> {
  try {
    const configPath = path.join(projectPath, OPENSPEC_CONFIG_FILE);
    const content = await fs.readFile(configPath, 'utf-8');
    return JSON.parse(content) as OpenSpecConfig;
  } catch (error) {
    // Config file doesn't exist or is invalid
    return null;
  }
}

/**
 * Write the OpenSpec configuration file to the project root
 */
export async function writeOpenSpecConfig(projectPath: string, config: OpenSpecConfig): Promise<void> {
  const configPath = path.join(projectPath, OPENSPEC_CONFIG_FILE);
  await fs.writeFile(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
}

/**
 * Get the locale from the OpenSpec configuration, defaulting to 'en'
 */
export async function getConfigLocale(projectPath: string): Promise<Locale> {
  const config = await readOpenSpecConfig(projectPath);
  return config?.locale ?? 'en';
}
