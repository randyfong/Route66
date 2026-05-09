"use client";

import { GlassCard } from "../ui/GlassCard";
import { orders } from "@/data/mockData";
import { DollarSign, Users, TrendingUp, Tag } from "lucide-react";

export function OverviewView() {
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const newCustomers = 12; // mock
  const campaignRoi = "+24%"; // mock
  
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
        <GlassCard className="lg:col-span-2 p-6 min-h-[300px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white/80 mb-2">Campaign Performance</h3>
            <p className="text-sm text-white/50">Chart visualization would go here</p>
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
