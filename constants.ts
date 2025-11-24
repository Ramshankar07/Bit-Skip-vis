// Colors
export const COLORS = {
  v1: '#10b981', // Emerald 500
  v2: '#f43f5e', // Rose 500
  v3: '#f59e0b', // Amber 500
  llama: '#64748b', // Slate 500
};

export const MODEL_NAMES = {
  v1: 'BitSkip-V1 (8-bit)',
  v2: 'BitSkip-V2 (4-bit + H)',
  v3: 'BitSkip-V3 (8-bit + H)',
  llama: 'Llama3 (FP32)',
};

// Table 2: Architecture Comparison
export const ARCHITECTURE_DATA = [
  {
    name: 'BitSkip-V1',
    desc: 'The Hero',
    weightBits: '1.58-bit (Ternary)',
    actBits: '8-bit',
    hadamard: 'No',
    params: '1.06B',
    color: 'emerald',
    details: 'Simple 8-bit quantization. Best performer.',
  },
  {
    name: 'BitSkip-V2',
    desc: 'Aggressive',
    weightBits: '1.58-bit (Ternary)',
    actBits: '4-bit',
    hadamard: 'Yes',
    params: '1.06B',
    color: 'rose',
    details: 'Extreme 4-bit quantization with Hadamard. Catastrophic failure.',
  },
  {
    name: 'BitSkip-V3',
    desc: 'Hybrid Control',
    weightBits: '1.58-bit (Ternary)',
    actBits: '8-bit',
    hadamard: 'Yes',
    params: '1.06B',
    color: 'amber',
    details: 'Isolates Hadamard effect. Shows activation stability but poor learning.',
  },
  {
    name: 'Llama3 Baseline',
    desc: 'Standard',
    weightBits: '32-bit (FP32)',
    actBits: '32-bit (FP32)',
    hadamard: 'No',
    params: '1.06B',
    color: 'slate',
    details: 'Full precision baseline with LayerSkip routing.',
  },
];

// Table 3: Intrinsic Performance (Phase 1 - No Early Exit Training)
export const INTRINSIC_DATA = [
  { layer: 'Full Model', v1: 1966.49, v2: 26048.98, llama: 846.34 },
  { layer: 'Layer 6', v1: 14701.50, v2: 65109.99, llama: 12471.16 },
  { layer: 'Layer 12', v1: 4330.83, v2: 49916.51, llama: 3059.27 },
  { layer: 'Layer 18', v1: 2478.66, v2: 41969.68, llama: 1246.45 },
];

// Table 4 & 5: Early Exit Performance (Phase 2)
export const EARLY_EXIT_DATA = [
  {
    name: 'BitSkip-V1',
    ppl: 1.13,
    speed: 32.0,
    layer18PPL: 1.18,
    layer18Speed: 42.4,
    speedGain: 32.5,
    pplDecrease: -4.0,
    color: COLORS.v1,
  },
  {
    name: 'Llama3 FP32',
    ppl: 1.19,
    speed: 97.8, // Normalized base speed is different, but we track relative gain mostly
    layer18PPL: 1.77,
    layer18Speed: 128.5,
    speedGain: 31.2,
    pplDecrease: -48.3,
    color: COLORS.llama,
  },
  {
    name: 'BitSkip-V2',
    ppl: 210.24,
    speed: 5.0,
    layer18PPL: 301.67,
    layer18Speed: 6.6,
    speedGain: 33.2,
    pplDecrease: -43.5,
    color: COLORS.v2,
  },
  {
    name: 'BitSkip-V3',
    ppl: 427.94,
    speed: 5.0,
    layer18PPL: 481.60,
    layer18Speed: 6.6,
    speedGain: 33.2,
    pplDecrease: -12.5,
    color: COLORS.v3,
  },
];

// Figure 1: Activation Variance Approximation
// Recreated based on description: Llama3 exponential, V1 linear increase, V2/V3 stable/flat.
export const VARIANCE_DATA = Array.from({ length: 25 }, (_, i) => {
  // Llama3: Exponential growth reaching ~5.7
  const llama = 0.5 * Math.exp(0.1 * i); 
  
  // V1: Linear increase to ~2.2
  const v1 = 0.5 + (1.7 / 24) * i;

  // V3: Stable around 1.3-1.5 after initial
  const v3 = i < 2 ? 0.5 + i * 0.4 : 1.4 + Math.sin(i) * 0.1;

  // V2: Plateaus then decreases
  const v2 = i < 5 ? 0.5 + i * 0.3 : 2.0 - ((i - 5) * 0.05);

  return {
    layer: i,
    v1: Math.max(0, v1),
    v2: Math.max(0, v2),
    v3: Math.max(0, v3),
    llama: Math.max(0, llama),
  };
});