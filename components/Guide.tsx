"use client";

import { ChevronDown, SquareArrowOutUpRight } from "lucide-react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

import type { StudyDomain } from "@/types";
import data from "@/data/AWS_STUDY_MATERIAL.json";
const AWS_STUDY_MATERIAL: StudyDomain[] = data;

type Props = {
  showChinese: boolean;
};

const Guide: React.FC<Props> = ({ showChinese }) => {
  const theme = useTheme();

  const router = useRouter();
  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <Box sx={{ animation: "fadeIn 0.5s ease-in-out" }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "secondary.main", mb: 1.5 }}
        >
          AWS Certified Cloud Practitioner
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ fontWeight: "normal" }}
        >
          (CLF-C02) Study Guide
        </Typography>
      </Box>

      <Stack spacing={2}>
        {AWS_STUDY_MATERIAL.map((section, idx) => (
          <Accordion key={idx} disableGutters>
            <AccordionSummary
              expandIcon={<ChevronDown color={theme.palette.primary.main} />}
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                "&.Mui-expanded": {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderBottom: "1px solid",
                  borderColor: "grey.200",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  pr: 2,
                }}
              >
                <Typography
                  variant="h6"
                  color="secondary.main"
                  sx={{ fontWeight: "bold" }}
                >
                  {section.domainEn}
                  {showChinese && (
                    <Typography
                      component="span"
                      variant="body1"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      ({section.domainZh})
                    </Typography>
                  )}
                  <div
                    onClick={(e) => {
                      handleClick(section.link);
                      e.stopPropagation(); // 阻止 Accordion 的展開/收起行為
                    }}
                    className="w-6 h-6 leading-6 text-center ml-0.5 pt-2.5 inline-block cursor-pointer"
                  >
                    <SquareArrowOutUpRight
                      size={18}
                      color={theme.palette.primary.main}
                    />
                  </div>
                </Typography>
                <Chip
                  label={`Weight ${section.weight}`}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: "bold" }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                bgcolor: "grey.50",
                pt: 3,
                pb: 4,
                px: { xs: 2, sm: 4 },
              }}
            >
              <Stack spacing={4}>
                {section.topics.map((topic, tIdx) => (
                  <Box key={tIdx}>
                    <Typography
                      variant="subtitle1"
                      color="secondary.main"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 4,
                          height: 16,
                          bgcolor: "primary.main",
                          borderRadius: 1,
                        }}
                      />
                      {topic.titleEn}
                      {showChinese && (
                        <span
                          style={{
                            color: "#64748b",
                            fontWeight: "normal",
                            fontSize: "0.95rem",
                          }}
                        >
                          ({topic.titleZh})
                        </span>
                      )}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: "pre-wrap",
                        color: "text.primary",
                        lineHeight: 1.8,
                        ml: 1.5,
                      }}
                    >
                      {topic.contentEn}
                    </Typography>

                    {showChinese && (
                      <Typography
                        variant="body2"
                        sx={{
                          whiteSpace: "pre-wrap",
                          color: "text.secondary",
                          lineHeight: 1.8,
                          ml: 1.5,
                          mt: 1.5,
                          p: 2,
                          bgcolor: "white",
                          borderRadius: 2,
                          border: "1px dashed",
                          borderColor: "grey.300",
                        }}
                      >
                        {topic.contentZh}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
};

export default Guide;
