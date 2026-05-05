"use client";

import { useState, useEffect } from "react";
import {
  Cloud,
  CheckCircle,
  RefreshCw,
  X,
  Award,
  AlertTriangle,
  Clock,
  Settings,
} from "lucide-react";
import {
  Box,
  Typography,
  Card,
  Button,
  Radio,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Paper,
  Stack,
  Chip,
  Select,
  MenuItem,
  TextField,
  Checkbox,
} from "@mui/material";
import type { Theme } from "@mui/material";

import type { QuizQuestion, SelectedAnswers } from "@/types";
import { FULL_AWS_QUIZ_DATA } from "@/lib/questions";

type Props = {
  theme: Theme;
  showChinese: boolean;
};

const Exam: React.FC<Props> = ({ theme, showChinese }) => {
  // --- 測驗設定狀態 ---
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeLimit, setTimeLimit] = useState<number>(0); // 0 代表不限時 (分鐘)
  const [activeQuizData, setActiveQuizData] = useState<QuizQuestion[]>([]);

  // --- 測驗進行狀態 ---
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  // --- 計時器狀態 ---
  const [timeRemaining, setTimeRemaining] = useState<number>(0); // 剩餘秒數

  // 計時器倒數邏輯
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    if (quizStarted && !showResults && timeLimit > 0) {
      if (timeRemaining > 0) {
        interval = setInterval(() => {
          setTimeRemaining((prev) => prev - 1);
        }, 1000);
      } else if (timeRemaining === 0) {
        // 時間到，強制交卷 (使用 setTimeout 避免 linter 的 setState 警告)
        timeout = setTimeout(() => {
          setShowResults(true);
        }, 0);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [quizStarted, showResults, timeLimit, timeRemaining]);

  // 格式化秒數為 MM:SS
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startQuiz = (): void => {
    // 隨機打亂題庫並根據設定數量取出題目
    const shuffled = [...FULL_AWS_QUIZ_DATA].sort(() => 0.5 - Math.random());
    const selectedData = shuffled.slice(0, questionCount);

    setActiveQuizData(selectedData);
    if (timeLimit > 0) {
      setTimeRemaining(timeLimit * 60); // 轉換為秒數
    }

    setQuizStarted(true);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setShowResults(false);

    // 確保畫面渲染後再滾動
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const handleSelectOption = (index: number): void => {
    const isMulti = activeQuizData[currentQIndex].answers.length > 1;
    setSelectedAnswers((prev) => {
      const currentSelected = prev[currentQIndex] || [];
      if (isMulti) {
        if (currentSelected.includes(index)) {
          return {
            ...prev,
            [currentQIndex]: currentSelected.filter((i) => i !== index),
          };
        } else {
          return { ...prev, [currentQIndex]: [...currentSelected, index] };
        }
      } else {
        return { ...prev, [currentQIndex]: [index] };
      }
    });
  };

  const handlePrevQ = (): void => {
    if (currentQIndex > 0) {
      setCurrentQIndex((prev) => prev - 1);
    }
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const handleNextQ = (): void => {
    if (currentQIndex < activeQuizData.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
    // 使用 setTimeout 確保 React 畫面渲染更新後再執行滾動，避免失效
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const exitQuiz = (): void => {
    setQuizStarted(false);
    setShowResults(false);
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const resetQuiz = (): void => {
    setQuizStarted(true);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  const calculateScore = (): number => {
    let score = 0;
    activeQuizData.forEach((q, index) => {
      const userAns = selectedAnswers[index] || [];
      const correctAns = q.answers;
      if (
        userAns.length === correctAns.length &&
        [...userAns].sort().every((v, i) => v === [...correctAns].sort()[i])
      ) {
        score++;
      }
    });
    return score;
  };

  const passingScore = Math.ceil(activeQuizData.length * 0.7); // 70% 及格線
  const currentScore = calculateScore();
  const isPassed = currentScore >= passingScore;

  return (
    <Box sx={{ animation: "fadeIn 0.5s ease-in-out" }}>
      {/* 1. 測驗開始畫面 (含設定) */}
      {!quizStarted && !showResults && (
        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            py: { xs: 6, md: 8 },
            px: { xs: 3, md: 6 },
            borderRadius: 4,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "primary.50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                mb: 3,
              }}
            >
              <Cloud size={36} color={theme.palette.primary.main} />
            </Box>
            <Typography
              variant="h4"
              color="secondary.main"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              Mock Exam
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Customize your practice session before starting.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Last updated on April 29, 2026.
            </Typography>
          </Box>

          {/* 測驗設定區域 */}
          <Box
            sx={{
              bgcolor: "grey.50",
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              mb: 5,
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography
              variant="h6"
              color="secondary.main"
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 4,
              }}
            >
              <Settings size={20} /> Exam Settings{" "}
              {showChinese && (
                <Typography
                  component="span"
                  variant="body1"
                  color="text.secondary"
                >
                  (測驗設定)
                </Typography>
              )}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Number of Questions{" "}
                {showChinese && (
                  <span style={{ fontWeight: "normal", color: "#64748b" }}>
                    (題目數量)
                  </span>
                )}
                :
              </Typography>
              <TextField
                variant="outlined"
                type="number"
                value={questionCount}
                onChange={(e) => {
                  let val = parseInt(e.target.value, 10);
                  if (isNaN(val)) val = 1;
                  if (val < 1) val = 1;
                  if (val > FULL_AWS_QUIZ_DATA.length)
                    val = FULL_AWS_QUIZ_DATA.length;
                  setQuestionCount(val);
                }}
                slotProps={{
                  htmlInput: { min: 1, max: FULL_AWS_QUIZ_DATA.length },
                }}
                size="small"
                fullWidth
                sx={{ bgcolor: "white" }}
              />
            </Box>

            <Box>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                Time Limit{" "}
                {showChinese && (
                  <span style={{ fontWeight: "normal", color: "#64748b" }}>
                    (時間限制)
                  </span>
                )}
              </Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  sx={{ bgcolor: "white" }}
                >
                  <MenuItem value={0}>
                    No Time Limit {showChinese && "(不限時)"}
                  </MenuItem>
                  <MenuItem value={3}>
                    3 Minutes {showChinese && "(3 分鐘)"}
                  </MenuItem>
                  <MenuItem value={5}>
                    5 Minutes {showChinese && "(5 分鐘)"}
                  </MenuItem>
                  <MenuItem value={10}>
                    10 Minutes {showChinese && "(10 分鐘)"}
                  </MenuItem>
                  <MenuItem value={15}>
                    15 Minutes {showChinese && "(15 分鐘)"}
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={startQuiz}
              sx={{ px: 8, py: 1.5, fontSize: "1.1rem" }}
              disableElevation
            >
              Start Exam {showChinese && "(開始測驗)"}
            </Button>
          </Box>
        </Card>
      )}

      {/* 2. 測驗進行中畫面 */}
      {quizStarted && !showResults && (
        <Box>
          {/* 題目導覽列與提早交卷 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 3,
              p: { xs: 2, md: 3 },
              bgcolor: "white",
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontWeight: "bold" }}
              >
                Question Navigator {showChinese && "(題目導覽)"}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                color="warning"
                onClick={() => setShowResults(true)}
              >
                Submit Early {showChinese && "(提早交卷)"}
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                maxHeight: 120,
                overflowY: "auto",
                p: 0.5,
              }}
            >
              {activeQuizData.map((_, idx) => {
                const userAns = selectedAnswers[idx] || [];
                const isAnswered = userAns.length > 0;
                const isCurrent = currentQIndex === idx;
                return (
                  <Button
                    key={idx}
                    variant={
                      isCurrent
                        ? "contained"
                        : isAnswered
                          ? "contained"
                          : "outlined"
                    }
                    color={
                      isCurrent ? "primary" : isAnswered ? "success" : "inherit"
                    }
                    onClick={() => {
                      setCurrentQIndex(idx);
                      setTimeout(
                        () =>
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          }),
                        50,
                      );
                    }}
                    sx={{
                      minWidth: 36,
                      height: 36,
                      p: 0,
                      borderRadius: 2,
                      fontWeight: "bold",
                      borderColor: isAnswered ? "transparent" : "grey.300",
                      color: isCurrent
                        ? "white"
                        : isAnswered
                          ? "white"
                          : "text.secondary",
                      bgcolor: isCurrent
                        ? "primary.main"
                        : isAnswered
                          ? "success.main"
                          : "transparent",
                      "&:hover": {
                        bgcolor: isCurrent
                          ? "primary.dark"
                          : isAnswered
                            ? "success.dark"
                            : "grey.100",
                      },
                    }}
                  >
                    {idx + 1}
                  </Button>
                );
              })}
            </Box>
          </Box>

          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 3, sm: 5 },
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontWeight: "bold", letterSpacing: 1 }}
              >
                QUESTION {currentQIndex + 1} OF {activeQuizData.length}
              </Typography>

              {/* 倒數計時器 */}
              {timeLimit > 0 && (
                <Chip
                  icon={<Clock size={16} />}
                  label={formatTime(timeRemaining)}
                  color={timeRemaining <= 60 ? "error" : "primary"} // 最後1分鐘變紅色
                  variant={timeRemaining <= 60 ? "filled" : "outlined"}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    minWidth: 80,
                  }}
                />
              )}

              <Button
                size="small"
                color="inherit"
                onClick={exitQuiz}
                sx={{ minWidth: "auto", p: 1 }}
              >
                Exit
              </Button>
            </Box>

            <LinearProgress
              variant="determinate"
              value={(currentQIndex / activeQuizData.length) * 100}
              sx={{
                mb: 5,
                height: 8,
                borderRadius: 4,
                bgcolor: "grey.100",
                "& .MuiLinearProgress-bar": { borderRadius: 4 },
              }}
            />

            {/* 題目 (Question) 置於選項上方 */}
            <Box
              sx={{
                p: 3,
                mb: 4,
                bgcolor: "grey.50",
                borderRadius: 3,
                borderLeft: "4px solid",
                borderColor: "secondary.main",
              }}
            >
              <Typography
                variant="h5"
                color="secondary.main"
                sx={{
                  fontWeight: "bold",
                  mb: showChinese ? 2 : 0,
                  lineHeight: 1.5,
                }}
              >
                {activeQuizData[currentQIndex].qEn}
                {activeQuizData[currentQIndex].answers.length > 1 && (
                  <Typography
                    component="span"
                    sx={{
                      color: "primary.main",
                      ml: 1,
                      fontWeight: "bold",
                    }}
                  >
                    (Choose {activeQuizData[currentQIndex].answers.length})
                  </Typography>
                )}
              </Typography>
              {showChinese && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ lineHeight: 1.5 }}
                >
                  {activeQuizData[currentQIndex].qZh}
                  {activeQuizData[currentQIndex].answers.length > 1 && (
                    <Typography
                      component="span"
                      sx={{
                        color: "primary.main",
                        ml: 1,
                        fontWeight: "bold",
                      }}
                    >
                      (請選 {activeQuizData[currentQIndex].answers.length} 項)
                    </Typography>
                  )}
                </Typography>
              )}
            </Box>

            {/* 選項 (Options) */}
            <FormControl component="fieldset" sx={{ width: "100%", mb: 2 }}>
              <Stack spacing={2}>
                {activeQuizData[currentQIndex].optionsEn.map(
                  (optionEn, idx) => {
                    const optionZh =
                      activeQuizData[currentQIndex].optionsZh[idx];
                    const isSelected = (
                      selectedAnswers[currentQIndex] || []
                    ).includes(idx);
                    const isMulti =
                      activeQuizData[currentQIndex].answers.length > 1;
                    const ControlComponent = isMulti ? Checkbox : Radio;

                    return (
                      <Paper
                        key={idx}
                        variant="outlined"
                        sx={{
                          borderRadius: 3,
                          cursor: "pointer",
                          bgcolor: isSelected ? "primary.50" : "white",
                          borderColor: isSelected ? "primary.main" : "grey.300",
                          "&:hover": {
                            borderColor: isSelected
                              ? "primary.main"
                              : "primary.light",
                            bgcolor: isSelected ? "primary.50" : "grey.50",
                          },
                          transition: "all 0.2s ease",
                          overflow: "hidden",
                        }}
                        onClick={() => handleSelectOption(idx)}
                      >
                        <FormControlLabel
                          control={
                            <ControlComponent
                              checked={isSelected}
                              onChange={() => handleSelectOption(idx)}
                              color="primary"
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: isSelected ? "bold" : "normal",
                                  color: isSelected
                                    ? "secondary.main"
                                    : "text.primary",
                                  fontSize: "1.05rem",
                                  lineHeight: 1.4,
                                }}
                              >
                                {optionEn}
                              </Typography>
                              {showChinese && optionEn !== optionZh && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mt: 0.5, lineHeight: 1.4 }}
                                >
                                  {optionZh}
                                </Typography>
                              )}
                            </Box>
                          }
                          sx={{
                            width: "100%",
                            m: 0,
                            py: 1.5,
                            px: 2,
                            alignItems: "center",
                          }}
                        />
                      </Paper>
                    );
                  },
                )}
              </Stack>
            </FormControl>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 5,
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={handlePrevQ}
                disabled={currentQIndex === 0}
                sx={{ px: { xs: 2, md: 4 } }}
              >
                {showChinese ? "Previous (上一題)" : "Previous"}
              </Button>

              {currentQIndex === activeQuizData.length - 1 ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => setShowResults(true)}
                  sx={{ px: { xs: 3, md: 5 } }}
                  disableElevation
                >
                  {showChinese ? "Submit (交卷)" : "Submit"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleNextQ}
                  sx={{ px: { xs: 3, md: 5 } }}
                  disableElevation
                >
                  {showChinese ? "Next (下一題)" : "Next"}
                </Button>
              )}
            </Box>
          </Card>
        </Box>
      )}

      {/* 3. 測驗結果與解析畫面 */}
      {showResults && (
        <Box>
          <Card
            elevation={0}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 4, sm: 6 },
              textAlign: "center",
              borderRadius: 4,
              mb: 4,
            }}
          >
            {isPassed ? (
              <Award
                size={64}
                color={theme.palette.success.main}
                style={{ margin: "0 auto", marginBottom: "16px" }}
              />
            ) : (
              <AlertTriangle
                size={64}
                color={theme.palette.warning.main}
                style={{ margin: "0 auto", marginBottom: "16px" }}
              />
            )}

            <Typography
              variant="h3"
              color={isPassed ? "success.main" : "warning.main"}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {currentScore} / {activeQuizData.length}
            </Typography>

            <Typography
              variant="h6"
              color="secondary.main"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {isPassed
                ? "Congratulations! You passed the mock exam."
                : "Keep trying!"}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 500, mx: "auto" }}
            >
              Passing score is{" "}
              {Math.round((passingScore / activeQuizData.length) * 100)}% (
              {passingScore} questions).
              {timeLimit > 0 && timeRemaining === 0 && (
                <span
                  style={{
                    display: "block",
                    color: theme.palette.error.main,
                    marginTop: 8,
                    fontWeight: "bold",
                  }}
                >
                  (Time is up! 測驗時間已結束，系統自動交卷)
                </span>
              )}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="outlined" color="secondary" onClick={exitQuiz}>
                Home
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={resetQuiz}
                startIcon={<RefreshCw size={18} />}
                disableElevation
              >
                Retry Exam
              </Button>
            </Box>
          </Card>

          <Typography
            variant="h5"
            color="secondary.main"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Review Answers (考題解析)
          </Typography>

          <Stack spacing={3}>
            {activeQuizData.map((q, idx) => {
              const userAns = selectedAnswers[idx] || [];
              const correctAns = q.answers;
              const isCorrect =
                userAns.length === correctAns.length &&
                [...userAns]
                  .sort()
                  .every((v, i) => v === [...correctAns].sort()[i]);

              return (
                <Paper
                  key={idx}
                  elevation={0}
                  sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    borderLeft: "6px solid",
                    borderColor: isCorrect ? "success.main" : "error.main",
                    bgcolor: "white",
                    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ mt: 0.5 }}>
                      {isCorrect ? (
                        <CheckCircle
                          size={22}
                          color={theme.palette.success.main}
                        />
                      ) : (
                        <X size={22} color={theme.palette.error.main} />
                      )}
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        color="secondary.main"
                        sx={{ fontWeight: "bold", lineHeight: 1.4 }}
                      >
                        Q{idx + 1}. {q.qEn}
                      </Typography>
                      {showChinese && (
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          sx={{ mt: 0.5, lineHeight: 1.4 }}
                        >
                          {q.qZh}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ ml: { xs: 0, sm: 4.5 } }}>
                    <Box
                      sx={{
                        mb: 2,
                        p: 2,
                        bgcolor: "grey.50",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        Your Answer (您的選擇)：
                        <Typography
                          component="span"
                          color={!isCorrect ? "error.main" : "text.primary"}
                          sx={{
                            fontWeight: !isCorrect ? "bold" : "normal",
                            ml: 1,
                          }}
                        >
                          {userAns.length > 0
                            ? userAns.map((i) => q.optionsEn[i]).join(" | ")
                            : "Unanswered (未作答)"}
                        </Typography>
                      </Typography>

                      {!isCorrect && (
                        <Typography variant="body2" color="text.secondary">
                          Correct Answer (正確答案)：
                          <Typography
                            component="span"
                            color="success.main"
                            sx={{ fontWeight: "bold", ml: 1 }}
                          >
                            {correctAns.map((i) => q.optionsEn[i]).join(" | ")}
                          </Typography>
                        </Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "info.50",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "info.200",
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
                          sx={{ mt: 1, lineHeight: 1.6 }}
                        >
                          <strong>中文解析：</strong> {q.expZh}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Paper>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Exam;
