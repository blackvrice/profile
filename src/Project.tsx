import {Box, Card, CardHeader, CardContent, Stack, Tooltip, IconButton, Typography, Divider, Chip} from '@mui/material'
import {Icon} from "@iconify/react";
import type {ReactNode} from "react";

type SectionProps = {
    name: string;
    image?: string;
    youtubeUrl?: string;
    githubUrl?: string;
    children?: ReactNode;
};

export function Section({
                            name,
                            image,
                            youtubeUrl,
                            githubUrl,
                            children,
                        }: SectionProps) {
    return (
        <Card sx={{ borderRadius: 2 }}>
            <CardHeader title={`Project : ${name}`} />

            <CardContent>
                <Stack spacing={2}>
                    {/* Project Image */}
                    {image && (
                        <Box
                            component="img"
                            src={image}
                            alt={name}
                            sx={{
                                width: "100%",
                                maxHeight: 180,
                                objectFit: "cover",
                                borderRadius: 2,
                            }}
                        />
                    )}
                    {children}
                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1}>
                        {youtubeUrl && (
                            <Tooltip title="YouTube" arrow>
                                <IconButton
                                    size="small"
                                    onClick={() => window.open(youtubeUrl, "_blank")}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <Icon icon="logos:youtube-icon" width={20} height={20} />
                                </IconButton>
                            </Tooltip>
                        )}

                        {githubUrl && (
                            <Tooltip title="GitHub" arrow>
                                <IconButton
                                    size="small"
                                    onClick={() => window.open(githubUrl, "_blank")}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <Icon icon="logos:github-icon" width={20} height={20} />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function Project() {
    return (
        <Box
        >
            <Stack spacing={4}>
                {/* RTS */}
                <Section
                    name="RTS"
                    youtubeUrl="https://www.youtube.com/"
                    githubUrl="https://github.com/blackvrice/rts"
                >
                    <Stack spacing={2}>
                        <Typography variant="body1">
                            자체 제작 엔진 기반의 RTS 게임으로,
                            ECS 구조와 Manager 패턴을 활용한 아키텍처 설계를 목표로 개발.
                        </Typography>

                        <Divider />

                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color="text.secondary">
                                사용 기술
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                <Chip label="C++" />
                                <Chip label="SFML" />
                                <Chip label="Custom Engine" />
                                <Chip label="RTS Game" />
                            </Stack>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="subtitle2" color="text.secondary">
                                적용 디자인 패턴
                            </Typography>

                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                <Chip label="Command" />
                                <Chip label="Observer" />
                                <Chip label="Factory" />
                                <Chip label="Dependency Injection" />
                                <Chip label="Manager" />
                                <Chip label="Scene" />
                                <Chip label="State" />
                                <Chip label="ECS 아키텍처" />
                            </Stack>
                        </Stack>
                    </Stack>
                </Section>


                {/* RPG */}
                <Section
                    name="RPG"
                    youtubeUrl="https://www.youtube.com/"
                    githubUrl=""
                >
                    <Stack spacing={2}>
                        <Typography variant="body1" color="text.secondary">
                            Unity 엔진 기반으로 개발 중인 RPG 프로젝트.
                            ScriptableObject와 데이터 중심 설계를 통해
                            캐릭터 성장, 스킬, 아이템 시스템을 구조화하여 구현 중.
                        </Typography>

                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label="Unity" />
                            <Chip label="C#" />
                            <Chip label="ScriptableObject" />
                            <Chip label="Data-Driven" />
                            <Chip label="Game Logic" />
                            <Chip label="In Progress" color="warning" />
                        </Stack>
                    </Stack>
                </Section>

            </Stack>
        </Box>
    );
}