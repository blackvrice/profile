import { Box, Card, CardHeader, CardContent, Link } from '@mui/material'



function Section({name, url} : {name: string, url : string}) {
    return (
        <Card>
            <CardHeader>{name}</CardHeader>
            <CardContent>

                <Link>{url}</Link>
            </CardContent>
        </Card>
    )
}

export default function Project() {
    return(
        <Box>
            <Section
                name={"RTS"}
                url={""}
            />
            <Section name={"RPG"} url={""}/>
        </Box>
    )
}