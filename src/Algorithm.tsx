import {alpha, Box, Button, Chip, Divider, Stack, Typography} from "@mui/material";
import {Icon} from "@iconify/react";

const profiles = [
    {
        label: "Baekjoon",
        handle: "blackvrice",
        href: "https://solved.ac/profile/blackvrice",
        icon: "simple-icons:baekjoon",
        color: "#0076c0",
        points: ["문제 해결 루틴 유지", "자료구조와 그래프 중심 학습", "C++ 풀이 경험 축적"],
    },
    {
        label: "Programmers",
        handle: "blackvrice",
        href: "https://school.programmers.co.kr/",
        icon: "mdi:code-json",
        color: "#0f766e",
        points: ["실무형 코딩 테스트 유형 정리", "SQL 및 구현 문제 반복", "풀이 과정 기록"],
    },
];

export default function AlgorithmCardsExpandable() {
    return (
        <Stack spacing={2.5}>
            <Box>
                <Typography variant="overline" color="primary" fontWeight={900}>
                    Algorithm
                </Typography>
                <Typography variant="h4" fontWeight={950} sx={{mt: 0.5}}>
                    문제 해결력을 꾸준히 다지는 공간
                </Typography>
                <Typography color="text.secondary" sx={{mt: 1, maxWidth: 760}}>
                    코딩 테스트 대비뿐 아니라, 구현을 더 단단하게 만드는 사고 훈련으로 알고리즘 문제를 정리하고 있습니다.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {xs: "1fr", md: "repeat(2, minmax(0, 1fr))"},
                    gap: 2,
                }}
            >
                {profiles.map((profile) => (
                    <Box
                        key={profile.label}
                        sx={{
                            borderRadius: 2,
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.16),
                            backgroundColor: alpha("#fffaf3", 0.92),
                            p: {xs: 2.25, md: 3},
                        }}
                    >
                        <Stack spacing={2}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Box
                                    sx={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 1.5,
                                        display: "grid",
                                        placeItems: "center",
                                        backgroundColor: alpha(profile.color, 0.12),
                                        color: profile.color,
                                    }}
                                >
                                    <Icon icon={profile.icon} width={25} height={25} />
                                </Box>
                                <Box sx={{minWidth: 0}}>
                                    <Typography variant="h6" fontWeight={950}>
                                        {profile.label}
                                    </Typography>
                                    <Typography color="text.secondary">@{profile.handle}</Typography>
                                </Box>
                            </Stack>

                            <Divider />

                            <Stack spacing={1}>
                                {profile.points.map((point) => (
                                    <Stack key={point} direction="row" spacing={1} alignItems="center">
                                        <Icon icon="mdi:check" width={18} height={18} color={profile.color} />
                                        <Typography color="text.secondary">{point}</Typography>
                                    </Stack>
                                ))}
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                                <Chip
                                    label="Learning Log"
                                    size="small"
                                    sx={{
                                        borderRadius: 1.25,
                                        backgroundColor: alpha(profile.color, 0.1),
                                        color: profile.color,
                                    }}
                                />
                                <Button
                                    variant="text"
                                    endIcon={<Icon icon="mdi:open-in-new" width={18} />}
                                    onClick={() => window.open(profile.href, "_blank", "noopener,noreferrer")}
                                >
                                    방문하기
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
}
