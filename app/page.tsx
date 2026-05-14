"use client";

import dynamic from "next/dynamic";

import LoadingSpinner from "@/components/LoadingSpinner";
import Guide from "@/components/Guide";
import { useAppContext } from "@/lib/AppContext";

const Exam = dynamic(() => import("@/components/Exam"), {
  loading: () => <LoadingSpinner />,
  // ssr: false
});
const Questions = dynamic(() => import("@/components/Questions"), {
  loading: () => <LoadingSpinner />,
  // ssr: false
});

export default function App() {
  const { tabIndex, showChinese } = useAppContext();

  return (
    <>
      {/* ========================================== */}
      {/* 模組一：重點教學指南 */}
      {/* ========================================== */}
      {tabIndex === 0 && <Guide showChinese={showChinese} />}

      {/* ========================================== */}
      {/* 模組二：模擬測驗 */}
      {/* ========================================== */}
      {tabIndex === 1 && <Exam showChinese={showChinese} />}

      {/* ========================================== */}
      {/* 模組三：題庫與解答 */}
      {/* ========================================== */}
      {tabIndex === 2 && <Questions showChinese={showChinese} />}
    </>
  );
}
