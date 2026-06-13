import {alpha, Box, Button, Chip, Divider, Stack, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import type {ReactNode} from "react";

type SectionProps = {
    name: string;
    category: string;
    summary: string;
    youtubeUrl?: string;
    githubUrl?: string;
    children?: ReactNode;
};

function Section({name, category, summary, youtubeUrl, githubUrl, children}: SectionProps) {
    return (
        <Box
            sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#0f766e", 0.16),
                backgroundColor: alpha("#fffaf3", 0.92),
                p: {xs: 2.25, md: 3},
            }}
        >
            <Stack spacing={2}>
                <Stack
                    direction={{xs: "column", md: "row"}}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{xs: "flex-start", md: "center"}}
                >
                    <Box>
                        <Chip
                            label={category}
                            size="small"
                            sx={{
                                borderRadius: 1.25,
                                backgroundColor: alpha("#e76f51", 0.12),
                                color: "#a8432d",
                            }}
                        />
                        <Typography variant="h5" fontWeight={950} sx={{mt: 1}}>
                            {name}
                        </Typography>
                        <Typography color="text.secondary" sx={{mt: 0.75, maxWidth: 720}}>
                            {summary}
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {youtubeUrl && (
                            <Button
                                variant="outlined"
                                startIcon={<Icon icon="mdi:youtube" width={19} />}
                                onClick={() => window.open(youtubeUrl, "_blank", "noopener,noreferrer")}
                            >
                                Demo
                            </Button>
                        )}
                        {githubUrl && (
                            <Button
                                variant="contained"
                                startIcon={<Icon icon="mdi:github" width={19} />}
                                onClick={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}
                            >
                                GitHub
                            </Button>
                        )}
                    </Stack>
                </Stack>

                <Divider />
                {children}
            </Stack>
        </Box>
    );
}

function TagGroup({title, tags}: {title: string; tags: string[]}) {
    return (
        <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary" fontWeight={900}>
                {title}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {tags.map((tag) => (
                    <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                            borderRadius: 1.25,
                            backgroundColor: alpha("#0f766e", 0.09),
                            color: "#0b4f4a",
                        }}
                    />
                ))}
            </Stack>
        </Stack>
    );
}

export default function Project() {
    return (
        <Stack spacing={2.5}>
            <Box>
                <Typography variant="overline" color="primary" fontWeight={900}>
                    Project
                </Typography>
                <Typography variant="h4" fontWeight={950} sx={{mt: 0.5}}>
                    직접 설계하고 구현한 작업들
                </Typography>
                <Typography color="text.secondary" sx={{mt: 1, maxWidth: 760}}>
                    게임 구조, 데이터 중심 설계, 데스크톱/웹 제품화를 중심으로 프로젝트를 쌓고 있습니다.
                </Typography>
            </Box>

            <Section
                name="RTS Game Engine"
                category="C++ Game Project"
                youtubeUrl="https://www.youtube.com/"
                githubUrl="https://github.com/blackvrice/rts"
                summary="자체 제작 엔진 기반의 RTS 게임 프로젝트입니다. ECS 구조와 Manager 패턴을 활용해 명령, 선택, 렌더링, 게임 로직을 분리하는 방향으로 설계했습니다."
            >
                <Stack spacing={2}>
                    <TagGroup title="주요 기술" tags={["C++", "SFML", "Custom Engine", "RTS Game"]} />
                    <TagGroup
                        title="적용 패턴"
                        tags={["Command", "Observer", "Factory", "Dependency Injection", "Manager", "Scene", "State", "ECS"]}
                    />
                </Stack>
            </Section>

            <Section
                name="RPG Project"
                category="Unity Game Project"
                githubUrl=""
                summary="Unity 기반으로 개발 중인 RPG 프로젝트입니다. ScriptableObject와 데이터 중심 설계를 활용해 캐릭터 성장, 스킬, 아이템 시스템을 확장 가능한 구조로 구성하고 있습니다."
            >
                <TagGroup
                    title="주요 기술"
                    tags={["Unity", "C#", "ScriptableObject", "Data-Driven", "Game Logic", "In Progress"]}
                />
            </Section>

            <Section
                name="Desktop Data Tool"
                category="Product Engineering"
                summary="WPF, WebSocket, MySQL을 활용한 실시간 데이터 분석 및 시각화 도구 개발 경험을 바탕으로 한 제품형 클라이언트 작업입니다."
            >
                <TagGroup title="관심 영역" tags={["WPF", "MVVM", "WebSocket", "LiveChartsCore", "MySQL", "Automation"]} />
            </Section>
        </Stack>
    );
}
