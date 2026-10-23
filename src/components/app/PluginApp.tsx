import React from "react";
import FluentShell from "@/components/fluent/FluentShell";
import PluginDetail from "@/components/fluent/PluginDetail";
import type { PluginEntry } from "@/lib/types";

interface PluginAppProps {
  plugin: PluginEntry;
}

export const PluginApp: React.FC<PluginAppProps> = ({ plugin }) => (
  <FluentShell activeTab="explore" pageTitle={plugin.name}>
    <PluginDetail plugin={plugin} />
  </FluentShell>
);

export default PluginApp;
