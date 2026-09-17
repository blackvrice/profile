import {useState} from "react";
import {alpha, Box, Button, Chip, Collapse, Divider, Stack, Tooltip, Typography} from "@mui/material";
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

function BulletList({items, color = "#0f766e"}: {items: string[]; color?: string}) {
    return (
        <Stack spacing={1}>
            {items.map((item) => (
                <Stack key={item} direction="row" spacing={1.25} alignItems="flex-start">
                    <Box sx={{pt: "3px", flexShrink: 0}}>
                        <Icon icon="mdi:arrow-right-circle" width={19} height={19} color={color} />
                    </Box>
                    <Typography sx={{lineHeight: 1.75, color: "text.secondary"}}>{item}</Typography>
                </Stack>
            ))}
        </Stack>
    );
}

function CareerCard({item, index}: {item: CareerItem; index: number}) {
    const [open, setOpen] = useState(false);
    const accent = index === 0 ? "#0f766e" : "#e76f51";

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {xs: "1fr", md: "210px 1fr"},
                gap: {xs: 1.5, md: 3},
                p: {xs: 2.25, md: 3},
                borderRadius: 2,
                border: "1px solid",
                borderColor: alpha("#0f766e", index === 0 ? 0.3 : 0.16),
                backgroundColor: alpha("#fffaf3", 0.92),
            }}
        >
            <Stack spacing={1}>
                <Chip
                    label={index === 0 ? "최근" : `0${index + 1}`}
                    size="small"
                    sx={{
                        width: 62,
                        borderRadius: 1.5,
                        fontWeight: 800,
                        backgroundColor: alpha(accent, 0.14),
                        color: index === 0 ? "#0b4f4a" : "#a8432d",
                    }}
                />
                <Typography variant="body2" color="text.secondary" fontWeight={800}>
                    {item.period}
                </Typography>
                <SkillsRow skills={item.skills} />
            </Stack>

            <Stack spacing={1.5}>
                <Box>
                    <Stack direction="row" spacing={1} alignItems="baseline" flexWrap="wrap">
                        <Typography variant="h5" fontWeight={950}>
                            {item.company}
                        </Typography>
                        {item.department && (
                            <Typography color="text.secondary" fontWeight={700}>
                                {item.department}
                            </Typography>
                        )}
                    </Stack>
                    <Typography color="text.secondary" fontWeight={700}>
                        {item.role}
                    </Typography>
                    <Typography sx={{mt: 1, lineHeight: 1.75}}>{item.summary}</Typography>
                </Box>

                <Divider />

                <BulletList items={item.highlights} color={accent} />

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Stack spacing={1.5} sx={{pt: 1.5}}>
                        <Divider textAlign="left">
                            <Typography variant="caption" color="text.secondary" fontWeight={900}>
                                상세 직무
                            </Typography>
                        </Divider>
                        <BulletList items={item.details} color={alpha(accent, 0.7)} />
                    </Stack>
                </Collapse>

                <Stack
                    direction={{xs: "column", sm: "row"}}
                    spacing={1.25}
                    alignItems={{xs: "flex-start", sm: "center"}}
                    justifyContent="space-between"
                >
                    <Button
                        size="small"
                        variant="text"
                        onClick={() => setOpen((prev) => !prev)}
                        endIcon={<Icon icon={open ? "mdi:chevron-up" : "mdi:chevron-down"} width={18} />}
                    >
                        {open ? "상세 직무 접기" : `상세 직무 ${item.details.length}건 더보기`}
                    </Button>

                    {item.bridge && (
                        <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
                            {item.bridge.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        borderRadius: 1.25,
                                        backgroundColor: alpha("#0f766e", 0.09),
                                        color: "#0b4f4a",
                                        fontWeight: 700,
                                    }}
                                />
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
}

export default function Career({
    data = careerData,
    totalLabel = "총 경력 약 4년",
    totalText = "웹 서비스 개발로 시작해, 장비 제어 소프트웨어에서 상태·비동기·외부 인터페이스를 다뤘습니다. 각 경력 하단의 태그는 게임 클라이언트 직무로 이어지는 역량입니다.",
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
                <Typography color="text.secondary" sx={{mt: 1, maxWidth: 820}}>
                    {totalLabel} · {totalText}
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
