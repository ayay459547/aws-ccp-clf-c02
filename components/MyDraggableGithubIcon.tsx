// import Draggable from "react-draggable";
import { FaGithub } from "react-icons/fa";

const MyDraggableGithubIcon = () => {
  return (
    <a
      href="https://github.com/ayay459547/aws-ccp-clf-c02"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        // CSS 固定定位在右下角
        position: "fixed",
        bottom: "20px",
        right: "20px",

        // 樣式設計 (圓形、背景、大小)
        width: "32px",
        height: "32px",
        backgroundColor: "#24292e", // GitHub 的官方黑色
        color: "white",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // 添加一點陰影，增加立體感
        zIndex: 1000, // 確保在其他內容之上
        fontSize: "16px", // 圖標大小
        transition: "transform 0.1s ease-out", // 拖拽時的平滑效果
      }}
    >
      {/* 放入 GitHub 圖標 */}
      <FaGithub />
    </a>
  );
};

export default MyDraggableGithubIcon;
