import { useState, useRef } from "react";
import { Download, Loader2 } from "lucide-react";

import { FULL_AWS_QUIZ_DATA } from "@/lib/questions";

type Props = {
  showChinese: boolean;
};

const Export: React.FC<Props> = ({ showChinese }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfContentRef = useRef(null);

  const handleDownloadPdf = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    if (!pdfContentRef.current) return;

    setIsGenerating(true);
    const element = pdfContentRef.current;

    const opt = {
      margin: 10, // 稍微縮小邊界，讓文字有更多空間
      filename: "AWS_CCP_Quiz_Export.pdf",
      image: { type: "jpeg", quality: 0.98 },
      // 加上 windowWidth 確保 html2canvas 擷取時能取得完整的容器寬度
      html2canvas: {
        scale: 2,
        useCORS: true,
        windowWidth: 794,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: {
        mode: ["css", "legacy"],
      },
    } as const;

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsGenerating(false);
      });
  };

  return (
    <>
      <button
        onClick={handleDownloadPdf}
        disabled={isGenerating}
        className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white text-sm py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-500/30 cursor-pointer"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            PDF 產生中...
          </>
        ) : (
          <>
            <Download className="w-3 h-3 group-hover:-translate-y-1 transition-transform" />
            下載 PDF 檔案
          </>
        )}
      </button>

      {/* ========================================================= */}
      {/* 隱藏的 PDF 內容區塊 (提供給 html2pdf 擷取，不在畫面上顯示) */}
      {/* ========================================================= */}
      <div
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          zIndex: -1,
        }}
      >
        <div
          ref={pdfContentRef}
          style={{
            width: "794px",
            boxSizing: "border-box",
            padding: "30px",
            backgroundColor: "#fff",
            color: "#1e293b",
            fontFamily: "sans-serif",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          <div
            style={{
              borderBottom: "3px solid #f59e0b",
              paddingBottom: "15px",
              marginBottom: "30px",
            }}
          >
            <h1 style={{ color: "#f59e0b", fontSize: "28px", margin: "0" }}>
              AWS Certified Cloud Practitioner
            </h1>
          </div>

          {FULL_AWS_QUIZ_DATA.map((q, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "40px",
                pageBreakInside: "avoid",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#0f172a",
                  marginBottom: "8px",
                  lineHeight: "1.5",
                }}
              >
                Q{idx + 1}. {q.qEn}
              </div>
              {showChinese && (
                <div
                  style={{
                    fontSize: "14px",
                    color: "#475569",
                    marginBottom: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {q.qZh}
                </div>
              )}

              <div style={{ marginBottom: "15px" }}>
                {q.optionsEn.map((optEn, oIdx) => {
                  const isCorrect = q.answers.includes(oIdx);
                  return (
                    <div
                      key={oIdx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                        lineHeight: "1.4",
                      }}
                    >
                      <span
                        style={{
                          marginRight: "10px",
                          color: isCorrect ? "#059669" : "#94a3b8",
                          fontWeight: isCorrect ? "bold" : "normal",
                          flexShrink: 0,
                        }}
                      >
                        {isCorrect ? "✅" : "⚪"}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: isCorrect ? "#059669" : "#334155",
                          fontWeight: isCorrect ? "bold" : "normal",
                        }}
                      >
                        {optEn} {showChinese && `(${q.optionsZh[oIdx]})`}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  borderLeft: "4px solid #10b981",
                  padding: "15px",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#166534",
                    marginBottom: "6px",
                  }}
                >
                  Explanation{showChinese ? " / 解析：" : ":"}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#166534",
                    marginBottom: showChinese ? "6px" : "0",
                    lineHeight: "1.6",
                  }}
                >
                  {q.expEn}
                </div>
                {showChinese && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#166534",
                      lineHeight: "1.6",
                    }}
                  >
                    {q.expZh}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Export;
