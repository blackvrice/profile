import {alpha, Box, Button, Chip, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import {projects, type ProjectItem} from "./ProjectData.ts";

function StatRow({item}: {item: ProjectItem}) {
    return (
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1.5}
            sx={{
                p: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha(item.accent, 0.2),
                backgroundColor: alpha(item.accent, 0.06),
            }}
        >
            {item.stats.map((stat) => (
                <Box key={stat.label} sx={{flex: 1, minWidth: 0}}>
                    <Typography fontWeight={950} fontSize={{xs: 17, md: 19}} color={item.accent} noWrap>
                        {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" fontWeight={700}>
                        {stat.label}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );
}

function FlowRow({flow, accent}: {flow: string[]; accent: string}) {
    return (
        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" alignItems="center">
            {flow.map((step, index) => (
                <Stack key={step} direction="row" spacing={0.75} alignItems="center">
                    <Chip
                        label={step}
                        size="small"
                        sx={{
                            borderRadius: 1.25,
                            fontWeight: 700,
                            backgroundColor: alpha("#ffffff", 0.85),
                            border: "1px solid",
                            borderColor: alpha(accent, 0.24),
                            color: "text.primary",
                        }}
                    />
                    {index < flow.length - 1 && (
                        <Icon icon="mdi:chevron-right" width={16} height={16} color={alpha(accent, 0.6)} />
                    )}
                </Stack>
            ))}
        </Stack>
    );
}

function ListBlock({
    title,
    icon,
    items,
    accent,
}: {
    title: string;
    icon: string;
    items: string[];
    accent: string;
}) {
    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={0.75} alignItems="center">
                <Icon icon={icon} width={18} height={18} color={accent} />
                <Typography variant="subtitle2" fontWeight={900} color="text.secondary">
                    {title}
                </Typography>
            </Stack>
            <Stack spacing={0.75}>
                {items.map((item) => (
                    <Stack key={item} direction="row" spacing={1} alignItems="flex-start">
                        <Box sx={{pt: "5px", flexShrink: 0}}>
                            <Box sx={{width: 6, height: 6, borderRadius: "50%", backgroundColor: accent}} />
                        </Box>
                        <Typography variant="body2" sx={{lineHeight: 1.75, color: "text.secondary"}}>
                            {item}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Stack>
    );
}

function ProjectCard({item}: {item: ProjectItem}) {
    const hasVideo = Boolean(item.videoUrl);

    return (
        <Box
            sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha(item.accent, 0.22),
                backgroundColor: alpha("#fffaf3", 0.93),
                p: {xs: 2.25, md: 3},
            }}
        >
            <Stack spacing={2.25}>
                <Stack
                    direction={{xs: "column", md: "row"}}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{xs: "flex-start", md: "flex-start"}}
                >
                    <Stack direction="row" spacing={1.75} sx={{minWidth: 0}}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                flexShrink: 0,
                                borderRadius: 1.5,
                                display: "grid",
                                placeItems: "center",
                                backgroundColor: alpha(item.accent, 0.12),
                                color: item.accent,
                            }}
                        >
                            <Icon icon={item.icon} width={26} height={26} />
                        </Box>
                        <Box sx={{minWidth: 0}}>
                            <Chip
                                label={item.category}
                                size="small"
                                sx={{
                                    borderRadius: 1.25,
                                    backgroundColor: alpha(item.accent, 0.12),
                                    color: item.accent,
                                    fontWeight: 700,
                                }}
                            />
                            <Typography variant="h5" fontWeight={950} sx={{mt: 1}}>
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight={800} sx={{mt: 0.25}}>
                                {item.stack}
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{flexShrink: 0}}>
                        <Button
                            variant="contained"
                            startIcon={<Icon icon="mdi:github" width={19} />}
                            onClick={() => window.open(item.githubUrl, "_blank", "noopener,noreferrer")}
                            sx={{backgroundColor: item.accent, "&:hover": {backgroundColor: alpha(item.accent, 0.86)}}}
                        >
                            Code
                        </Button>
                        <Tooltip title={hasVideo ? "플레이 영상 보기" : "플레이 영상 준비 중"} arrow>
                            <span>
                                <Button
                                    variant="outlined"
                                    disabled={!hasVideo}
                                    startIcon={<Icon icon="mdi:play-circle-outline" width={19} />}
                                    onClick={() =>
                                        item.videoUrl && window.open(item.videoUrl, "_blank", "noopener,noreferrer")
                                    }
                                >
                                    영상
                                </Button>
                            </span>
                        </Tooltip>
                    </Stack>
                </Stack>

                <Typography sx={{lineHeight: 1.8, color: "text.secondary"}}>{item.summary}</Typography>

                <StatRow item={item} />

                <Stack spacing={1}>
                    <Typography variant="subtitle2" fontWeight={900} color="text.secondary">
                        플레이 / 처리 흐름
                    </Typography>
                    <FlowRow flow={item.flow} accent={item.accent} />
                </Stack>

                <Divider />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {xs: "1fr", md: "repeat(2, minmax(0, 1fr))"},
                        gap: {xs: 2, md: 3},
                    }}
                >
                    <ListBlock
                        title="핵심 구현"
                        icon="mdi:hammer-wrench"
                        items={item.features}
                        accent={item.accent}
                    />
                    <ListBlock
                        title="검증 근거"
                        icon="mdi:check-decagram-outline"
                        items={item.verification}
                        accent={item.accent}
                    />
                </Box>

                <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
                    {item.tech.map((tech) => (
                        <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                                borderRadius: 1.25,
                                backgroundColor: alpha("#0f766e", 0.09),
                                color: "#0b4f4a",
                                fontWeight: 700,
                            }}
                        />
                    ))}
                </Stack>
            </Stack>
        </Box>
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
                    플레이 가능한 상태까지 완성한 게임 프로젝트
                </Typography>
                <Typography color="text.secondary" sx={{mt: 1, maxWidth: 820}}>
                    3개 프로젝트에서 게임 루프 · 엔진 · 검증 역량을 나눠 증명합니다. 각 카드의 수치는 직접 실행하고
                    기록한 결과이며, 확인하지 않은 범위는 완성된 기능으로 표기하지 않았습니다.
                </Typography>
            </Box>

            <Stack spacing={2}>
                {projects.map((item) => (
                    <ProjectCard key={item.name} item={item} />
                ))}
            </Stack>
        </Stack>
    );
}
