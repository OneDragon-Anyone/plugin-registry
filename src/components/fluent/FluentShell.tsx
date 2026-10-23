import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  FluentProvider,
  SSRProvider,
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  Tooltip
} from "@fluentui/react-components";
import {
  Apps20Regular,
  AddCircle20Regular,
  DocumentText20Regular,
  Code20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
  Open20Regular,
  Navigation20Regular,
  Dismiss20Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular
} from "@fluentui/react-icons";
import { withBase } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { win11Themes } from "@/theme/win11";
import {
  applyThemeMode,
  persistThemeMode,
  resolveThemeMode,
  type ThemeMode
} from "@/theme/mode";

type NavKey = "explore" | "submission" | "policy" | "api";

interface FluentShellProps {
  activeTab?: NavKey;
  pageTitle?: string;
  children?: React.ReactNode;
}

const NAV_COLLAPSED_KEY = "zzzod-nav-collapsed";

const navItems: { key: NavKey; label: string; href: string; icon: React.ReactNode }[] = [
  { key: "explore", label: "插件市场", href: "/", icon: <Apps20Regular /> },
  { key: "submission", label: "提交插件", href: "/submission/", icon: <AddCircle20Regular /> },
  { key: "policy", label: "规范说明", href: "/policy/", icon: <DocumentText20Regular /> },
  { key: "api", label: "API 文档", href: "/api-docs/", icon: <Code20Regular /> }
];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const Brand: React.FC<{ collapsed: boolean }> = ({ collapsed }) => (
  <a href={withBase("/")} className="app-brand" aria-label="ZZZOD Plugins 首页">
    <span className="app-logo" aria-hidden="true">
      OD
    </span>
    {!collapsed && (
      <span className="app-brand-text">
        <strong>ZZZOD</strong>
        <span>Plugins</span>
      </span>
    )}
  </a>
);

const NavList: React.FC<{
  activeTab: NavKey;
  collapsed?: boolean;
  onNavigate?: () => void;
}> = ({ activeTab, collapsed = false, onNavigate }) => (
  <nav className="app-nav" aria-label="主导航">
    {navItems.map((item) => (
      <a
        key={item.key}
        href={withBase(item.href)}
        className="nav-item"
        aria-current={activeTab === item.key ? "page" : undefined}
        aria-label={item.label}
        title={collapsed ? item.label : undefined}
        onClick={onNavigate}
      >
        <span className="nav-icon" aria-hidden="true">
          {item.icon}
        </span>
        {!collapsed && <span className="nav-label">{item.label}</span>}
      </a>
    ))}
  </nav>
);

export const FluentShell: React.FC<FluentShellProps> = ({
  activeTab = "explore",
  pageTitle,
  children
}) => {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const initial = resolveThemeMode();
    setMode(initial);
    applyThemeMode(initial);
  }, []);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(NAV_COLLAPSED_KEY) === "1");
    } catch {
      // localStorage 不可用时保持展开
    }
  }, []);

  const toggleTheme = () => {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
    applyThemeMode(next);
    persistThemeMode(next);
  };

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(NAV_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // 忽略存储失败
      }
      return next;
    });
  };

  const currentLabel = navItems.find((item) => item.key === activeTab)?.label ?? "";
  const title = pageTitle ?? currentLabel;

  return (
    <SSRProvider>
      <FluentProvider theme={win11Themes[mode]} className="app-provider">
        <div className="app-wallpaper" aria-hidden="true" />
        <div className="app-shell">
          <aside
            className={`app-sidebar${collapsed ? " app-sidebar--collapsed" : ""}`}
            aria-label="应用导航"
          >
            <Brand collapsed={collapsed} />
            <NavList activeTab={activeTab} collapsed={collapsed} />
            <div className="app-sidebar-footer">
              <Tooltip
                content={collapsed ? "展开导航" : "收起导航"}
                relationship="label"
                positioning="after"
              >
                <Button
                  className="sidebar-button"
                  appearance="subtle"
                  size="small"
                  icon={
                    collapsed ? <ChevronRight20Regular /> : <ChevronLeft20Regular />
                  }
                  onClick={toggleCollapsed}
                  aria-label={collapsed ? "展开导航" : "收起导航"}
                >
                  <span className="sidebar-label">收起导航</span>
                </Button>
              </Tooltip>
              <div className="sidebar-meta">Registry v1</div>
            </div>
          </aside>

          <div className="app-main">
            <header className="app-commandbar">
              <Button
                className="mobile-only"
                appearance="subtle"
                icon={<Navigation20Regular />}
                onClick={() => setMobileOpen(true)}
                aria-label="打开导航"
              />
              <span className="app-commandbar-title">{title}</span>
              <div className="app-commandbar-spacer" />
              <div className="app-commandbar-actions">
                <Tooltip
                  content={mode === "dark" ? "切换为浅色模式" : "切换为暗色模式"}
                  relationship="label"
                >
                  <Button
                    appearance="subtle"
                    icon={
                      mode === "dark" ? <WeatherSunny20Regular /> : <WeatherMoon20Regular />
                    }
                    onClick={toggleTheme}
                    aria-label={mode === "dark" ? "切换为浅色模式" : "切换为暗色模式"}
                  />
                </Tooltip>
                <Tooltip content="访问 GitHub 仓库" relationship="label">
                  <Button
                    appearance="subtle"
                    icon={<Open20Regular />}
                    as="a"
                    href={`https://github.com/${siteConfig.repoOwner}/${siteConfig.repoName}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="访问 GitHub 仓库"
                  >
                    <span className="desktop-only">GitHub</span>
                  </Button>
                </Tooltip>
              </div>
            </header>

            <main className="app-content">
              <div className="app-content-inner">{children}</div>
            </main>

            <footer className="app-footer">
              <div className="app-footer-inner">
                <span>{siteConfig.name}</span>
                <div className="flex gap-4">
                  <a href={withBase("/api-docs/")}>API</a>
                  <a href={withBase("/policy/")}>政策</a>
                  <a
                    href={`https://github.com/${siteConfig.repoOwner}/${siteConfig.repoName}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>

        <OverlayDrawer
          className="mobile-drawer"
          open={mobileOpen}
          onOpenChange={(_, data) => setMobileOpen(data.open)}
          position="start"
          size="small"
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  icon={<Dismiss20Regular />}
                  onClick={() => setMobileOpen(false)}
                  aria-label="关闭导航"
                />
              }
            >
              导航
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody>
            <NavList activeTab={activeTab} onNavigate={() => setMobileOpen(false)} />
          </DrawerBody>
        </OverlayDrawer>
      </FluentProvider>
    </SSRProvider>
  );
};

export default FluentShell;
