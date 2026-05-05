import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px", // 設定一個最小高度避免畫面跳動
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
