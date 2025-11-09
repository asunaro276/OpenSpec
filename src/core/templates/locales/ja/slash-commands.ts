export type SlashCommandId = 'proposal' | 'apply' | 'archive';

const baseGuardrails = `**ガードレール**
- まず単純で最小限の実装を優先し、明示的に要求されるか明確に必要な場合にのみ複雑さを追加する。
- 変更を要求された結果に厳密にスコープする。
- 追加の OpenSpec 規約または明確化が必要な場合は、\`openspec/AGENTS.md\`（\`openspec/\` ディレクトリ内にあります—表示されない場合は \`ls openspec\` または \`openspec update\` を実行）を参照してください。`;

const proposalGuardrails = `${baseGuardrails}\n- ファイルを編集する前に、曖昧または不明確な詳細を特定し、必要なフォローアップ質問をしてください。`;

const proposalSteps = `**ステップ**
1. \`openspec/project.md\` を確認し、\`openspec list\` と \`openspec list --specs\` を実行し、関連するコードまたはドキュメント（例: \`rg\`/\`ls\` 経由）を検査して、提案を現在の動作に基づかせる; 明確化が必要なギャップに注意してください。
2. ユニークな動詞主導の \`change-id\` を選択し、\`openspec/changes/<id>/\` 配下に \`proposal.md\`, \`tasks.md\`, \`design.md\`（必要な場合）をスキャフォールドする。
3. 変更を具体的な capability または要件にマッピングし、複数スコープの取り組みを明確な関係とシーケンスを持つ個別の仕様差分に分割する。
4. ソリューションが複数のシステムにまたがる場合、新しいパターンを導入する場合、または仕様にコミットする前にトレードオフの議論を必要とする場合は、\`design.md\` でアーキテクチャの推論をキャプチャする。
5. \`changes/<id>/specs/<capability>/spec.md\`（capability ごとに 1 つのフォルダ）に仕様差分を下書きし、\`## ADDED|MODIFIED|REMOVED Requirements\` を使用し、要件ごとに少なくとも 1 つの \`#### Scenario:\` を含め、関連する capability を相互参照する。
6. \`tasks.md\` を、ユーザーに見える進捗を提供し、検証（テスト、ツール）を含み、依存関係または並列化可能な作業を強調する、小さく検証可能な作業項目の順序付きリストとして下書きする。
7. \`openspec validate <id> --strict\` で検証し、提案を共有する前にすべての問題を解決する。`;

const proposalReferences = `**リファレンス**
- 検証が失敗した場合は、\`openspec show <id> --json --deltas-only\` または \`openspec show <spec> --type spec\` を使用して詳細を検査してください。
- 新しい要件を書く前に、\`rg -n "Requirement:|Scenario:" openspec/specs\` で既存の要件を検索してください。
- 提案が現在の実装の現実と一致するように、\`rg <keyword>\`, \`ls\`, または直接ファイル読み取りでコードベースを探索してください。`;

const applySteps = `**ステップ**
これらのステップを TODO として追跡し、1 つずつ完了します。
1. \`changes/<id>/proposal.md\`, \`design.md\`（存在する場合）, \`tasks.md\` を読み、スコープと受け入れ基準を確認する。
2. タスクを順次処理し、編集を最小限に抑え、要求された変更に焦点を当てる。
3. ステータスを更新する前に完了を確認する—\`tasks.md\` のすべての項目が完了していることを確認する。
4. すべての作業が完了した後にチェックリストを更新し、各タスクが \`- [x]\` とマークされ、現実を反映するようにする。
5. 追加のコンテキストが必要な場合は、\`openspec list\` または \`openspec show <item>\` を参照する。`;

const applyReferences = `**リファレンス**
- 実装中に提案から追加のコンテキストが必要な場合は、\`openspec show <id> --json --deltas-only\` を使用してください。`;

const archiveSteps = `**ステップ**
1. アーカイブする変更 ID を決定する:
   - このプロンプトにすでに特定の変更 ID が含まれている場合（例: スラッシュコマンド引数によって入力された \`<ChangeId>\` ブロック内）、空白をトリミングした後にその値を使用します。
   - 会話が変更を緩く参照している場合（例: タイトルまたは要約による）、\`openspec list\` を実行して可能性のある ID を表示し、関連する候補を共有し、ユーザーがどれを意図しているかを確認します。
   - それ以外の場合は、会話を確認し、\`openspec list\` を実行し、ユーザーにどの変更をアーカイブするかを尋ねます; 進む前に確認された変更 ID を待ちます。
   - 単一の変更 ID をまだ特定できない場合は、停止してユーザーにまだ何もアーカイブできないことを伝えます。
2. \`openspec list\`（または \`openspec show <id>\`）を実行して変更 ID を検証し、変更が欠落している場合、すでにアーカイブされている場合、またはアーカイブの準備ができていない場合は停止します。
3. \`openspec archive <id> --yes\` を実行して、CLI が変更を移動し、プロンプトなしで仕様更新を適用するようにします（ツール専用の作業の場合のみ \`--skip-specs\` を使用）。
4. コマンド出力を確認して、ターゲット仕様が更新され、変更が \`changes/archive/\` に到達したことを確認します。
5. \`openspec validate --strict\` で検証し、何かおかしい場合は \`openspec show <id>\` で検査します。`;

const archiveReferences = `**リファレンス**
- アーカイブする前に \`openspec list\` を使用して変更 ID を確認してください。
- \`openspec list --specs\` で更新された仕様を検査し、引き渡す前に検証の問題に対処してください。`;

export const slashCommandBodies: Record<SlashCommandId, string> = {
  proposal: [proposalGuardrails, proposalSteps, proposalReferences].join('\n\n'),
  apply: [baseGuardrails, applySteps, applyReferences].join('\n\n'),
  archive: [baseGuardrails, archiveSteps, archiveReferences].join('\n\n')
};

export function getSlashCommandBody(id: SlashCommandId): string {
  return slashCommandBodies[id];
}
