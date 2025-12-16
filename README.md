# 保險互動工具（Next.js + TypeScript + Tailwind）

本專案新增 Next.js App Router 版的互動工具，包含 DISC 測驗與一生收入估算，並保留原有檔案不變。

## 本機執行

```bash
npm install
npm run dev
```

啟動後預設於 `http://localhost:3000`，首頁可前往 `/tools` 瀏覽工具清單。

## 部署到 Vercel

1. 將此專案推送到自己的 Git 儲存庫。
2. 登入 Vercel 並選擇「Import Project」，連結此 repo。
3. Framework 選擇 **Next.js**，其餘使用預設設定即可。
4. 部署完成後即可透過 Vercel 提供的網域存取 `/disc-test` 與 `/life-income`。
