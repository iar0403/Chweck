# CHWEK 앱 배포 가이드

## Vercel 배포 방법

### 방법 1: Vercel CLI 사용 (터미널)

```bash
# 1. Vercel 로그인
vercel login

# 2. 프로젝트 배포
vercel

# 3. 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동 (권장)

1. **GitHub에 코드 푸시**
   ```bash
   git add .
   git commit -m "PWA 설정 완료 및 배포 준비"
   git push origin main
   ```

2. **Vercel 웹사이트에서 배포**
   - [vercel.com](https://vercel.com) 접속
   - GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택
   - 자동으로 배포 시작

## 배포 후 확인 사항

### PWA URL
배포 완료 후 제공되는 URL이 PWA URL입니다.
예: `https://chwek.vercel.app`

### PWA 테스트
1. 모바일 브라우저에서 배포된 URL 접속
2. 브라우저 메뉴에서 "홈 화면에 추가" 선택
3. 앱이 독립 앱처럼 작동하는지 확인

### manifest.json 확인
배포된 URL에서 다음 주소로 접속하여 manifest 확인:
- `https://your-app.vercel.app/manifest.json`

## 환경 변수 (필요한 경우)

Supabase를 사용하는 경우, Vercel 대시보드에서 환경 변수 설정:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 커스텀 도메인 설정 (선택사항)

1. Vercel 대시보드 → 프로젝트 → Settings → Domains
2. 원하는 도메인 추가
3. DNS 설정 안내에 따라 도메인 설정

## 배포 상태 확인

```bash
# 배포 상태 확인
vercel ls

# 배포 로그 확인
vercel logs
```

