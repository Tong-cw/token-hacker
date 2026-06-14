// Model ranking by real-world usage frequency (0-100 scale)
// Higher = more popular. Used to sort models on marketplace page.

const MODEL_RANK: Record<string, number> = {
  // ===== Tier 1: S-tier (95-100) - Most popular =====
  'gpt-4o': 100,
  'gpt-4o-mini': 98,
  'gpt-4o-2024-11-20': 95,
  'gpt-4o-2024-08-06': 95,
  'gpt-4o-2024-05-13': 93,

  // GPT-5 series
  'gpt-5.4': 97,
  'gpt-5.4-mini': 96,
  'gpt-5.4-nano': 95,
  'gpt-5.4-2026-03-05': 95,
  'gpt-5.4-mini-2026-03-17': 94,
  'gpt-5.4-nano-2026-03-17': 93,
  'gpt-5.3-chat': 96,
  'gpt-5.3-chat-2026-03-03': 94,
  'gpt-5.2': 96,
  'gpt-5.2-2025-12-11': 94,
  'gpt-5.1': 95,
  'gpt-5': 93,
  'gpt-5-mini': 93,
  'gpt-5-nano': 92,

  // Claude series
  'claude-sonnet-4-20250514': 99,
  'claude-opus-4-20250514': 97,
  'claude-haiku-4-5-20251001': 95,
  'claude-sonnet-4-5-20250929': 94,

  // ===== Tier 2: A-tier (80-94) - Very popular =====
  'deepseek-chat': 90,
  'deepseek-reasoner': 89,
  'deepseek-v4-pro': 88,

  'grok-4': 87,
  'grok-3': 85,
  'grok-4-fast': 84,

  'o3': 86,
  'o3-mini': 85,
  'o4-mini': 86,
  'o1': 83,
  'o1-mini': 82,

  'gemini-2.5-pro': 84,
  'gemini-2.5-flash': 83,
  'gemini-2.0-flash': 80,

  // ===== Tier 3: B-tier (60-79) - Popular =====
  'qwen-max': 79,
  'qwen-plus': 78,
  'kimi-k2': 77,

  'gpt-4.1': 76,
  'gpt-4.1-mini': 78,
  'gpt-4.1-nano': 75,
  'gpt-4.1-2025-04-14': 74,
  'gpt-4.1-mini-2025-04-14': 76,
  'gpt-4.1-nano-2025-04-14': 73,

  'deepseek-v3.1': 76,
  'deepseek-v3.2': 75,
  'deepseek-r1': 74,
  'deepseek-v3': 72,
  'deepseek-r1-0528': 73,

  'claude-opus-4-5-20251101': 75,
  'claude-haiku-4-5': 73,
  'claude-3-5-sonnet-20241022': 72,

  'grok-4.1': 74,
  'grok-4.2': 73,
  'grok-4-fast-non-reasoning': 72,

  'o3-pro': 70,
  'o1-pro': 68,
  'o4-mini-all': 68,

  'gpt-5.2-pro': 65,
  'gpt-5.4-pro': 64,
  'gpt-5-pro': 62,

  'qwen-coder-turbo': 65,
  'qwq-32b': 67,

  'gemini-2.0-flash-thinking': 65,
  'gemini-2.0-pro': 64,
  'gemini-1.5-pro': 63,
  'gemini-1.5-flash': 62,

  // ===== Tier 4: C-tier (30-59) - Common =====
  'gpt-4-turbo-2024-04-09': 58,
  'gpt-4-turbo': 57,
  'gpt-4-0125-preview': 55,
  'gpt-4': 55,

  'deepseek-v3.2-exp': 55,

  'claude-3-5-haiku-20241022': 55,
  'claude-opus-4-1-20250805': 54,
  'claude-sonnet-4-6': 53,

  'llama-4-maverick': 58,
  'llama-4-scout': 55,
  'llama-3.1-405b': 50,
  'llama-3.1-70b': 55,
  'llama-3.1-8b': 52,

  'mistral-nemo': 48,
  'mistral-large': 50,
  'ministral-8b': 45,
  'codestral': 45,

  'qwen-coder-plus': 50,
  'qwen-turbo-latest': 48,
  'qwen-vl-max': 48,
  'qwen-vl-plus': 45,

  'gpt-5-chat-latest': 55,
  'gpt-5.1-chat-latest': 55,
  'gpt-5.2-chat-latest': 55,
  'gpt-5.3-chat-latest': 55,

  'gemma-3': 45,
  'gemma-2': 42,

  'kimi-k2-0905': 48,
  'kimi-latest': 45,

  // Grok special
  'grok-4-image': 45,
  'grok-4-fast-reasoning': 44,
  'grok-4.1-fast': 45,
  'grok-4.2-fast': 45,

  'qwen-mt-plus': 40,
  'qwen-mt-turbo': 38,

  'glm-4.7': 48,
  'glm-4.7-thinking': 45,
  'glm-4-plus': 42,
  'glm-4': 40,
  'glm-4v': 38,

  // ===== Tier 5: D-tier (10-29) - Niche =====
  'gpt-4o-realtime-preview': 28,
  'gpt-4o-audio-preview': 25,

  'o3-mini-all': 28,
  'o1-mini-all': 25,

  'qwen-omni-turbo': 25,
  'qwen-qwq-plus': 25,

  'deepseek-r1-distill-qwen-32b': 22,
  'deepseek-r1-distill-qwen-7b': 20,

  'claude-3-opus-20240229': 28,
  'claude-3-sonnet-20240229': 25,
  'claude-3-haiku-20240307': 22,

  'llama-3-70b': 25,
  'llama-3-8b': 22,
  'llama-2-70b': 15,
  'llama-2-13b': 12,

  'gpt-3.5-turbo': 25,
  'gpt-3.5-turbo-0125': 22,
  'gpt-3.5-turbo-1106': 20,
  'gpt-3.5-turbo-16k': 18,

  'tts-1': 22,
  'tts-1-hd': 20,
  'whisper-1': 20,
  'dall-e-3': 18,

  'qwen-14b-chat': 15,
  'qwen-7b-chat': 12,
  'qwen-72b-chat': 18,

  'gemini-pro': 18,
  'gemini-pro-vision': 15,

  // ===== Tier 6: F-tier (0-9) - Rare/Embedding/Obsolete =====
  'text-embedding-3-small': 9,
  'text-embedding-3-large': 8,
  'text-embedding-ada-002': 5,

  'gpt-4-32k': 9,
  'gpt-4-0613': 8,
  'gpt-3.5-turbo-0613': 8,
  'gpt-3.5-turbo-16k-0613': 6,
  'gpt-3.5-turbo-instruct': 5,
  'gpt-3.5-turbo-instruct-0914': 4,

  'gpt-4-vision-preview': 8,
  'chatgpt-4o-latest': 8,
  'gpt-4o-transcribe': 5,
};

// Default rank for any model not explicitly listed
export const DEFAULT_RANK = 20;

export function getModelRank(modelId: string): number {
  return MODEL_RANK[modelId] ?? DEFAULT_RANK;
}
