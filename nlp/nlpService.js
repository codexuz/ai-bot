const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { createStuffDocumentsChain } = require("langchain/chains/combine_documents");
const supabase = require('../config/database');
const axios = require('axios');

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

    // Assuming the contextText is a URL, fetch its content directly
    let contextData;
    if (data.contextText.startsWith('http')) {
      const response = await axios.get(data.contextText);
      contextData = response.data;
    } else {
      // If contextText is not a URL but the actual text, use it directly
      contextData = data.contextText;
    }

    // Create the chain without needing to load from a file
    const chain = await createStuffDocumentsChain({
      llm: model,
      prompt
    });

    const response = await chain.invoke({
      input: question,
      context: contextData
    });

    return response;

  } catch (error) {
    console.error('Error in getLangChainResponse:', error);
    throw new Error('Error processing the LangChain response');
  }
};

module.exports = { getLangChainResponse };
