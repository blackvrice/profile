import {alpha, Box, Button, Chip, Divider, Stack, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import type {ReactNode} from "react";

type SectionProps = {
    name: string;
    category: string;
    summary: string;
    githubUrl: string;
    children?: ReactNode;
};

function Section({name, category, summary, githubUrl, children}: SectionProps) {
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

                    <Button
                        variant="contained"
                        startIcon={<Icon icon="mdi:github" width={19} />}
                        onClick={() => window.open(githubUrl, "_blank", "noopener,noreferrer")}
                    >
                        GitHub
                    </Button>
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
                    대표 프로젝트
                </Typography>
                <Typography color="text.secondary" sx={{mt: 1, maxWidth: 760}}>
                    게임 구조 설계와 플레이 가능한 콘텐츠 구현을 중심으로 쌓아가고 있는 프로젝트입니다.
                </Typography>
            </Box>

            <Section
                name="GameEngine 프로젝트"
                category="C++ Game Engine"
                githubUrl="https://github.com/blackvrice/GameEngine"
                summary="C++ 기반으로 게임 루프, 렌더링, 입력, 씬 전환, 객체 관리 구조를 직접 구성하며 엔진 구조를 학습하고 확장하는 프로젝트입니다."
            >
                <Stack spacing={2}>
                    <TagGroup title="주요 기술" tags={["C++", "SFML", "Custom Engine", "Game Loop", "Rendering"]} />
                    <TagGroup title="핵심 관심사" tags={["Scene", "Entity", "Input", "Resource", "Architecture"]} />
                </Stack>
            </Section>

            <Section
                name="Tycoon 프로젝트"
                category="Unity Tycoon Game"
                githubUrl="https://github.com/blackvrice/Tycoon"
                summary="Unity 기반의 타이쿤/농장형 게임 프로젝트입니다. 플레이어 이동, 씬 이동, 농장 상호작용, 작물 데이터와 UI 흐름을 실제 게임 플레이에 맞춰 구현하고 있습니다."
            >
                <Stack spacing={2}>
                    <TagGroup title="주요 기술" tags={["Unity", "C#", "ScriptableObject", "Tilemap", "UI Toolkit"]} />
                    <TagGroup title="구현 영역" tags={["Player", "Farm", "Crop", "Scene Flow", "Inventory"]} />
                </Stack>
            </Section>
        </Stack>
    );
}
