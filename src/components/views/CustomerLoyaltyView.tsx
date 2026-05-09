"use client";

import { GlassCard } from "../ui/GlassCard";
import { customers } from "@/data/mockData";
import { Award, Star } from "lucide-react";

export function CustomerLoyaltyView() {
  const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 10);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'text-purple-400 bg-purple-400/20';
      case 'Gold': return 'text-yellow-400 bg-yellow-400/20';
      case 'Silver': return 'text-gray-300 bg-gray-300/20';
      case 'Bronze': return 'text-amber-600 bg-amber-600/20';
      default: return 'text-white/60 bg-white/10';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <h2 className="text-3xl font-bold tracking-tight text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Customer Loyalty</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
           <div className="flex items-center space-x-4 mb-4">
             <div className="p-3 bg-red-500/20 rounded-full text-red-400">
               <Award className="h-6 w-6" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-white">Retention Rate</h3>
               <p className="text-sm text-white/60">Last 30 Days</p>
             </div>
           </div>
           <div className="text-4xl font-bold text-white mb-2">78.5%</div>
           <p className="text-sm text-teal-300">+2.4% from previous period</p>
        </GlassCard>

        <GlassCard className="p-6">
           <div className="flex items-center space-x-4 mb-4">
             <div className="p-3 bg-yellow-500/20 rounded-full text-yellow-400">
               <Star className="h-6 w-6" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-white">Average LTV</h3>
               <p className="text-sm text-white/60">Lifetime Value</p>
             </div>
           </div>
           <div className="text-4xl font-bold text-white mb-2">$420.50</div>
           <p className="text-sm text-teal-300">+12% year over year</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-xl font-bold text-white/90 mb-6">Top Customers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topCustomers.map((customer, i) => (
            <div key={customer.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-white text-lg">{customer.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTierColor(customer.loyaltyTier)}`}>
                  {customer.loyaltyTier}
                </span>
              </div>
              <p className="text-sm text-white/60 mb-1">Joined: {customer.joinDate}</p>
              <p className="text-sm text-white/80 mb-3">Loves: <span className="text-red-300">{customer.favoriteItem}</span></p>
              <div className="text-right">
                <span className="text-lg font-bold text-teal-300">${customer.totalSpent.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
