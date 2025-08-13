// const axios=require("axios");

// async function summarizeTranscript(text){
// //   const userPrompt=prompt("Enter your summary prompt:");
// //   const prompt=`${userPrompt}\n\n${text}`;

//  const prompt=`Summarize the following transcript:\n\n${text}`;
//   const response=await axios.post("https://api.openai.com/v1/chat/completions",{
//     model:"gpt-3.5-turbo",
//     messages:[{role:"user",content:prompt}],
//   },{
//     headers:{
//       "Content-Type":"application/json",
//       "Authorization":`Bearer ${process.env.OPENAPI_APIKEY}`,
//     },
//   });
//   return response.data.choices[0].message.content;
// }

// module.exports={summarizeTranscript};

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function summarizeTranscript(text) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_APIKEY);

  // --- CHANGE THIS LINE ---
  // Use a currently supported model name for the free tier.
  // "gemini-1.5-flash" is recommended for its balance of speed and capability.
  // "gemini-1.5-pro" is also available for more complex tasks.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
  // You could also try: const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Summarize the following transcript:\n\n${text}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    return summary;
  } catch (error) {
    console.error("Error summarizing transcript with Gemini API:", error);
    throw error;
  }
}

module.exports = { summarizeTranscript };