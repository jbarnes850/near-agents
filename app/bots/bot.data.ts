import { Bot } from "@/app/store/bot";
import { nanoid } from "nanoid";
import Locale from "../locales";
import { ModelType } from "@/app/client/platforms/llm";
import { createEmptySession } from "../store";

const TEMPLATE = (PERSONA: string) =>
  `I want you to act as a ${PERSONA}. I will provide you with the context needed to solve my problem. Use intelligent, simple, and understandable language. Be concise. It is helpful to explain your thoughts step by step and with bullet points.`;

type DemoBot = Omit<Bot, "session">;

export const DEMO_BOTS: DemoBot[] = [
  {
    id: "1",
    avatar: "1f916",
    name: "GPT-4 Turbo",
    botHello: "Hello! How can I assist you today?",
    context: [],
    modelConfig: {
      model: "gpt-4-turbo",
      temperature: 0.7,
      maxTokens: 4096,
      sendMemory: false,
    },
    readOnly: true,
    hideContext: false,
  },
  {
    id: "2",
    avatar: "1f916",
    name: "My Documents",
    botHello:
      "Hello! How can I assist you today? Feel free to upload your documents!",
    context: [],
    modelConfig: {
      model: "gpt-4-turbo",
      temperature: 0.5,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    hideContext: false,
  },
  {
    id: "3",
    avatar: "1f5a5-fe0f",
    name: "NEAR Founder Copilot",
    botHello:
      "Hello! I'm the NEAR Founder Copilot, how can I help you get started on NEAR?",
    context: [
      {
        role: "system",
        content: TEMPLATE("NEAR Blockchain Expert"),
      },
    ],
    modelConfig: {
      model: "gpt-4-turbo",
      temperature: 0.8,
      maxTokens: 4096,
      sendMemory: true,
    },
    readOnly: true,
    datasource: "near",
    hideContext: false,
  },
];

export const createDemoBots = (): Record<string, Bot> => {
  const map: Record<string, Bot> = {};
  DEMO_BOTS.forEach((demoBot) => {
    const bot: Bot = JSON.parse(JSON.stringify(demoBot));
    bot.session = createEmptySession();
    map[bot.id] = bot;
  });
  return map;
};

export const createEmptyBot = (): Bot => ({
  id: nanoid(),
  avatar: "1f916",
  name: Locale.Store.DefaultBotName,
  context: [],
  modelConfig: {
    model: "gpt-4-turbo" as ModelType,
    temperature: 0.5,
    maxTokens: 4096,
    sendMemory: true,
  },
  readOnly: false,
  createdAt: Date.now(),
  botHello: Locale.Store.BotHello,
  hideContext: false,
  session: createEmptySession(),
});
