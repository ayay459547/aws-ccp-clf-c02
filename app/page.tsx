"use client";

import React, { useState, useEffect } from 'react';
import { 
  Cloud, BookOpen, CheckCircle, PlayCircle, 
  RefreshCw, ChevronDown, X, Award, AlertTriangle,
  Clock, Settings
} from 'lucide-react';
import {
  ThemeProvider, createTheme, CssBaseline,
  Box, Container, AppBar, Toolbar, Typography,
  Card, Button, Tabs, Tab, Accordion,
  AccordionSummary, AccordionDetails, Radio, RadioGroup,
  FormControlLabel, FormControl, LinearProgress, Paper, Stack,
  Chip, Switch, BottomNavigation, BottomNavigationAction,
  Slider, Select, MenuItem, TextField, Checkbox
} from '@mui/material';

// --- 型別定義 (TypeScript Interfaces) ---
interface Topic {
  titleEn: string;
  titleZh: string;
  contentEn: string;
  contentZh: string;
}

interface StudyDomain {
  domainEn: string;
  domainZh: string;
  weight: string;
  topics: Topic[];
}

interface QuizQuestion {
  qEn: string;
  qZh: string;
  optionsEn: string[];
  optionsZh: string[];
  answers: number[];
  expEn: string;
  expZh: string;
}

type SelectedAnswers = Record<number, number[]>;

// --- Material UI 主題設定 ---
const theme = createTheme({
  palette: {
    primary: { main: '#f59e0b' },
    secondary: { main: '#1e293b' },
    background: { default: '#f8fafc' },
    success: { main: '#10b981' },
    error: { main: '#ef4444' },
    info: { main: '#3b82f6' }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: 8, fontWeight: 600 }
      }
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 12 } }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:before': { display: 'none' },
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        }
      }
    }
  }
});

// ==========================================
// MOCK DATA: AWS 雙語教學指南與題庫
// ==========================================
const AWS_STUDY_MATERIAL: StudyDomain[] = [
  {
    domainEn: 'Domain 1: Cloud Concepts',
    domainZh: '領域 1：雲端概念',
    weight: '24%',
    topics: [
      { 
        titleEn: 'Six Advantages of Cloud Computing', 
        titleZh: 'AWS 六大優勢',
        contentEn: '1. Trade capital expense for variable expense\n2. Benefit from massive economies of scale\n3. Stop guessing capacity\n4. Increase speed and agility\n5. Stop spending money running and maintaining data centers\n6. Go global in minutes',
        contentZh: '1. 將資本支出轉換為變動支出\n2. 享受巨大的規模經濟效益\n3. 停止猜測容量\n4. 提高速度和敏捷性\n5. 停止花錢運行和維護資料中心\n6. 幾分鐘內實現全球化部署'
      },
      { 
        titleEn: 'Three Cloud Service Models', 
        titleZh: '三大雲端服務模型',
        contentEn: '• IaaS (Infrastructure as a Service): Highly flexible, manages servers like Amazon EC2.\n• PaaS (Platform as a Service): Focus on application deployment, no need to manage underlying infrastructure like AWS Elastic Beanstalk.\n• SaaS (Software as a Service): Complete product service like Gmail, Amazon SageMaker.',
        contentZh: '• IaaS (基礎設施即服務)：高度靈活，管理伺服器 (如 Amazon EC2)。\n• PaaS (平台即服務)：專注應用程式部署，無需管理底層 (如 AWS Elastic Beanstalk)。\n• SaaS (軟體即服務)：完整的產品服務 (如 Gmail, Amazon SageMaker)。'
      },
      { 
        titleEn: 'Cloud Deployment Models', 
        titleZh: '雲端部署模型',
        contentEn: '• Public Cloud\n• Hybrid Cloud: Combines on-premises and cloud resources\n• Private Cloud / On-premises',
        contentZh: '• 公有雲\n• 混合雲：結合地端與雲端資源\n• 私有雲 / 地端部署'
      }
    ]
  },
  {
    domainEn: 'Domain 2: Security & Compliance',
    domainZh: '領域 2：安全性與合規',
    weight: '30%',
    topics: [
      { 
        titleEn: 'Shared Responsibility Model', 
        titleZh: '共同責任模型',
        contentEn: '• Security OF the Cloud - AWS\'s responsibility: Physical data centers, hardware, global network infrastructure.\n• Security IN the Cloud - Customer\'s responsibility: Customer data, IAM access management, OS patching, network firewalls like Security Groups, and data encryption.',
        contentZh: '• 雲端本身的安全性 (Security OF the Cloud) - AWS 的責任：實體資料中心、硬體、全球網路基礎設施。\n• 雲端內部的安全性 (Security IN the Cloud) - 客戶的責任：客戶資料、IAM 權限管理、作業系統修補、網路防火牆 (如安全群組) 與資料加密。'
      },
      { 
        titleEn: 'AWS IAM - Identity and Access Management', 
        titleZh: '身分與存取管理',
        contentEn: 'Controls who can access AWS resources. Core principle is the "Principle of Least Privilege".\n• Users: People or applications.\n• Groups: Collections of users.\n• Roles: Assumed by AWS services to gain temporary permissions.\n• Policies: JSON documents defining permissions.',
        contentZh: '控制誰能存取 AWS 資源。核心原則是「最小權限原則」。\n• 使用者 (Users)：人員或應用程式。\n• 群組 (Groups)：包含使用者的集合。\n• 角色 (Roles)：分配給 AWS 服務以暫時獲得權限。\n• 政策 (Policies)：定義權限的 JSON 文件。'
      },
      { 
        titleEn: 'Security Services', 
        titleZh: '安全性防護服務',
        contentEn: '• AWS WAF (Web Application Firewall): Protects web applications from common attacks like SQL Injection.\n• AWS Shield: Protects against DDoS attacks; Standard tier is free.\n• Amazon Macie: Uses machine learning to discover and protect sensitive data in S3.',
        contentZh: '• AWS WAF：保護 Web 應用程式免受常見攻擊 (如 SQL 注入)。\n• AWS Shield：防止 DDoS 攻擊 (Standard 版本為免費提供)。\n• Amazon Macie：利用機器學習發現與保護 S3 中的敏感資料。'
      }
    ]
  },
  {
    domainEn: 'Domain 3: Core Services',
    domainZh: '領域 3：核心服務與架構',
    weight: '34%',
    topics: [
      { 
        titleEn: 'Compute', 
        titleZh: '運算',
        contentEn: '• Amazon EC2: Provides virtual servers with full control of the OS.\n• AWS Lambda: Serverless compute, pay only for code execution time, no servers to manage.\n• Amazon ECS/EKS: Services for container orchestration.',
        contentZh: '• Amazon EC2：提供虛擬伺服器，對作業系統有完全控制權。\n• AWS Lambda：無伺服器 (Serverless) 運算，只需為程式碼執行時間付費，無需管理伺服器。\n• Amazon ECS/EKS：用於管理 Docker 容器的服務。'
      },
      { 
        titleEn: 'Storage', 
        titleZh: '儲存',
        contentEn: '• Amazon S3: Object storage, high durability, suitable for backups and static website hosting.\n• Amazon EBS: Block storage, must be attached to an EC2 instance, suitable for databases.\n• Amazon S3 Glacier: Extremely low-cost service for data archiving and long-term backup.',
        contentZh: '• Amazon S3：物件儲存，高耐久性，適合備份與靜態網站託管。\n• Amazon EBS：區塊儲存，必須附加到 EC2 實例上使用，適合資料庫。\n• Amazon S3 Glacier：極低成本的資料封存與長期備份服務。'
      },
      { 
        titleEn: 'Database', 
        titleZh: '資料庫',
        contentEn: '• Amazon RDS: Relational database supporting MySQL, PostgreSQL, etc.\n• Amazon DynamoDB: Serverless, low-latency NoSQL key-value database.\n• Amazon Redshift: Data warehouse designed for big data analytics.',
        contentZh: '• Amazon RDS：關聯式資料庫 (支援 MySQL, PostgreSQL 等)。\n• Amazon DynamoDB：無伺服器、低延遲的 NoSQL 鍵值資料庫。\n• Amazon Redshift：為大數據分析設計的資料倉儲。'
      },
      { 
        titleEn: 'Networking & Content Delivery', 
        titleZh: '網路與內容傳遞',
        contentEn: '• Amazon VPC: Launch AWS resources in a logically isolated virtual network.\n• Amazon Route 53: Highly available and scalable cloud DNS web service.\n• Amazon CloudFront: Content Delivery Network (CDN) delivering static and dynamic content with low latency globally.',
        contentZh: '• Amazon VPC：讓您在邏輯隔離的虛擬網路中啟動 AWS 資源。\n• Amazon Route 53：高可用性且可擴展的雲端網域名稱系統 (DNS) Web 服務。\n• Amazon CloudFront：內容傳遞網路 (CDN)，以低延遲向全球使用者交付靜態與動態內容。'
      }
    ]
  },
  {
    domainEn: 'Domain 4: Billing & Pricing',
    domainZh: '領域 4：計費、定價與支援',
    weight: '12%',
    topics: [
      { 
        titleEn: 'EC2 Pricing Models', 
        titleZh: 'EC2 定價模型',
        contentEn: '• On-Demand Instances: No long-term commitment, pay by the second/hour, highest flexibility.\n• Reserved Instances: 1 or 3-year commitment, highest discount, suitable for predictable workloads.\n• Spot Instances: Uses spare AWS capacity, extremely cheap but can be interrupted, suitable for fault-tolerant workloads.\n• Dedicated Hosts: Physical servers dedicated to you for strict licensing and compliance needs.',
        contentZh: '• 隨需執行個體 (On-Demand)：無長期承諾，按秒/小時付費，靈活度最高。\n• 預留執行個體 (Reserved)：承諾 1 或 3 年，享有最高折扣，適合穩定用量。\n• 競價型執行個體 (Spot)：利用 AWS 閒置容量，極度便宜但隨時可能被中斷，適合容錯工作。\n• 專用主機 (Dedicated Hosts)：實體伺服器完全供您使用，滿足嚴格的軟體授權與合規需求。'
      },
      { 
        titleEn: 'AWS Support Plans', 
        titleZh: 'AWS 支援計畫',
        contentEn: '• Basic Support: Customer service and documentation access.\n• Developer Support: Business hours technical support.\n• Business Support: 24/7 technical support for production environments.\n• Enterprise Support: Includes a designated Technical Account Manager (TAM).',
        contentZh: '• Basic 計畫：客戶服務與文件存取。\n• Developer 計畫：營業時間內技術支援。\n• Business 計畫：生產環境全天候技術支援。\n• Enterprise 計畫：配備專屬的技術客戶經理 (TAM)。'
      },
      { 
        titleEn: 'Billing & Management Tools', 
        titleZh: '計費管理工具',
        contentEn: '• AWS Cost Explorer: Visualize and forecast costs.\n• AWS Budgets: Set custom budgets and receive alerts when exceeding them.\n• AWS Pricing Calculator: Estimate monthly costs before provisioning resources.',
        contentZh: '• AWS Cost Explorer：視覺化分析與預測已經發生的成本。\n• AWS Budgets：設定自訂預算，超支時發送提醒。\n• AWS Pricing Calculator：在建置資源前，預估每月成本。'
      }
    ]
  }
];

const FULL_AWS_QUIZ_DATA: QuizQuestion[] = [
  {
    qEn: "Which AWS service is used to run virtual servers in the cloud and allows users full control over the operating system?",
    qZh: "哪一項 AWS 服務可用於在雲端中執行虛擬伺服器，並允許使用者完全控制作業系統？",
    optionsEn: ["Amazon S3", "Amazon EC2", "AWS Lambda", "Amazon RDS"],
    optionsZh: ["Amazon S3", "Amazon EC2", "AWS Lambda", "Amazon RDS"],
    answers: [1],
    expEn: "Amazon EC2 (Elastic Compute Cloud) provides resizable compute capacity (virtual servers) in the cloud and allows users to choose and control the underlying operating system.",
    expZh: "Amazon EC2 在雲端中提供可調整大小的運算容量，並允許使用者選擇與控制底層的作業系統。"
  },
  {
    qEn: "According to the AWS Shared Responsibility Model, which of the following is the responsibility of the \"customer\"?",
    qZh: "根據 AWS 共同責任模型，以下哪一項是「客戶」的責任？",
    optionsEn: [
      "Maintaining the security of AWS physical data centers", 
      "Protecting the global network infrastructure", 
      "Configuring IAM user password policies", 
      "Patching the underlying infrastructure of Amazon RDS"
    ],
    optionsZh: [
      "維護 AWS 實體資料中心的安全性", 
      "保護全球網路基礎設施", 
      "設定 IAM 使用者密碼政策", 
      "修補 Amazon RDS 的底層基礎設施"
    ],
    answers: [2],
    expEn: "Configuring IAM password policies, encrypting data, and managing firewalls (e.g., Security Groups) fall under the customer's responsibility for security \"IN the Cloud\". AWS is responsible for the security \"OF the Cloud\" infrastructure.",
    expZh: "設定 IAM 密碼政策、加密資料和管理防火牆（如設定安全群組）屬於客戶「在雲端內部」的安全性責任。AWS 負責「雲端本身」的基礎設施安全。"
  },
  {
    qEn: "You want to run code without managing underlying servers and only pay for the compute time consumed in milliseconds. Which service should you choose?",
    qZh: "您希望在不管理底層伺服器的情況下執行程式碼，並且只需為程式碼執行期間的毫秒數付費。應該選擇哪一項服務？",
    optionsEn: ["Amazon EC2", "Amazon ECS", "AWS Elastic Beanstalk", "AWS Lambda"],
    optionsZh: ["Amazon EC2", "Amazon ECS", "AWS Elastic Beanstalk", "AWS Lambda"],
    answers: [3],
    expEn: "AWS Lambda is a serverless, event-driven compute service that lets you run code without provisioning or managing servers, and you are not charged when your code is not running.",
    expZh: "AWS Lambda 是一項無伺服器的事件驅動運算服務，讓您無需預置或管理伺服器即可執行程式碼，且空閒時不收費。"
  },
  {
    qEn: "Which EC2 pricing model provides the highest discount (up to 72% off On-Demand) but requires a 1-year or 3-year commitment?",
    qZh: "哪一種 EC2 定價模型提供最高折扣，但需要承諾使用 1 年或 3 年？",
    optionsEn: [
      "On-Demand Instances", 
      "Spot Instances", 
      "Reserved Instances", 
      "Dedicated Hosts"
    ],
    optionsZh: [
      "隨需執行個體", 
      "競價型執行個體", 
      "預留執行個體", 
      "專用主機"
    ],
    answers: [2],
    expEn: "Reserved Instances require a 1- or 3-year commitment and provide significant cost savings for applications with steady state or predictable usage.",
    expZh: "預留執行個體需要 1 或 3 年的使用承諾，為具有穩定、可預測工作負載的應用程式提供顯著的成本節約。"
  },
  {
    qEn: "If a company needs to deliver static assets (like images and videos) with the lowest latency to users globally, which AWS service should be used?",
    qZh: "如果企業需要將靜態資產以最低的延遲傳遞給全球各地的使用者，應該使用哪項 AWS 服務？",
    optionsEn: ["Amazon Route 53", "Amazon CloudFront", "AWS Global Accelerator", "Amazon VPC"],
    optionsZh: ["Amazon Route 53", "Amazon CloudFront", "AWS Global Accelerator", "Amazon VPC"],
    answers: [1],
    expEn: "Amazon CloudFront is a Content Delivery Network (CDN) service. It caches content at global Edge Locations to securely deliver data and videos to customers with low latency.",
    expZh: "Amazon CloudFront 是 AWS 的內容傳遞網路服務。它透過全球邊緣節點快取內容，將資料和影片以低延遲安全地分發給客戶。"
  },
  {
    qEn: "Which service helps you estimate the monthly cost of building an architecture on AWS before provisioning resources?",
    qZh: "哪一項服務能協助您在佈建資源前估算在 AWS 上建置架構的每月成本？",
    optionsEn: ["AWS Cost Explorer", "AWS Budgets", "AWS Pricing Calculator", "AWS Trusted Advisor"],
    optionsZh: ["AWS Cost Explorer", "AWS Budgets", "AWS Pricing Calculator", "AWS Trusted Advisor"],
    answers: [2],
    expEn: "AWS Pricing Calculator allows you to estimate the cost for AWS services based on your expected usage \"BEFORE\" provisioning resources. Cost Explorer is used to analyze costs that have already occurred.",
    expZh: "AWS Pricing Calculator 讓您可以在佈建資源「之前」估算 AWS 服務的成本。Cost Explorer 則是用於分析已經發生的成本。"
  },
  {
    qEn: "Which of the following is an advantage of cloud computing?",
    qZh: "以下哪一項是雲端運算的優勢？",
    optionsEn: [
      "Trade variable expense for capital expense", 
      "Stop guessing capacity", 
      "Increase the cost of maintaining physical data centers", 
      "Rely on a single geographic region for improved performance"
    ],
    optionsZh: [
      "將變動支出轉換為資本支出", 
      "停止猜測容量需求", 
      "增加維護實體資料中心的成本", 
      "依賴單一地理區域以提高效能"
    ],
    answers: [1],
    expEn: "\"Stop guessing capacity\" is one of the six advantages of AWS. Cloud allows you to scale resources up or down as needed, eliminating the need to over-provision hardware for estimated peaks. Also, it's trading CapEx for variable expense, not the other way around.",
    expZh: "「停止猜測容量」是 AWS 六大優勢之一。雲端讓您可以根據需求擴展或縮減資源，無需過度購買硬體。此外，雲端優勢是將資本支出轉為變動支出，而非反過來。"
  },
  {
    qEn: "Which support plan assigns a designated Technical Account Manager (TAM) to the enterprise?",
    qZh: "哪一項支援計畫會為企業指派專屬的「技術客戶經理 (TAM)」？",
    optionsEn: [
      "Basic Support", 
      "Developer Support", 
      "Business Support", 
      "Enterprise Support"
    ],
    optionsZh: [
      "Basic 支援計畫", 
      "Developer 支援計畫", 
      "Business 支援計畫", 
      "Enterprise 支援計畫"
    ],
    answers: [3],
    expEn: "Only the Enterprise Support plan provides a designated Technical Account Manager (TAM) who proactively monitors your environment and assists with best practices.",
    expZh: "只有 Enterprise 企業支援計畫會配備專屬的技術客戶經理，主動監控環境並提供最佳實務指導。"
  },
  {
    qEn: "Which of the following are benefits of using the AWS Cloud? (Choose two)",
    qZh: "以下哪兩項是使用 AWS 雲端的優勢？（請選擇兩項）",
    optionsEn: [
      "Ability to trade variable expense for capital expense", 
      "Stop guessing capacity", 
      "Increase operational cost", 
      "Increase speed and agility"
    ],
    optionsZh: [
      "將變動支出轉換為資本支出", 
      "停止猜測容量", 
      "增加營運成本", 
      "提高速度與敏捷性"
    ],
    answers: [1, 3],
    expEn: "The six advantages of AWS Cloud include stopping guessing capacity and increasing speed and agility. Cloud computing allows trading capital expense for variable expense (not the other way around).",
    expZh: "AWS 雲端的六大優勢包含停止猜測容量以及提高速度與敏捷性。雲端運算是將資本支出轉換為變動支出，而非反之。"
  },
  {
    qEn: "Which of the following AWS services can be used to improve network security? (Choose two)",
    qZh: "以下哪兩項 AWS 服務可用於提升網路安全性？（請選擇兩項）",
    optionsEn: ["AWS WAF", "Amazon S3", "AWS Shield", "Amazon EC2"],
    optionsZh: ["AWS WAF", "Amazon S3", "AWS Shield", "Amazon EC2"],
    answers: [0, 2],
    expEn: "AWS WAF protects web applications from common exploits, and AWS Shield provides managed DDoS protection. S3 is for storage and EC2 is for compute.",
    expZh: "AWS WAF 可保護 Web 應用程式免受常見攻擊，而 AWS Shield 提供受管的 DDoS 防護。S3 是儲存服務，EC2 是運算服務。"
  }
];

export default function App(): JSX.Element {
  // --- 全域導航狀態 ---
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [showChinese, setShowChinese] = useState<boolean>(true);
  
  // --- 測驗設定狀態 ---
  const [questionCount, setQuestionCount] = useState<number>(FULL_AWS_QUIZ_DATA.length);
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
    if (quizStarted && !showResults && timeLimit > 0) {
      if (timeRemaining > 0) {
        interval = setInterval(() => {
          setTimeRemaining((prev) => prev - 1);
        }, 1000);
      } else if (timeRemaining === 0) {
        // 時間到，強制交卷
        setShowResults(true);
      }
    }
    return () => clearInterval(interval);
  }, [quizStarted, showResults, timeLimit, timeRemaining]);

  // 格式化秒數為 MM:SS
  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
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
  };

  const handleSelectOption = (index: number): void => {
    const isMulti = activeQuizData[currentQIndex].answers.length > 1;
    setSelectedAnswers(prev => {
      const currentSelected = prev[currentQIndex] || [];
      if (isMulti) {
        if (currentSelected.includes(index)) {
          return { ...prev, [currentQIndex]: currentSelected.filter(i => i !== index) };
        } else {
          return { ...prev, [currentQIndex]: [...currentSelected, index] };
        }
      } else {
        return { ...prev, [currentQIndex]: [index] };
      }
    });
  };

  const handleNextQ = (): void => {
    if (currentQIndex < activeQuizData.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const exitQuiz = (): void => {
    setQuizStarted(false);
    setShowResults(false);
    setSelectedAnswers({});
    setCurrentQIndex(0);
  };

  const calculateScore = (): number => {
    let score = 0;
    activeQuizData.forEach((q, index) => {
      const userAns = selectedAnswers[index] || [];
      const correctAns = q.answers;
      if (userAns.length === correctAns.length && [...userAns].sort().every((v, i) => v === [...correctAns].sort()[i])) {
        score++;
      }
    });
    return score;
  };

  const passingScore = Math.ceil(activeQuizData.length * 0.7); // 70% 及格線
  const currentScore = calculateScore();
  const isPassed = currentScore >= passingScore;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', pb: { xs: 7, md: 0 } }}>
        
        {/* --- 頂部導航列 --- */}
        <AppBar position="sticky" color="secondary" elevation={2}>
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              minHeight: 64, 
              px: { xs: 2, md: 0 }
            }}>
              
              {/* 左側：標題區塊 */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Cloud size={28} color={theme.palette.primary.main} style={{ marginRight: 8 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 1, whiteSpace: 'nowrap', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                  AWS CCP <span style={{ color: theme.palette.primary.main, fontWeight: 'normal' }}>Exam Prep</span>
                </Typography>
              </Box>
              
              {/* 中間：功能切換 Tabs (電腦版專屬顯示) */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flex: 2 }}>
                <Tabs 
                  value={tabIndex} 
                  onChange={(e, v) => setTabIndex(v)} 
                  textColor="inherit" 
                  indicatorColor="primary"
                  sx={{ 
                    minHeight: 64,
                    '& .MuiTab-root': { 
                      minHeight: 64, 
                      px: 3, 
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&.Mui-selected': { color: 'white' }
                    }
                  }}
                >
                  <Tab 
                    icon={<BookOpen size={18} />} 
                    iconPosition="start" 
                    label="教學指南" 
                    sx={{ fontWeight: 'bold' }} 
                  />
                  <Tab 
                    icon={<PlayCircle size={18} />} 
                    iconPosition="start" 
                    label="模擬測驗" 
                    sx={{ fontWeight: 'bold' }} 
                  />
                </Tabs>
              </Box>

              {/* 右側：中英翻譯切換 */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={showChinese} 
                      onChange={(e) => setShowChinese(e.target.checked)} 
                      color="primary" 
                      size="small"
                    />
                  }
                  label={<Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>中英對照</Typography>}
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
          {tabIndex === 0 && (
            <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'secondary.main', mb: 1.5 }}>
                  AWS Certified Cloud Practitioner
                </Typography>
                <Typography variant="h6" color="text.secondary" fontWeight="normal">
                  (CLF-C02) Study Guide
                </Typography>
              </Box>

              <Stack spacing={2}>
                {AWS_STUDY_MATERIAL.map((section, idx) => (
                  <Accordion key={idx} disableGutters>
                    <AccordionSummary 
                      expandIcon={<ChevronDown color={theme.palette.primary.main} />} 
                      sx={{ bgcolor: 'white', borderRadius: 2, '&.Mui-expanded': { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderBottom: '1px solid', borderColor: 'grey.200' } }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', pr: 2 }}>
                        <Typography variant="h6" fontWeight="bold" color="secondary.main">
                          {section.domainEn}
                          {showChinese && (
                            <Typography component="span" variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                              ({section.domainZh})
                            </Typography>
                          )}
                        </Typography>
                        <Chip label={`Weight ${section.weight}`} size="small" color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ bgcolor: 'grey.50', pt: 3, pb: 4, px: { xs: 2, sm: 4 } }}>
                      <Stack spacing={4}>
                        {section.topics.map((topic, tIdx) => (
                          <Box key={tIdx}>
                            <Typography variant="subtitle1" fontWeight="bold" color="secondary.main" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ width: 4, height: 16, bgcolor: 'primary.main', borderRadius: 1 }} />
                              {topic.titleEn}
                              {showChinese && <span style={{ color: '#64748b', fontWeight: 'normal', fontSize: '0.95rem' }}>({topic.titleZh})</span>}
                            </Typography>
                            
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'text.primary', lineHeight: 1.8, ml: 1.5 }}>
                              {topic.contentEn}
                            </Typography>
                            
                            {showChinese && (
                              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', lineHeight: 1.8, ml: 1.5, mt: 1.5, p: 2, bgcolor: 'white', borderRadius: 2, border: '1px dashed', borderColor: 'grey.300' }}>
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
          )}

          {/* ========================================== */}
          {/* 模組二：模擬測驗 */}
          {/* ========================================== */}
          {tabIndex === 1 && (
            <Box sx={{ animation: 'fadeIn 0.5s ease-in-out' }}>
              
              {/* 1. 測驗開始畫面 (含設定) */}
              {!quizStarted && !showResults && (
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', py: { xs: 6, md: 8 }, px: { xs: 3, md: 6 }, borderRadius: 4 }}>
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{ width: 72, height: 72, borderRadius: '50%', bgcolor: 'primary.50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', mb: 3 }}>
                      <Cloud size={36} color={theme.palette.primary.main} />
                    </Box>
                    <Typography variant="h4" fontWeight="bold" color="secondary.main" gutterBottom>
                      CCP Mock Exam
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Customize your practice session before starting.
                    </Typography>
                  </Box>

                  {/* 測驗設定區域 */}
                  <Box sx={{ bgcolor: 'grey.50', p: { xs: 3, md: 4 }, borderRadius: 3, mb: 5, border: '1px solid', borderColor: 'grey.200' }}>
                    <Typography variant="h6" fontWeight="bold" color="secondary.main" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                      <Settings size={20} /> Exam Settings {showChinese && <Typography component="span" variant="body1" color="text.secondary">(測驗設定)</Typography>}
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="body1" fontWeight="bold" gutterBottom>
                        Number of Questions {showChinese && <span style={{ fontWeight: 'normal', color: '#64748b' }}>(題目數量)</span>}:
                      </Typography>
                      <TextField 
                        type="number"
                        value={questionCount}
                        onChange={(e) => {
                          let val = parseInt(e.target.value, 10);
                          if (isNaN(val)) val = 1;
                          if (val < 1) val = 1;
                          if (val > FULL_AWS_QUIZ_DATA.length) val = FULL_AWS_QUIZ_DATA.length;
                          setQuestionCount(val);
                        }}
                        inputProps={{ min: 1, max: FULL_AWS_QUIZ_DATA.length }}
                        size="small"
                        fullWidth
                        sx={{ bgcolor: 'white' }}
                      />
                    </Box>

                    <Box>
                      <Typography variant="body1" fontWeight="bold" gutterBottom>
                        Time Limit {showChinese && <span style={{ fontWeight: 'normal', color: '#64748b' }}>(時間限制)</span>}
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          value={timeLimit}
                          onChange={(e) => setTimeLimit(Number(e.target.value))}
                          sx={{ bgcolor: 'white' }}
                        >
                          <MenuItem value={0}>No Time Limit {showChinese && '(不限時)'}</MenuItem>
                          <MenuItem value={3}>3 Minutes {showChinese && '(3 分鐘)'}</MenuItem>
                          <MenuItem value={5}>5 Minutes {showChinese && '(5 分鐘)'}</MenuItem>
                          <MenuItem value={10}>10 Minutes {showChinese && '(10 分鐘)'}</MenuItem>
                          <MenuItem value={15}>15 Minutes {showChinese && '(15 分鐘)'}</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: 'center' }}>
                    <Button variant="contained" color="primary" size="large" onClick={startQuiz} sx={{ px: 8, py: 1.5, fontSize: '1.1rem' }} disableElevation>
                      Start Exam {showChinese && '(開始測驗)'}
                    </Button>
                  </Box>
                </Card>
              )}

              {/* 2. 測驗進行中畫面 */}
              {quizStarted && !showResults && (
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" sx={{ letterSpacing: 1 }}>
                      QUESTION {currentQIndex + 1} OF {activeQuizData.length}
                    </Typography>
                    
                    {/* 倒數計時器 */}
                    {timeLimit > 0 && (
                      <Chip 
                        icon={<Clock size={16} />} 
                        label={formatTime(timeRemaining)} 
                        color={timeRemaining <= 60 ? "error" : "primary"} // 最後1分鐘變紅色
                        variant={timeRemaining <= 60 ? "filled" : "outlined"}
                        sx={{ fontWeight: 'bold', fontSize: '1rem', minWidth: 80 }}
                      />
                    )}

                    <Button size="small" color="inherit" onClick={exitQuiz} sx={{ minWidth: 'auto', p: 1 }}>
                      Exit
                    </Button>
                  </Box>
                  
                  <LinearProgress 
                    variant="determinate" 
                    value={((currentQIndex) / activeQuizData.length) * 100} 
                    sx={{ mb: 5, height: 8, borderRadius: 4, bgcolor: 'grey.100', '& .MuiLinearProgress-bar': { borderRadius: 4 } }} 
                  />
                  
                  {/* 題目 (Question) 置於選項上方 */}
                  <Box sx={{ p: 3, mb: 4, bgcolor: 'grey.50', borderRadius: 3, borderLeft: '4px solid', borderColor: 'secondary.main' }}>
                    <Typography variant="h5" fontWeight="bold" color="secondary.main" sx={{ mb: showChinese ? 2 : 0, lineHeight: 1.5 }}>
                      {activeQuizData[currentQIndex].qEn}
                      {activeQuizData[currentQIndex].answers.length > 1 && (
                        <Typography component="span" sx={{ color: 'primary.main', ml: 1, fontWeight: 'bold' }}>
                          (Choose {activeQuizData[currentQIndex].answers.length})
                        </Typography>
                      )}
                    </Typography>
                    {showChinese && (
                      <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        {activeQuizData[currentQIndex].qZh}
                        {activeQuizData[currentQIndex].answers.length > 1 && (
                          <Typography component="span" sx={{ color: 'primary.main', ml: 1, fontWeight: 'bold' }}>
                            (請選 {activeQuizData[currentQIndex].answers.length} 項)
                          </Typography>
                        )}
                      </Typography>
                    )}
                  </Box>

                  {/* 選項 (Options) */}
                  <FormControl component="fieldset" sx={{ width: '100%', mb: 2 }}>
                    <Stack spacing={2}>
                      {activeQuizData[currentQIndex].optionsEn.map((optionEn, idx) => {
                        const optionZh = activeQuizData[currentQIndex].optionsZh[idx];
                        const isSelected = (selectedAnswers[currentQIndex] || []).includes(idx);
                        const isMulti = activeQuizData[currentQIndex].answers.length > 1;
                        const ControlComponent = isMulti ? Checkbox : Radio;

                        return (
                          <Paper 
                            key={idx} 
                            variant="outlined" 
                            sx={{ 
                              p: 1.5, 
                              borderRadius: 3,
                              cursor: 'pointer',
                              bgcolor: isSelected ? 'primary.50' : 'white',
                              borderColor: isSelected ? 'primary.main' : 'grey.300',
                              '&:hover': { borderColor: isSelected ? 'primary.main' : 'primary.light', bgcolor: isSelected ? 'primary.50' : 'grey.50' },
                              transition: 'all 0.2s ease'
                            }}
                            onClick={() => handleSelectOption(idx)}
                          >
                            <FormControlLabel 
                              control={<ControlComponent checked={isSelected} color="primary" />} 
                              label={
                                <Box sx={{ py: 0.5 }}>
                                  <Typography sx={{ fontWeight: isSelected ? 'bold' : 'normal', color: isSelected ? 'secondary.main' : 'text.primary', fontSize: '1.05rem' }}>
                                    {optionEn}
                                  </Typography>
                                  {showChinese && optionEn !== optionZh && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                      {optionZh}
                                    </Typography>
                                  )}
                                </Box>
                              } 
                              sx={{ width: '100%', m: 0, alignItems: 'flex-start' }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </Paper>
                        );
                      })}
                    </Stack>
                  </FormControl>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 5 }}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="large"
                      onClick={handleNextQ}
                      disabled={(selectedAnswers[currentQIndex] || []).length === 0}
                      sx={{ px: 5 }}
                      disableElevation
                    >
                      {currentQIndex === activeQuizData.length - 1 ? 'Submit & View Results' : 'Next Question'}
                    </Button>
                  </Box>
                </Card>
              )}

              {/* 3. 測驗結果與解析畫面 */}
              {showResults && (
                <Box>
                  <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: { xs: 4, sm: 6 }, textAlign: 'center', borderRadius: 4, mb: 4 }}>
                    {isPassed ? (
                      <Award size={64} color={theme.palette.success.main} style={{ margin: '0 auto', mb: 2 }} />
                    ) : (
                      <AlertTriangle size={64} color={theme.palette.warning.main} style={{ margin: '0 auto', mb: 2 }} />
                    )}
                    
                    <Typography variant="h3" fontWeight="bold" color={isPassed ? 'success.main' : 'warning.main'} gutterBottom>
                      {currentScore} / {activeQuizData.length}
                    </Typography>
                    
                    <Typography variant="h6" color="secondary.main" fontWeight="bold" gutterBottom>
                      {isPassed ? 'Congratulations! You passed the mock exam.' : 'Keep trying!'}
                    </Typography>
                    
                    <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
                      Passing score is {Math.round((passingScore / activeQuizData.length) * 100)}% ({passingScore} questions).
                      {timeLimit > 0 && timeRemaining === 0 && (
                        <span style={{ display: 'block', color: theme.palette.error.main, marginTop: 8, fontWeight: 'bold' }}>
                          (Time is up! 測驗時間已結束，系統自動交卷)
                        </span>
                      )}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                      <Button variant="outlined" color="secondary" onClick={exitQuiz}>
                        Home
                      </Button>
                      <Button variant="contained" color="primary" onClick={resetQuiz} startIcon={<RefreshCw size={18} />} disableElevation>
                        Retry Exam
                      </Button>
                    </Box>
                  </Card>

                  <Typography variant="h5" fontWeight="bold" color="secondary.main" sx={{ mb: 3 }}>
                    Review Answers (考題解析)
                  </Typography>

                  <Stack spacing={3}>
                    {activeQuizData.map((q, idx) => {
                      const userAns = selectedAnswers[idx] || [];
                      const correctAns = q.answers;
                      const isCorrect = userAns.length === correctAns.length && [...userAns].sort().every((v, i) => v === [...correctAns].sort()[i]);
                      
                      return (
                        <Paper 
                          key={idx} 
                          elevation={0}
                          sx={{ 
                            p: { xs: 3, sm: 4 }, 
                            borderRadius: 3, 
                            borderLeft: '6px solid', 
                            borderColor: isCorrect ? 'success.main' : 'error.main',
                            bgcolor: 'white',
                            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                          }}
                        >
                          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{ mt: 0.5 }}>
                              {isCorrect ? <CheckCircle size={22} color={theme.palette.success.main} /> : <X size={22} color={theme.palette.error.main} />}
                            </Box>
                            <Box>
                              <Typography variant="h6" fontWeight="bold" color="secondary.main" sx={{ lineHeight: 1.4 }}>
                                Q{idx + 1}. {q.qEn}
                              </Typography>
                              {showChinese && (
                                <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.4 }}>
                                  {q.qZh}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          
                          <Box sx={{ ml: { xs: 0, sm: 4.5 } }}>
                            <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                Your Answer (您的選擇)：
                                <Typography component="span" fontWeight={!isCorrect ? 'bold' : 'normal'} color={!isCorrect ? 'error.main' : 'text.primary'} sx={{ ml: 1 }}>
                                  {userAns.length > 0 ? userAns.map(i => q.optionsEn[i]).join(' | ') : 'Unanswered (未作答)'}
                                </Typography>
                              </Typography>
                              
                              {!isCorrect && (
                                <Typography variant="body2" color="text.secondary">
                                  Correct Answer (正確答案)：
                                  <Typography component="span" fontWeight="bold" color="success.main" sx={{ ml: 1 }}>
                                    {correctAns.map(i => q.optionsEn[i]).join(' | ')}
                                  </Typography>
                                </Typography>
                              )}
                            </Box>

                            <Box sx={{ p: 2, bgcolor: 'info.50', borderRadius: 2, border: '1px solid', borderColor: 'info.200' }}>
                              <Typography variant="body1" color="info.900" sx={{ lineHeight: 1.6 }}>
                                💡 <strong>Explanation:</strong> {q.expEn}
                              </Typography>
                              {showChinese && (
                                <Typography variant="body2" color="info.800" sx={{ mt: 1, lineHeight: 1.6 }}>
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
          )}

        </Container>

        {/* --- 手機版底部導航列 --- */}
        <Paper 
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', md: 'none' }, zIndex: 1000 }} 
          elevation={4}
        >
          <BottomNavigation
            showLabels
            value={tabIndex}
            onChange={(event, newValue) => {
              setTabIndex(newValue);
              window.scrollTo({ top: 0, behavior: 'smooth' }); // 切換時自動回到頂部
            }}
            sx={{
              height: 64,
              '& .Mui-selected': {
                color: 'primary.main',
              },
            }}
          >
            <BottomNavigationAction label="教學指南" icon={<BookOpen size={22} />} />
            <BottomNavigationAction label="模擬測驗" icon={<PlayCircle size={22} />} />
          </BottomNavigation>
        </Paper>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </Box>
    </ThemeProvider>
  );
}