/**
 * 체크 버튼 클릭 시 햅틱 진동을 재생하는 함수
 * Next.js/웹 환경에서 Web Vibration API 사용
 */
export async function playCheckFeedback() {
  try {
    // 햅틱 진동 발생 (Heavy 등급 - 긴 진동)
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // 50ms 진동
    }
  } catch (error) {
    // 에러 발생 시 조용히 실패 (햅틱이 없어도 앱은 정상 작동)
    console.warn('Failed to play check feedback:', error);
  }
}

/**
 * 체크 취소 시 경고 햅틱 피드백
 */
export async function playUncheckFeedback() {
  try {
    // 경고 진동 (짧은 진동 패턴)
    if ('vibrate' in navigator) {
      navigator.vibrate([30, 50, 30]); // 짧은 진동 패턴
    }
  } catch (error) {
    console.warn('Failed to play uncheck feedback:', error);
  }
}


