// server/services/langchainService.js
const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { Document } = require("@langchain/core/documents");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const supabase = require('../config/database');
const { TextLoader } = require("langchain/document_loaders/fs/text");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadFile = async (url, outputPath) => {
  const response = await axios.get(url, { responseType: 'stream' });
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const model = new ChatOpenAI({
  apiKey: process.env.apiKey,
  model: 'gpt-3.5-turbo',
  temperature: 0.7
});

const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the user's question only using the information provided in the context. If the answer to the user's question is not available in the context, respond with "Afsuski, sizning savolingizga javob bera olmayman. Bu bo'yicha bilimga ega emasman."
  Context: {context}
  Question: {input}`
);

const getLangChainResponse = async (botId, question) => {
  try {
    const { data, error } = await supabase
      .from('bots')
      .select('contextText')
      .eq('id', botId)
      .single();

    if (error) {
      console.error('Error fetching contextText from Supabase:', error);
      throw new Error('Could not retrieve context for the bot');
    }

    const localPath = path.join(__dirname, `./${botId}.txt`);
    const chain = await createStuffDocumentsChain({
      llm: model,
      prompt
    });

    if (!fs.existsSync(localPath)) {
      console.log('File does not exist, downloading...');
      await downloadFile(data.contextText, localPath);
      console.log('File downloaded successfully');
    } else {
      console.log('File already exists');
    }

    const loader = new TextLoader(localPath);
    const docs = await loader.load();

    const response = await chain.invoke({
      input: question,
      context: docs
    });

    return response;

  } catch (error) {
    console.error('Error in getLangChainResponse:', error);
    throw new Error('Error processing the LangChain response');
  }
};

module.exports = { getLangChainResponse };
