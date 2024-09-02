// server/services/langchainService.js
const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { Document } = require("@langchain/core/documents");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const supabase = require('../config/database');

const model = new ChatOpenAI({
  apiKey: process.env.apiKey,
  model: 'gpt-3.5-turbo',
  temperature: 0.7
});

const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the user's question only using the information provided in the context. If user's question is not avaible in the context, search related data to the company from the internet and answer. If the answer to the user's question is not related to company, deny answering user's question." 
  Context: {context}
  Question: {input}`
);

const getLangChainResponse = async (botId, question) => {
   
  const { data, error } = await supabase
    .from('bots') // Assuming your table name is 'bots'
    .select('contextText')
    .eq('id', botId)
    .single();

  if (error) {
    console.error('Error fetching contextText from Supabase:', error);
    throw new Error('Could not retrieve context for the bot');
  }


  const documentA = new Document({ pageContent: data.contextText });

  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt
  });

  const response = await chain.invoke({
    input: question,
    context: [documentA]
  });

  return response;
};

module.exports = { getLangChainResponse };
