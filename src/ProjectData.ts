// ProjectData.ts
export type ProjectStat = { value: string; label: string };

/** 실제로 부딪힌 문제와 해결 방법 */
export type ProjectIssue = { problem: string; solution: string };

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
    /** 문제 해결 기록 */
    issues?: ProjectIssue[];
    githubUrl: string;
    /** YouTube 영상 ID. 채우면 썸네일과 재생 버튼이 표시됩니다. */
    videoId?: string;
    /** 영상 썸네일 아래 캡션 */
    videoCaption?: string;
    accent: string;
    icon: string;
};

/** YouTube 영상 ID로 시청 URL을 만듭니다. */
export const youtubeUrl = (videoId: string) => `https://youtu.be/${videoId}`;

/** YouTube 영상 ID로 썸네일 URL을 만듭니다. */
export const youtubeThumbnail = (videoId: string, quality: "maxres" | "hq" = "maxres") =>
    `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;

export const projects: ProjectItem[] = [
    {
        name: "RTS",
        category: "C++ 실시간 전략 게임 · 개인 프로젝트",
        stack: "C++23 · SFML3 · OpenGL · CMake",
        summary:
            "자원 채집 → 건설 → 유닛 생산 → 적 기지 격파까지 한 판이 성립하는 RTS 수직 슬라이스입니다. 입력·규칙·AI·렌더링이 직접 연결되면 기능이 늘수록 변경 영향이 커지므로, 로직은 고정 틱·고정 순서로 갱신하고 RenderQueue 결과만 렌더 스레드로 전달했습니다.",
        stats: [
            {value: "30Hz", label: "Fixed Tick"},
            {value: "A*", label: "경로 탐색"},
            {value: "1/1", label: "CTest Smoke"},
        ],
        flow: ["입력 → 명령 버스", "라우터 → 월드 로직", "고정 틱(30Hz)", "Movement·A*·Combat", "RenderQueue"],
        tech: ["C++23", "SFML3", "OpenGL", "CMake", "Dear ImGui", "JSON / TMX", "Multi-thread"],
        features: [
            "유닛 선택 · 컨트롤 그룹 · 명령 큐 기반 부대 지휘",
            "Command Bus / Router로 입력과 로직 분리, Logic / Render Thread 분리",
            "A* 경로 탐색 + 점유 Grid 캐시, Tick 분산과 Worker Thread 처리",
            "EntityId(index + generation) 기반 엔티티 수명 관리",
            "근접·원거리 전투와 적 AI · Fog of War · 미니맵",
            "자원 채집 · 건설 · 유닛 생산 · Save/Load · Replay",
        ],
        verification: [
            "명령을 Tick과 함께 기록해 실행 순서와 Replay 경로를 고정",
            "30 Tick마다 FNV-1a WorldHash checkpoint를 비교해 Replay divergence 검출",
            "Headless Smoke가 JSON/TMX 맵 로딩 · 테크트리 · Replay 직렬화 · 고정소수점 이동 · 60틱 실행을 커버",
            "CTest rts_headless_smoke 1/1 통과 · 선택/채집/건설/전투/시야는 수동 QA로 별도 확인",
        ],
        issues: [
            {
                problem: "대형 맵에서 A* 요청이 한 틱에 몰려 시뮬레이션이 정체됨",
                solution:
                    "유닛 점유 조회를 선형 탐색(O(n))에서 캐시 조회(O(1))로 바꾸고, 경로 요청을 여러 틱과 Worker Thread에 분산해 결과는 결정적 순서로 반영",
            },
            {
                problem: "안개 시야 밖 전투 연출이 재생되어 적 위치가 노출됨",
                solution: "피해 · 사망 · 폭발 피드백을 플레이어가 볼 수 있는 위치에서만 재생하도록 가시성 조건을 추가",
            },
        ],
        githubUrl: "https://github.com/blackvrice/rts",
        videoId: "g9drIxSF76o",
        videoCaption: "고정 틱 · A* 유닛 이동 · 전투 · 안개 시야 플레이",
        accent: "#0f766e",
        icon: "mdi:chess-rook",
    },
    {
        name: "Tycoon",
        category: "Unity 경영·농장 게임 · 개인 프로젝트",
        stack: "Unity 6000.3.10f1 · C# · UI Toolkit",
        summary:
            "경작 → 파종 → 물주기 → 수확 → 판매 → 재투자로 이어지는 3–5분 경영 루프를 완성했습니다. 78개의 자동화 테스트를 테스트 더블 없이 실제 구현과 프로젝트 씬으로 돌려 검증했습니다.",
        stats: [
            {value: "74", label: "PlayMode 테스트"},
            {value: "4", label: "EditMode 테스트"},
            {value: "5개 씬", label: "Smoke 검증"},
        ],
        flow: ["Till / Plant", "Water / Grow", "Harvest", "Sell / Buy", "Save / Load"],
        tech: ["Unity 6", "C#", "ScriptableObject", "Tilemap", "UI Toolkit", "JSON DTO"],
        features: [
            "FieldTile · CropInstance가 규칙과 상태를 소유하고 FarmTileControl은 Tilemap 표현만 담당",
            "밀 · 토마토 · 해바라기를 회전율과 수익이 다르게 설계, ScriptableObject 데이터로만 관리",
            "Farm · Pasture · Livestock 확장 지역과 지역별 상점",
            "GameSession이 씬 전환 후에도 인벤토리 · 경제 상태 유지",
            "SaveManager가 8개 이상 상태 범주를 DTO로 저장하고 ID 기반으로 참조 복원",
            "규칙 관찰형 7단계 튜토리얼 · Scene Runtime Installer",
        ],
        verification: [
            "PlayMode 74개: 농장 규칙 · 경제 · Save/Load · UI 및 실제 5개 씬 Smoke",
            "EditMode 4개: Installer 계약과 데이터 유효성 검증",
            "실제 FarmGrid · Inventory · ShopSystem을 사용 (테스트 더블 미사용)",
            "1920×1080 · 1600×900 · 1280×720 반응형 UI 확인 · C# 컴파일 경고 0건",
        ],
        issues: [
            {
                problem: "작물이나 아이템을 추가할 때마다 농장 규칙 코드를 함께 고쳐야 함",
                solution:
                    "GameDatabase와 ScriptableObject로 데이터를 분리해, 핵심 농장 규칙을 수정하지 않고 작물·아이템만 추가할 수 있게 구성",
            },
            {
                problem: "씬을 이동하면 인벤토리와 소지금 상태가 끊김",
                solution: "GameSession이 씬 간 상태를 소유하고, 저장 데이터는 ID 기반 참조 복원으로 로드 후에도 연결을 유지",
            },
        ],
        githubUrl: "https://github.com/blackvrice/Tycoon",
        videoId: "VSVncw0xsNU",
        videoCaption: "3–5분 경영 루프 · 수확 → 판매 → 재투자 → Save/Load",
        accent: "#e76f51",
        icon: "mdi:sprout-outline",
    },
    {
        name: "ArenaShooter",
        category: "Unreal Engine 5.6 3인칭 웨이브 슈터 · 개인 프로젝트",
        stack: "Unreal Engine 5.6 · C++ · Windows Shipping",
        summary:
            "중앙 아레나를 지키며 4라운드를 버티고 5페이즈 보스전까지 끝내는 흐름을 Title부터 Restart까지 완성했습니다. Shipping으로 패키징한 EXE 실행과 자동화 스모크로 실제 동작을 검증했습니다.",
        stats: [
            {value: "4R + 5P", label: "라운드 + 보스 페이즈"},
            {value: "404 / 0", label: "Hitscan hit / miss"},
            {value: "97기", label: "스폰 검증"},
        ],
        flow: ["Title", "Round 1–4", "5 Phase Boss", "Clear / Game Over", "Restart"],
        tech: ["Unreal Engine 5.6", "C++", "GameMode", "Wave Manager", "Shipping Build"],
        features: [
            "Hitscan Rifle · 60발 탄창 · 재장전 · 예비 탄약 관리",
            "Normal / Fast / Tank 적 타입을 라운드마다 난이도 있게 배치",
            "체력과 탄약을 회복하는 보급 스테이션",
            "9개 지점 스폰과 WaveManager 기반 라운드 진행",
            "CWSGameMode가 타이틀 진입 · 웨이브 연결 · 라운드 종료 · 재시작을 관리",
            "HUD: HP · Ammo · 재장전 상태 · 남은 적 수 · 보스 페이즈",
        ],
        verification: [
            "라운드별 스폰 8 · 16 · 24 · 34기와 보스전 15기, 합계 97기 확인",
            "실제 플레이 기준 Hitscan 404 hit / 0 miss",
            "명중률 70% 가정 시 필요 578발 대비 확보 600발로 탄약 경제 검증",
            "Round 1~5 스모크 · 밸런스 · 스크린샷 자동 검증 · Windows Shipping EXE 실행 확인",
        ],
        issues: [
            {
                problem: "테스트 코드가 늘면서 프로덕션 게임플레이 로직과 갈라질 위험",
                solution:
                    "GameplayTestCoordinator와 Runner를 테스트 전용으로 분리하되, 무기 · 적 · 웨이브 시스템은 프로덕션 구현을 수정 없이 그대로 재사용",
            },
            {
                problem: "라운드가 진행될수록 탄약이 부족한지 감으로만 판단하던 문제",
                solution:
                    "명중률 70%를 가정해 필요 탄약 578발을 계산하고, 라운드 보급 포함 확보 가능한 600발과 비교해 수치로 밸런스를 확인",
            },
        ],
        githubUrl: "https://github.com/blackvrice/ArenaShooter",
        videoId: "qMS_WJlHeEc",
        videoCaption: "Title → 4라운드 → 5 Phase Boss → Clear",
        accent: "#7c3aed",
        icon: "mdi:target",
    },
];

/** 게임 외 영역에서 구조 설계와 검증을 연습한 프로젝트 */
export type SideProject = {
    name: string;
    category: string;
    stack: string;
    status: string;
    statusTone: "done" | "wip";
    summary: string;
    points: string[];
    tech: string[];
    githubUrl: string;
    accent: string;
    icon: string;
};

export const sideProjects: SideProject[] = [
    {
        name: "PlotterCanvas",
        category: "WPF 데스크톱 · XY 모션 제어 시뮬레이션",
        stack: "C# 12 · .NET 8 · WPF/MVVM · C++17",
        status: "223개 테스트 통과",
        statusTone: "done",
        summary:
            "캔버스에 그린 도형을 기계 명령으로 변환해 가상 플로터가 실행합니다. 실제 장비 없이도 전 과정을 시연할 수 있도록 가상 장치를 기준으로 만들었습니다.",
        points: [
            "WPF View → ViewModel → Application Service → Device 추상화 → Transport 단방향 의존 계층 설계",
            "ViewModel은 WPF 참조 없는 순수 .NET으로 작성해 표현 로직을 플랫폼과 분리",
            "하나의 Device 추상화로 Virtual · TCP · Serial 세 구현을 교체 가능하게 구성",
            "윤곽 평탄화 · 단순화 · 재정렬로 경로 포인트를 약 92% 감소",
            "Fault Injection으로 타임아웃 복구 · 연결 끊김 · 오류 시나리오를 의도적으로 재현",
            "핵심 프로젝트에 외부 NuGet 의존 없이 DI · 로깅 · MVVM을 직접 구현",
        ],
        tech: ["C# 12", ".NET 8", "WPF", "MVVM", "C++17 / P-Invoke", "xUnit", "TCP / Serial"],
        githubUrl: "https://github.com/blackvrice/PlotterCanvas",
        accent: "#0369a1",
        icon: "mdi:pencil-ruler",
    },
    {
        name: "StarCraft Map Editor",
        category: "Flutter 데스크톱 · 게임 맵 에디터",
        stack: "Flutter 3.44.8 · Dart · StormLib · euddraft",
        status: "개발 중 (M6.2)",
        statusTone: "wip",
        summary:
            "StarCraft: Remastered용 오픈소스 UMS 맵 에디터입니다. 지형·유닛·트리거·EUD 편집을 하나의 작업 흐름으로 묶는 것을 목표로 개발하고 있습니다.",
        points: [
            "CHK 시나리오 포맷을 순서와 원본 바이트를 보존하며 파싱 — 모르는 섹션도 손상 없이 되돌려 저장",
            "MPQ 어댑터 뒤에 StormLib 헬퍼를 서브프로세스로 두어 아카이브 처리 격리",
            "euddraft / eudplib 서브프로세스 어댑터로 EUD 빌드와 진단 메시지 연동",
            "자동 백업 · 충돌 감지 · 유효성 검사로 맵 손상 방지",
            "M0~M6.1 완료 — 안전한 맵 열기, 지형·오브젝트 렌더링과 편집, EUD 빌드 기반 검증",
            "남은 범위: EUD 프로젝트 설정 UI, 맵 설정 화면, 일반 트리거 편집",
        ],
        tech: ["Flutter", "Dart", "StormLib / MPQ", "CHK Format", "euddraft"],
        githubUrl: "https://github.com/blackvrice/starcraft_map_editor",
        accent: "#0f766e",
        icon: "mdi:map-legend",
    },
];
