import {alpha, Box, Button, Chip, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import {
    projects,
    sideProjects,
    youtubeThumbnail,
    youtubeUrl,
    type ProjectIssue,
    type ProjectItem,
    type SideProject,
} from "./ProjectData.ts";

function SideProjectCard({item}: {item: SideProject}) {
    const isWip = item.statusTone === "wip";

    return (
        <Stack
            spacing={1.75}
            sx={{
                p: {xs: 2.25, md: 2.75},
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha(item.accent, 0.2),
                backgroundColor: alpha("#fffaf3", 0.92),
                height: "100%",
            }}
        >
            <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <Box
                    sx={{
                        width: 42,
                        height: 42,
                        flexShrink: 0,
                        borderRadius: 1.5,
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: alpha(item.accent, 0.12),
                        color: item.accent,
                    }}
                >
                    <Icon icon={item.icon} width={23} height={23} />
                </Box>
                <Box sx={{minWidth: 0, flex: 1}}>
                    <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap" alignItems="center">
                        <Typography variant="h6" fontWeight={950}>
                            {item.name}
                        </Typography>
                        <Chip
                            label={item.status}
                            size="small"
                            icon={
                                <Icon
                                    icon={isWip ? "mdi:progress-wrench" : "mdi:check-decagram"}
                                    width={14}
                                    height={14}
                                />
                            }
                            sx={{
                                borderRadius: 1,
                                fontWeight: 800,
                                backgroundColor: alpha(isWip ? "#e76f51" : item.accent, 0.12),
                                color: isWip ? "#a8432d" : item.accent,
                                "& .MuiChip-icon": {color: "inherit", ml: 0.75},
                            }}
                        />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" fontWeight={700}>
                        {item.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight={800}>
                        {item.stack}
                    </Typography>
                </Box>
            </Stack>

            <Typography variant="body2" sx={{lineHeight: 1.8, color: "text.secondary"}}>
                {item.summary}
            </Typography>

            <Divider />

            <ListBlock title="핵심 내용" icon="mdi:hammer-wrench" items={item.points} accent={item.accent} />

            <Box sx={{flex: 1}} />

            <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
                {item.tech.map((tech) => (
                    <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                            borderRadius: 1.25,
                            backgroundColor: alpha(item.accent, 0.08),
                            color: item.accent,
                            fontWeight: 700,
                        }}
                    />
                ))}
            </Stack>

            <Button
                variant="outlined"
                size="small"
                startIcon={<Icon icon="mdi:github" width={18} />}
                onClick={() => window.open(item.githubUrl, "_blank", "noopener,noreferrer")}
                sx={{alignSelf: "flex-start", color: item.accent, borderColor: alpha(item.accent, 0.4)}}
            >
                Code
            </Button>
        </Stack>
    );
}

function VideoThumb({item}: {item: ProjectItem}) {
    if (!item.videoId) return null;
    const href = youtubeUrl(item.videoId);

    return (
        <Stack spacing={0.75}>
            <Box
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} 플레이 영상 보기 (YouTube)`}
                sx={{
                    position: "relative",
                    display: "block",
                    borderRadius: 2,
                    overflow: "hidden",
                    aspectRatio: "16 / 9",
                    border: "1px solid",
                    borderColor: alpha(item.accent, 0.28),
                    backgroundColor: alpha(item.accent, 0.08),
                    boxShadow: `0 14px 34px ${alpha("#18211f", 0.16)}`,
                    "&:hover .thumb-img": {transform: "scale(1.04)"},
                    "&:hover .thumb-play": {transform: "translate(-50%, -50%) scale(1.08)"},
                    "&:focus-visible": {outline: `3px solid ${item.accent}`, outlineOffset: 2},
                }}
            >
                <Box
                    component="img"
                    className="thumb-img"
                    src={youtubeThumbnail(item.videoId)}
                    alt={`${item.name} 플레이 영상 썸네일`}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                        const img = event.currentTarget as HTMLImageElement;
                        const fallback = youtubeThumbnail(item.videoId as string, "hq");
                        if (!img.src.endsWith("hqdefault.jpg")) img.src = fallback;
                    }}
                    sx={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform .35s ease",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(180deg, ${alpha("#18211f", 0)} 45%, ${alpha(
                            "#18211f",
                            0.55,
                        )} 100%)`,
                    }}
                />
                <Box
                    className="thumb-play"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        transition: "transform .25s ease",
                        width: 62,
                        height: 44,
                        borderRadius: 1.5,
                        display: "grid",
                        placeItems: "center",
                        backgroundColor: alpha("#ff0000", 0.92),
                        color: "#ffffff",
                        boxShadow: `0 8px 20px ${alpha("#18211f", 0.35)}`,
                    }}
                >
                    <Icon icon="mdi:play" width={28} height={28} />
                </Box>
                <Chip
                    label="PLAY"
                    size="small"
                    sx={{
                        position: "absolute",
                        left: 10,
                        bottom: 10,
                        borderRadius: 1,
                        fontWeight: 900,
                        letterSpacing: 0.6,
                        backgroundColor: alpha("#ffffff", 0.92),
                        color: "#18211f",
                    }}
                />
            </Box>
            {item.videoCaption && (
                <Typography variant="caption" color="text.secondary" sx={{lineHeight: 1.6}}>
                    {item.videoCaption}
                </Typography>
            )}
        </Stack>
    );
}

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

function IssueBlock({issues, accent}: {issues?: ProjectIssue[]; accent: string}) {
    if (!issues?.length) return null;

    return (
        <Stack
            spacing={1.75}
            sx={{
                p: {xs: 2, md: 2.5},
                borderRadius: 2,
                border: "1px dashed",
                borderColor: alpha(accent, 0.34),
                backgroundColor: alpha(accent, 0.05),
            }}
        >
            <Stack direction="row" spacing={0.75} alignItems="center">
                <Icon icon="mdi:bug-check-outline" width={18} height={18} color={accent} />
                <Typography variant="subtitle2" fontWeight={900} color="text.secondary">
                    문제 해결 기록
                </Typography>
            </Stack>

            {issues.map((issue) => (
                <Box
                    key={issue.problem}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {xs: "1fr", md: "minmax(0, 1fr) 24px minmax(0, 1.25fr)"},
                        gap: {xs: 0.75, md: 1.5},
                        alignItems: "center",
                    }}
                >
                    <Stack spacing={0.5}>
                        <Typography variant="caption" fontWeight={900} color="#a8432d">
                            문제
                        </Typography>
                        <Typography variant="body2" sx={{lineHeight: 1.7}}>
                            {issue.problem}
                        </Typography>
                    </Stack>

                    <Box
                        sx={{
                            display: "grid",
                            placeItems: "center",
                            color: alpha(accent, 0.7),
                            transform: {xs: "rotate(90deg)", md: "none"},
                            justifySelf: {xs: "start", md: "center"},
                        }}
                    >
                        <Icon icon="mdi:arrow-right-thin" width={24} height={24} />
                    </Box>

                    <Stack spacing={0.5}>
                        <Typography variant="caption" fontWeight={900} color={accent}>
                            해결
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.7}}>
                            {issue.solution}
                        </Typography>
                    </Stack>
                </Box>
            ))}
        </Stack>
    );
}

function ProjectCard({item}: {item: ProjectItem}) {
    const hasVideo = Boolean(item.videoId);

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
                        <Tooltip title={hasVideo ? "플레이 영상 보기 (YouTube)" : "플레이 영상 준비 중"} arrow>
                            <span>
                                <Button
                                    variant="outlined"
                                    disabled={!hasVideo}
                                    startIcon={<Icon icon="mdi:youtube" width={19} />}
                                    onClick={() =>
                                        item.videoId &&
                                        window.open(youtubeUrl(item.videoId), "_blank", "noopener,noreferrer")
                                    }
                                >
                                    영상
                                </Button>
                            </span>
                        </Tooltip>
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {xs: "1fr", md: hasVideo ? "1fr minmax(300px, 390px)" : "1fr"},
                        gap: {xs: 2, md: 3},
                        alignItems: "start",
                    }}
                >
                    <Stack spacing={2}>
                        <Typography sx={{lineHeight: 1.8, color: "text.secondary"}}>{item.summary}</Typography>
                        <StatRow item={item} />
                    </Stack>
                    <VideoThumb item={item} />
                </Box>

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

                <IssueBlock issues={item.issues} accent={item.accent} />

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
                    3개 프로젝트에서 게임 루프 · 엔진 · 검증 역량을 나눠 증명합니다. 썸네일을 누르면 실제 플레이
                    영상이 열리고, 카드의 수치와 문제 해결 기록은 직접 실행하며 남긴 결과입니다. 확인하지 않은 범위는
                    완성된 기능으로 표기하지 않았습니다.
                </Typography>
            </Box>

            <Stack spacing={2}>
                {projects.map((item) => (
                    <ProjectCard key={item.name} item={item} />
                ))}
            </Stack>

            <Box sx={{pt: 1.5}}>
                <Typography variant="overline" color="primary" fontWeight={900}>
                    Other Projects
                </Typography>
                <Typography variant="h5" fontWeight={950} sx={{mt: 0.5}}>
                    게임 밖에서 구조와 검증을 연습한 프로젝트
                </Typography>
                <Typography color="text.secondary" sx={{mt: 1, maxWidth: 820}}>
                    장비 제어와 게임 툴 영역에서도 같은 방식으로 작업했습니다. 계층을 나누고, 교체 가능한 경계를
                    만들고, 테스트로 확인합니다.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {xs: "1fr", lg: "repeat(2, minmax(0, 1fr))"},
                    gap: 2,
                }}
            >
                {sideProjects.map((item) => (
                    <SideProjectCard key={item.name} item={item} />
                ))}
            </Box>
        </Stack>
    );
}
