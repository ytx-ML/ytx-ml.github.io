window.SITE_DATA = {
  // 个人资料：留空的链接和可选文本会自动隐藏。
  profile: {
    name: "Yutong Xie",
    chineseName: "谢宇通",
    role: "M.S. Student at Southeast University",
    affiliation: "Southeast University",
    affiliationUrl: "", // 可选：学校或学院主页，留空则只显示名称
    location: "Nanjing, Jiangsu, China",
    email: "ytxie@seu.edu.cn",
    github: "https://github.com/ytx-ML",
    googleScholar: "https://scholar.google.com/citations?hl=zh-CN&user=FvRjCgsAAAAJ", // 填入个人主页地址后，资料区和 Publications 旁的入口同时生效
    cv: "assets/resume.pdf",
    profileImage: "assets/profile.jpg",
    advisorName: "Prof. Yuheng Jia",
    advisorUrl: "https://jyh-learning.github.io/",
    shortBio: "I am currently a M.S. student in Software Engineering at Southeast University, under the supervision of Prof. Yuheng Jia. Before that, I obtained my B.S. degree in 2025 from Southeast University. My research focuses on Multimodal Large Language Models (MLLMs), reliable machine learning and weakly supervised learning, including hallucination mitigation and confidence calibration.",
  },
  // News：把新动态放在数组开头；不需要跳转时，link 留空或省略。
  news: [
    {
      date: "2026.10",
      text: "Received the National Scholarship for M.S. Students.",
      kind: "award"
    },
    {
      date: "2026.09",
      text: "Our work \"Do Not Train Away Uncertainty: Early Uncertainty Anchored Calibration\" is available on arXiv.",
      link: "https://arxiv.org/abs/2610.12048",
      kind: "paper"
    },
    {
      date: "2026.09",
      text: "Our work \"Attention Heads are Complementary Visual Units: Mitigating Hallucinations in LVLMs via Adaptive Visual Cues Focusing\" is accepted by NeurIPS 2026.",
      link: "https://neurips.cc/virtual/2026/loc/sydney/poster/149428",
      kind: "paper"
    },
    {
      date: "2026.05",
      text: "Our work \"Finding the Correct Visual Evidence Without Forgetting: Mitigating Hallucination in LVLMs via Inter-Layer Visual Attention Discrepancy\" is accepted by ICML 2026.",
      link: "https://proceedings.mlr.press/v306/xie26m.html",
      kind: "paper"
    },
    {
      date: "2025.05",
      text: "Our work “Partial Label Clustering” is accepted by IJCAI 2025.",
      link: "https://www.ijcai.org/proceedings/2025/743",
      kind: "paper"
    }
  ],
  // Honors & Awards：机构不确定时 organization 留空，页面会自动隐藏该列。
  awards: [
    {
      date: "2026.10",
      title: "National Scholarship for M.S. Students",
      organization: "The Chinese Ministry of Education"
    },
    {
      date: "2026.10",
      title: "Merit Graduate Student",
      organization: "Southeast University"
    },
    {
      date: "2023.10",
      title: "Excellent Student Cadre",
      organization: "Southeast University"
    },
    {
      date: "2023.05",
      title: "Excellent League Member",
      organization: "Southeast University"
    },
  ],
  publications: [
    {
      title: "Attention Heads are Complementary Visual Units: Mitigating Hallucinations in LVLMs via Adaptive Visual Cues Focusing",
      authors: ["Zhenglin Hua", "Yutong Xie", "Yaxin Hou", "Jiawei Tang", "Jinghan He", "Haiyun Guo", "Junfeng Fang", "Yuheng Jia"],
      venue: "Annual Conference on Neural Information Processing Systems",
      venueShort: "NeurIPS 2026",
      year: "2026",
      type: "accepted",
      ccfRank: "A",
      image: "assets/verda.png", // 例如 "assets/publications/verda.png"
      imageAlt: "", // 图片内容说明，可选
      summary: "A training-free method that preserves complementary visual cues across attention heads and redistributes attention to reduce hallucinations.",
      links: [
        { label: "Paper", url: "https://neurips.cc/virtual/2026/loc/sydney/poster/149428" },
        { label: "Code", url: "https://github.com/huazhenglin2003/VerDA" }
      ]
    },
    {
      title: "Finding the Correct Visual Evidence Without Forgetting: Mitigating Hallucination in LVLMs via Inter-Layer Visual Attention Discrepancy",
      authors: ["Yutong Xie", "Zhenglin Hua", "Ran Wang", "Wing W. Y. Ng", "Xizhao Wang", "Yuheng Jia"],
      venue: "International Conference on Machine Learning",
      venueShort: "ICML 2026",
      year: "2026",
      type: "accepted",
      ccfRank: "A",
      image: "assets/ilvad.png", // 例如 "assets/publications/ilvad.png"
      imageAlt: "",
      summary: "ILVAD identifies repeatedly activated visual evidence from inter-layer attention discrepancy and reinforces it throughout generation.",
      links: [
        { label: "Paper", url: "https://proceedings.mlr.press/v306/xie26m.html" },
        { label: "Code", url: "https://github.com/ytx-ML/ILVAD" }
      ]
    },
    {
      title: "Do Not Train Away Uncertainty: Early Uncertainty Anchored Calibration",
      authors: ["Yutong Xie", "Jiawei Tang", "Zhenglin Hua", "Yuxiang Ma", "Si Qin", "Yaxin Hou", "Hui Liu", "Junhui Hou", "Yuheng Jia"],
      venue: "arXiv preprint",
      venueShort: "arXiv 2026",
      year: "2026",
      type: "preprint",
      image: "assets/eua-cal.png", // 例如 "assets/publications/eua-cal.png"
      imageAlt: "",
      summary: "EUA-Cal uses an early model as an uncertainty anchor to preserve predictive and feature-space uncertainty during continued training.",
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2610.12048" }
      ]
    },
    {
      title: "Partial Label Clustering",
      authors: ["Yutong Xie", "Fuchao Yang", "Yuheng Jia"],
      venue: "International Joint Conference on Artificial Intelligence",
      venueShort: "IJCAI 2025",
      year: "2025",
      type: "accepted",
      ccfRank: "A",
      image: "assets/plc.png", // 例如 "assets/publications/plc.png"
      imageAlt: "",
      summary: "A joint framework that connects partial-label disambiguation, pairwise-constraint propagation, and graph learning for clustering with limited annotations.",
      links: [
        { label: "Paper", url: "https://www.ijcai.org/proceedings/2025/743" },
        { label: "Code", url: "https://github.com/xyt-ml/PLC" }
      ]
    }
  ]
};
