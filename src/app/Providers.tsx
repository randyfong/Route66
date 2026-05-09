"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit 
      runtimeUrl="/api/copilotkit" 
      useSingleEndpoint 
    >
      <CopilotSidebar
        defaultOpen
        labels={{
          title: "Diner Assistant",
          initial: "Welcome to the Diner Dashboard! How can I help you analyze the data today?",
        }}
        className="h-full"
      >
        {children}
      </CopilotSidebar>
    </CopilotKit>
  );
}
