export const kiloConfig = {
  baseUrl: "https://api.kilo.ai/api/openrouter/",
  api: "openai-completions",
  models: [
    {
      id: "anthropic/claude-opus-4.5",
      name: "Anthropic: Claude Opus 4.5",
    },
    {
      id: "minimax/minimax-m2.5:free",
      name: "Minimax: Minimax M2.5",
    },
    {
      id: "zhipuai/glm-4.7:free",
      name: "GLM-4.7 (Free - Exclusive to Kilo)",
    },
  ],
  defaultModel: "minimax/minimax-m2.5:free",
};

export const getApiKey = () => {
  return process.env.KILO_API_KEY;
};

export const getApiUrl = (endpoint: string = "chat/completions") => {
  return `${kiloConfig.baseUrl}${endpoint}`;
};
