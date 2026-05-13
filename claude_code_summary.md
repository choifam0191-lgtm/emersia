# emersia 웹사이트 개편 완료 보고서

작성일: 2026-05-13  
브랜치: redesign-multipage

---

## 페이지 목록

| 경로 | 파일 | 타입 | 설명 |
|------|------|------|------|
| `/` | `src/app/page.tsx` | Static | 홈 (10개 섹션) |
| `/company` | `src/app/company/page.tsx` | Static | 회사소개 |
| `/resources` | `src/app/resources/page.tsx` | Static | 자료실 + FAQ |
| `/cases` | `src/app/cases/page.tsx` | Static | 설치사례 |
| `/contact` | `src/app/contact/page.tsx` | Dynamic | 문의 (searchParams) |
| `/api/contact` | `src/app/api/contact/route.ts` | Dynamic | 메일 전송 API |

---

## 컴포넌트 목록

### 공통
- `src/components/Header.tsx` — 스티키 헤더, 모바일 메뉴
- `src/components/Footer.tsx` — 사이트맵, 법인정보
- `src/components/CTASection.tsx` — 페이지 하단 전환 섹션
- `src/components/SectionTitle.tsx` — eyebrow + 제목 + 설명
- `src/components/FeatureCard.tsx` — 아이콘 카드
- `src/components/MotionInView.tsx` — framer-motion 스크롤 진입 애니메이션

### 홈 (/)
- `src/components/HeroSection.tsx`
- `src/components/ProblemSection.tsx`
- `src/components/SolutionSection.tsx`
- `src/components/UseCasesSection.tsx`
- `src/components/ProductCompositionSection.tsx`
- `src/components/FeaturesSection.tsx`
- `src/components/ApplicationSection.tsx`
- `src/components/ProcessSection.tsx`
- `src/components/ResourcesDownloadSection.tsx`

### 회사소개 (/company)
- `src/components/CompanyContent.tsx`

### 자료실 (/resources)
- `src/components/ResourcesFilterSection.tsx`
- `src/components/ResourceCard.tsx`
- `src/components/FAQAccordion.tsx`

### 설치사례 (/cases)
- `src/components/CasesFilterSection.tsx`
- `src/components/CaseCard.tsx`

### 문의 (/contact)
- `src/components/ContactForm.tsx` — initialType prop, 문의유형 라디오, 현장위치, 도입목적

---

## 이미지 파일 (public/)

| 경로 | 상태 | 용도 |
|------|------|------|
| `public/icon.png` | 존재 | 헤더 로고, favicon |
| `public/pix.png` | 존재 | favicon |
| `public/main.png` | 존재 | (미사용, 보관) |
| `public/youngwoo.png` | 존재 | (미사용, 보관) |
| `public/clients_all.png` | 존재 | 회사소개 거래처 이미지 |
| `public/catalog/catalog-2026.pdf` | 존재 | 카탈로그 다운로드 |
| **`public/main/device-photo.jpg`** | **미존재** | 홈 히어로 장비 사진 |

**⚠ 교체 필요:** `public/main/device-photo.jpg` — 실제 제품 사진으로 교체. 현재 경로만 지정되어 있고 파일이 없으면 깨진 이미지로 표시됨.

---

## TODO 항목 (준비중 표시)

| 위치 | 내용 | 파일 |
|------|------|------|
| 자료실 | 건설현장 적용 제안서 PDF | `ResourcesFilterSection.tsx` |
| 자료실 | 시스템 구성도 파일 | `ResourcesFilterSection.tsx` |
| 자료실 | 옵션 구성 안내서 PDF | `ResourcesFilterSection.tsx` |
| 자료실 | 혹서기 안전방송 활용 예시 | `ResourcesFilterSection.tsx` |
| 홈 | 건설현장 제안서 PDF | `ResourcesDownloadSection.tsx` |
| 홈 | 시스템 구성도 PDF | `ResourcesDownloadSection.tsx` |
| 헤더 모바일 | 전화번호 확정 후 연결 | `Header.tsx` |
| 헤더 모바일 | 카카오톡 채널 확정 후 연결 | `Header.tsx` |
| 푸터 | 전화번호 확정 후 연결 | `Footer.tsx` |
| 푸터 | 카카오톡 채널 확정 후 연결 | `Footer.tsx` |
| 회사소개 | 주소 확정 후 지도 연결 | `CompanyContent.tsx` |
| 문의 사이드바 | 전화번호 확정 후 연결 | `contact/page.tsx` |
| 문의 사이드바 | 카카오톡 채널 확정 후 연결 | `contact/page.tsx` |
| CTA 섹션 | 전화번호 확정 후 연결 | `CTASection.tsx` |

---

## 메일 전송 설정

`.env.local` 파일 필요 (서버에 별도 배포):

```
MAIL_HOST=smtp.naver.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=<네이버 메일 주소>
MAIL_PASS=<앱 비밀번호>
MAIL_TO=<수신 메일 주소>
```

---

## 실행 방법

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

---

## 배포 전 체크리스트

- [ ] `public/main/device-photo.jpg` 실제 제품 사진으로 교체
- [ ] `.env.local` 서버에 업로드 확인
- [ ] 전화번호 확정 시 Header, Footer, CTASection, contact/page.tsx TODO 해제
- [ ] 카카오톡 채널 확정 시 동일 TODO 해제
- [ ] 추가 PDF 자료 준비 시 ResourcesFilterSection.tsx ready: false → true, href 연결
- [ ] 도메인 DNS 연결 (emersia.co.kr)
- [ ] SSL 인증서 설정 (Let's Encrypt / Certbot)

---

## 금지 표현 (B2B 신뢰 원칙)

다음 표현은 사용 금지:
- "전국 어디서나 끊김 없는"
- "지하 음영 지역까지 완벽한"
- "산업안전보건관리비 100% 집행 가능"
- 가상 회사명/사이트명 (비공개 현장은 "비공개 현장" 또는 "적용 예시"로 표기)
