import {alpha, Box, Chip, Divider, Stack, Typography} from "@mui/material";
import {Icon} from "@iconify/react";

type FitRow = {
    requirement: string;
    ability: string;
    evidence: string;
};

const fitRows: FitRow[] = [
    {
        requirement: "C++ / C# 개발 역량",
        ability: "C++23, C# 12",
        evidence: "RTS · ArenaShooter · Tycoon · 앤서레이 장비 제어",
    },
    {
        requirement: "자료구조 · 알고리즘 이해",
        ability: "A*, Command Queue, State Machine",
        evidence: "RTS 경로 탐색 · 명령 큐 · 상태 전이",
    },
    {
        requirement: "읽기 쉽고 유지보수 가능한 코드",
        ability: "로직 / 렌더링 분리, 계층별 책임 분리",
        evidence: "3개 개인 프로젝트 · 5계층 장비 제어 구조",
    },
    {
        requirement: "Unity / Unreal 프로젝트 경험",
        ability: "Unity 6, Unreal Engine 5.6",
        evidence: "Tycoon · ArenaShooter",
    },
    {
        requirement: "Git 버전 관리",
        ability: "Git 기반 협업 · 형상 관리",
        evidence: "3개 GitHub 저장소 · 실무 3개사",
    },
    {
        requirement: "관계형 데이터베이스 경험",
        ability: "Oracle, PostgreSQL, MySQL",
        evidence: "위시정보기술 · 노리시스템",
    },
    {
        requirement: "네트워크 · 소켓 프로그래밍 이해",
        ability: "TCP/IP, Serial, RS-485, USB",
        evidence: "앤서레이 장비 통신 제어",
    },
    {
        requirement: "프로젝트 기획 · 완성 경험",
        ability: "핵심 플레이 루프 완성",
        evidence: "README · 플레이 영상 · 자동 검증",
    },
];

const principles = [
    {
        step: "01",
        title: "STATE",
        subtitle: "무엇이 바뀌는가",
        body: "상태와 전이를 먼저 정의하고, 누가 그 전이를 일으키는지 명확히 합니다.",
        icon: "mdi:state-machine",
    },
    {
        step: "02",
        title: "BOUNDARY",
        subtitle: "책임을 어디서 끊는가",
        body: "C++와 Blueprint, 로직과 UI, 장치와 시퀀스의 책임을 분리해 변경 영향 범위를 좁힙니다.",
        icon: "mdi:vector-square",
    },
    {
        step: "03",
        title: "VERIFY",
        subtitle: "어떻게 재현하는가",
        body: "자동화 테스트, Replay, WorldHash로 문제를 재현 가능한 형태로 만듭니다.",
        icon: "mdi:test-tube",
    },
    {
        step: "04",
        title: "EVIDENCE",
        subtitle: "무엇으로 증명하는가",
        body: "Git 기록, 로그, README로 판단 근거를 남기고 구현 완료와 예정 범위를 구분합니다.",
        icon: "mdi:file-document-check-outline",
    },
];

const attitudes = [
    "요구사항을 기능과 상태로 구체화하고, 읽기 쉬운 이름과 명확한 책임을 우선합니다.",
    "구현 결과뿐 아니라 판단 근거를 문서로 공유하고, 기획·아트 등 다른 직군이 사용할 인터페이스를 고려합니다.",
    "확인하지 않은 부분을 완성된 기능처럼 과장하지 않습니다.",
];

function FitTable() {
    return (
        <Box
            sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#0f766e", 0.16),
                backgroundColor: alpha("#fffaf3", 0.92),
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    display: {xs: "none", md: "grid"},
                    gridTemplateColumns: "1fr 1fr 1.2fr",
                    gap: 2,
                    px: 3,
                    py: 1.5,
                    backgroundColor: alpha("#0f766e", 0.1),
                }}
            >
                {["요구 역량", "보유 역량", "근거"].map((head) => (
                    <Typography key={head} variant="caption" fontWeight={900} color="#0b4f4a">
                        {head}
                    </Typography>
                ))}
            </Box>

            <Stack divider={<Divider />}>
                {fitRows.map((row) => (
                    <Box
                        key={row.requirement}
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {xs: "1fr", md: "1fr 1fr 1.2fr"},
                            gap: {xs: 0.75, md: 2},
                            px: {xs: 2.25, md: 3},
                            py: {xs: 1.75, md: 1.75},
                            alignItems: "center",
                        }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Icon icon="mdi:check-circle" width={18} height={18} color="#0f766e" />
                            <Typography fontWeight={800}>{row.requirement}</Typography>
                        </Stack>
                        <Typography color="text.secondary" sx={{pl: {xs: 3.5, md: 0}}}>
                            {row.ability}
                        </Typography>
                        <Box sx={{pl: {xs: 3.5, md: 0}}}>
                            <Chip
                                label={row.evidence}
                                size="small"
                                sx={{
                                    borderRadius: 1.25,
                                    height: "auto",
                                    py: 0.5,
                                    backgroundColor: alpha("#e76f51", 0.1),
                                    color: "#a8432d",
                                    fontWeight: 700,
                                    "& .MuiChip-label": {whiteSpace: "normal"},
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
}

export default function Strength() {
    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="overline" color="primary" fontWeight={900}>
                    Strength
                </Typography>
                <Typography variant="h4" fontWeight={950} sx={{mt: 0.5}}>
                    요구 역량과 근거를 한 화면에서
                </Typography>
                <Typography color="text.secondary" sx={{mt: 1, maxWidth: 820}}>
                    게임 클라이언트 직무에서 요구되는 역량을 실제 코드와 실행 결과로 연결했습니다.
                </Typography>
            </Box>

            <FitTable />

            <Box>
                <Typography variant="h5" fontWeight={950}>
                    상태 → 경계 → 검증 → 증거
                </Typography>
                <Typography color="text.secondary" sx={{mt: 0.75, maxWidth: 820}}>
                    개인 프로젝트와 실무에서 반복해 적용한 개발 순서입니다.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))"},
                    gap: 2,
                }}
            >
                {principles.map((principle) => (
                    <Stack
                        key={principle.title}
                        spacing={1.25}
                        sx={{
                            p: {xs: 2.25, md: 2.75},
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.16),
                            backgroundColor: alpha("#fffaf3", 0.92),
                        }}
                    >
                        <Stack direction="row" spacing={1.25} alignItems="center">
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 1.5,
                                    display: "grid",
                                    placeItems: "center",
                                    backgroundColor: alpha("#0f766e", 0.12),
                                    color: "#0f766e",
                                }}
                            >
                                <Icon icon={principle.icon} width={22} height={22} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight={900} color="text.secondary">
                                    {principle.step}
                                </Typography>
                                <Typography fontWeight={950} lineHeight={1.2}>
                                    {principle.title}
                                </Typography>
                            </Box>
                        </Stack>
                        <Typography variant="subtitle2" fontWeight={800} color="#0b4f4a">
                            {principle.subtitle}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.75}}>
                            {principle.body}
                        </Typography>
                    </Stack>
                ))}
            </Box>

            <Box
                sx={{
                    p: {xs: 2.5, md: 3},
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: alpha("#e76f51", 0.22),
                    backgroundColor: alpha("#e76f51", 0.06),
                }}
            >
                <Stack spacing={1.5}>
                    <Typography variant="overline" fontWeight={900} color="#a8432d">
                        협업 태도
                    </Typography>
                    {attitudes.map((attitude) => (
                        <Stack key={attitude} direction="row" spacing={1.25} alignItems="flex-start">
                            <Box sx={{pt: "3px", flexShrink: 0}}>
                                <Icon icon="mdi:account-group-outline" width={19} height={19} color="#a8432d" />
                            </Box>
                            <Typography sx={{lineHeight: 1.75, color: "text.secondary"}}>{attitude}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Stack>
    );
}
