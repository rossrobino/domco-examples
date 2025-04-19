import "dotenv/config";
import { OpenAI } from "openai";

if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not set.");

export const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
