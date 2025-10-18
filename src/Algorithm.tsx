// AlgorithmCardsExpandable.tsx
import { useEffect, useState, useCallback } from "react";
import {
    Box,
    Stack,
    Typography,
    Chip,
    Card,
    CardContent,
    Avatar,
    Divider,
    Skeleton,
    Collapse,
    CardActionArea,
} from "@mui/material";

/** ---------- 공통 표시용 타입 ---------- */
type AlgoProfile = {
    provider: "baekjoon" | "programmers";
    handle: string;
    avatar?: string;
    tierText?: string;     // Baekjoon: 티어명, Programmers: Level n
    rating?: number;       // Baekjoon: rating, Programmers: score
    solvedCount?: number;
    rank?: number;
};

/** ---------- Baekjoon(solved.ac) ---------- */
type SolvedUser = {
    handle: string;
    tier: number;           // 0~30
    rating: number;
    solvedCount: number;
    rank?: number;
    profileImageUrl?: string;
};

const BAKEJOON_TIER_NAMES = [
    "Unrated",
    "Bronze V","Bronze IV","Bronze III","Bronze II","Bronze I",
    "Silver V","Silver IV","Silver III","Silver II","Silver I",
    "Gold V","Gold IV","Gold III","Gold II","Gold I",
    "Platinum V","Platinum IV","Platinum III","Platinum II","Platinum I",
    "Diamond V","Diamond IV","Diamond III","Diamond II","Diamond I",
    "Ruby V","Ruby IV","Ruby III","Ruby II","Ruby I",
];

async function fetchBaekjoon(handle: string): Promise<AlgoProfile> {
    const res = await fetch(`/solved/api/v3/user/show?handle=${encodeURIComponent(handle)}`);
    if (!res.ok) throw new Error(`solved.ac error: ${res.status}`);
    const u: SolvedUser = await res.json();
    return {
        provider: "baekjoon",
        handle: u.handle,
        avatar: u.profileImageUrl,
        tierText: BAKEJOON_TIER_NAMES[u.tier] ?? `Tier ${u.tier}`,
        rating: u.rating,
        solvedCount: u.solvedCount,
        rank: u.rank,
    };
}

/** ---------- Programmers (프록시 필요) ---------- */
type ProgrammersUser = {
    handle: string;
    level?: number;
    score?: number;
    solvedCount?: number;
    rank?: number;
    avatarUrl?: string;
};

async function fetchProgrammers(handle: string): Promise<AlgoProfile> {
    const res = await fetch(`/programmers/api/user?handle=${encodeURIComponent(handle)}`);
    if (!res.ok) throw new Error(`programmers error: ${res.status}`);
    const u: ProgrammersUser = await res.json();
    return {
        provider: "programmers",
        handle: u.handle,
        avatar: u.avatarUrl,
        tierText: u.level != null ? `Level ${u.level}` : undefined,
        rating: u.score,
        solvedCount: u.solvedCount,
        rank: u.rank,
    };
}

/** ---------- 공통 UI 조각 ---------- */
function ProfileBody({ p }: { p: AlgoProfile }) {
    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                {p.tierText && <Chip size="small" label={p.tierText} />}
                {p.rating != null && (
                    <Typography variant="body2">
                        {p.provider === "baekjoon" ? "rating" : "score"}: {p.rating}
                    </Typography>
                )}
                {p.solvedCount != null && (
                    <Typography variant="body2">solved: {p.solvedCount}</Typography>
                )}
                {p.rank != null && <Typography variant="body2">rank: #{p.rank}</Typography>}
            </Stack>
        </Stack>
    );
}

function LoadingBody() {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton variant="circular" width={36} height={36} />
            <Stack spacing={1} sx={{ flex: 1 }}>
                <Skeleton variant="text" width={160} />
                <Skeleton variant="rectangular" width="100%" height={20} />
            </Stack>
        </Stack>
    );
}

function ErrorBody({ message }: { message: string }) {
    return <Typography color="error">에러: {message}</Typography>;
}

/** ---------- 확장 가능한 카드 ---------- */
function ExpandableAlgoCard({
                                label,
                                subtitle,
                                avatarFallback,
                                onLoad,
                            }: {
    label: "Baekjoon" | "Programmers";
    subtitle: string;          // 핸들이나 간단 설명
    avatarFallback: string;    // 아바타 없을 때 한 글자
    onLoad: () => Promise<AlgoProfile>;
}) {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<AlgoProfile | null>(null);
    const [err, setErr] = useState<string | null>(null);

    const toggle = useCallback(() => setExpanded((v) => !v), []);
    // 펼칠 때 처음 한 번만 로드
    useEffect(() => {
        let cancel = false;
        (async () => {
            if (!expanded || profile || loading) return;
            setLoading(true);
            setErr(null);
            try {
                const p = await onLoad();
                if (!cancel) setProfile(p);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (e : unknown) {
                if (!cancel) {
                    setErr("알 수 없는 오류");
                }
            } finally {
                if (!cancel) setLoading(false);
            }
        })();
        return () => { cancel = true; };
    }, [expanded, onLoad, profile, loading]);

    return (
        <Card variant="outlined" sx={{ overflow: "hidden" }}>
            <CardActionArea onClick={toggle} aria-expanded={expanded} sx={{ p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ width: 40, height: 40 }}>
                        {avatarFallback.toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                            {label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {subtitle}
                        </Typography>
                    </Box>
                </Stack>
            </CardActionArea>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Divider />
                <CardContent>
                    {loading && <LoadingBody />}
                    {!loading && err && <ErrorBody message={err} />}
                    {!loading && !err && profile && (
                        <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Avatar src={profile.avatar} alt={profile.handle} sx={{ width: 48, height: 48 }}>
                                {profile.handle?.[0]?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">
                                    @{profile.handle}{" "}
                                    <Chip
                                        size="small"
                                        label={profile.provider === "baekjoon" ? "Baekjoon" : "Programmers"}
                                        sx={{ ml: 0.5 }}
                                    />
                                </Typography>
                                <Box mt={1}>
                                    <ProfileBody p={profile} />
                                </Box>
                            </Box>
                        </Stack>
                    )}
                </CardContent>
            </Collapse>
        </Card>
    );
}

/** ---------- 메인: 카드 클릭-펼침 레이아웃 ---------- */
export default function AlgorithmCardsExpandable({
                                                     baekjoonHandle = "blackvrice",
                                                     programmersHandle = "blackvrice",
                                                 }: {
    baekjoonHandle?: string;
    programmersHandle?: string;
}) {
    return (
        <Box p={2}>
            <Stack spacing={2}>
                <ExpandableAlgoCard
                    label="Baekjoon"
                    subtitle={`@${baekjoonHandle}`}
                    avatarFallback="B"
                    onLoad={() => fetchBaekjoon(baekjoonHandle)}
                />

                <ExpandableAlgoCard
                    label="Programmers"
                    subtitle={`@${programmersHandle}`}
                    avatarFallback="P"
                    onLoad={() => fetchProgrammers(programmersHandle)}
                />
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
                카드를 클릭하면 상세 정보가 펼쳐지고, 그 시점에만 데이터를 가져옵니다.
            </Typography>
        </Box>
    );
}
