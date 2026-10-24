import React from "react";
import { renderToString } from "react-dom/server";
import {
  createDOMRenderer,
  RendererProvider,
  renderToStyleElements
} from "@fluentui/react-components";
import { IslandStyleRendererContext } from "./fluent-ssr-context";

/**
 * Astro 的 React island 不会输出 griffel 运行时样式，首帧到 hydration 完成之间
 * Fluent 组件会以无样式状态闪现（FOUC）。这里在页面构建期把 island 用到的
 * griffel 样式渲染成 <style data-make-styles-bucket> 注入 <head>，首帧即完整。
 * FluentShell 会通过 IslandStyleRendererContext 复用这里的 renderer；客户端
 * RendererProvider 挂载时 rehydrateRendererCache 会从这些标签恢复 insertionCache，
 * hydration 不会重复插入同样的规则。
 * 注意：.astro frontmatter 不支持 JSX，故传组件与 props 而非元素。
 */
export function extractFluentStyles<P extends object>(
  Component: React.ComponentType<P>,
  props?: P
): string {
  const renderer = createDOMRenderer();
  renderToString(
    <IslandStyleRendererContext.Provider value={renderer}>
      <RendererProvider renderer={renderer}>
        {React.createElement(Component as React.ComponentType, props)}
      </RendererProvider>
    </IslandStyleRendererContext.Provider>
  );
  return renderToStyleElements(renderer)
    .map((element) => renderToString(element))
    .join("");
}
