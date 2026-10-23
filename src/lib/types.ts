export type RegistryStatus = "listed" | "hidden" | "deprecated" | "suspended" | "removed";

export const RISK_TAGS = [
  "filesystem",
  "network",
  "account",
  "automation",
  "ocr",
  "yolo",
  "clipboard",
  "process"
] as const;

export type RiskTag = (typeof RISK_TAGS)[number];

export type WarningCode =
  | "version_not_increased"
  | "asset_changed"
  | "id_mismatch"
  | "missing_asset"
  | "invalid_package"
  | "repo_identity_changed"
  | "repo_unreachable";

export interface PluginWarning {
  code: WarningCode;
  message: string;
  version?: string;
}

export interface PluginAuthor {
  name: string;
  url: string;
}

export interface PluginRelease {
  version: string;
  versionCode: number;
  tag: string;
  commit: string;
  prerelease: boolean;
  immutable: boolean;
  publishedAt: string;
  changelogHtml: string;
  downloadUrl: string;
  assetName: string;
  size: number;
  sha256: string;
}

export interface PluginCompatibility {
  minAppVersion: string;
  minCoreApiVersion: number;
  python: string;
}

export interface PluginCapabilities {
  hasAppSetting: boolean;
  defaultGroup: boolean;
  needNotify: boolean;
}

export interface PluginEntry {
  id: string;
  name: string;
  summary: string;
  repo: string;
  repoId: number;
  author: PluginAuthor;
  cover: string;
  stars: number;
  downloads: number;
  stale: boolean;
  readmeHtml: string;
  tags: string[];
  risk: RiskTag[];
  status: Exclude<RegistryStatus, "removed">;
  pinned: boolean;
  warnings: PluginWarning[];
  compatibility: PluginCompatibility;
  capabilities: PluginCapabilities;
  latest: PluginRelease | null;
  latestBeta: PluginRelease | null;
  releases: PluginRelease[];
  updatedAt: string;
}

export interface RegistryIndex {
  schemaVersion: 1;
  generatedAt: string;
  buildId: string;
  pluginCount: number;
}

export interface SearchEntry {
  id: string;
  name: string;
  summary: string;
  author: string;
  tags: string[];
  risk: RiskTag[];
}

export interface RegistrySourceEntry {
  id: string;
  repo: string;
  repoId: number;
  tags: string[];
  extraRisk?: RiskTag[];
  status: RegistryStatus;
  pinned?: boolean;
  review: {
    issue?: number;
    pr?: number;
    submittedBy: string;
  };
}

export interface RegistryPolicy {
  reservedIds: string[];
  bannedRepoIds: number[];
  bannedUsers: string[];
  maxZipBytes: number;
  maxCoverBytes: number;
  keepReleases: number;
  repoUnreachableDays: number;
  rateLimit: {
    maxOpenSubmissionsPerUser: number;
    windowHours: number;
  };
}
