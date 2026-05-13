export function KakaoFloatingButton() {
  return (
    <a
      href="https://pf.kakao.com/_texjAX/chat"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡 채널 상담"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105 active:scale-95"
      style={{ backgroundColor: "#FEE500" }}
    >
      {/* KakaoTalk 말풍선 로고 */}
      <svg
        viewBox="0 0 24 24"
        fill="#3A1D1D"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M12 3C6.477 3 2 6.72 2 11.3c0 2.94 1.874 5.522 4.683 7.07L5.5 22l4.132-2.297A11.8 11.8 0 0 0 12 19.6c5.523 0 10-3.72 10-8.3C22 6.72 17.523 3 12 3z" />
      </svg>
    </a>
  );
}
