import {useState} from "react";
import {
    alpha,
    Box,
    Button,
    Chip,
    IconButton,
    Snackbar,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import {Icon} from "@iconify/react";
import {Helmet} from "react-helmet-async";
import dayjs from "dayjs";
import image from "./assets/image.jpg";

type Skill = {
    name: string;
    icon: string;
    color?: string;
};

type SkillGroup = {
    title: string;
    accent: string;
    items: Skill[];
};

const skillGroups: SkillGroup[] = [
    {
        title: "게임 클라이언트",
        accent: "#0f766e",
        items: [
            {name: "C++23", icon: "logos:c-plusplus", color: "#00599c"},
            {name: "C#", icon: "devicon:csharp", color: "#68217A"},
            {name: "Unreal Engine 5", icon: "simple-icons:unrealengine", color: "#313131"},
            {name: "Unity 6", icon: "simple-icons:unity", color: "#222c37"},
            {name: "SFML / OpenGL", icon: "mdi:cube-outline", color: "#0f766e"},
            {name: "CMake", icon: "simple-icons:cmake", color: "#064f8c"},
        ],
    },
    {
        title: "실무 개발",
        accent: "#e76f51",
        items: [
            {name: "WPF / .NET 8", icon: "logos:dotnet", color: "#512bd4"},
            {name: "Java / Spring", icon: "devicon:spring", color: "#6DB33F"},
            {name: "TypeScript", icon: "devicon:typescript", color: "#3178C6"},
            {name: "React", icon: "devicon:react", color: "#087ea4"},
            {name: "Oracle / PostgreSQL", icon: "logos:postgresql", color: "#336791"},
            {name: "Git", icon: "logos:git-icon"},
        ],
    },
];

const links = [
    {name: "GitHub", href: "https://github.com/blackvrice", icon: "mdi:github"},
    {name: "Blog", href: "https://blackvrice.tistory.com", icon: "simple-icons:tistory"},
    {name: "Velog", href: "https://velog.io/@blackvrice/posts", icon: "simple-icons:velog"},
    {name: "Email", href: "mailto:blackvrice@naver.com", icon: "mdi:email-outline"},
];

function SkillsRow() {
    return (
        <Stack spacing={1.25}>
            {skillGroups.map((group) => (
                <Stack
                    key={group.title}
                    direction={{xs: "column", sm: "row"}}
                    spacing={{xs: 0.75, sm: 1.25}}
                    alignItems={{xs: "flex-start", sm: "center"}}
                >
                    <Typography
                        variant="caption"
                        fontWeight={900}
                        sx={{
                            color: group.accent,
                            minWidth: 92,
                            flexShrink: 0,
                            letterSpacing: 0.2,
                        }}
                    >
                        {group.title}
                    </Typography>
                    <Box
                        role="list"
                        aria-label={`${group.title} 기술 스택`}
                        sx={{display: "flex", flexWrap: "wrap", gap: 0.75}}
                    >
                        {group.items.map((skill) => (
                            <Tooltip title={skill.name} key={skill.name} arrow>
                                <Chip
                                    role="listitem"
                                    icon={
                                        <Icon icon={skill.icon} color={skill.color} width={17} height={17} />
                                    }
                                    label={skill.name}
                                    sx={{
                                        height: 33,
                                        borderRadius: 1.5,
                                        backgroundColor: alpha("#ffffff", 0.78),
                                        border: "1px solid",
                                        borderColor: alpha(group.accent, 0.18),
                                        color: "text.primary",
                                        fontWeight: 700,
                                        "& .MuiChip-icon": {ml: 1},
                                    }}
                                />
                            </Tooltip>
                        ))}
                    </Box>
                </Stack>
            ))}
        </Stack>
    );
}

function SocialLinks() {
    return (
        <Stack direction="row" spacing={0.75} role="list" aria-label="소셜 링크">
            {links.map((link) => (
                <Tooltip key={link.name} title={link.name} arrow>
                    <IconButton
                        role="listitem"
                        aria-label={link.name}
                        onClick={() => window.open(link.href, "_blank", "noopener,noreferrer")}
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1.5,
                            color: "text.primary",
                            backgroundColor: alpha("#ffffff", 0.72),
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.16),
                            "&:hover": {
                                backgroundColor: alpha("#0f766e", 0.1),
                            },
                        }}
                    >
                        <Icon icon={link.icon} width={21} height={21} />
                    </IconButton>
                </Tooltip>
            ))}
        </Stack>
    );
}

function CopyChip({label, value, icon}: {label: string; value: string; icon: string}) {
    const [open, setOpen] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Chip
                icon={<Icon icon={icon} width={16} />}
                label={label}
                onClick={copy}
                sx={{
                    cursor: "pointer",
                    borderRadius: 1.5,
                    backgroundColor: alpha("#0f766e", 0.1),
                    color: "#0b4f4a",
                    "& .MuiChip-icon": {color: "#0f766e"},
                }}
            />
            <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose={() => setOpen(false)}
                message="복사되었습니다"
            />
        </>
    );
}

export default function Hero() {
    const birth = dayjs("1997-02-23");
    const today = dayjs();
    const years = today.diff(birth, "year");
    const age = years - (today.isBefore(birth.add(years, "year")) ? 1 : 0);

    const downloadVCard = () => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
N:Oh;Seongsik;;;
FN:오성식
TITLE:Game Client Programmer
TEL;TYPE=CELL:010-6226-9366
EMAIL;TYPE=INTERNET:blackvrice@naver.com
ADR;TYPE=HOME:;;Seoul;;;Republic of Korea
URL:https://github.com/blackvrice
END:VCARD`;
        const blob = new Blob([vcard], {type: "text/vcard;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Seongsik_Oh.vcf";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box
            sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#0f766e", 0.18),
                background:
                    "linear-gradient(135deg, rgba(255,250,243,0.94) 0%, rgba(238,249,244,0.92) 58%, rgba(255,239,226,0.9) 100%)",
                boxShadow: "0 24px 70px rgba(24, 33, 31, 0.12)",
                overflow: "hidden",
            }}
        >
            <Helmet>
                <html lang="ko" />
                <title>오성식 | Game Client Programmer</title>
                <meta
                    name="description"
                    content="게임 규칙을 구조화하고 끝까지 검증하는 개발자. C++·C#·Unreal Engine·Unity 기반 게임 클라이언트 프로젝트와 4년의 소프트웨어 개발 실무 경력을 정리한 포트폴리오입니다."
                />
                <meta property="og:title" content="오성식 | Game Client Programmer" />
                <meta
                    property="og:description"
                    content="RTS(C++23) · Tycoon(Unity 6) · ArenaShooter(UE5.6) 프로젝트와 장비 제어 실무로 증명한 상태·비동기·검증 역량."
                />
                <meta property="og:type" content="profile" />
                <meta property="og:image" content="https://img.youtube.com/vi/g9drIxSF76o/maxresdefault.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        name: "오성식",
                        email: "mailto:blackvrice@naver.com",
                        url: "https://github.com/blackvrice",
                        sameAs: [
                            "https://github.com/blackvrice",
                            "https://blackvrice.tistory.com",
                            "https://velog.io/@blackvrice/posts",
                        ],
                        jobTitle: "Game Client Programmer",
                        knowsAbout: [
                            "C++",
                            "C#",
                            "Unreal Engine",
                            "Unity",
                            "Game System Design",
                            "WPF",
                        ],
                        address: {
                            "@type": "PostalAddress",
                            addressLocality: "Seoul",
                            addressCountry: "KR",
                        },
                    })}
                </script>
            </Helmet>

            <Stack
                direction={{xs: "column", md: "row"}}
                spacing={{xs: 3, md: 5}}
                alignItems={{xs: "stretch", md: "center"}}
                sx={{p: {xs: 2.5, sm: 3.5, md: 4}}}
            >
                <Stack spacing={2.25} sx={{flex: 1, minWidth: 0}}>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        <Chip
                            icon={<Icon icon="mdi:gamepad-variant-outline" width={16} />}
                            label="Game Client Programmer"
                            sx={{
                                borderRadius: 1.5,
                                fontWeight: 800,
                                backgroundColor: alpha("#0f766e", 0.14),
                                color: "#0b4f4a",
                                "& .MuiChip-icon": {color: "#0f766e"},
                            }}
                        />
                        <Chip
                            icon={<Icon icon="mdi:briefcase-search-outline" width={16} />}
                            label="구직 중"
                            sx={{
                                borderRadius: 1.5,
                                fontWeight: 800,
                                backgroundColor: alpha("#e76f51", 0.12),
                                color: "#a8432d",
                                "& .MuiChip-icon": {color: "#e76f51"},
                            }}
                        />
                        <Chip
                            icon={<Icon icon="mdi:map-marker-outline" width={16} />}
                            label="Seoul, KR"
                            color="primary"
                            variant="outlined"
                            sx={{borderRadius: 1.5}}
                        />
                    </Stack>

                    <Box>
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: {xs: 38, sm: 48, md: 64},
                                lineHeight: 1,
                                fontWeight: 950,
                                letterSpacing: 0,
                            }}
                        >
                            오성식
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1.5,
                                fontSize: {xs: 18, md: 22},
                                fontWeight: 900,
                                color: "#0b4f4a",
                            }}
                        >
                            게임 규칙을 구조화하고, 끝까지 검증하는 개발자
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1,
                                maxWidth: 700,
                                color: "text.secondary",
                                fontSize: {xs: 15, md: 17},
                                lineHeight: 1.8,
                            }}
                        >
                            C# 장비 제어 실무의 상태·비동기·복구 경험을 C++ · Unity · Unreal 프로젝트의 게임 루프
                            설계로 확장했습니다. 웹 백엔드 실무의 데이터 처리 경험도 함께 가지고 있습니다.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            maxWidth: 600,
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: alpha("#ffffff", 0.68),
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.14),
                            display: "grid",
                            gridTemplateColumns: {xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(4, minmax(0, 1fr))"},
                            rowGap: 1.5,
                        }}
                    >
                        {[
                            ["4년", "실무 개발 경력"],
                            ["3개", "게임 프로젝트"],
                            ["2 + 2", "언어 2 · 엔진 2"],
                            [`${age}세`, "1997.02.23"],
                        ].map(([value, label], index) => (
                            <Box
                                key={label}
                                sx={{
                                    minWidth: 0,
                                    px: {xs: 1, sm: 1.25},
                                    borderLeft: index === 0 ? "none" : "1px solid",
                                    borderLeftColor: alpha("#0f766e", 0.14),
                                    "&:nth-of-type(3)": {
                                        borderLeft: {xs: "none", sm: "1px solid"},
                                        borderLeftColor: {sm: alpha("#0f766e", 0.14)},
                                    },
                                }}
                            >
                                <Typography fontWeight={950} fontSize={19}>
                                    {value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <SkillsRow />

                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                        <CopyChip label="010-6226-9366" value="010-6226-9366" icon="mdi:phone-outline" />
                        <CopyChip
                            label="blackvrice@naver.com"
                            value="blackvrice@naver.com"
                            icon="mdi:email-outline"
                        />
                    </Stack>

                    <Stack direction="row" spacing={1.25} alignItems="center" useFlexGap flexWrap="wrap">
                        <Button
                            variant="contained"
                            startIcon={<Icon icon="mdi:github" width={19} />}
                            onClick={() =>
                                window.open("https://github.com/blackvrice", "_blank", "noopener,noreferrer")
                            }
                        >
                            GitHub 보기
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<Icon icon="mdi:email-fast-outline" width={19} />}
                            onClick={() => window.open("mailto:blackvrice@naver.com", "_blank")}
                        >
                            이메일 보내기
                        </Button>
                        <Button
                            variant="text"
                            startIcon={<Icon icon="mdi:card-account-phone-outline" width={19} />}
                            onClick={downloadVCard}
                        >
                            연락처 저장
                        </Button>
                        <SocialLinks />
                    </Stack>
                </Stack>

                <Box
                    sx={{
                        width: {xs: "100%", md: 310},
                        display: "grid",
                        justifyItems: {xs: "center", md: "end"},
                    }}
                >
                    <Box
                        sx={{
                            width: {xs: 210, sm: 240, md: 276},
                            p: 1.25,
                            borderRadius: 2,
                            backgroundColor: alpha("#ffffff", 0.82),
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.16),
                            boxShadow: "0 22px 48px rgba(24, 33, 31, 0.16)",
                        }}
                    >
                        <Box
                            component="img"
                            src={image}
                            alt="오성식 프로필 사진"
                            loading="eager"
                            decoding="async"
                            sx={{
                                display: "block",
                                width: "100%",
                                aspectRatio: "3 / 4",
                                objectFit: "cover",
                                objectPosition: "center top",
                                borderRadius: 1.5,
                            }}
                        />
                    </Box>
                </Box>
            </Stack>
        </Box>
    );
}
