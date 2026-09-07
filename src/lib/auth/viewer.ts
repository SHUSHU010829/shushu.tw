// 這個型別同時被伺服器元件與客戶端元件使用，所以刻意不放在 `session.ts`
// （那支檔案標了 `server-only`，客戶端匯入會直接爆掉）。
export type ViewerSession =
  | { status: "anonymous" }
  | { status: "authenticated"; login: string; displayName: string };
