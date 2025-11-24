import React, { useState } from 'react';
import { ArchitectureCards, MetricCard } from './components/InfoCards';
import { IntrinsicPerformanceChart, VarianceChart, EarlyExitScatter, SpeedGainBar } from './components/Charts';
import { BookOpen, FileText, Zap, AlertTriangle, TrendingUp, CheckCircle, Github, Layers } from 'lucide-react';
import { COLORS } from './constants';

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'intrinsic' | 'earlyexit'>('overview');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BookOpen className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">BitSkip Visualizer</h1>
                <p className="text-xs text-slate-500">Based on "BitSkip: An Empirical Analysis of Quantization and Early Exit Composition"</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
              <span>Bhuvaneswaran & Liu (2025)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-xl mb-8 w-fit mx-auto md:mx-0">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Overview & Architecture
          </button>
          <button 
            onClick={() => setActiveTab('intrinsic')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'intrinsic' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Phase 1: Intrinsic Analysis
          </button>
          <button 
            onClick={() => setActiveTab('earlyexit')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'earlyexit' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Phase 2: Early Exit Results
          </button>
        </div>

        {/* Abstract / Intro Highlight */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-indigo-900 text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <h2 className="text-3xl font-bold mb-4">Can we skip layers in quantized models?</h2>
                <p className="text-indigo-100 text-lg mb-6 leading-relaxed">
                  BitSkip introduces a framework to explore the interaction between <strong>Quantization</strong> and <strong>Early Exit</strong>. 
                  The findings are counter-intuitive: A simple 8-bit model outperforms complex Hadamard-enhanced variants, 
                  achieving <span className="text-emerald-300 font-bold">32.5% speedup</span> with only <span className="text-emerald-300 font-bold">4% quality loss</span>.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-indigo-800/50 border border-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <Zap size={14} className="mr-2 text-yellow-400" /> Efficiency
                  </span>
                  <span className="bg-indigo-800/50 border border-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <TrendingUp size={14} className="mr-2 text-emerald-400" /> Dynamic Routing
                  </span>
                  <span className="bg-indigo-800/50 border border-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <AlertTriangle size={14} className="mr-2 text-rose-400" /> Hadamard Risks
                  </span>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-800 to-transparent opacity-30"></div>
              <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-indigo-600" />
              Architectural Variants
            </h3>
            <ArchitectureCards />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-3">Key Research Questions</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                    <span className="text-slate-600 text-sm">Do quantization and dynamic routing interact multiplicatively or destructively?</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                    <span className="text-slate-600 text-sm">Does the Hadamard transform help or hurt early exit viability?</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                    <span className="text-slate-600 text-sm">Can we predict "safe" early exit points in quantized models?</span>
                  </li>
                </ul>
              </div>
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
                 <h4 className="font-bold text-emerald-900 mb-3">The Winner: BitSkip-V1</h4>
                 <p className="text-sm text-emerald-800 mb-4">
                   Unlike the hypothesis that complex transformations (Hadamard) are needed for low-bit stability, the simplest approach won.
                 </p>
                 <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-emerald-200">
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-emerald-600">1.13</span>
                      <span className="text-xs text-slate-500 uppercase font-semibold">Perplexity</span>
                    </div>
                    <div className="h-8 w-px bg-emerald-100"></div>
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-emerald-600">+32.5%</span>
                      <span className="text-xs text-slate-500 uppercase font-semibold">Speed</span>
                    </div>
                    <div className="h-8 w-px bg-emerald-100"></div>
                     <div className="text-center">
                      <span className="block text-2xl font-bold text-emerald-600">No</span>
                      <span className="text-xs text-slate-500 uppercase font-semibold">Hadamard</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 1 Content */}
        {activeTab === 'intrinsic' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex items-center space-x-2 mb-2">
               <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase">Phase 1</span>
               <h2 className="text-xl font-bold text-slate-800">Intrinsic Analysis (Standard Training)</h2>
            </div>
            <p className="text-slate-600 max-w-3xl mb-6">
              Before adding early-exit capabilities, the authors tested the base stability of the architectures. 
              The results revealed a massive instability in the Hadamard-based models (V2).
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <IntrinsicPerformanceChart />
              <VarianceChart />
            </div>

            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg mt-4">
              <h4 className="flex items-center font-bold text-rose-800 mb-2">
                <AlertTriangle className="mr-2" size={18} /> 
                The Variance-Quality Paradox
              </h4>
              <p className="text-sm text-rose-700">
                Figure 1 (Right Chart) shows BitSkip-V3 (Amber) has extremely stable activation variance (~1.5). 
                Ideally, this should mean stable training. However, it performed poorly. 
                BitSkip-V1 (Green) had increasing variance but excellent quality. 
                <strong>Conclusion:</strong> Statistical stability does not guarantee representational quality.
              </p>
            </div>
          </div>
        )}

        {/* Phase 2 Content */}
        {activeTab === 'earlyexit' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
             <div className="flex items-center space-x-2 mb-2">
               <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded uppercase">Phase 2</span>
               <h2 className="text-xl font-bold text-slate-800">Early Exit & Co-Design Results</h2>
            </div>
             <p className="text-slate-600 max-w-3xl mb-6">
              Training with the "Early Exit Loss" objective. BitSkip-V1 outperforms the full precision baseline 
              because 8-bit quantization acts as a regularizer, making the model more robust to layer skipping.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
               <MetricCard 
                 title="Optimal Layer" 
                 value="18" 
                 subtext="out of 24 layers"
                 icon={Layers}
                 trend="neutral"
               />
               <MetricCard 
                 title="V1 Speedup" 
                 value="32.5%" 
                 subtext="at Layer 18"
                 icon={Zap}
                 trend="up"
               />
               <MetricCard 
                 title="V1 Quality Loss" 
                 value="4.0%" 
                 subtext="PPL Increase vs Full"
                 icon={TrendingUp}
                 trend="down"
               />
               <MetricCard 
                 title="Llama3 Quality Loss" 
                 value="48.3%" 
                 subtext="PPL Increase vs Full"
                 icon={AlertTriangle}
                 trend="down"
               />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EarlyExitScatter />
              <SpeedGainBar />
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
              <h3 className="font-bold text-slate-800 mb-4">Summary Table: Quality-Speed Tradeoff</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Model</th>
                      <th className="px-4 py-3">Quality Rank</th>
                      <th className="px-4 py-3">Speed Rank</th>
                      <th className="px-4 py-3">Viability</th>
                      <th className="px-4 py-3">Ratio (Q/S)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-emerald-600">BitSkip-V1</td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3">2</td>
                      <td className="px-4 py-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-xs">Excellent</span></td>
                      <td className="px-4 py-3 font-bold">0.80x (Best)</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-600">Llama3 FP32</td>
                      <td className="px-4 py-3">2</td>
                      <td className="px-4 py-3">1</td>
                      <td className="px-4 py-3"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-xs">Poor</span></td>
                      <td className="px-4 py-3">1.49x</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-amber-600">BitSkip-V3</td>
                      <td className="px-4 py-3">4</td>
                      <td className="px-4 py-3">3</td>
                      <td className="px-4 py-3"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-xs">Poor</span></td>
                      <td className="px-4 py-3">2.64x</td>
                    </tr>
                     <tr className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-rose-600">BitSkip-V2</td>
                      <td className="px-4 py-3">3</td>
                      <td className="px-4 py-3">4</td>
                      <td className="px-4 py-3"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full text-xs">Poor</span></td>
                      <td className="px-4 py-3">1.31x</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-sm">
                Visualization of "BitSkip: An Empirical Analysis of Quantization and Early Exit Composition".
                <br />
                Data extracted from tables 1-5 and figures in the paper.
            </p>
        </div>
      </footer>
    </div>
  );
}

export default App;