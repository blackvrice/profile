// ProjectData.ts
export type ProjectStat = { value: string; label: string };

export type ProjectItem = {
    name: string;
    category: string;
    /** 엔진 · 언어 · 빌드 환경 */
    stack: string;
    summary: string;
    /** 카드 상단 강조 수치 */
    stats: ProjectStat[];
    /** 플레이 흐름 (좌 → 우) */
    flow: string[];
    tech: string[];
    features: string[];
    /** 직접 돌려본 검증 근거 */
    verification: string[];
    githubUrl: string;
    /** 플레이 영상 (URL을 채우면 버튼이 활성화됩니다) */
    videoUrl?: string;
    accent: string;
    icon: string;
};

export const projects: ProjectItem[] = [
    {
        name: "RTS",
        category: "C++ 실시간 전략 게임 · 개인 프로젝트",
        stack: "C++23 · SFML3 · OpenGL · CMake",
        summary:
            "입력·게임 규칙·AI·렌더링이 직접 연결되면 기능이 늘수록 변경 영향이 커집니다. 로직은 고정 틱·고정 순서로 갱신하고 RenderQueue 결과만 렌더 스레드로 전달해, 규칙 변경과 화면 표현이 서로의 복잡도를 끌어올리지 않는 구조를 만들었습니다.",
        stats: [
            {value: "30Hz", label: "Fixed Tick"},
            {value: "A*", label: "경로 탐색"},
            {value: "1/1", label: "CTest Smoke"},
        ],
        flow: ["입력 → 명령 버스", "라우터 → 월드 로직", "고정 틱(30Hz)", "Movement·A*·Combat", "RenderQueue"],
        tech: ["C++23", "SFML3", "OpenGL", "CMake", "JSON / TMX", "Multi-thread"],
        features: [
            "Command Bus / Router 기반 입력–로직 분리",
            "Logic Thread와 Render Thread 분리, RenderQueue로만 결과 전달",
            "A* 경로 탐색 + 점유 Grid 캐시, Tick 분산과 Worker Thread 처리",
            "EntityId(index + generation) 기반 엔티티 수명 관리",
            "Fog of War · Combat · Economy · Save/Load · Replay",
        ],
        verification: [
            "명령을 Tick과 함께 기록해 실행 순서와 Replay 경로를 고정",
            "30 Tick마다 FNV-1a WorldHash checkpoint를 비교해 Replay divergence 검출",
            "Save/Load 이후에도 상태 Hash를 검증",
            "CTest rts_headless_smoke 1/1 통과 · 수동 QA 체크리스트 병행",
        ],
        githubUrl: "https://github.com/blackvrice/rts",
        videoUrl: "",
        accent: "#0f766e",
        icon: "mdi:chess-rook",
    },
    {
        name: "Tycoon",
        category: "Unity 경영·농장 게임 · 개인 프로젝트",
        stack: "Unity 6000.3.10f1 · C# · UI Toolkit",
        summary:
            "Farm → Sell → Reinvest → Save/Load로 이어지는 3–5분 경영 루프를 완성하고, 78개의 자동화 테스트와 Windows 빌드로 실제 동작을 검증했습니다.",
        stats: [
            {value: "74", label: "PlayMode 테스트"},
            {value: "4", label: "EditMode 테스트"},
            {value: "5개 씬", label: "Smoke 검증"},
        ],
        flow: ["Till / Plant", "Water / Grow", "Harvest", "Sell / Buy", "Save / Load"],
        tech: ["Unity 6", "C#", "ScriptableObject", "Tilemap", "UI Toolkit", "JSON DTO"],
        features: [
            "Farm 도메인과 Tilemap 표현을 분리하고 데이터는 ScriptableObject로 관리",
            "Inventory / Hotbar · Shop / Economy · GameSession 구성",
            "JSON DTO 기반 Save/Load",
            "Scene Runtime Installer로 씬별 의존성 조립",
        ],
        verification: [
            "PlayMode 74개: 농장·경제·Save/Load 및 실제 5개 씬 Smoke",
            "EditMode 4개: Installer 재설치 멱등성, 참조·데이터 계약 검증",
            "Windows Build로 실제 플레이 루프 확인",
        ],
        githubUrl: "https://github.com/blackvrice/Tycoon",
        videoUrl: "",
        accent: "#e76f51",
        icon: "mdi:sprout-outline",
    },
    {
        name: "ArenaShooter",
        category: "Unreal Engine 5.6 아레나 슈터 · 개인 프로젝트",
        stack: "Unreal Engine 5.6 · C++ · Windows Shipping",
        summary:
            "Title 화면부터 5라운드 Boss전과 Clear / Restart까지 하나의 게임 흐름을 끝까지 완성하고, Shipping으로 패키징한 EXE 실행까지 검증했습니다.",
        stats: [
            {value: "5R", label: "라운드 + 3 Phase Boss"},
            {value: "404 / 0", label: "Hitscan hit / miss"},
            {value: "97기", label: "처치 검증"},
        ],
        flow: ["Title", "Combat", "Round 1–5", "Boss 3 Phase", "Clear / Game Over → Restart"],
        tech: ["Unreal Engine 5.6", "C++", "GameMode", "Wave Manager", "Shipping Build"],
        features: [
            "Hitscan Rifle · Reload · Ammo Economy",
            "Normal / Fast / Tank 적 타입과 Round 보급 설계",
            "9방향 스폰 + Wave Manager 기반 라운드 진행",
            "HUD: HP · Ammo · Round · 남은 적 수",
            "Title → Combat → Clear/Game Over → Restart 게임 플로우",
        ],
        verification: [
            "Round 1~5 All-Rounds Smoke 통과",
            "실제 플레이 기준 Hitscan 404 hit / 0 miss, 총 97기 처치 기록",
            "Windows Shipping 패키징 EXE 실행 확인",
        ],
        githubUrl: "https://github.com/blackvrice/ArenaShooter",
        videoUrl: "",
        accent: "#7c3aed",
        icon: "mdi:target",
    },
];
