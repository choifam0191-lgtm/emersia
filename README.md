# 영우테크 스마트 방송장비 랜딩 페이지

## 기술 스택

- Next.js (App Router)
- Tailwind CSS
- Framer Motion
- Lucide React

## 실행 방법

이 폴더에서 아래를 실행하세요.

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 또는 `http://127.0.0.1:3000` 접속.

### "Connection failed" 나올 때

- **접속 주소**: `localhost` 대신 `http://127.0.0.1:3000` 으로 접속해 보세요.
- **Turbopack 사용 시**: Next 15 기본 개발 서버(Turbopack)에서 HMR 연결이 끊기면 아래로 실행해 보세요.
  ```bash
  npm run dev:webpack
  ```
- **방화벽/백신**: 3000 포트 또는 WebSocket 차단이 있으면 예외 처리해 보세요.

## 교체할 것들

- **카탈로그 파일**: `public/catalog-2026.pdf` 를 넣고, 버튼 링크(`/catalog-2026.pdf`)는 그대로 사용하세요.
- **히어로 이미지**: 현재는 이미지 플레이스홀더(그라데이션 박스)입니다. 실제 제품 이미지를 넣고 싶으면 `next/image`로 교체하면 됩니다.

