"use client";

import { GlassCard } from "../ui/GlassCard";
import { orders } from "@/data/mockData";
import { DollarSign, Users, TrendingUp, Tag } from "lucide-react";

export function OverviewView() {
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const newCustomers = 12; // mock
  const campaignRoi = "+24%"; // mock
  const promotedOrders = orders.filter((order) => order.appliedPromotion);
  const promotedRevenue = promotedOrders.reduce((sum, order) => sum + order.amount, 0);
  const promotedOrderShare = Math.round((promotedOrders.length / orders.length) * 100);
  const averagePromotedTicket = promotedRevenue / promotedOrders.length;
  const promoLift = promotedRevenue * 0.24;
  const promotionBreakdown = Object.values(
    promotedOrders.reduce<
      Record<string, { name: string; orders: number; revenue: number }>
    >((result, order) => {
      const name = order.appliedPromotion ?? "None";
      result[name] ??= { name, orders: 0, revenue: 0 };
      result[name].orders += 1;
      result[name].revenue += order.amount;
      return result;
    }, {})
  ).sort((a, b) => b.revenue - a.revenue);
  const topPromotionRevenue = Math.max(
    ...promotionBreakdown.map((promotion) => promotion.revenue)
  );
  
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <h2 className="text-3xl font-bold tracking-tight text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Overview</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard neonColor="teal" className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-teal-500/20 rounded-full text-teal-300">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">Total Revenue</p>
              <h3 className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</h3>
            </div>
          </div>
        </GlassCard>

        <GlassCard neonColor="red" className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-500/20 rounded-full text-red-400">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">New Customers</p>
              <h3 className="text-2xl font-bold text-white">+{newCustomers}</h3>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-full text-blue-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">Campaign ROI</p>
              <h3 className="text-2xl font-bold text-white">{campaignRoi}</h3>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-300">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/60">Active Promos</p>
              <h3 className="text-2xl font-bold text-white">4</h3>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6 min-h-[300px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white/90">Campaign Performance</h3>
                <p className="text-sm text-white/50">Revenue and order impact by active promotion</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-wider text-white/40">Promoted Revenue</p>
                <p className="text-2xl font-bold text-teal-300">${promotedRevenue.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">Promo Orders</p>
                <p className="mt-2 text-2xl font-bold text-white">{promotedOrders.length}</p>
                <p className="mt-1 text-sm text-white/50">{promotedOrderShare}% of all orders</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">Avg Promo Ticket</p>
                <p className="mt-2 text-2xl font-bold text-white">${averagePromotedTicket.toFixed(2)}</p>
                <p className="mt-1 text-sm text-white/50">Across promoted checks</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">Estimated Lift</p>
                <p className="mt-2 text-2xl font-bold text-white">${promoLift.toFixed(2)}</p>
                <p className="mt-1 text-sm text-white/50">Based on {campaignRoi} ROI</p>
              </div>
            </div>

            <div className="space-y-4">
              {promotionBreakdown.map((promotion) => (
                <div key={promotion.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white/90">{promotion.name}</p>
                      <p className="text-xs text-white/45">{promotion.orders} orders</p>
                    </div>
                    <p className="text-sm font-bold text-white">${promotion.revenue.toFixed(2)}</p>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-red-400 via-pink-400 to-teal-300"
                      style={{ width: `${Math.max((promotion.revenue / topPromotionRevenue) * 100, 8)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-white/80 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex justify-between items-center pb-4 border-b border-white/10 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-white/90">{order.id}</p>
                  <p className="text-xs text-white/50">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">${order.amount.toFixed(2)}</p>
                  <p className="text-xs text-teal-300">{order.appliedPromotion || 'None'}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
