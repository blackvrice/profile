import {alpha, Box, Chip, Divider, Stack, Tooltip, Typography} from "@mui/material";
import {Icon} from "@iconify/react";
import {careerData, type CareerItem} from "./CareerData.ts";

function SkillsRow({skills}: {skills: CareerItem["skills"]}) {
    return (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" role="list" aria-label="사용 기술">
            {skills.map((skill) => (
                <Tooltip title={skill.name} key={skill.name} arrow>
                    <Chip
                        role="listitem"
                        icon={<Icon icon={skill.icon} color={skill.color} width={16} height={16} />}
                        label={skill.name}
                        size="small"
                        sx={{
                            borderRadius: 1.25,
                            backgroundColor: alpha("#ffffff", 0.8),
                            border: "1px solid",
                            borderColor: alpha("#0f766e", 0.14),
                            "& .MuiChip-icon": {ml: 0.75},
                        }}
                    />
                </Tooltip>
            ))}
        </Stack>
    );
}

function CareerCard({item, index}: {item: CareerItem; index: number}) {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {xs: "1fr", md: "180px 1fr"},
                gap: {xs: 1.5, md: 3},
                p: {xs: 2.25, md: 3},
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#0f766e", 0.16),
                backgroundColor: alpha("#fffaf3", 0.92),
            }}
        >
            <Stack spacing={1}>
                <Chip
                    label={`0${index + 1}`}
                    sx={{
                        width: 54,
                        borderRadius: 1.5,
                        backgroundColor: alpha(index % 2 === 0 ? "#0f766e" : "#e76f51", 0.14),
                        color: index % 2 === 0 ? "#0f766e" : "#a8432d",
                    }}
                />
                <Typography variant="body2" color="text.secondary" fontWeight={800}>
                    {item.period}
                </Typography>
                <SkillsRow skills={item.skills} />
            </Stack>

            <Stack spacing={1.5}>
                <Box>
                    <Typography variant="h5" fontWeight={950}>
                        {item.company}
                    </Typography>
                    <Typography color="text.secondary" fontWeight={700}>
                        {item.role}
                    </Typography>
                </Box>

                <Divider />

                <Stack spacing={1}>
                    {item.highlights.map((highlight) => (
                        <Stack key={highlight} direction="row" spacing={1.25} alignItems="flex-start">
                            <Icon icon="mdi:arrow-right-circle" width={20} height={20} color="#0f766e" />
                            <Typography sx={{lineHeight: 1.75, color: "text.secondary"}}>
                                {highlight}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}

export default function Career({
    data = careerData,
    totalLabel = "총 경력",
    totalText = "백엔드, 클라이언트, 운영 자동화까지 연결해 온 실무 경험",
}: {
    data?: CareerItem[];
    totalLabel?: string;
    totalText?: string;
}) {
    return (
        <Stack spacing={2.5}>
            <Box>
                <Typography variant="overline" color="primary" fontWeight={900}>
                    Career
                </Typography>
                <Typography variant="h4" fontWeight={950} sx={{mt: 0.5}}>
                    문제를 제품으로 연결한 경력
                </Typography>
                <Typography color="text.secondary" sx={{mt: 1, maxWidth: 760}}>
                    {totalLabel} : {totalText}
                </Typography>
            </Box>

            <Stack spacing={2}>
                {data.map((item, index) => (
                    <CareerCard key={`${item.company}-${item.period}`} item={item} index={index} />
                ))}
            </Stack>
        </Stack>
    );
}
