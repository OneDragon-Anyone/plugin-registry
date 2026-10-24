import React from "react";
import type { GriffelRenderer } from "@fluentui/react-components";

/**
 * 仅在构建期样式提取（extractFluentStyles）时提供 renderer：FluentShell 检测到
 * 上游注入即复用它，样式即可被提取方收集。客户端永远不提供，保持 null。
 * 单独成文件避免 FluentShell 牵入 react-dom/server。
 */
export const IslandStyleRendererContext =
  React.createContext<GriffelRenderer | null>(null);
