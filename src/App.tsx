import {useState}   from "react";
import {Box, Tab, Tabs} from '@mui/material'
import Algorithm from "./Algorithm.tsx";
import Layout from "./layout.tsx";
import Career from "./Career.tsx";
import Project from "./Project.tsx";
import background from './assets/background.jpg'

function App() {
    const [tab, setTab] = useState(0);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.55),
            rgba(0,0,0,0.75)
          ),
          url(${background})
        `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            {/* 콘텐츠 카드 */}
            <Box
                sx={{
                    maxWidth: 900,
                    mx: "auto",
                    px: 2,
                    py: 4,
                    backdropFilter: "blur(6px)",
                    backgroundColor: "rgba(15, 23, 42, 0.75)", // 다크 반투명
                    borderRadius: 4,
                }}
            >
                <Layout />

                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    sx={{
                        mb: 3,
                        "& .MuiTab-root": {
                            color: "rgba(255,255,255)",
                        },
                        "& .Mui-selected": {
                            color: "#fff",
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#38BDF8", // 포인트 컬러
                        },
                    }}
                >
                    <Tab label="Career" value={0} />
                    <Tab label="Algorithm" value={1} />
                    <Tab label="Project" value={2} />
                    <Tab label="Study" value={3} />
                </Tabs>

                {tab === 0 && <Career />}
                {tab === 1 && <Algorithm />}
                {tab === 2 && <Project />}
                {tab === 3 && <Box>Study</Box>}
            </Box>
        </Box>
    );
}


export default App
