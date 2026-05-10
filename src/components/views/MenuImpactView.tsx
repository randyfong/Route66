"use client";

import { GlassCard } from "../ui/GlassCard";
import { Order } from "@/data/mockData";
import { Utensils, TrendingUp } from "lucide-react";

export function MenuImpactView({ orders }: { orders: Order[] }) {
  const itemCounts: Record<string, number> = {};
  const promoCounts: Record<string, number> = {};
  
  orders.forEach(order => {
    order.items.forEach(item => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
    if (order.appliedPromotion) {
      promoCounts[order.appliedPromotion] = (promoCounts[order.appliedPromotion] || 0) + 1;
    }
  });

  const topItems = Object.entries(itemCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topPromos = Object.entries(promoCounts)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <h2 className="text-3xl font-bold tracking-tight text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Menu & Promotions</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6" neonColor="teal">
          <div className="flex items-center space-x-3 mb-6">
            <Utensils className="h-6 w-6 text-teal-400" />
            <h3 className="text-xl font-bold text-white">Most Popular Items</h3>
          </div>
          <div className="space-y-4">
            {topItems.map(([item, count], index) => (
              <div key={item} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-white/40 font-mono w-4">{index + 1}.</span>
                  <span className="text-white/90">{item}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-teal-300 font-bold">{count}</span>
                  <span className="text-white/40 text-xs">orders</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6" neonColor="red">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="h-6 w-6 text-red-400" />
            <h3 className="text-xl font-bold text-white">Promotion Impact</h3>
          </div>
          <div className="space-y-4">
            {topPromos.map(([promo, count]) => (
              <div key={promo} className="flex flex-col space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-medium">{promo}</span>
                  <span className="text-red-300 font-bold">{count} uses</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-red-400 h-2 rounded-full" 
                    style={{ width: `${Math.min((count / 500) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
