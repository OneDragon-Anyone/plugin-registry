import React from "react";
import FluentShell from "@/components/fluent/FluentShell";

const risks = [
  { tag: "filesystem", name: "文件系统", desc: "读写插件自身目录以外的文件或系统路径" },
  { tag: "network", name: "网络访问", desc: "发送外网 HTTP 请求或建立 Socket 网络连接" },
  { tag: "account", name: "账号相关", desc: "涉及账号凭据管理、密码输入或敏感配置" },
  { tag: "automation", name: "模拟操作", desc: "模拟键盘点击、鼠标移动与自动化挂机" },
  { tag: "ocr", name: "文字识别", desc: "使用 OCR 引擎解析游戏画面中的文字" },
  { tag: "yolo", name: "目标检测", desc: "使用深度学习模型定位游戏画面特征" },
  { tag: "clipboard", name: "系统剪贴板", desc: "读取或修改系统剪贴板数据" },
  { tag: "process", name: "系统进程", desc: "探测、打开或交互游戏与第三方系统进程" }
];

const statuses = [
  { tag: "listed", name: "已上架", desc: "审核通过，在商店正常展示，允许安装与更新" },
  { tag: "deprecated", name: "已弃用", desc: "作者或平台停止推荐，展示弃用警告，允许继续使用" },
  { tag: "hidden", name: "已隐藏", desc: "不出现在商店列表中，仅支持通过直链安装访问" },
  { tag: "suspended", name: "已暂停", desc: "存在安全风险或严重违规，已暂停分发与更新" },
  { tag: "removed", name: "已移除", desc: "完全从索引中删除" }
];

export const PolicyApp: React.FC = () => (
  <FluentShell activeTab="policy" pageTitle="规范说明">
    <div className="page page--medium">
      <header className="page-header">
        <h1 className="page-title">规范说明</h1>
      </header>

      <section className="surface surface--padded">
        <h2 className="section-title mb-3">权限与安全风险标签</h2>
        <div className="policy-grid">
          {risks.map((risk) => (
            <div key={risk.tag} className="policy-item">
              <div className="policy-item-head">
                <span className="tag-code">{risk.tag}</span>
                <span className="text-caption font-medium">{risk.name}</span>
              </div>
              <div className="text-caption">{risk.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="surface surface--padded">
        <h2 className="section-title mb-3">插件分发状态定义</h2>
        <div className="policy-grid">
          {statuses.map((status) => (
            <div key={status.tag} className="policy-item">
              <div className="policy-item-head">
                <span className="tag-code mono">{status.tag}</span>
                <span className="text-caption font-medium">{status.name}</span>
              </div>
              <div className="text-caption">{status.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </FluentShell>
);

export default PolicyApp;
