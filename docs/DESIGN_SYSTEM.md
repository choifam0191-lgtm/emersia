# 영우테크 디자인 시스템

> **버전** 1.0 · 2026-05-19  
> **관리자** 영우테크 개발팀  
> **적용 범위** emersia 웹사이트 (Next.js 15 + Tailwind CSS v3)

---

## 1. 브랜드 정체성

### 미션
현장에서 신뢰받는 산업 안전 솔루션을 공급한다.

### 타겟 사용자
| 역할 | 관심사 |
|---|---|
| 건설사 안전관리자 | 법적 의무 이행, 사고 예방 |
| 현장소장 | 공사 일정 관리, 인원 통제 |
| 구매·자재 담당자 | 단가, 납기, A/S 보증 |

### 브랜드 톤
- **신뢰(Trust)** — 오래된 현장 경험에서 나오는 검증된 솔루션
- **현장성(Field-first)** — 실제 건설현장 언어로 말한다
- **산업(Industrial)** — 정밀하고 기능적인 UI, 화려함 배제
- **안전(Safety)** — 긴급 상황에서도 즉각 인지 가능한 명확한 색상 체계

### 금지 표현
- "전국 어디서나 끊김 없는" — 과장 금지
- "지하 음영 지역까지 완벽한" — 사실 근거 없는 성능 주장 금지
- "산업안전보건관리비 100% 집행 가능" — 법적 보장 불가 표현 금지
- 가상의 회사명/현장명 사용 금지 → "비공개 현장" 또는 "적용 예시" 사용

---

## 2. 컬러 토큰

### 기본 팔레트

| 토큰 | 변수 | 값 | Tailwind 클래스 |
|---|---|---|---|
| Ink | `--color-ink` | `#0F172A` | `text-ink` / `bg-ink` |
| Canvas | `--color-canvas` | `#F8FAFC` | `bg-canvas` |
| Surface | `--color-surface` | `#FFFFFF` | `bg-surface` |
| Muted | `--color-muted` | `#475569` | `text-muted` |
| Subtle | `--color-subtle` | `#94A3B8` | `text-subtle` |
| Hairline | `--color-hairline` | `#E2E8F0` | `border-hairline` |
| Mist | `--color-mist` | `#F1F5F9` | `bg-mist` |

### 브랜드 컬러 (Safety Blue)

| 토큰 | 변수 | 값 | 용도 |
|---|---|---|---|
| Safety Blue | `--color-safety-blue` | `#2563EB` | CTA 버튼, 링크, 강조 |
| Safety Blue Hover | `--color-safety-blue-hover` | `#1D4ED8` | 버튼 hover 상태 |
| Safety Blue Soft | `--color-safety-blue-soft` | `#DBEAFE` | 뱃지 배경, 소프트 강조 |
| Deep Navy | `--color-deep-navy` | `#0F172A` | 다크 섹션 배경 (최소 사용) |

### 시맨틱 컬러

| 토큰 | 변수 | 값 | 용도 |
|---|---|---|---|
| Alert Red | `--color-alert-red` | `#DC2626` | 긴급/경고 아이콘 전용 |
| Success Green | `--color-success-green` | `#16A34A` | 저장 완료, 성공 상태 |

### 사용 원칙

**Do ✅**
- Safety Blue는 CTA 1개 버튼에만 집중 사용
- 텍스트 계층: Ink(헤딩) → Muted(본문) → Subtle(캡션)
- 보더는 Hairline 단일 사용으로 통일

**Don't ❌**
- Alert Red를 장식 목적으로 사용하지 않는다
- Deep Navy 섹션을 3개 이상 연속 배치하지 않는다
- Safety Blue 이외의 색상을 CTA 버튼에 사용하지 않는다

---

## 3. 타이포그래피

### 폰트 패밀리

```
Primary:   Pretendard           — 한국어 본문, 헤딩
Secondary: Inter                — 영문, 숫자, 코드
Fallback:  system-ui, sans-serif
```

Pretendard CDN:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/static/pretendard.css" />
```

### 타입 스케일

| 토큰 | 변수 | 크기 | 행간 | 자간 | Tailwind | 용도 |
|---|---|---|---|---|---|---|
| Caption | `--text-caption` | 12px | 1.5 | 0 | `text-xs` | 라벨, 캡션, 날짜 |
| Body SM | `--text-body-sm` | 14px | 1.6 | 0 | `text-sm` | 보조 본문, 설명 |
| Body | `--text-body` | 16px | 1.65 | 0 | `text-base` | 기본 본문 |
| Body LG | `--text-body-lg` | 18px | 1.6 | -0.01em | `text-lg` | 서브 카피, 인트로 |
| Heading SM | `--text-heading-sm` | 20px | 1.4 | -0.015em | `text-xl` | 카드 제목 |
| Heading | `--text-heading` | 28px | 1.3 | -0.02em | `text-heading` | 섹션 제목 |
| Heading LG | `--text-heading-lg` | 40px | 1.2 | -0.025em | `text-heading-lg` | 페이지 타이틀 |
| Display | `--text-display` | 56px | 1.15 | -0.03em | `text-display` | Hero 메인 카피 |

### 반응형 대응

| 토큰 | 모바일 | 데스크탑 |
|---|---|---|
| Display | 36px | 56px |
| Heading LG | 28px | 40px |
| Heading | 24px | 28px |

### 폰트 웨이트

| 값 | 용도 |
|---|---|
| 400 (Regular) | 본문, 설명 텍스트 |
| 500 (Medium) | 강조 본문, UI 레이블 |
| 600 (Semibold) | 카드 제목, 버튼, 내비게이션 |
| 700 (Bold) | 섹션 헤딩, 수치 강조 |
| 800 (Extrabold) | Hero 타이틀, 페이지 H1 |

---

## 4. 스페이싱

기본 단위: **4px**. Tailwind 기본 스케일과 1:1 매핑.

| 토큰 | 값 | Tailwind | 용도 |
|---|---|---|---|
| `--spacing-1` | 4px | `p-1`, `m-1` | 아이콘 내부 패딩 |
| `--spacing-2` | 8px | `p-2`, `gap-2` | 인라인 요소 간격 |
| `--spacing-3` | 12px | `p-3`, `gap-3` | 작은 버튼 패딩 |
| `--spacing-4` | 16px | `p-4`, `gap-4` | 기본 간격 |
| `--spacing-5` | 20px | `p-5` | 카드 내부 패딩 (소) |
| `--spacing-6` | 24px | `p-6` | 카드 내부 패딩 (기본) |
| `--spacing-8` | 32px | `p-8`, `gap-8` | 섹션 내 요소 간격 |
| `--spacing-10` | 40px | `mt-10` | 서브 섹션 간격 |
| `--spacing-12` | 48px | `py-12` | 모바일 섹션 패딩 |
| `--spacing-16` | 64px | `py-16` | 섹션 패딩 (소) |
| `--spacing-20` | 80px | `py-20` | 섹션 상하 패딩 (기본) |
| `--spacing-24` | 96px | `py-24` | 섹션 패딩 (대) |
| `--spacing-28` | 112px | `py-28` | Hero 섹션 패딩 |

### 레이아웃 기준값

| 항목 | 값 |
|---|---|
| 페이지 최대 너비 | 1200px (`max-w-6xl`) |
| 페이지 사이드 패딩 | 20px (`px-5`) |
| 섹션 상하 패딩 | 80px desktop / 48px mobile (`py-20 md:py-28`) |
| 카드 내부 패딩 | 24px desktop / 20px mobile |
| 컴포넌트 간격 | 16px (`gap-4`) |

---

## 5. Radius 토큰

| 토큰 | 변수 | 값 | Tailwind | 용도 |
|---|---|---|---|---|
| SM | `--radius-sm` | 6px | `rounded-md` | 인풋, 태그, 작은 요소 |
| MD | `--radius-md` | 8px | `rounded-lg` | 일반 버튼 |
| LG | `--radius-lg` | 12px | `rounded-xl` | 작은 카드, 모달 내 블록 |
| XL | `--radius-xl` | 16px | `rounded-2xl` | 메인 카드, 패널 |
| Full | `--radius-full` | 9999px | `rounded-full` | 뱃지, 필 태그, 아바타 |

**주의:** 4px(`rounded`), 10px, 24px(`rounded-3xl`) 값은 사용 금지.

---

## 6. 그림자 토큰

| 토큰 | 변수 | Tailwind | 용도 |
|---|---|---|---|
| Card | `--shadow-card` | `shadow-card` | 기본 카드 |
| Card Hover | `--shadow-card-hover` | `shadow-card-hover` | 카드 hover 상태 |
| Elevated | `--shadow-elevated` | `shadow-elevated` | 모달, 드롭다운, 오버레이 |
| Button | `--shadow-button` | `shadow-btn` | Safety Blue 버튼 |
| Focus | `--shadow-focus` | (ring utility) | 입력 포커스 링 |

```css
--shadow-card:       0 1px 2px rgba(15,23,42,0.04), 0 1px 1px rgba(15,23,42,0.06);
--shadow-card-hover: 0 4px 12px rgba(15,23,42,0.08), 0 2px 4px rgba(15,23,42,0.04);
--shadow-elevated:   0 10px 25px rgba(15,23,42,0.10), 0 4px 10px rgba(15,23,42,0.06);
--shadow-button:     0 1px 2px rgba(37,99,235,0.20);
--shadow-focus:      0 0 0 3px rgba(37,99,235,0.20);
```

---

## 7. 컴포넌트 명세

### Button

| 변형 | 배경 | 텍스트 | 테두리 | 용도 |
|---|---|---|---|---|
| `primary` | Safety Blue | White | 없음 | 메인 CTA (페이지당 1개) |
| `secondary` | White | Ink | Hairline | 보조 액션 |
| `ghost` | 투명 | Muted | 없음 | 텍스트 버튼 |
| `destructive` | White | Alert Red | Alert Red/10 | 삭제 확인 |

**사이즈:**
- `sm`: `px-3 py-1.5 text-sm rounded-md`
- `md` (기본): `px-5 py-2.5 text-sm rounded-lg`
- `lg`: `px-7 py-3.5 text-base rounded-xl`
- `pill`: `px-6 py-3 rounded-full` (HeroSection CTA용)

**규칙:**
- Primary 버튼은 섹션당 1개만
- 버튼 라벨은 동사로 시작 ("문의하기", "다운로드", "자세히 보기")
- 아이콘은 오른쪽 정렬 (`gap-2`, `h-4 w-4`)

---

### Card

```
기본 카드:
  bg-surface rounded-2xl border border-hairline shadow-card p-6

호버 카드 (클릭 가능):
  + transition hover:shadow-card-hover hover:border-safety-blue/20 cursor-pointer
```

**금지:**
- 카드 안에 카드 중첩 3단계 이상
- rounded-3xl 이상 사용

---

### Input

```
기본:
  w-full rounded-md border border-hairline bg-surface px-3 py-2
  text-sm text-ink placeholder:text-subtle
  focus:border-safety-blue focus:outline-none focus:ring-2 focus:ring-safety-blue/20
  transition

에러:
  border-alert-red focus:border-alert-red focus:ring-alert-red/20

비활성:
  opacity-50 cursor-not-allowed
```

---

### Badge

```
기본 (blue):
  inline-flex items-center rounded-full bg-safety-blue-soft px-2.5 py-0.5
  text-xs font-semibold text-safety-blue

성공 (green):
  bg-green-50 text-success-green

경고 (red):
  bg-red-50 text-alert-red

중립 (gray):
  bg-mist text-muted
```

---

## 8. Do's and Don'ts

### 레이아웃

✅ **Do**
- 섹션 간격은 `py-20 md:py-28` 기준으로 통일
- 카드 그리드는 `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` 패턴 사용
- 모든 컨텐츠는 `max-w-6xl mx-auto px-5` 컨테이너 안에

❌ **Don't**
- 가로 스크롤 발생하는 레이아웃
- `max-w-7xl` 이상 (1200px 초과) 컨텐츠 너비
- 고정 높이(`h-[500px]`) 남발 — 콘텐츠 기반으로 자동 조절

---

### 색상

✅ **Do**
- Safety Blue는 CTA, 링크, 아이콘 강조에만
- 다크 섹션은 Hero와 CTA, Footer에 한정
- 뱃지는 Safety Blue Soft + Safety Blue 텍스트 조합

❌ **Don't**
- 노랑/주황 계열 장식 사용 (카카오 노란색은 카카오톡 아이콘 한정)
- 여러 강조 색상 혼용 (Rainbow UI 금지)
- `text-white` on `bg-white`

---

### 타이포그래피

✅ **Do**
- H1은 페이지당 1개, Extrabold(`font-extrabold`)
- 섹션 제목은 `text-2xl md:text-3xl font-bold`
- 줄바꿈이 필요한 카피는 `<br className="hidden md:block" />`로 반응형 처리

❌ **Don't**
- 모든 텍스트 Bold 처리
- 12px 미만 텍스트 (캡션 최소 12px)
- 행간 1.0 이하 설정

---

### 컴포넌트

✅ **Do**
- 버튼 disabled 상태는 항상 `disabled:opacity-60` + `cursor-not-allowed`
- 로딩 중에는 스피너 + 텍스트 변경으로 피드백 제공
- 삭제 액션은 `confirm()` 또는 확인 모달 필수

❌ **Don't**
- 확인 없는 destructive 액션
- 에러 상태 없는 폼 입력
- 클릭 영역이 24px 미만인 인터랙티브 요소

---

## 9. 아이콘

라이브러리: **Lucide React** (`lucide-react`)

| 사이즈 | 클래스 | 용도 |
|---|---|---|
| 16px | `h-4 w-4` | 버튼 내부, 인라인 |
| 20px | `h-5 w-5` | 카드 내 아이콘 |
| 24px | `h-6 w-6` | 섹션 아이콘 |
| 32px | `h-8 w-8` | Feature 아이콘 (배경 박스 포함) |

아이콘 컨테이너:
```
h-10 w-10 rounded-xl bg-safety-blue-soft flex items-center justify-center
```

---

## 10. 애니메이션

| 용도 | 값 |
|---|---|
| 색상/그림자 전환 | `transition` (150ms ease) |
| 요소 이동 | `transition-transform duration-200` |
| 페이지 진입 | `MotionInView` 컴포넌트 (Framer Motion, delay 0~0.15s) |
| 슬라이더 | CSS `@keyframes`, `linear infinite` |

**금지:**
- 1초 이상 전환 애니메이션
- 사용자 입력에 반응하는 bounce 효과
- `animation-duration: 0.5s` 이상 hover 전환

---

## 11. 접근성 기준

- 텍스트 대비율: AA 기준 이상 (일반 텍스트 4.5:1, 큰 텍스트 3:1)
- 모든 인터랙티브 요소에 `focus-visible` 스타일 적용
- 아이콘 전용 버튼에는 `aria-label` 필수
- 폼 입력에는 `<label>` 또는 `aria-label` 연결

---

*이 문서는 코드베이스 변경에 따라 업데이트됩니다. 변경 시 버전과 날짜를 갱신하세요.*
