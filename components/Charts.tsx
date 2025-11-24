import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis
} from 'recharts';
import { INTRINSIC_DATA, VARIANCE_DATA, EARLY_EXIT_DATA, COLORS, MODEL_NAMES } from '../constants';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-md text-sm">
        <p className="font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ color: entry.color }} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span>{entry.name}:</span>
            <span className="font-mono font-bold">
              {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const IntrinsicPerformanceChart = () => {
  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-2">Phase 1: Intrinsic Quality (Lower is Better)</h3>
      <p className="text-sm text-slate-500 mb-4">
        Perplexity (PPL) without early-exit training. Note: Logarithmic scale used due to BitSkip-V2's extreme failure.
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={INTRINSIC_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="layer" tick={{ fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
          <YAxis scale="log" domain={['auto', 'auto']} tick={{ fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="llama" name={MODEL_NAMES.llama} fill={COLORS.llama} radius={[4, 4, 0, 0]} />
          <Bar dataKey="v1" name={MODEL_NAMES.v1} fill={COLORS.v1} radius={[4, 4, 0, 0]} />
          <Bar dataKey="v2" name={MODEL_NAMES.v2} fill={COLORS.v2} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const VarianceChart = () => {
  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-2">The Variance-Quality Paradox</h3>
      <p className="text-sm text-slate-500 mb-4">
        Activation variance across layers. Hadamard (V2, V3) stabilizes variance, yet destroys learning capability.
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={VARIANCE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="layer" 
            label={{ value: 'Layer Depth', position: 'insideBottom', offset: -5, fill: '#64748b' }} 
            tick={{ fill: '#64748b' }}
          />
          <YAxis 
            label={{ value: 'Variance (std dev)', angle: -90, position: 'insideLeft', fill: '#64748b' }} 
            tick={{ fill: '#64748b' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="llama" name={MODEL_NAMES.llama} stroke={COLORS.llama} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="v1" name={MODEL_NAMES.v1} stroke={COLORS.v1} strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="v2" name={MODEL_NAMES.v2} stroke={COLORS.v2} strokeWidth={2} dot={false} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="v3" name={MODEL_NAMES.v3} stroke={COLORS.v3} strokeWidth={2} dot={false} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const EarlyExitScatter = () => {
  // Transformation for easier plotting: x=SpeedGain, y=PPL(Inverse for 'Goodness' or raw PPL?)
  // Let's compare Layer 18 PPL vs Layer 18 Speed
  
  const data = EARLY_EXIT_DATA.map(d => ({
    ...d,
    // Just for the tooltip
    formattedPPL: d.layer18PPL.toFixed(2),
  }));

  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-2">Phase 2: Early Exit Efficiency (Layer 18)</h3>
      <p className="text-sm text-slate-500 mb-4">
        Quality (PPL) vs. Speed (tok/s). BitSkip-V1 dominates the trade-off.
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            dataKey="layer18Speed" 
            name="Speed" 
            unit=" tok/s" 
            label={{ value: 'Inference Speed (tok/s)', position: 'insideBottom', offset: -10, fill: '#64748b' }}
          />
          <YAxis 
            type="number" 
            dataKey="layer18PPL" 
            name="Perplexity" 
            label={{ value: 'Perplexity (Lower is Better)', angle: -90, position: 'insideLeft', fill: '#64748b' }}
            scale="log"
            domain={[1, 1000]}
            allowDataOverflow={true}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-md text-sm">
                  <p className="font-bold mb-1" style={{ color: data.color }}>{data.name}</p>
                  <p>PPL: {data.layer18PPL.toFixed(2)}</p>
                  <p>Speed: {data.layer18Speed} tok/s</p>
                  <p>Gain: +{data.speedGain}%</p>
                </div>
              );
            }
            return null;
          }} />
          <Scatter name="Models" data={data} fill="#8884d8">
            {data.map((entry, index) => (
              <circle key={`cell-${index}`} cx={0} cy={0} r={8} fill={entry.color} stroke="#fff" strokeWidth={2} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export const SpeedGainBar = () => {
    return (
    <div className="h-[400px] w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-2">Quality Degradation at Layer 18</h3>
      <p className="text-sm text-slate-500 mb-4">
        Percentage drop in perplexity relative to full model (Lower drop is better).
      </p>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={EARLY_EXIT_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12, fill: '#475569' }} interval={0} />
          <Tooltip content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-slate-200 shadow-lg rounded-md text-sm">
                    <p className="font-bold">{data.name}</p>
                    <p>PPL Drop: <span className="text-rose-600">{Math.abs(data.pplDecrease)}%</span></p>
                    <p>Speed Gain: <span className="text-emerald-600">+{data.speedGain}%</span></p>
                  </div>
                );
              }
              return null;
          }} />
          <Bar dataKey="pplDecrease" name="PPL Drop %" fill="#8884d8" radius={[0, 4, 4, 0]}>
             {EARLY_EXIT_DATA.map((entry, index) => (
                <cell key={`cell-${index}`} fill={Math.abs(entry.pplDecrease) < 10 ? COLORS.v1 : COLORS.llama} />
             ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}