import {useMemo, useState} from "react";
import {
    alpha,
    Box,
    Container,
    createTheme,
    CssBaseline,
    Stack,
    Tab,
    Tabs,
    ThemeProvider,
    Typography,
} from "@mui/material";
import {Icon} from "@iconify/react";
import Algorithm from "./Algorithm.tsx";
import Layout from "./layout.tsx";
import Career from "./Career.tsx";
import Project from "./Project.tsx";
import Strength from "./Strength.tsx";
import background from "./assets/background.jpg";

const sections = [
    {label: "Project", icon: "mdi:gamepad-variant-outline"},
    {label: "Strength", icon: "mdi:target-account"},
    {label: "Career", icon: "mdi:briefcase-outline"},
    {label: "Algorithm", icon: "mdi:code-tags"},
    {label: "Study", icon: "mdi:book-open-variant"},
];

function App() {
    const [tab, setTab] = useState(0);

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: "light",
                    primary: {main: "#0f766e"},
                    secondary: {main: "#e76f51"},
                    background: {
                        default: "#f6f3ee",
                        paper: "#fffaf3",
                    },
                    text: {
                        primary: "#18211f",
                        secondary: "#52605c",
                    },
                },
                shape: {borderRadius: 8},
                typography: {
                    fontFamily:
                        '"Pretendard", "Inter", "Noto Sans KR", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                    button: {
                        textTransform: "none",
                        fontWeight: 800,
                    },
                },
                components: {
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                borderRadius: 8,
                                boxShadow: "0 18px 45px rgba(24, 33, 31, 0.08)",
                            },
                        },
                    },
                    MuiChip: {
                        styleOverrides: {
                            root: {
                                fontWeight: 700,
                            },
                        },
                    },
                },
            }),
        [],
    );

    const activePanel = [
        <Project key="project" />,
        <Strength key="strength" />,
        <Career key="career" />,
        <Algorithm key="algorithm" />,
        <StudyPanel key="study" />,
    ][tab];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    minHeight: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    color: "text.primary",
                    backgroundColor: "background.default",
                    "&::before": {
                        content: '""',
                        position: "fixed",
                        inset: 0,
                        zIndex: 0,
                        backgroundImage: `linear-gradient(115deg, rgba(246,243,238,0.96) 0%, rgba(246,243,238,0.86) 46%, rgba(246,243,238,0.64) 100%), url(${background})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    },
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        py: {xs: 2, md: 5},
                    }}
                >
                    <Layout />

                    <Box
                        sx={{
                            position: "sticky",
                            top: {xs: 8, md: 12},
                            zIndex: 10,
                            mt: {xs: 2, md: 3},
                            px: 1,
                            py: 1,
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.18),
                            borderRadius: 2,
                            backgroundColor: alpha("#fffaf3", 0.82),
                            backdropFilter: "blur(14px)",
                            boxShadow: "0 16px 40px rgba(24, 33, 31, 0.08)",
                        }}
                    >
                        <Tabs
                            value={tab}
                            onChange={(_, v) => setTab(v)}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            aria-label="Profile sections"
                            sx={{
                                minHeight: 48,
                                "& .MuiTabs-flexContainer": {gap: 0.5},
                                "& .MuiTabs-indicator": {display: "none"},
                                "& .MuiTab-root": {
                                    minHeight: 44,
                                    minWidth: "auto",
                                    borderRadius: 1.5,
                                    color: "text.secondary",
                                    fontWeight: 800,
                                    gap: 0.75,
                                    px: {xs: 1.5, sm: 2.25},
                                    transition: "background-color .2s ease, color .2s ease",
                                },
                                "& .MuiTab-iconWrapper": {
                                    marginRight: 0,
                                    marginBottom: "0 !important",
                                },
                                "& .Mui-selected": {
                                    color: "#0b4f4a",
                                    backgroundColor: alpha("#0f766e", 0.14),
                                    boxShadow: `inset 0 0 0 1px ${alpha("#0f766e", 0.2)}`,
                                },
                            }}
                        >
                            {sections.map((section, index) => (
                                <Tab
                                    key={section.label}
                                    value={index}
                                    icon={<Icon icon={section.icon} width={20} height={20} />}
                                    iconPosition="start"
                                    label={section.label}
                                />
                            ))}
                        </Tabs>
                    </Box>

                    <Box sx={{mt: {xs: 2, md: 3}}}>{activePanel}</Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

function StudyPanel() {
    const studies = [
        "게임 루프와 결정론적 시뮬레이션 (Fixed Tick · Replay · 상태 해시)",
        "멀티스레드 환경에서의 로직/렌더링 경계 설계",
        "Unreal Engine C++ 게임플레이 프레임워크와 Blueprint 경계 나누기",
        "Unity Test Framework 기반 PlayMode·EditMode 자동화 검증",
        "테스트 가능한 코드 구조와 계층별 책임 분리",
    ];

    return (
        <Box
            sx={{
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#0f766e", 0.16),
                backgroundColor: alpha("#fffaf3", 0.9),
                p: {xs: 2.5, md: 4},
            }}
        >
            <Stack spacing={2}>
                <Typography variant="overline" color="primary" fontWeight={900}>
                    Study Notes
                </Typography>
                <Typography variant="h4" fontWeight={900}>
                    꾸준히 정리하는 기술 관심사
                </Typography>
                <Stack spacing={1.25}>
                    {studies.map((study) => (
                        <Stack key={study} direction="row" spacing={1.25} alignItems="center">
                            <Icon icon="mdi:check-circle-outline" width={22} height={22} color="#0f766e" />
                            <Typography color="text.secondary">{study}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}

export default App;
