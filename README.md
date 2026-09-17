# 오성식 · Game Client Programmer Profile

게임 규칙을 구조화하고, 끝까지 검증하는 개발자의 웹 포트폴리오입니다.
React + TypeScript + Vite + MUI 로 만들었고, GitHub Actions 로 배포합니다.

- 배포: https://profile.blackvrice.com
- GitHub: https://github.com/blackvrice

## 구성

| 탭 | 내용 |
| --- | --- |
| Project | RTS(C++23) · Tycoon(Unity 6) · ArenaShooter(UE 5.6) — 구현·검증 근거 |
| Strength | 게임 클라이언트 요구 역량 ↔ 근거 매핑, 개발 원칙(STATE → BOUNDARY → VERIFY → EVIDENCE) |
| Career | 앤서레이 · 노리시스템 · 위시정보기술 실무 경력 (상세 직무 펼쳐보기) |
| Algorithm | 백준 / 프로그래머스 문제 해결 기록 |
| Study | 학습 중인 기술 관심사 |

## 내용 수정하기

문구와 데이터는 대부분 데이터 파일에 모여 있습니다.

| 파일 | 수정 대상 |
| --- | --- |
| `src/ProjectData.ts` | 프로젝트 목록, 수치, 기술 태그, **플레이 영상 URL(`videoUrl`)** |
| `src/CareerData.ts` | 경력 기간, 직무, 상세 항목, 기술 스택 |
| `src/Strength.tsx` | 역량 매핑 표(`fitRows`), 개발 원칙, 협업 태도 |
| `src/layout.tsx` | 히어로 소개 문구, 스킬 그룹, 연락처, SEO 메타 |
| `src/App.tsx` | 탭 구성, Study 항목 |

> 프로젝트 카드의 "영상" 버튼은 `videoUrl` 이 비어 있으면 비활성 상태입니다.
> YouTube 링크를 채우면 자동으로 활성화됩니다.

## 개발

```bash
npm install
npm run dev      # 로컬 개발 서버
npm run build    # 타입 체크 + 프로덕션 빌드
npm run lint     # ESLint
npm run preview  # 빌드 결과 미리보기
```
