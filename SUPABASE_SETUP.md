# Supabase 설정 가이드

이 문서는 Anxiety Off 앱을 Supabase와 연동하기 위한 설정 가이드를 제공합니다.

## 📋 필요 사항 분석

현재 앱은 다음 데이터를 저장합니다:
- **체크리스트 항목**: 제목, 설명, 아이콘, 활성 상태, 마지막 체크 시간, 재확인 주기
- **사용자 설정**: 테마, 언어 설정
- **업로드된 이미지**: 사용자가 업로드한 아이콘 이미지

앱으로 등록하려면 다음 기능이 필요합니다:
1. ✅ **사용자 인증** - 여러 기기에서 동일한 계정 사용
2. ✅ **데이터 동기화** - 여러 기기 간 실시간 동기화
3. ✅ **데이터 백업** - 기기 변경/손실 시 데이터 복구
4. ✅ **이미지 저장** - 업로드된 아이콘 이미지 저장

## 🚀 Supabase 프로젝트 설정

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입/로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: anxiety-off (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 설정
   - **Region**: 가장 가까운 리전 선택
4. 프로젝트 생성 완료 대기 (약 2분)

### 2. 환경 변수 설정

1. Supabase 대시보드에서 **Settings** → **API** 이동
2. 다음 정보를 복사:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
3. 프로젝트 루트에 `.env.local` 파일 생성:

```bash
cp .env.local.example .env.local
```

4. `.env.local` 파일에 실제 값 입력:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. 데이터베이스 마이그레이션 실행

#### 방법 1: Supabase CLI 사용 (권장)

```bash
# Supabase CLI 설치
npm install -g supabase

# Supabase 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref your-project-ref

# 마이그레이션 실행
supabase db push
```

#### 방법 2: Supabase 대시보드에서 직접 실행

1. Supabase 대시보드 → **SQL Editor** 이동
2. `supabase/migrations/20240101000000_initial_schema.sql` 파일 내용 복사
3. SQL Editor에 붙여넣고 **Run** 클릭

### 4. Storage 버킷 생성

1. Supabase 대시보드 → **Storage** 이동
2. **Create a new bucket** 클릭
3. 설정:
   - **Name**: `item-icons`
   - **Public bucket**: ✅ 체크 (이미지 공개 접근 허용)
4. **Create bucket** 클릭
5. **Policies** 탭에서 다음 정책 추가:

```sql
-- Allow authenticated users to upload their own files
CREATE POLICY "Users can upload their own icons"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'item-icons' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to view their own files
CREATE POLICY "Users can view their own icons"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'item-icons' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to delete their own files
CREATE POLICY "Users can delete their own icons"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'item-icons' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### 5. 인증 설정 (선택사항)

1. Supabase 대시보드 → **Authentication** → **Providers** 이동
2. 사용할 인증 방법 활성화:
   - **Email**: 기본 활성화됨
   - **Google**: Google OAuth 설정 (선택)
   - **Apple**: Apple OAuth 설정 (선택)
   - 기타 소셜 로그인 (선택)

### 6. 패키지 설치

```bash
npm install @supabase/supabase-js
```

## 📁 생성된 파일 구조

```
lib/
  supabase/
    client.ts          # 클라이언트 사이드 Supabase 클라이언트
    server.ts          # 서버 사이드 Supabase 클라이언트
    types.ts           # TypeScript 타입 정의
    storage.ts         # Storage 유틸리티 함수

supabase/
  migrations/
    20240101000000_initial_schema.sql  # 초기 데이터베이스 스키마
```

## 🔐 보안 고려사항

1. **Row Level Security (RLS)**: 모든 테이블에 RLS가 활성화되어 있어 사용자는 자신의 데이터만 접근 가능합니다.
2. **Storage Policies**: 업로드된 이미지는 사용자별로 격리되어 있습니다.
3. **환경 변수**: `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함되어 있어야 함).

## 📝 다음 단계

1. ✅ Supabase 프로젝트 생성 및 설정 완료
2. ⏳ 데이터베이스 마이그레이션 실행
3. ⏳ Storage 버킷 생성 및 정책 설정
4. ⏳ 앱에 인증 기능 추가
5. ⏳ localStorage → Supabase 마이그레이션 로직 구현
6. ⏳ 실시간 동기화 기능 추가 (선택사항)

## 🐛 문제 해결

### 마이그레이션 오류
- SQL Editor에서 직접 실행해보고 오류 메시지 확인
- RLS 정책이 제대로 생성되었는지 확인

### Storage 업로드 실패
- 버킷이 public으로 설정되어 있는지 확인
- Storage 정책이 올바르게 설정되었는지 확인

### 인증 오류
- 환경 변수가 올바르게 설정되었는지 확인
- Supabase 프로젝트의 API 키가 올바른지 확인

## 📚 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Auth 가이드](https://supabase.com/docs/guides/auth)
- [Supabase Storage 가이드](https://supabase.com/docs/guides/storage)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)


