"use client";

import { useState } from "react";
import { Cloud, BookOpen, PlayCircle, BookOpenCheck } from "lucide-react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  FormControlLabel,
  Paper,
  Switch,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import dynamic from "next/dynamic";

import LoadingSpinner from "@/components/LoadingSpinner";
import Guide from "@/components/Guide";
const Exam = dynamic(() => import("@/components/Exam"), {
  loading: () => <LoadingSpinner />,
  // ssr: false
});
const Questions = dynamic(() => import("@/components/Questions"), {
  loading: () => <LoadingSpinner />,
  // ssr: false
});
import MyDraggableGithubIcon from "@/components/MyDraggableGithubIcon";

// --- Material UI 主題設定 ---
const theme = createTheme({
  palette: {
    primary: { main: "#f59e0b" },
    secondary: { main: "#1e293b" },
    background: { default: "#f8fafc" },
    success: { main: "#10b981" },
    error: { main: "#ef4444" },
    info: { main: "#3b82f6" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", borderRadius: 8, fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 12 } },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": { display: "none" },
          boxShadow:
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
});

const NAVList = [
  {
    label: "Guide(指南)",
    Icon: BookOpen,
  },
  {
    label: "Exam(測驗)",
    Icon: PlayCircle,
  },
  {
    label: "QUIZ(題庫)",
    Icon: BookOpenCheck,
  },
];

export default function App() {
  // --- 全域導航狀態 ---
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [showChinese, setShowChinese] = useState<boolean>(true);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          pb: { xs: 7, md: 0 },
        }}
      >
        {/* --- 頂部導航列 --- */}
        <AppBar position="sticky" color="secondary" elevation={2}>
          <Container maxWidth="lg">
            <Toolbar
              disableGutters
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 64,
                px: { xs: 2, md: 0 },
              }}
            >
              {/* 左側：標題區塊 */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Cloud
                  size={28}
                  color={theme.palette.primary.main}
                  style={{ marginRight: 8 }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: 1,
                    whiteSpace: "nowrap",
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                  }}
                >
                  AWS CCP{" "}
                  <span
                    style={{
                      color: theme.palette.primary.main,
                      fontWeight: "normal",
                    }}
                  >
                    Notes
                  </span>
                </Typography>
              </Box>

              {/* 右側 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                {/* 功能切換 Tabs (電腦版專屬顯示) */}
                <Tabs
                  value={tabIndex}
                  onChange={(e, v) => setTabIndex(v)}
                  textColor="inherit"
                  indicatorColor="primary"
                  sx={{
                    display: { xs: "none", md: "flex" },
                    minHeight: 64,
                    "& .MuiTab-root": {
                      minHeight: 64,
                      px: 3,
                      color: "rgba(255, 255, 255, 0.7)",
                      "&.Mui-selected": { color: "white" },
                    },
                  }}
                >
                  {NAVList.map(({ label, Icon }) => {
                    return (
                      <Tab
                        key={`Tab-${label}`}
                        icon={<Icon size={18} />}
                        iconPosition="start"
                        label={label}
                        sx={{ fontWeight: "bold" }}
                      />
                    );
                  })}
                </Tabs>
                {/* 中英翻譯切換 */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={showChinese}
                      onChange={(e) => setShowChinese(e.target.checked)}
                      color="primary"
                      size="small"
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      中英對照
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <Container maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
          {/* ========================================== */}
          {/* 模組一：重點教學指南 */}
          {/* ========================================== */}
          {tabIndex === 0 && <Guide theme={theme} showChinese={showChinese} />}

          {/* ========================================== */}
          {/* 模組二：模擬測驗 */}
          {/* ========================================== */}
          {tabIndex === 1 && <Exam theme={theme} showChinese={showChinese} />}

          {/* ========================================== */}
          {/* 模組三：題庫與解答 */}
          {/* ========================================== */}
          {tabIndex === 2 && (
            <Questions theme={theme} showChinese={showChinese} />
          )}
        </Container>

        {/* --- 手機版底部導航列 --- */}
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            display: { xs: "block", md: "none" },
            zIndex: 1000,
          }}
          elevation={4}
        >
          <BottomNavigation
            showLabels
            value={tabIndex}
            onChange={(event, newValue) => {
              setTabIndex(newValue);
              window.scrollTo({ top: 0, behavior: "smooth" }); // 切換時自動回到頂部
            }}
            sx={{
              height: 64,
              "& .Mui-selected": {
                color: "primary.main",
              },
            }}
          >
            {NAVList.map(({ label, Icon }) => {
              return (
                <BottomNavigationAction
                  key={label}
                  label={label}
                  icon={<Icon size={22} />}
                />
              );
            })}
          </BottomNavigation>
        </Paper>

        <MyDraggableGithubIcon />

        <style
          dangerouslySetInnerHTML={{
            __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
