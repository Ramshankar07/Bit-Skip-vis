import React from 'react';
import { ARCHITECTURE_DATA } from '../constants';
import { Layers, Zap, Activity, Cpu } from 'lucide-react';

export const ArchitectureCards = () => {
  const getBorderColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'border-emerald-500 bg-emerald-50/50';
      case 'rose': return 'border-rose-500 bg-rose-50/50';
      case 'amber': return 'border-amber-500 bg-amber-50/50';
      default: return 'border-slate-300 bg-white';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'text-emerald-600';
      case 'rose': return 'text-rose-600';
      case 'amber': return 'text-amber-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {ARCHITECTURE_DATA.map((arch) => (
        <div 
          key={arch.name} 
          className={`border-t-4 rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md ${getBorderColor(arch.color)}`}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-slate-800">{arch.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${arch.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
              {arch.desc}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-4">{arch.details}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-slate-600">
                <Cpu size={14} className="mr-2" /> Weights
              </span>
              <span className="font-mono font-medium">{arch.weightBits}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-slate-600">
                <Activity size={14} className="mr-2" /> Activations
              </span>
              <span className="font-mono font-medium">{arch.actBits}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center text-slate-600">
                <Zap size={14} className="mr-2" /> Hadamard
              </span>
              <span className={`font-mono font-medium ${arch.hadamard === 'Yes' ? 'text-rose-500' : 'text-slate-700'}`}>
                {arch.hadamard}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const MetricCard = ({ title, value, subtext, icon: Icon, trend }: { title: string, value: string, subtext?: string, icon: any, trend?: 'up' | 'down' | 'neutral' }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
    <div className={`p-3 rounded-full mr-4 ${trend === 'up' ? 'bg-emerald-100 text-emerald-600' : trend === 'down' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h4 className="text-2xl font-bold text-slate-900">{value}</h4>
      {subtext && <p className="text-xs text-slate-400 mt-1">{subtext}</p>}
    </div>
  </div>
);