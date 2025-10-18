// Hero.tsx
import { useState } from 'react';
import {
    Card, CardContent, Box, Stack, Tooltip, Typography,
    Button, Chip, IconButton, Snackbar
} from '@mui/material';
import { Icon } from '@iconify/react';
import { Helmet } from 'react-helmet-async';
import dayjs from 'dayjs';
import image from './assets/image.jpg';

// ---------- 작은 서브 컴포넌트들 ----------
function SkillsRow({ skills }: { skills: { name: string; icon: string; color?: string }[] }) {
    return (
        <Box role="list" aria-label="사용 언어 아이콘 목록"
             sx={{ display: 'inline-flex', flexWrap: 'wrap', gap: 1.5, verticalAlign: 'middle' }}>
            {skills.map((s) => (
                <Tooltip title={s.name} key={s.name} arrow>
                    <Box role="listitem" aria-label={s.name}
                         sx={{
                             display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                             p: 0.5, borderRadius: 2, transition: 'transform .2s',
                             '&:hover': { transform: 'scale(1.1)' },
                         }}>
                        <Icon icon={s.icon} color={s.color} width={28} height={28} />
                    </Box>
                </Tooltip>
            ))}
        </Box>
    );
}

function SocialLinks() {
    const links = [
        { name: 'GitHub',   href: 'https://github.com/blackvrice',      icon: 'mdi:github' },
        { name: 'LinkedIn', href: 'https://linkedin.com/in/your-id',    icon: 'mdi:linkedin' },
        { name: 'Blog',     href: 'https://your-blog.example',          icon: 'mdi:link-variant' },
        { name: 'Email',    href: 'mailto:blackvrice@naver.com',        icon: 'mdi:email' },
    ];
    return (
        <Box role="list" sx={{ display: 'flex', gap: 1 }}>
            {links.map((l) => (
                <Tooltip key={l.name} title={l.name} arrow>
                    <IconButton role="listitem" aria-label={l.name} size="small" color="primary"
                                onClick={() => window.open(l.href, '_blank')} sx={{ borderRadius: 2 }}>
                        <Icon icon={l.icon} width={20} height={20} />
                    </IconButton>
                </Tooltip>
            ))}
        </Box>
    );
}

function CopyChip({ label, value, icon }:{ label: string; value: string; icon: string }) {
    const [open, setOpen] = useState(false);
    const copy = async () => {
        try { await navigator.clipboard.writeText(value); setOpen(true); }
        catch (e) { console.error(e); }
    };
    return (
        <>
            <Chip
                icon={<Icon icon={icon} width={16} />}
                label={label}
                onClick={copy}
                variant="outlined"
                sx={{ cursor: 'pointer' }}
            />
            <Snackbar open={open} autoHideDuration={1500}
                      onClose={() => setOpen(false)} message="복사되었습니다" />
        </>
    );
}

function StatusRow() {
    return (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip icon={<Icon icon="mdi:map-marker" width={16} />} label="Seoul, KR (UTC+9)" size="small" />
            <Chip icon={<Icon icon="mdi:briefcase-check" width={16} />} label="Open to Work" color="success" size="small" />
        </Box>
    );
}

// ---------- 메인 Hero ----------
export default function Hero() {
    const birth = dayjs('1997-02-23');
    const today = dayjs();
    const years = today.diff(birth, 'year');
    const age = years - (today.isBefore(birth.add(years, 'year')) ? 1 : 0);

    const skills = [
        { name: 'C++',        icon: 'devicon:cplusplus',  color: '#00599C' },
        { name: 'C#',         icon: 'devicon:csharp',     color: '#68217A' },
        { name: 'Java',       icon: 'devicon:java',       color: '#007396' },
        { name: 'Kotlin',     icon: 'devicon:kotlin',     color: '#7F52FF' },
        { name: 'Python',     icon: 'devicon:python',     color: '#3776AB' },
        { name: 'React',      icon: 'devicon:react',      color: '#61DBFB' },
        { name: 'Node.js',    icon: 'devicon:nodejs',     color: '#339933' },
        { name: 'TypeScript', icon: 'devicon:typescript', color: '#3178C6' },
    ];

    const downloadVCard = () => {
        const vcard = `BEGIN:VCARD
VERSION:3.0
N:Cho;Seongsik;;;
FN:오성식
TEL;TYPE=CELL:010-6226-9366
EMAIL;TYPE=INTERNET:blackvrice@naver.com
ADR;TYPE=HOME:;;Seoul;;;Republic of Korea
END:VCARD`;
        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'Seongsik_Cho.vcf'; a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Card sx={{ width: '100%' }}>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Person',
                    name: '오성식',
                    email: 'mailto:blackvrice@naver.com',
                    url: 'https://github.com/blackvrice',
                    sameAs: ['https://github.com/blackvrice', 'https://linkedin.com/in/your-id'],
                    jobTitle: 'Software Engineer',
                    address: { '@type': 'PostalAddress', addressLocality: 'Seoul', addressCountry: 'KR' }
                })}</script>
            </Helmet>

            <CardContent>
                {/* 모바일: 이미지 아래 / md 이상: 이미지 오른쪽 */}
                <Stack
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    spacing={{ xs: 3, md: 4 }}
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    justifyContent="space-between"
                >
                    {/* 왼쪽: About */}
                    <Stack spacing={1.25} sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            오성식 <Chip label={`${age}세`} size="small" sx={{ ml: 1 }} />
                        </Typography>

                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            생년월일 : {birth.format('YYYY-MM-DD')}
                        </Typography>

                        <StatusRow />

                        <Box sx={{ mt: 1 }}>
                            <Typography component="span" sx={{ mr: 1, fontWeight: 700 }}>
                                사용언어 :
                            </Typography>
                            <SkillsRow skills={skills} />
                        </Box>

                        {/* 연락수단: 클릭 시 복사 */}
                        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                            <CopyChip label="010-6226-9366" value="010-6226-9366" icon="mdi:phone" />
                            <CopyChip label="blackvrice@naver.com" value="blackvrice@naver.com" icon="mdi:email" />
                        </Stack>

                        {/* CTA + 소셜 + vCard */}
                        <Stack direction="row" spacing={1.25} sx={{ mt: 2 }} alignItems="center" flexWrap="wrap">
                            <Button variant="contained" color="primary"
                                    onClick={() => window.open('https://github.com/blackvrice', '_blank')}>
                                GitHub 보기
                            </Button>
                            <Button variant="outlined" onClick={() => window.open('/resume.pdf', '_blank')}>
                                이력서 다운로드
                            </Button>
                            <Button variant="text" onClick={downloadVCard}>vCard 저장</Button>
                            <SocialLinks />
                        </Stack>
                    </Stack>

                    {/* 오른쪽: 프로필 이미지 */}
                    <Box
                        component="img"
                        src={image}
                        alt="오성식 프로필 사진"
                        loading="lazy"
                        decoding="async"
                        sx={{
                            width: { xs: 108, md: 124 },
                            height: { xs: 108, md: 124 },
                            borderRadius: '50%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            boxShadow: 3,
                            flexShrink: 0,
                        }}
                    />
                </Stack>
            </CardContent>
        </Card>
    );
}
