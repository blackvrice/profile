import {alpha, Box, Button, Chip, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import {
    groupMeta,
    projects,
    youtubeThumbnail,
    youtubeUrl,
    type ProjectIssue,
    type ProjectItem,
    type ProjectStat,
} from "./ProjectData.ts";

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

function StatRow({stats, accent}: {stats?: ProjectStat[]; accent: string}) {
    if (!stats?.length) return null;

    return (
        <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={1.5}
            sx={{
                p: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha(accent, 0.2),
                backgroundColor: alpha(accent, 0.06),
            }}
        >
            {stats.map((stat) => (
                <Box key={stat.label} sx={{flex: 1, minWidth: 0}}>
                    <Typography fontWeight={950} fontSize={{xs: 16, md: 19}} color={accent} noWrap>
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

function FlowRow({flow, accent, label}: {flow?: string[]; accent: string; label: string}) {
    if (!flow?.length) return null;

    return (
        <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={900} color="text.secondary">
                {label}
            </Typography>
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
    items?: string[];
    accent: string;
}) {
    if (!items?.length) return null;

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

function StatusChip({item}: {item: ProjectItem}) {
    if (!item.status) return null;
    const isWip = item.statusTone === "wip";

    return (
        <Chip
            label={item.status}
            size="small"
            icon={<Icon icon={isWip ? "mdi:progress-wrench" : "mdi:check-decagram"} width={14} height={14} />}
            sx={{
                borderRadius: 1,
                fontWeight: 800,
                backgroundColor: alpha(isWip ? "#e76f51" : item.accent, 0.13),
                color: isWip ? "#a8432d" : item.accent,
                "& .MuiChip-icon": {color: "inherit", ml: 0.75},
            }}
        />
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
                            <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap" sx={{mt: 1}}>
                                <Typography variant="h5" fontWeight={950}>
                                    {item.name}
                                </Typography>
                                <StatusChip item={item} />
                            </Stack>
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
                        {item.liveUrl ? (
                            <Tooltip title="배포된 사이트 열기" arrow>
                                <Button
                                    variant="outlined"
                                    startIcon={<Icon icon="mdi:open-in-new" width={19} />}
                                    onClick={() =>
                                        window.open(item.liveUrl, "_blank", "noopener,noreferrer")
                                    }
                                >
                                    사이트
                                </Button>
                            </Tooltip>
                        ) : (
                            hasVideo && (
                                <Tooltip title="플레이 영상 보기 (YouTube)" arrow>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Icon icon="mdi:youtube" width={19} />}
                                        onClick={() =>
                                            item.videoId &&
                                            window.open(youtubeUrl(item.videoId), "_blank", "noopener,noreferrer")
                                        }
                                    >
                                        영상
                                    </Button>
                                </Tooltip>
                            )
                        )}
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
                        <StatRow stats={item.stats} accent={item.accent} />
                    </Stack>
                    <VideoThumb item={item} />
                </Box>

                <FlowRow
                    flow={item.flow}
                    accent={item.accent}
                    label={item.group === "game" ? "플레이 / 처리 흐름" : "처리 흐름"}
                />

                <Divider />

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: item.verification?.length ? "repeat(2, minmax(0, 1fr))" : "1fr",
                        },
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
        <Stack spacing={4}>
            {groupMeta.map((group) => {
                const items = projects.filter((project) => project.group === group.key);
                if (!items.length) return null;

                return (
                    <Stack key={group.key} spacing={2.5}>
                        <Stack direction="row" spacing={1.5} alignItems="flex-start">
                            <Box
                                sx={{
                                    width: 44,
                                    height: 44,
                                    flexShrink: 0,
                                    borderRadius: 1.5,
                                    display: "grid",
                                    placeItems: "center",
                                    backgroundColor: alpha("#0f766e", 0.12),
                                    color: "#0f766e",
                                }}
                            >
                                <Icon icon={group.icon} width={24} height={24} />
                            </Box>
                            <Box>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography variant="overline" color="primary" fontWeight={900}>
                                        {group.overline}
                                    </Typography>
                                    <Chip
                                        label={`${items.length}개`}
                                        size="small"
                                        sx={{
                                            height: 20,
                                            borderRadius: 1,
                                            fontWeight: 800,
                                            backgroundColor: alpha("#0f766e", 0.1),
                                            color: "#0b4f4a",
                                        }}
                                    />
                                </Stack>
                                <Typography variant="h5" fontWeight={950} sx={{mt: 0.25}}>
                                    {group.title}
                                </Typography>
                                <Typography color="text.secondary" sx={{mt: 0.75, maxWidth: 820}}>
                                    {group.description}
                                </Typography>
                            </Box>
                        </Stack>

                        <Stack spacing={2}>
                            {items.map((item) => (
                                <ProjectCard key={item.name} item={item} />
                            ))}
                        </Stack>
                    </Stack>
                );
            })}
        </Stack>
    );
}
