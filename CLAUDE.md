\# 프로젝트: emersia 웹사이트



\## 스택

\- Next.js 14+ (App Router)

\- TypeScript

\- Tailwind CSS



\## 구조

\- src/app/layout.tsx : 공통 레이아웃

\- src/app/page.tsx : 메인 페이지

\- src/app/globals.css : 전역 스타일

\- public/ : 이미지 (youngwoo.png, clients\_all.png, icon.png, main.png, pix.png, catalog.pdf)



\## UI 디자인 워크플로우

\- Google Stitch (stitch.withgoogle.com) 로 UI 시안 생성

\- Stitch에서 Tailwind CSS 코드로 export

\- Claude Code로 emersia 프로젝트에 통합



\## 개발 서버

npm run dev



\## 코딩 규칙

\- 신규 컴포넌트는 src/components/ 폴더에 생성

\- 파일명은 PascalCase

\- Tailwind 우선, 별도 CSS 최소화

\- TypeScript strict 모드 유지



\## 주의사항

\- 기존 디자인과 레이아웃 유지

\- 컴포넌트 분리 시 기능 누락 없도록 확인



\## 배포

\- Oracle Cloud 서버 사용 예정

\- SSH 키 보유

\- 도메인 구매 완료

\- 배포 방식은 추후 결정



