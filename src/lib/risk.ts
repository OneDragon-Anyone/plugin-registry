import type { RiskTag } from "./types";

export const riskLabels: Record<RiskTag, string> = {
  filesystem: "文件系统",
  network: "网络访问",
  account: "账号相关",
  automation: "自动化操作",
  ocr: "OCR",
  yolo: "YOLO",
  clipboard: "剪贴板",
  process: "进程调用"
};

export const riskDescriptions: Record<RiskTag, string> = {
  filesystem: "读取或写入本地文件",
  network: "访问外部网络资源",
  account: "可能接触账号状态或登录相关数据",
  automation: "自动执行游戏内操作",
  ocr: "读取屏幕文字内容",
  yolo: "使用图像识别模型",
  clipboard: "读取或写入系统剪贴板",
  process: "调用或检查本地进程"
};
