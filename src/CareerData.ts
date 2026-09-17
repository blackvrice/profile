// CareerData.ts
export type CareerSkill = { name: string; icon: string; color?: string };

export type CareerItem = {
    company: string;
    department?: string;
    period: string;
    role: string;
    /** 한 줄 요약 */
    summary: string;
    /** 카드에 바로 보이는 핵심 성과 */
    highlights: string[];
    /** "더보기"로 펼쳐지는 상세 직무 */
    details: string[];
    /** 게임 클라이언트 직무로 이어지는 역량 */
    bridge?: string[];
    skills: CareerSkill[];
};

export const careerData: CareerItem[] = [
    {
        company: "(주)앤서레이",
        department: "연구개발부",
        period: "2025.01 ~ 2026.08",
        role: "연구원 · 정규직",
        summary: "C#/WPF 기반 형광–라만 연속 계측 장비 제어 소프트웨어를 개발하며 상태 관리·비동기 흐름·외부 인터페이스를 다뤘습니다.",
        highlights: [
            "Camera · Laser · Stage · Raman 장비를 하나의 측정 시퀀스로 통합 제어",
            "UI / Sequence / Device / Data / Driver 5계층으로 책임을 분리한 구조 설계",
            "비동기 장비 제어와 명시적 상태 전이로 UI와 장비 동작 간 의존성 최소화",
            "Serial · LAN · RS-485 통신 기반 장치 제어 및 통신 오류 디버깅",
            "실제 장비 테스트로 재현 조건을 확보하고 로그 분석 기반으로 원인 추적·안정화",
        ],
        details: [
            "측정 데이터 저장·가공·시각화 및 결과 파일(JSON/CSV/PNG/TIFF16) 생성 기능 개발",
            "장비 SDK 및 외부 라이브러리 연동 과정의 예외·통신·데이터 이상 문제 분석 및 해결",
            "기능 요구사항을 분석해 기존 코드를 리팩터링하고 유지보수성을 고려한 구조 개선",
            "취소·복구 경로를 포함한 측정 상태 머신 구현",
            "생성형 AI를 코드 작성·리팩터링 보조 도구로 활용하되, 결과를 직접 검토·수정·실행 검증",
        ],
        bridge: ["상태 관리", "비동기 흐름", "외부 인터페이스", "실패 복구", "로그 기반 디버깅"],
        skills: [
            {name: "C#", icon: "vscode-icons:file-type-csharp", color: "#178600"},
            {name: "WPF", icon: "devicon:csharp", color: "#68217a"},
            {name: ".NET 8", icon: "logos:dotnet", color: "#512bd4"},
            {name: "C++", icon: "logos:c-plusplus", color: "#00599c"},
            {name: "MVVM", icon: "mdi:sitemap-outline", color: "#0f766e"},
            {name: "Serial / LAN / RS-485", icon: "mdi:lan-connect", color: "#00838f"},
            {name: "Git", icon: "logos:git-icon"},
        ],
    },
    {
        company: "노리시스템(주)",
        department: "운영팀",
        period: "2023.04 ~ 2024.12",
        role: "대리 · 계약직",
        summary: "Java/Spring 기반 웹 애플리케이션을 운영하며 대용량 데이터 처리와 성능 개선, 장애 원인 추적을 담당했습니다.",
        highlights: [
            "Controller–Service–DAO 구조의 기존 코드 분석 및 신규 기능 개발",
            "Oracle 실행 계획 분석으로 조회 성능 개선 (복잡 JOIN · Subquery 최적화)",
            "RESTful API 설계 및 요청·응답 구조 개선",
            "서비스 오류·예외 상황을 분석하고 원인 코드를 추적해 장애 수정",
        ],
        details: [
            "PostgreSQL / Oracle 기반 데이터베이스 스키마 및 데이터 처리 로직 개발",
            "공통 모듈 및 중복 코드 리팩터링으로 가독성과 유지보수성 개선",
            "Web UI와 서버 간 데이터 연동 기능 개발",
            "Git 기반 형상관리로 기존 코드와 신규 기능 변경사항 관리",
        ],
        bridge: ["대용량 데이터 처리", "성능 프로파일링", "원인 추적형 디버깅"],
        skills: [
            {name: "Java", icon: "vscode-icons:file-type-java", color: "#e76f00"},
            {name: "Spring Boot", icon: "simple-icons:springboot", color: "#6db33f"},
            {name: "Oracle", icon: "logos:oracle", color: "#f80000"},
            {name: "PostgreSQL", icon: "logos:postgresql", color: "#336791"},
            {name: "REST API", icon: "mdi:api", color: "#0f766e"},
            {name: "Git", icon: "logos:git-icon"},
        ],
    },
    {
        company: "위시정보기술",
        department: "파견부",
        period: "2022.08 ~ 2023.03",
        role: "사원 · 파견직",
        summary: "Java/Spring 기반 기업용 웹 시스템을 개발하며 요구사항 분석과 데이터베이스 연동의 기본기를 다졌습니다.",
        highlights: [
            "기존 업무 시스템의 요구사항 분석 및 기능 추가·수정",
            "서버 비즈니스 로직 및 데이터베이스 연동 기능 개발",
            "Oracle 기반 데이터 조회·등록·수정 로직 및 SQL 작성",
            "XSS 등 웹 보안 이슈를 고려한 입력값 처리 및 기능 안정화",
        ],
        details: [
            "기존 소스 분석을 통한 오류 원인 파악 및 기능 개선",
            "사용자 입력 데이터 검증 및 예외 처리 로직 구현",
            "웹 에디터 및 화면 기능 연동, 데이터 처리 과정의 오류 수정",
            "유지보수 과정에서 반복되는 로직을 정리하고 코드 가독성 개선",
        ],
        bridge: ["요구사항 구체화", "예외 처리 설계"],
        skills: [
            {name: "Java", icon: "vscode-icons:file-type-java", color: "#e76f00"},
            {name: "Spring", icon: "simple-icons:spring", color: "#6db33f"},
            {name: "Oracle", icon: "logos:oracle", color: "#f80000"},
            {name: "SQL", icon: "mdi:database-search-outline", color: "#0f766e"},
            {name: "JavaScript", icon: "logos:javascript"},
        ],
    },
];
