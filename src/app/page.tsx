"use client";

import { useState } from "react";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { OverviewView } from "@/components/views/OverviewView";
import { CustomerLoyaltyView } from "@/components/views/CustomerLoyaltyView";
import { MenuImpactView } from "@/components/views/MenuImpactView";
import { customers, orders } from "@/data/mockData";

type ViewType = "overview" | "loyalty" | "menu";

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>("overview");

  // Provide data to Copilot
  useCopilotReadable({
    description: "The full list of diner customers, including their loyalty tier, join date, and total spent.",
    value: customers,
  });

  useCopilotReadable({
    description: "A summary of recent diner orders, including applied promotions and purchased items.",
    value: orders.slice(0, 100), // limiting to 100 to save context window if necessary, but AI can analyze it
  });

  // Provide actions to Copilot
  useCopilotAction({
    name: "setDashboardView",
    description: "Changes the visible dashboard view based on the user's inquiry.",
    parameters: [
      {
        name: "viewType",
        type: "string",
        description: "The type of view to show. Must be 'overview', 'loyalty', or 'menu'. Use 'loyalty' for questions about customers or retention. Use 'menu' for questions about popular items or promotions. Use 'overview' for general revenue or ROI.",
        required: true,
      },
    ],
    handler: ({ viewType }) => {
      if (["overview", "loyalty", "menu"].includes(viewType)) {
        setCurrentView(viewType as ViewType);
        return `Successfully changed view to ${viewType}`;
      }
      return `Invalid view type: ${viewType}`;
    },
  });

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-300 to-teal-300 drop-shadow-[0_0_15px_rgba(244,114,182,0.4)]">
            Route 66 Diner Dashboard
          </h1>
          <p className="text-white/60 mt-2">Ask the AI assistant to analyze the data and update the views.</p>
        </header>

        {currentView === "overview" && <OverviewView />}
        {currentView === "loyalty" && <CustomerLoyaltyView />}
        {currentView === "menu" && <MenuImpactView />}
      </div>
    </main>
  );
}
