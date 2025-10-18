import {useState}   from "react";
import {Box, Tab, Tabs} from '@mui/material'
import Algorithm from "./Algorithm.tsx";
import Layout from "./layout.tsx";
import Career from "./Career.tsx";

function App() {
    const [tab, setTab] = useState(0);
    return (
        <Box>
            <Layout/>
            <Tabs value={tab}>
                <Tab label={"Career"} tabIndex={0} onClick={() => setTab(0)}/>
                <Tab label={"Algorithm"} tabIndex={0} onClick={() => setTab(1)}/>
                <Tab label={"Project"} tabIndex={1} onClick={() => setTab(2)}/>
                <Tab label={"Study"} tabIndex={2} onClick={() => setTab(3)}/>
            </Tabs>
            {tab === 0 && <Career/>}
            {tab === 1 && <Algorithm/>}
            {tab === 2 && <Box>Project</Box>}
            {tab === 3 && <Box>Study</Box>}
        </Box>
    )
}

export default App
