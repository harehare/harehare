// キャッシュの名前とバージョン管理
const CACHE_NAME = "portfolio-cache-v1";

// キャッシュするアセットのリスト
const urlsToCache = [
  "/agent_portfolio/",
  "/agent_portfolio/index.html",
  "/agent_portfolio/manifest.json",
  "/agent_portfolio/favicon.svg",
  "/agent_portfolio/logo.svg",
  "/agent_portfolio/offline.html",
  "/agent_portfolio/icons/icon.svg",
  // フォントやCSS、JavaScriptファイル等も必要に応じてキャッシュ
];

// サービスワーカーのインストール処理
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("キャッシュを開きました");
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // 新しいサービスワーカーを即座にアクティブ化
  );
});

// サービスワーカーのアクティベーション処理
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // 古いバージョンのキャッシュを削除
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // このサービスワーカーがすべてのクライアントを制御できるようにする
  );
});

// フェッチイベントハンドラ
self.addEventListener("fetch", (event) => {
  // GitHub Pagesのベースパスに対応
  const url = new URL(event.request.url);

  // 同じオリジンのリクエストの場合のみキャッシュを使用
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // キャッシュにある場合はそれを返す
        if (response) {
          return response;
        }

        // リクエストのコピーを作成 (Streamは一度しか使えない)
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then((response) => {
            // レスポンスが無効な場合
            if (
              !response ||
              response.status !== 200 ||
              response.type !== "basic"
            ) {
              return response;
            }

            // レスポンスのコピーを作成 (Streamは一度しか使えない)
            const responseToCache = response.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return response;
          })
          .catch(() => {
            // オフライン時の処理
            // HTMLページのリクエストの場合はオフラインページを返す
            if (event.request.headers.get("accept").includes("text/html")) {
              return caches.match("/agent_portfolio/offline.html");
            }

            // その他のリソースは通常のキャッシュフォールバックを試行
            if (
              event.request.url.indexOf(".html") > -1 ||
              event.request.url.endsWith("/agent_portfolio/")
            ) {
              return caches.match("/agent_portfolio/index.html");
            }
          });
      })
    );
  }
});
