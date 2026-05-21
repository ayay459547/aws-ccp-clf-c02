"use client";

import { useState, ReactNode } from "react";
import { useAppContext } from "@/lib/AppContext";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Button,
  Paper,
  Container,
  Stack,
  Grid,
  useMediaQuery,
  Chip,
} from "@mui/material";
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Cloud,
  Server,
  Database,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

// 定義語系內容的型別
interface LessonDetail {
  title: string;
  summary: string;
}

// 定義課程物件的型別
interface Lesson {
  id: number;
  icon: ReactNode;
  en: LessonDetail;
  zh: LessonDetail;
  renderContent: (showChinese: boolean) => ReactNode;
}

const drawerWidth: number = 280;

// 課程資料陣列，套用 Lesson 型別
const courseData: Lesson[] = [
  {
    id: 1,
    icon: <Cloud size={24} />,
    en: {
      title: "Introduction to Domain 1 & AWS Benefits",
      summary:
        "Overview of Cloud Concepts, AWS advantages, and defining the value of AWS Cloud.",
    },
    zh: {
      title: "領域 1 介紹與 AWS 優勢",
      summary: "概述雲端概念、AWS 的優勢，並定義 AWS 雲端的價值。",
    },
    renderContent: (showChinese: boolean) => (
      <Stack spacing={3}>
        <Typography variant="body1">
          First, let&apos;s introduce Domain 1, which covers Cloud Concepts.
          This includes topics such as what AWS is, the advantages of AWS,
          design principles, migration, and economics. Domain 1: Cloud Concepts
          is broken down into four task statements, which we will explore one by
          one in subsequent lessons.
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (我們首先來介紹領域 1，其中涵蓋了雲端概念，例如何謂 AWS、AWS
              的優勢、設計原則、遷移和經濟學等。領域
              1：雲端概念拆分為四個任務說明，我們將在後續數堂課程中逐一探討。)
            </Typography>
          )}
        </Typography>

        <Box
          sx={{
            bgcolor: "grey.50",
            p: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          <Box
            component="ul"
            sx={{ m: 0, pl: 3, "& li": { mb: 2, color: "text.secondary" } }}
          >
            <li>
              <Typography component="span" color="text.primary">
                Task Statement 1.1:
              </Typography>{" "}
              Define the benefits of the AWS Cloud.
              {showChinese && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  (任務說明 1.1：定義 AWS 雲端的優勢。)
                </Typography>
              )}
            </li>
            <li>
              <Typography component="span" color="text.primary">
                Task Statement 1.2:
              </Typography>{" "}
              Identify design principles of the AWS Cloud.
              {showChinese && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  (任務說明 1.2：識別 AWS 雲端的設計原則。)
                </Typography>
              )}
            </li>
            <li>
              <Typography component="span" color="text.primary">
                Task Statement 1.3:
              </Typography>{" "}
              Understand the benefits of and strategies for migration to the AWS
              Cloud.
              {showChinese && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  (任務說明 1.3：了解遷移至 AWS 雲端的優勢和策略。)
                </Typography>
              )}
            </li>
            <li>
              <Typography component="span" color="text.primary">
                Task Statement 1.4:
              </Typography>{" "}
              Understand the concepts of cloud economics.
              {showChinese && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  (任務說明 1.4：了解雲端經濟學的概念。)
                </Typography>
              )}
            </li>
          </Box>
        </Box>

        <Typography variant="body1">
          In the first task statement, we will start with AWS fundamentals.
          Cloud computing isn&apos;t just a buzzword; it&apos;s a unique
          computing capability with a formal definition. We will delve deeper
          into what AWS is and step through the characteristics of cloud
          computing.
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (在第一個任務說明中，我們會先開始介紹 AWS
              基礎知識。雲端運算不是隨口說說的流行用語。它是一種獨一無二的運算功能，且具備一套正式的定義。我們會更深入探討何謂
              AWS，並逐步介紹雲端運算的特性。)
            </Typography>
          )}
        </Typography>

        <Typography variant="body1">
          In the remaining videos of this module, I will individually explain
          each task statement, breaking down the knowledge and skills you need
          to succeed. We will begin by assessing your readiness for the exam and
          dive right into defining the benefits of the AWS Cloud.
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (在本單元接下來的幾個影片中，我將個別講解每個任務說明，分析您邁向成功應具備的知識和技能。在接下來的影片中，我們將首先從評估您對考試的準備就緒程度開始，同時也會講解領域
              1 的第一個任務說明，定義 AWS 雲端的優勢。)
            </Typography>
          )}
        </Typography>
      </Stack>
    ),
  },
  {
    id: 2,
    icon: <Server size={24} />,
    en: {
      title: "Defining the AWS Cloud & Cloud Computing",
      summary:
        "Understanding what makes a service 'Cloud Computing' and the core advantages like High Availability and Elasticity.",
    },
    zh: {
      title: "定義 AWS 雲端與雲端運算",
      summary: "了解構成「雲端運算」的條件，以及高可用性、彈性等核心優勢。",
    },
    renderContent: (showChinese: boolean) => (
      <Stack spacing={3}>
        <Typography variant="body1">
          Let&apos;s introduce the first task statement: defining the benefits
          of the AWS Cloud. This task ensures you understand the value of AWS.
          But before understanding its value, you must know what AWS is. Can you
          define AWS?
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (我們首先來介紹第一個任務說明，也就是定義 AWS
              雲端有哪些優勢。此任務說明旨在確保您了解 AWS 的價值。但是在了解
              AWS 的價值之前，一定要先知道 AWS 是什麼。您會怎麼定義 AWS？)
            </Typography>
          )}
        </Typography>

        <Typography variant="body1">
          AWS stands for Amazon Web Services. It is the world&apos;s most
          comprehensive and broadly adopted cloud platform, offering over 200
          fully featured services from data centers globally. Millions of
          customers use AWS to lower costs, become more agile, and innovate
          faster.
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (AWS 的全文為 Amazon Web
              Services，這是全世界最全方位且最廣受採用的雲端平台，致力於從遍布全球的資料中心提供逾
              200 項功能齊全的服務。有數百萬個客戶都在使用 AWS
              來降低成本、變得更敏捷，且以更快的速度進行創新。)
            </Typography>
          )}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            The 5 Characteristics of Cloud Computing
            {showChinese && (
              <Typography
                component="span"
                variant="subtitle1"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5, fontWeight: 400 }}
              >
                (雲端運算的 5 大條件)
              </Typography>
            )}
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[
              {
                title: "On-demand self-service",
                titleZh: "隨需自助服務",
                desc: "Provision compute, storage, or databases without human interaction.",
                descZh: "在無人為介入下佈建運算、儲存或資料庫等資源。",
              },
              {
                title: "Broad network access",
                titleZh: "廣泛的網路存取",
                desc: "Access and build via console, CLI, HTTP/HTTPS, VPN, etc.",
                descZh: "可透過主控台、CLI、HTTP/HTTPS、VPN 等方式存取。",
              },
              {
                title: "Resource pooling",
                titleZh: "資源集區",
                desc: "AWS pools massive resources to serve multiple customers.",
                descZh: "AWS 擁有大量資源並將其匯集以服務多個客戶。",
              },
              {
                title: "Rapid elasticity",
                titleZh: "快速的彈性",
                desc: "The ability to scale resources up or down based on demand.",
                descZh: "能夠根據需求自動且快速地擴展或縮減資源。",
              },
              {
                title: "Measured service",
                titleZh: "受測量與計費的服務",
                desc: "Monitor and bill based on actual resource usage.",
                descZh: "監控資源使用狀況並依實際用量計費。",
              },
            ].map((item, i) => (
              <Grid size={{ xs: 12, sm: 6 }} key={i}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    height: "100%",
                    display: "flex",
                    gap: 2,
                    bgcolor: "grey.50",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "primary.100",
                      color: "primary.main",
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">
                      {item.title}
                      {showChinese && (
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                          sx={{ ml: 1, fontWeight: 500 }}
                        >
                          ({item.titleZh})
                        </Typography>
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {item.desc}
                      {showChinese && (
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mt: 0.5 }}
                        >
                          ({item.descZh})
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    ),
  },
  {
    id: 3,
    icon: <Shield size={24} />,
    en: {
      title: "AWS Well-Architected Framework",
      summary:
        "Exploring the six pillars of the Well-Architected Framework and architectural best practices.",
    },
    zh: {
      title: "AWS 架構完善框架",
      summary: "探索 AWS Well-Architected Framework 的六大支柱與架構最佳實務。",
    },
    renderContent: (showChinese: boolean) => (
      <Stack spacing={3}>
        <Typography variant="body1">
          Let&apos;s introduce the second task statement: identifying the design
          principles of the AWS Cloud. The focus here is on the AWS
          Well-Architected Framework.
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (我們首先來介紹第二個任務說明，也就是識別 AWS
              設計原則。此任務說明的重點在於 AWS Well-Architected Framework。)
            </Typography>
          )}
        </Typography>
        <Typography variant="body1">
          What is the AWS Well-Architected Framework? It refers to AWS best
          practices and core strategies for architecting systems in the cloud.
          It helps you design, build, and operate reliable, secure, and
          cost-effective systems. The framework is based on six pillars:
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (什麼是 AWS Well-Architected Framework？它是指 AWS
              的最佳實務和雲端中架構系統的核心策略。它可以協助您設計、建置和運作可靠、安全且經濟實惠的系統。該框架以六個支柱為基礎：)
            </Typography>
          )}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {[
            {
              name: "Operational Excellence",
              nameZh: "卓越營運",
              desc: "Support development and run workloads effectively.",
              descZh: "支援開發並有效率地執行工作負載。",
            },
            {
              name: "Security",
              nameZh: "安全性",
              desc: "Protect data, systems, and assets.",
              descZh: "保護資料、系統和資產安全。",
            },
            {
              name: "Reliability",
              nameZh: "可靠性",
              desc: "Perform intended functions correctly and consistently.",
              descZh: "在預期情況下正確且一致地執行預期的功能。",
            },
            {
              name: "Performance Efficiency",
              nameZh: "效能達成率",
              desc: "Use computing resources efficiently.",
              descZh: "有效率地利用運算資源以符合系統需求。",
            },
            {
              name: "Cost Optimization",
              nameZh: "成本最佳化",
              desc: "Deliver business value at the lowest price point.",
              descZh: "以最低價格點來執行系統以提供商業價值。",
            },
            {
              name: "Sustainability",
              nameZh: "永續發展",
              desc: "Minimize the environmental impacts of running cloud workloads.",
              descZh: "減少執行雲端工作負載對環境的影響。",
            },
          ].map((pillar, i) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  height: "100%",
                  transition: "box-shadow 0.3s",
                  "&:hover": { boxShadow: 3 },
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="primary.main"
                  gutterBottom
                >
                  {pillar.name}
                  {showChinese && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 1, fontWeight: 500 }}
                    >
                      ({pillar.nameZh})
                    </Typography>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pillar.desc}
                  {showChinese && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      ({pillar.descZh})
                    </Typography>
                  )}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    ),
  },
  {
    id: 4,
    icon: <Database size={24} />,
    en: {
      title: "Migration Strategies & Services",
      summary:
        "Understanding the AWS Cloud Adoption Framework (CAF) and the 7 R's of migration.",
    },
    zh: {
      title: "遷移策略與服務",
      summary: "了解 AWS 雲端採用架構 (CAF) 以及 7 種遷移策略 (7 Rs)。",
    },
    renderContent: (showChinese: boolean) => (
      <Stack spacing={3}>
        <Typography variant="body1">
          Let&apos;s introduce the third task statement: understanding the
          benefits of and strategies for migrating to the AWS Cloud. We will
          cover the AWS Cloud Adoption Framework (CAF) and migration resources.
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (我們首先來介紹第三個任務說明，幫助大家了解遷移至 AWS
              雲端的優勢和策略。請確保您了解如何使用 AWS 雲端採用架構
              (CAF)，以及了解哪些資源可協助支援您的遷移之旅。)
            </Typography>
          )}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" color="text.primary" gutterBottom>
            The 7 Migration Strategies (The 7 Rs)
            {showChinese && (
              <Typography
                component="span"
                variant="subtitle1"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5, fontWeight: 400 }}
              >
                (七項遷移策略 - 7 Rs)
              </Typography>
            )}
          </Typography>
          <Stack spacing={1} sx={{ mt: 2 }}>
            {[
              {
                r: "Retire",
                rZh: "淘汰",
                desc: "Decommissioning applications you no longer need.",
                descZh: "淘汰掉您想要除役的應用程式。",
              },
              {
                r: "Retain",
                rZh: "保留",
                desc: "Keeping applications in your source environment for now.",
                descZh: "將應用程式保留在來源環境中，暫不遷移。",
              },
              {
                r: "Rehost",
                rZh: "重新託管",
                desc: "Also known as 'lift and shift'. Moving without changes.",
                descZh: "又稱「平移」(Lift and shift)。不作變更直接遷移。",
              },
              {
                r: "Relocate",
                rZh: "重新放置",
                desc: "Moving massive numbers of servers at once.",
                descZh: "搬移組成一或多個應用程式的大量伺服器。",
              },
              {
                r: "Repurchase",
                rZh: "重新購買",
                desc: "'Drop and shop'. Moving to a different product/version (e.g., SaaS).",
                descZh:
                  "又稱「捨棄再購買」。改用不同版本或產品 (通常為 SaaS)。",
              },
              {
                r: "Replatform",
                rZh: "重組平台",
                desc: "'Lift, tinker, and shift'. Making minor optimizations to utilize cloud capabilities.",
                descZh:
                  "「搬運修補及平移」。進行一定程度的最佳化以運用雲端功能。",
              },
              {
                r: "Refactor",
                rZh: "重構",
                desc: "Re-architecting the application using cloud-native features for agility and scale.",
                descZh: "重新架構應用程式，充分運用雲端原生功能以改善敏捷性。",
              },
            ].map((strategy, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 0.5, sm: 2 },
                  p: 2,
                  borderRadius: 2,
                  border: "1px solid transparent",
                  "&:hover": { bgcolor: "grey.50", borderColor: "grey.100" },
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary.main"
                  sx={{ width: { sm: 160 }, flexShrink: 0 }}
                >
                  {strategy.r}
                  {showChinese && (
                    <Typography
                      component="span"
                      variant="caption"
                      sx={{ ml: 1, color: "primary.light" }}
                    >
                      ({strategy.rZh})
                    </Typography>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {strategy.desc}
                  {showChinese && (
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      ({strategy.descZh})
                    </Typography>
                  )}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Stack>
    ),
  },
  {
    id: 5,
    icon: <Zap size={24} />,
    en: {
      title: "Cloud Economics & TCO",
      summary:
        "Understanding the financial benefits of the cloud, CapEx vs OpEx, and Total Cost of Ownership.",
    },
    zh: {
      title: "雲端經濟學與總體擁有成本",
      summary:
        "了解雲端的財務優勢、資本支出與營運支出的差異，以及總體擁有成本 (TCO)。",
    },
    renderContent: (showChinese: boolean) => (
      <Stack spacing={3}>
        <Typography variant="body1">
          Let&apos;s introduce the fourth task statement: understanding the
          concepts of cloud economics. Ensure you know how leveraging AWS helps
          you move technical resources away from on-premises infrastructure
          management (like buying servers, managing space, cooling, etc.).
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (我們首先來介紹第四個任務說明，也就是了解雲端經濟學的概念。請確保您了解如何利用
              AWS 來協助您讓技術資源脫離地端部署基礎架構管理
              (例如購置伺服器、空間管理、冷卻等)。)
            </Typography>
          )}
        </Typography>
        <Typography variant="body1">
          Instead of spending money on data centers, you adopt a consumption
          model: you only pay for what you actually use. AWS&apos;s economies of
          scale help lower costs. When you stop spending on heavy lifting,
          technical resources are freed up to optimize operations, improve user
          experience, and generate revenue.
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (不要再把錢花在資料中心上，而應當採用耗用模型，只需按照實際的耗用量付費。AWS
              的規模經濟能夠降低成本。當您不再把錢花在繁重的資料中心維護上時，技術資源便能釋放出來，用於打造更高效率的應用程式、提升使用者體驗並增加收入。)
            </Typography>
          )}
        </Typography>

        <Box
          sx={{
            bgcolor: "grey.50",
            borderLeft: 4,
            borderColor: "primary.main",
            p: 3,
            my: 3,
            borderRadius: "0 12px 12px 0",
          }}
        >
          <Typography variant="subtitle1" color="text.primary" gutterBottom>
            Total Cost of Ownership (TCO) Components:
            {showChinese && (
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5, fontWeight: 400 }}
              >
                (總體擁有成本 - TCO 的四大重點：)
              </Typography>
            )}
          </Typography>
          <Box
            component="ul"
            sx={{ pl: 3, color: "text.secondary", m: 0, "& li": { mb: 1.5 } }}
          >
            <li>
              <Typography component="span" color="text.primary">
                Operational Expenses (OpEx):
              </Typography>{" "}
              Day-to-day costs (e.g., utilities, maintenance).
              {showChinese && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  (<strong>營運支出 - OpEx：</strong>{" "}
                  日常營運成本，例如水電費、維護費。)
                </Typography>
              )}
            </li>
            <li>
              <Typography component="span" color="text.primary">
                Capital Expenses (CapEx):
              </Typography>{" "}
              Upfront investments (e.g., buildings, servers).
              {showChinese && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  (<strong>資本支出 - CapEx：</strong>{" "}
                  長期優勢投資，例如購買建物、伺服器。)
                </Typography>
              )}
            </li>
            <li>
              <Typography component="span" color="text.primary">
                Labor Costs:
              </Typography>{" "}
              Staffing for on-premises operations.
              {showChinese && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  (<strong>人力成本：</strong>{" "}
                  地端部署環境或資料中心的人力配置。)
                </Typography>
              )}
            </li>
            <li>
              <Typography component="span" color="text.primary">
                Software Licensing:
              </Typography>{" "}
              The impact of moving existing licenses to AWS.
              {showChinese && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "block", mt: 0.5 }}
                >
                  (<strong>軟體授權：</strong> 遷移到 AWS
                  對目前使用的軟體授權產生的影響。)
                </Typography>
              )}
            </li>
          </Box>
        </Box>

        <Typography variant="body1">
          <Typography component="span">Exam Tip:</Typography> When migrating
          from on-premises environments and traditional servers to AWS, you are
          essentially trading Capital Expenses (CapEx) for Variable Costs
          (OpEx).
          {showChinese && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ display: "block", mt: 0.5 }}
            >
              (<strong>應考技巧：</strong> 從地端部署環境和傳統伺服器遷移至 AWS
              時，您相當於是在將資本支出 (CapEx) 轉換成變動成本 / 營運支出
              (OpEx)。)
            </Typography>
          )}
        </Typography>
      </Stack>
    ),
  },
];

export default function App() {
  const theme = useTheme();
  const { showChinese } = useAppContext();
  // 定義並指明狀態型別
  const [activeLesson, setActiveLesson] = useState<number>(1);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // 利用 MUI 鉤子偵測裝置尺寸
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up("md"));

  // 處理側邊欄開關
  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  // 確保一定能取得到對應的課程資料（由於 activeLesson 受控制，使用 non-null assertion 也可以，這邊用 fallback 寫法更安全）
  const activeLessonData: Lesson =
    courseData.find((l) => l.id === activeLesson) || courseData[0];

  const totalLessons: number = courseData.length;
  const progressPercent: number = Math.round(
    (activeLesson / totalLessons) * 100,
  );

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "#0f172a",
        color: "grey.300",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid",
          borderColor: "#1e293b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1.5,
              color: "primary.light",
              display: "block",
              lineHeight: 1,
            }}
          >
            AWS Certified
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 0.5,
              fontWeight: "bold",
            }}
          >
            <Cloud size={20} color={theme.palette.primary.light} />
            {showChinese ? "雲端概念教學" : "Cloud Concepts"}
          </Typography>
        </Box>
        {!isDesktop && (
          <IconButton onClick={handleDrawerToggle} sx={{ color: "grey.400" }}>
            <X size={24} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", py: 2 }}>
        <Typography
          variant="caption"
          sx={{
            px: 3,
            mb: 1,
            fontWeight: "bold",
            color: "grey.500",
            textTransform: "uppercase",
            letterSpacing: 1,
            display: "block",
          }}
        >
          {showChinese ? "領域 1：雲端概念" : "Domain 1"}
        </Typography>
        <List sx={{ px: 1.5 }}>
          {courseData.map((lesson: Lesson) => {
            const isActive: boolean = activeLesson === lesson.id;
            return (
              <ListItem key={lesson.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => {
                    setActiveLesson(lesson.id);
                    if (!isDesktop) setMobileOpen(false);
                  }}
                  sx={{
                    borderRadius: 2,
                    transition: "all 0.2s",
                    ...(isActive
                      ? {
                          bgcolor: "primary.main",
                          color: "white",
                          "&:hover": { bgcolor: "primary.dark" },
                        }
                      : { "&:hover": { bgcolor: "#1e293b", color: "white" } }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? "primary.100" : "grey.500",
                    }}
                  >
                    {lesson.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: "bold",
                          color: isActive ? "primary.100" : "grey.500",
                          display: "block",
                          mb: 0.5,
                        }}
                      >
                        {showChinese
                          ? `第 ${lesson.id} 課`
                          : `Lesson ${lesson.id}`}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isActive ? "white" : "inherit",
                          lineHeight: 1.3,
                        }}
                      >
                        {showChinese ? lesson.zh.title : lesson.en.title}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box
        sx={{
          p: 3,
          borderTop: "1px solid",
          borderColor: "#1e293b",
          bgcolor: "rgba(2,6,23,0.5)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" sx={{ color: "grey.400" }}>
            {showChinese ? "學習進度" : "Progress"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            {progressPercent}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "#1e293b",
            "& .MuiLinearProgress-bar": { borderRadius: 4 },
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        {/* MUI Drawer (側邊欄) */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
          {isDesktop ? (
            <Drawer
              variant="permanent"
              sx={{
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                  borderRight: "none",
                  position: "relative",
                  height: "auto",
                  minHeight: "100%",
                },
                height: "100%",
              }}
              open
            >
              {drawerContent}
            </Drawer>
          ) : (
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                  boxSizing: "border-box",
                },
              }}
            >
              {drawerContent}
            </Drawer>
          )}
        </Box>

        {/* 模塊化主內容區 */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
            {/* 課程標頭 Card (英雄區塊) */}
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#1e293b",
                color: "white",
                p: { xs: 3, sm: 5 },
                mb: 4,
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -30,
                  right: -30,
                  opacity: 0.1,
                  pointerEvents: "none",
                }}
              >
                <Cloud size={240} />
              </Box>

              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Chip
                  label={`LESSON ${activeLesson}`}
                  icon={
                    <Globe
                      size={16}
                      color="rgba(255,255,255,0.7)"
                      style={{ marginLeft: 8 }}
                    />
                  }
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "white",
                    fontWeight: "bold",
                    mb: 3,
                    backdropFilter: "blur(4px)",
                  }}
                />

                <Stack spacing={1}>
                  <Typography
                    variant="h3"
                    sx={{ fontSize: { xs: "1.75rem", sm: "2.25rem" } }}
                  >
                    {activeLessonData.en.title}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "grey.400", fontWeight: 400, lineHeight: 1.5 }}
                  >
                    {activeLessonData.en.summary}
                  </Typography>

                  {/* 若啟用雙語，標題下方顯示中文翻譯 */}
                  {showChinese && (
                    <Box sx={{ pt: 1 }}>
                      <Typography
                        variant="h5"
                        sx={{ color: "primary.light", mb: 0.5 }}
                      >
                        ({activeLessonData.zh.title})
                      </Typography>
                      <Typography variant="body1" sx={{ color: "grey.500" }}>
                        ({activeLessonData.zh.summary})
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Paper>

            {/* 課程內文 */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 5 },
                mb: 4,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              {activeLessonData.renderContent(showChinese)}
            </Paper>

            {/* 底部導覽按鈕 */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 2,
                pb: 6,
              }}
            >
              <Button
                variant="outlined"
                color="inherit"
                disabled={activeLesson === 1}
                onClick={() => setActiveLesson(Math.max(1, activeLesson - 1))}
                startIcon={<ChevronLeft size={20} />}
                sx={{
                  color: "text.secondary",
                  borderColor: "divider",
                  visibility: activeLesson === 1 ? "hidden" : "visible",
                }}
              >
                {showChinese ? "上一課" : "Previous"}
              </Button>

              <Button
                variant="contained"
                color={activeLesson === totalLessons ? "success" : "primary"}
                disabled={activeLesson === totalLessons}
                onClick={() =>
                  setActiveLesson(Math.min(totalLessons, activeLesson + 1))
                }
                endIcon={
                  activeLesson === totalLessons ? null : (
                    <ChevronRight size={20} />
                  )
                }
                startIcon={
                  activeLesson === totalLessons ? (
                    <CheckCircle2 size={20} />
                  ) : null
                }
                sx={{ boxShadow: 2 }}
              >
                {activeLesson === totalLessons
                  ? showChinese
                    ? "完成學習"
                    : "Finish Course"
                  : showChinese
                    ? "下一課"
                    : "Next Lesson"}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
