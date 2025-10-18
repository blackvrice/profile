import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    Stack,
    Tooltip,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { careerData, type CareerItem } from "./CareerData.ts";

// ✅ 기술 아이콘 표시용 컴포넌트
function SkillsRow({
                       skills,
                   }: {
    skills: { name: string; icon: string; color?: string }[];
}) {
    return (
        <Box
            role="list"
            aria-label="사용 언어 아이콘 목록"
            sx={{
                display: "inline-flex",
                flexWrap: "wrap",
                gap: 1.5,
                verticalAlign: "middle",
            }}
        >
            {skills.map((s) => (
                <Tooltip title={s.name} key={s.name} arrow>
                    <Box
                        role="listitem"
                        aria-label={s.name}
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 0.5,
                            borderRadius: 2,
                            transition: "transform .2s",
                            "&:hover": { transform: "scale(1.1)" },
                        }}
                    >
                        <Icon icon={s.icon} color={s.color} width={28} height={28} />
                    </Box>
                </Tooltip>
            ))}
        </Box>
    );
}

// ✅ 경력 카드
function CareerCard({
                        item,
                        showDivider,
                    }: {
    item: CareerItem;
    showDivider?: boolean;
}) {
    return (
        <Box>
            <Typography variant="h6" fontWeight="bold">
                {item.company}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {item.period} | {item.role}
            </Typography>
            {/* 기술 아이콘 행 */}
            <Box sx={{ mt: 1 }}>
                <SkillsRow skills={item.skills} />
            </Box>

            {/* 활동 내역 */}
            <Box sx={{ mt: 1.5 }}>
                {item.highlights.map((h, i) => (
                    <Typography
                        key={i}
                        variant="body2"
                        sx={{
                            pl: 1.2,
                            position: "relative",
                            lineHeight: 1.7,
                            "&:before": { content: '"•"', position: "absolute", left: 0 },
                        }}
                    >
                        {h}
                    </Typography>
                ))}
            </Box>

            {showDivider && <Divider sx={{ mt: 2.5 }} />}
        </Box>
    );
}

// ✅ 메인 컴포넌트
export default function Career({
                                   data = careerData,
                                   totalLabel = "총 경력",
                                   totalText,
                               }: {
    data?: CareerItem[];
    totalLabel?: string;
    totalText?: string;
}) {
    return (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                    title="Personal History"
                    subheader={totalText ? `${totalLabel} : ${totalText}` : undefined}
                    sx={{
                        "& .MuiCardHeader-title": { fontWeight: "bold", fontSize: "1.25rem" },
                        "& .MuiCardHeader-subheader": { color: "text.secondary" },
                    }}
                />
                <CardContent>
                    <Stack spacing={3}>
                        {data.map((item, idx) => (
                            <CareerCard
                                key={`${item.company}-${item.period}`}
                                item={item}
                                showDivider={idx < data.length - 1}
                            />
                        ))}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
