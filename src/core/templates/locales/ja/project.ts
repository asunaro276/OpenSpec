export interface ProjectContext {
  projectName?: string;
  description?: string;
  techStack?: string[];
  conventions?: string;
}

export const projectTemplate = (context: ProjectContext = {}) => `# ${context.projectName || 'プロジェクト'} コンテキスト

## 目的
${context.description || '[プロジェクトの目的と目標を記述してください]'}

## 技術スタック
${context.techStack?.length ? context.techStack.map(tech => `- ${tech}`).join('\n') : '- [主要な技術をリストしてください]\n- [例: TypeScript, React, Node.js]'}

## プロジェクトの規約

### コードスタイル
[コードスタイルの好み、フォーマットルール、命名規則を記述してください]

### アーキテクチャパターン
[アーキテクチャの決定とパターンをドキュメント化してください]

### テスト戦略
[テストアプローチと要件を説明してください]

### Git ワークフロー
[ブランチ戦略とコミット規約を記述してください]

## ドメインコンテキスト
[AI アシスタントが理解する必要があるドメイン固有の知識を追加してください]

## 重要な制約
[技術的、ビジネス的、規制的な制約をリストしてください]

## 外部依存関係
[主要な外部サービス、API、またはシステムをドキュメント化してください]
`;
