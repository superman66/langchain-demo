import * as dotenv from "dotenv";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

dotenv.config();

const model = new OpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
  azureOpenAIApiCompletionsDeploymentName:
    process.env.AZURE_OPENAI_API_COMPLETIONS_DEPLOYMENT_NAME,
  azureOpenAIBasePath: process.env.AZURE_OPENAI_BASE_PATH,
});

const template =
  "你是一个翻译引擎，我会提供你中文，你将其翻译成英文。并要求翻译的内容得体、通顺、符合语法，而且在保证中文意思的前提下，尽量减少英文的字数。下面是需要翻译的中文：{text}";

const prompt = new PromptTemplate({
  template,
  inputVariables: ["text"],
});

const chain = new LLMChain({ llm: model, prompt });

const res = await chain.call({ text: "计算失败，请稍后重试。" });

console.log(res);
