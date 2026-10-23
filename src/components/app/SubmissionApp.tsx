import React from "react";
import FluentShell from "@/components/fluent/FluentShell";
import SubmissionForm from "@/components/fluent/SubmissionForm";

export const SubmissionApp: React.FC = () => (
  <FluentShell activeTab="submission" pageTitle="提交插件">
    <SubmissionForm />
  </FluentShell>
);

export default SubmissionApp;
