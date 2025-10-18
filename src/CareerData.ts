// careerData.ts
export type CareerItem = {
    company: string;
    period: string;
    role: string;
    highlights: string[];
    skills: { name: string; icon: string; color?: string }[]; // ← 아이콘형 스택
};

export const careerData: CareerItem[] = [
    {
        company: "위쉬정보기술",
        period: "2022.08 ~ 2023.03",
        role: "웹개발 (파견직 · 사원)",
        skills: [
            { name: "Java", icon: "vscode-icons:file-type-java", color: "#e76f00" },
            { name: "Spring Boot", icon: "simple-icons:springboot", color: "#6db33f" },
            { name: "Oracle", icon: "logos:oracle", color: "#f80000" },
            { name: "PostgreSQL", icon: "logos:postgresql", color: "#336791" },
            { name: "Linux", icon: "logos:linux-tux" },
            { name: "Jenkins", icon: "logos:jenkins" },
        ],
        highlights: [
            "Spring 기반 Web 서버 개발 및 RESTful API 표준화",
            "Oracle/PostgreSQL 성능 개선 및 ERD 설계",
            "Git+Jenkins CI/CD 구축 및 자동 배포 관리",
            "JSP/JS 기반 UI 오류 수정 및 접근성 개선",
        ],
    },
    {
        company: "노리시스템",
        period: "2023.04 ~ 2024.12",
        role: "웹개발 (사원)",
        skills: [
            { name: "Spring Boot", icon: "simple-icons:springboot", color: "#6db33f" },
            { name: "Oracle", icon: "logos:oracle" },
            { name: "PostgreSQL", icon: "logos:postgresql" },
            { name: "Linux", icon: "logos:linux-tux" },
            { name: "Nginx", icon: "logos:nginx" },
            { name: "Tomcat", icon: "logos:tomcat" },
            { name: "Jenkins", icon: "logos:jenkins" },
        ],
        highlights: [
            "Spring Boot 기반 웹 서버 신규 모듈 개발 및 유지보수",
            "Oracle/PostgreSQL DB 성능 최적화 및 Schema 버전 관리",
            "CrossEditor API 커스터마이징 및 파일 보안 로직 추가",
            "Linux 서버 자동화 및 Scheduler Job 관리",
            "On-Prem → Cloud(AWS/Naver Cloud) 마이그레이션 수행",
        ],
    },
    {
        company: "앤서레이",
        period: "2025.01 ~ 재직중",
        role: "S/W 개발 (연구개발부 · 연구원)",
        skills: [
            { name: "C#", icon: "vscode-icons:file-type-csharp", color: "#178600" },
            { name: "WPF", icon: "devicon:csharp", color: "#68217a" },
            { name: "WebSocket", icon: "mdi:web", color: "#00bcd4" },
            { name: "MySQL", icon: "logos:mysql", color: "#4479A1" },
            { name: "Kotlin", icon: "logos:kotlin" },
            { name: "React", icon: "logos:react" },
            { name: "Next.js", icon: "logos:nextjs-icon" },
            { name: "Electron", icon: "logos:electron" },
            { name: "TypeScript", icon: "logos:typescript-icon" },
        ],
        highlights: [
            "MVVM 기반 WPF 데이터 분석·제어 프로그램 개발",
            "LiveChartsCore + SkiaSharp로 실시간 시각화 기능 구현",
            "WebSocket 서버 및 JSON 프로토콜 설계로 안정적인 실시간 통신 구축",
            "MySQL DB 설계 및 ORM(Entity Framework/Prisma) 연동",
            "Android 앱(WebSocket 기반) 개발 및 Compose UI 구성",
            "Next.js + Prisma 백엔드와 MUI 대시보드 웹 구축",
            "Electron + React 기반 크로스플랫폼 애플리케이션 개발 및 배포 자동화",
        ],
    },
];
