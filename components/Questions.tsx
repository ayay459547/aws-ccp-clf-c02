"use client";

import { useState, useMemo } from "react";
import { Search, CheckCircle, Circle } from "lucide-react";
import {
  Box,
  Typography,
  Card,
  TextField,
  InputAdornment,
  Stack,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { FULL_AWS_QUIZ_DATA } from "@/lib/questions";
import Export from "@/components/Export";

type Props = {
  showChinese: boolean;
};

const Questions: React.FC<Props> = ({ showChinese }) => {
  const theme = useTheme();
  // --- 狀態管理 ---
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // --- 邏輯運算：過濾題目 ---
  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return FULL_AWS_QUIZ_DATA;

    const lowerSearch = searchTerm.toLowerCase();
    return FULL_AWS_QUIZ_DATA.filter(
      (q) =>
        q.qEn.toLowerCase().includes(lowerSearch) ||
        q.qZh.toLowerCase().includes(lowerSearch) ||
        q.optionsEn.some((opt) => opt.toLowerCase().includes(lowerSearch)) ||
        q.expEn.toLowerCase().includes(lowerSearch),
    );
  }, [searchTerm]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ animation: "fadeIn 0.5s ease-in-out" }}>
      {/* 控制列 (搜尋 & 中英切換) */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          border: "1px solid",
          borderColor: "grey.200",
          borderRadius: 4,
          bgcolor: "white",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <TextField
            placeholder="Search questions... (搜尋題目或關鍵字)"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentIndex(0);
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#94a3b8" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, bgcolor: "grey.50" },
              },
            }}
            sx={{ maxWidth: { sm: 400 } }}
          />

          <Export showChinese={showChinese} />
        </Stack>
      </Card>

      {/* 列表渲染區域 (改為單題顯示與切換) */}
      <Stack spacing={4}>
        {filteredQuestions.length > 0 ? (
          <Box>
            {/* 題目導覽列 */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 3,
                p: 2,
                bgcolor: "white",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "grey.200",
                maxHeight: 160,
                overflowY: "auto",
              }}
            >
              {filteredQuestions.map((_, idx) => (
                <Button
                  key={idx}
                  variant={currentIndex === idx ? "contained" : "outlined"}
                  color={currentIndex === idx ? "primary" : "inherit"}
                  onClick={() => setCurrentIndex(idx)}
                  sx={{
                    minWidth: 36,
                    height: 36,
                    p: 0,
                    borderRadius: 2,
                    fontWeight: "bold",
                    borderColor:
                      currentIndex === idx ? "transparent" : "grey.300",
                    color: currentIndex === idx ? "white" : "text.secondary",
                    bgcolor:
                      currentIndex === idx ? "primary.main" : "transparent",
                    "&:hover": {
                      bgcolor:
                        currentIndex === idx ? "primary.dark" : "grey.100",
                    },
                  }}
                >
                  {idx + 1}
                </Button>
              ))}
            </Box>

            {/* 單題顯示區塊 */}
            {(() => {
              const q = filteredQuestions[currentIndex];
              const qIdx = currentIndex;
              const isMulti = q.answers.length > 1;

              return (
                <Card
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    border: "1px solid",
                    borderColor: "grey.200",
                    borderRadius: 4,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: "primary.light",
                      boxShadow: "0 4px 12px rgba(245, 158, 11, 0.08)",
                    },
                  }}
                >
                  {/* 題目區塊 */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      color="secondary.main"
                      sx={{
                        fontWeight: "bold",
                        lineHeight: 1.5,
                        mb: showChinese ? 1 : 0,
                      }}
                    >
                      <Typography
                        component="span"
                        color="primary.main"
                        sx={{ fontWeight: "bold", mr: 1 }}
                      >
                        Q{qIdx + 1}.
                      </Typography>
                      {q.qEn}
                      {isMulti && (
                        <Typography
                          component="span"
                          sx={{
                            color: "primary.main",
                            ml: 1,
                            fontSize: "0.9rem",
                          }}
                        >
                          (Choose {q.answers.length})
                        </Typography>
                      )}
                    </Typography>

                    {showChinese && (
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.5 }}
                      >
                        {q.qZh}
                        {isMulti && (
                          <Typography
                            component="span"
                            sx={{
                              color: "primary.main",
                              ml: 1,
                              fontSize: "0.9rem",
                            }}
                          >
                            (請選 {q.answers.length} 項)
                          </Typography>
                        )}
                      </Typography>
                    )}
                  </Box>

                  {/* 選項區塊 (以唯讀列表顯示，正確答案標記綠色) */}
                  <Stack spacing={1.5} sx={{ mb: 4 }}>
                    {q.optionsEn.map((optEn, oIdx) => {
                      const optZh = q.optionsZh[oIdx];
                      const isCorrect = q.answers.includes(oIdx);

                      return (
                        <Box
                          key={oIdx}
                          sx={{
                            display: "flex",
                            gap: 1.5,
                            alignItems: "center",
                            p: 2,
                            borderRadius: 3,
                            bgcolor: isCorrect ? "success.50" : "grey.50",
                            border: "1px solid",
                            borderColor: isCorrect
                              ? "success.300"
                              : "transparent",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {isCorrect ? (
                              <CheckCircle
                                size={22}
                                color={theme.palette.success.main}
                              />
                            ) : (
                              <Circle size={22} color="#cbd5e1" />
                            )}
                          </Box>
                          <Box>
                            <Typography
                              sx={{
                                fontWeight: isCorrect ? "bold" : "normal",
                                color: isCorrect
                                  ? "success.dark"
                                  : "text.primary",
                                fontSize: "1rem",
                                lineHeight: 1.4,
                              }}
                            >
                              {optEn}
                            </Typography>
                            {showChinese && optEn !== optZh && (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: isCorrect
                                    ? "success.main"
                                    : "text.secondary",
                                  mt: 0.5,
                                  lineHeight: 1.4,
                                }}
                              >
                                {optZh}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Stack>

                  {/* 解析區塊 */}
                  <Box
                    sx={{
                      p: 2.5,
                      bgcolor: "info.50",
                      borderRadius: 3,
                      borderLeft: "4px solid",
                      borderColor: "info.400",
                      mb: 4,
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="info.900"
                      sx={{ lineHeight: 1.6 }}
                    >
                      💡 <strong>Explanation:</strong> {q.expEn}
                    </Typography>
                    {showChinese && (
                      <Typography
                        variant="body2"
                        color="info.800"
                        sx={{ mt: 1.5, lineHeight: 1.6 }}
                      >
                        <strong>中文解析：</strong> {q.expZh}
                      </Typography>
                    )}
                  </Box>

                  {/* 上一題 / 下一題 切換按鈕 */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                      pt: 3,
                      borderTop: "1px solid",
                      borderColor: "grey.100",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      sx={{ px: { xs: 2, md: 4 } }}
                    >
                      {showChinese ? "Previous (上一題)" : "Previous"}
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={currentIndex === filteredQuestions.length - 1}
                      sx={{ px: { xs: 2, md: 4 } }}
                      disableElevation
                    >
                      {showChinese ? "Next (下一題)" : "Next"}
                    </Button>
                  </Box>
                </Card>
              );
            })()}
          </Box>
        ) : (
          // 查無結果狀態
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Search size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
            <Typography variant="h6" color="text.secondary">
              No questions found matching &quot;{searchTerm}&quot;
            </Typography>
            {showChinese && (
              <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
                找不到符合條件的題目
              </Typography>
            )}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Questions;
