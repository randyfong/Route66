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
  const [dashboardOrderIds, setDashboardOrderIds] = useState<string[] | null>(null);
  const [dashboardScope, setDashboardScope] = useState({
    title: "All Orders",
    description: "Revenue and order impact by active promotion",
  });
  const dashboardOrders = dashboardOrderIds
    ? orders.filter((order) => dashboardOrderIds.includes(order.id))
    : orders;

  // Provide data to Copilot
  useCopilotReadable({
    description: "The full list of diner customers, including their loyalty tier, join date, and total spent.",
    value: customers,
  });

  useCopilotReadable({
    description: "A summary of recent diner orders, including applied promotions and purchased items.",
    value: orders.slice(0, 100), // limiting to 100 to save context window if necessary, but AI can analyze it
  });

  useCopilotReadable({
    description:
      "Current dashboard state. If the user asks to update, reflect, filter, or show specific orders in the dashboard, call updateDashboardOrders so the UI changes.",
    value: {
      currentView,
      dashboardScope,
      visibleOrderCount: dashboardOrders.length,
    },
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

  useCopilotAction(
    {
      name: "updateDashboardOrders",
      description:
        "Updates the dashboard UI to reflect a selected set of orders. Call this whenever the user asks to update, reflect, filter, visualize, or show orders on the dashboard. If the user says 'these orders', use the order IDs from your previous response. This action changes the dashboard cards, campaign performance panel, and recent orders list.",
      parameters: [
        {
          name: "orderIds",
          type: "string[]",
          description:
            "Specific order IDs to show, such as ['ORD-00067', 'ORD-00029']. Leave empty when using date or promotion filters.",
          required: false,
        },
        {
          name: "promotion",
          type: "string",
          description:
            "Optional promotion name to filter by, such as 'Weekend Family Combo', 'Summer Shake Sale', or 'None' for orders without a promotion.",
          required: false,
        },
        {
          name: "dateFrom",
          type: "string",
          description: "Optional start date in YYYY-MM-DD format.",
          required: false,
        },
        {
          name: "dateTo",
          type: "string",
          description: "Optional end date in YYYY-MM-DD format.",
          required: false,
        },
        {
          name: "limit",
          type: "number",
          description: "Optional maximum number of matching orders to show.",
          required: false,
        },
        {
          name: "title",
          type: "string",
          description: "Short label for the current dashboard selection.",
          required: false,
        },
      ],
      handler: ({ orderIds = [], promotion, dateFrom, dateTo, limit, title }) => {
        let selectedOrders = orders;
        const normalizedOrderIds = orderIds
          .map((orderId) => orderId.trim().toUpperCase())
          .filter(Boolean);

        if (normalizedOrderIds.length > 0) {
          const selectedOrderIdSet = new Set(normalizedOrderIds);
          selectedOrders = selectedOrders.filter((order) => selectedOrderIdSet.has(order.id));
        }

        if (promotion) {
          const normalizedPromotion = promotion.trim().toLowerCase();
          selectedOrders = selectedOrders.filter((order) => {
            const orderPromotion = order.appliedPromotion ?? "None";
            return orderPromotion.toLowerCase() === normalizedPromotion;
          });
        }

        if (dateFrom) {
          selectedOrders = selectedOrders.filter((order) => order.date >= dateFrom);
        }

        if (dateTo) {
          selectedOrders = selectedOrders.filter((order) => order.date <= dateTo);
        }

        if (typeof limit === "number" && limit > 0) {
          selectedOrders = selectedOrders.slice(0, limit);
        }

        setCurrentView("overview");
        setDashboardOrderIds(selectedOrders.map((order) => order.id));
        setDashboardScope({
          title: title || `${selectedOrders.length} Selected Orders`,
          description:
            normalizedOrderIds.length > 0
              ? "Dashboard metrics are filtered to the order IDs selected from chat"
              : "Dashboard metrics are filtered by the chat request",
        });

        return `Updated the dashboard to show ${selectedOrders.length} matching orders.`;
      },
    },
    []
  );

  useCopilotAction(
    {
      name: "resetDashboardOrders",
      description:
        "Resets the dashboard UI back to all diner orders. Call this when the user asks to clear filters, reset the dashboard, or show all orders.",
      handler: () => {
        setCurrentView("overview");
        setDashboardOrderIds(null);
        setDashboardScope({
          title: "All Orders",
          description: "Revenue and order impact by active promotion",
        });
        return "Reset the dashboard to all orders.";
      },
    },
    []
  );

  return (
    <main className="flex-1 min-h-screen p-8 overflow-y-auto bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-white/10 pb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-300 to-teal-300 drop-shadow-[0_0_15px_rgba(244,114,182,0.4)]">
            Route 66 Diner Dashboard
          </h1>
          <p className="text-white/60 mt-2">Ask the AI assistant to analyze the data and update the views.</p>
        </header>

        {currentView === "overview" && (
          <OverviewView
            orders={dashboardOrders}
            scopeTitle={dashboardScope.title}
            scopeDescription={dashboardScope.description}
          />
        )}
        {currentView === "loyalty" && <CustomerLoyaltyView />}
        {currentView === "menu" && <MenuImpactView />}
      </div>
    </main>
  );
}
