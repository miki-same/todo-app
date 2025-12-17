# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 言語設定

**このプロジェクトでは日本語で応対してください。** ユーザーとのコミュニケーション、コミットメッセージ、コメントなどは全て日本語で行います。

## プロジェクト概要

優先度レベル、期限設定、LocalStorage永続化機能を備えたReactベースのTODOアプリケーション。GitHub Pagesにデプロイされています: https://miki-same.github.io/todo-app/

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動 (http://localhost:5173 で実行)
npm run dev

# 本番用ビルド
npm run build

# 本番ビルドのローカルプレビュー
npm run preview
```

## アーキテクチャ

### 状態管理
- **中央管理**: App.jsxが全てのtodo状態と操作（追加、切り替え、削除、更新）を管理
- **データフロー**: App → TodoForm/TodoList → TodoItem の単方向プロップス伝達
- **永続化**: App.jsxのuseEffectフックでLocalStorageと自動同期

### Todoデータ構造
```javascript
{
  id: string,           // Date.now().toString()
  title: string,
  priority: 'low' | 'medium' | 'high',
  dueDate: string,      // ISO日付文字列
  completed: boolean,
  createdAt: string     // ISOタイムスタンプ
}
```

### コンポーネント階層
```
App (状態管理、フィルター)
├── TodoForm (新規todo追加)
└── TodoList (フィルター済みtodo表示)
    └── TodoItem (個別todo、インライン編集機能付き)
```

### 実装の重要ポイント
- **LocalStorageキー**: 'todos' (src/utils/todoStorage.jsで定義)
- **ID生成**: シンプルにDate.now().toString()を使用
- **インライン編集**: TodoItemが内部で表示/編集モードを切り替え
- **フィルタリング**: App.jsxで 'all', 'active', 'completed' 状態を実装

## GitHub Pagesデプロイ

- **ベースパス**: `/todo-app/` (vite.config.jsで設定)
- **自動デプロイ**: masterブランチへのプッシュでGitHub Actionsワークフローが起動
- **ビルド出力**: dist/ディレクトリ (gitから除外)
- **ワークフロー**: .github/workflows/deploy.ymlでビルドとデプロイを処理

ベースパスやリポジトリ名を変更する場合は、vite.config.jsの`base`も併せて更新してください。
