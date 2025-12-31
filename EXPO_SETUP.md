# Expo 햅틱 및 사운드 설정 가이드

## 📦 패키지 설치

```bash
npm install expo-av expo-haptics
```

또는

```bash
npx expo install expo-av expo-haptics
```

## 🔊 사운드 파일 준비

1. `assets/sounds/` 디렉토리에 `chwek.mp3` 파일을 추가하세요.
2. 사운드 파일은 MP3 형식이어야 합니다.

## ⚙️ Expo 설정

### app.json 또는 app.config.js에 다음 설정 추가:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-av",
        {
          "microphonePermission": false
        }
      ]
    ]
  }
}
```

## 📱 사용 방법

체크 버튼을 클릭하면:
1. **Heavy 등급 햅틱 진동**이 발생합니다
2. **chwek.mp3 사운드**가 재생됩니다

체크 취소 시:
- **Warning 햅틱 피드백**이 발생합니다

## 🔧 구현된 기능

- `lib/haptics.ts`: 햅틱 및 사운드 유틸리티 함수
  - `playCheckFeedback()`: 체크 시 햅틱 + 사운드
  - `playUncheckFeedback()`: 체크 취소 시 경고 햅틱

- `components/checklist-view.tsx`: 체크/언체크 핸들러에 통합됨

## ⚠️ 주의사항

- 햅틱 피드백은 실제 기기에서만 작동합니다 (시뮬레이터에서는 작동하지 않을 수 있음)
- 사운드 파일이 없으면 에러 없이 조용히 실패합니다
- 웹 환경에서는 햅틱이 작동하지 않습니다 (Expo Go 또는 네이티브 빌드 필요)

## 🐛 문제 해결

### 사운드가 재생되지 않는 경우
- `assets/sounds/chwek.mp3` 파일이 올바른 위치에 있는지 확인
- 파일 경로가 정확한지 확인
- 사운드 파일 형식이 MP3인지 확인

### 햅틱이 작동하지 않는 경우
- 실제 기기에서 테스트 (시뮬레이터에서는 제한적)
- Expo Go 앱 또는 네이티브 빌드 사용
- 기기의 햅틱 설정이 활성화되어 있는지 확인


