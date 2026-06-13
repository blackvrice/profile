import {useState} from "react";
import {
    alpha,
    Box,
    Button,
    Chip,
    Divider,
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

const skills: Skill[] = [
    {name: "C#", icon: "devicon:csharp", color: "#68217A"},
    {name: "WPF", icon: "mdi:microsoft-windows", color: "#0078D4"},
    {name: "Java", icon: "devicon:java", color: "#007396"},
    {name: "Spring Boot", icon: "devicon:spring", color: "#6DB33F"},
    {name: "Kotlin", icon: "devicon:kotlin", color: "#7F52FF"},
    {name: "React", icon: "devicon:react", color: "#087ea4"},
    {name: "TypeScript", icon: "devicon:typescript", color: "#3178C6"},
    {name: "MySQL", icon: "devicon:mysql", color: "#4479A1"},
];

const links = [
    {name: "GitHub", href: "https://github.com/blackvrice", icon: "mdi:github"},
    {name: "Blog", href: "https://blackvrice.tistory.com", icon: "simple-icons:tistory"},
    {name: "Velog", href: "https://velog.io/@blackvrice/posts", icon: "simple-icons:velog"},
    {name: "Email", href: "mailto:blackvrice@naver.com", icon: "mdi:email-outline"},
];

function SkillsRow() {
    return (
        <Box
            role="list"
            aria-label="주요 기술 스택"
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
            }}
        >
            {skills.map((skill) => (
                <Tooltip title={skill.name} key={skill.name} arrow>
                    <Chip
                        role="listitem"
                        icon={<Icon icon={skill.icon} color={skill.color} width={18} height={18} />}
                        label={skill.name}
                        sx={{
                            height: 36,
                            borderRadius: 1.5,
                            backgroundColor: alpha("#ffffff", 0.78),
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.16),
                            color: "text.primary",
                            "& .MuiChip-icon": {ml: 1},
                        }}
                    />
                </Tooltip>
            ))}
        </Box>
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
N:Cho;Seongsik;;;
FN:조성식
TEL;TYPE=CELL:010-6226-9366
EMAIL;TYPE=INTERNET:blackvrice@naver.com
ADR;TYPE=HOME:;;Seoul;;;Republic of Korea
URL:https://github.com/blackvrice
END:VCARD`;
        const blob = new Blob([vcard], {type: "text/vcard;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Seongsik_Cho.vcf";
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
                <title>조성식 | Software Engineer Profile</title>
                <meta
                    name="description"
                    content="조성식의 소프트웨어 엔지니어 프로필, 경력, 프로젝트, 알고리즘 활동을 정리한 포트폴리오입니다."
                />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Person",
                        name: "조성식",
                        email: "mailto:blackvrice@naver.com",
                        url: "https://github.com/blackvrice",
                        sameAs: [
                            "https://github.com/blackvrice",
                            "https://blackvrice.tistory.com",
                            "https://velog.io/@blackvrice/posts",
                        ],
                        jobTitle: "Software Engineer",
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
                sx={{p: {xs: 2.5, sm: 3.5, md: 5}}}
            >
                <Stack spacing={2.25} sx={{flex: 1, minWidth: 0}}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        <Chip
                            icon={<Icon icon="mdi:map-marker-outline" width={16} />}
                            label="Seoul, KR"
                            color="primary"
                            variant="outlined"
                            sx={{borderRadius: 1.5}}
                        />
                        <Chip
                            icon={<Icon icon="mdi:briefcase-check-outline" width={16} />}
                            label="Software Engineer"
                            sx={{
                                borderRadius: 1.5,
                                backgroundColor: alpha("#e76f51", 0.12),
                                color: "#a8432d",
                            }}
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
                            조성식
                        </Typography>
                        <Typography
                            sx={{
                                mt: 1.5,
                                maxWidth: 680,
                                color: "text.secondary",
                                fontSize: {xs: 16, md: 19},
                                lineHeight: 1.7,
                            }}
                        >
                            백엔드와 클라이언트 개발을 함께 다루며, 실시간 데이터 처리와 제품형 UI를 안정적으로
                            만드는 개발자입니다.
                        </Typography>
                    </Box>

                    <Stack
                        direction={{xs: "column", sm: "row"}}
                        spacing={1}
                        divider={<Divider orientation="vertical" flexItem />}
                        sx={{
                            maxWidth: 560,
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: alpha("#ffffff", 0.68),
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.14),
                        }}
                    >
                        {[
                            ["3년+", "실무 개발 경험"],
                            [`${age}세`, "1997.02.23"],
                            ["Full-stack", "WPF · Spring · React"],
                        ].map(([value, label]) => (
                            <Box key={label} sx={{flex: 1}}>
                                <Typography fontWeight={950} fontSize={20}>
                                    {value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {label}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>

                    <SkillsRow />

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        <CopyChip label="010-6226-9366" value="010-6226-9366" icon="mdi:phone-outline" />
                        <CopyChip label="blackvrice@naver.com" value="blackvrice@naver.com" icon="mdi:email-outline" />
                    </Stack>

                    <Stack direction="row" spacing={1.25} alignItems="center" flexWrap="wrap">
                        <Button
                            variant="contained"
                            startIcon={<Icon icon="mdi:github" width={19} />}
                            onClick={() => window.open("https://github.com/blackvrice", "_blank", "noopener,noreferrer")}
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
                            alt="조성식 프로필 사진"
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
