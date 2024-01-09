import { NextApiRequest, NextApiResponse } from "next";
import OpenAI, { ClientOptions } from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title } = req.query;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
  } as ClientOptions);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Extract the band name and song title from the text :"${title}"`,
      },
    ],
    temperature: 0.5,
  });
  console.log(process.env.OPENAI_API_KEY);
  if (response.choices && response.choices.length > 0) {
    const content = response.choices[0].message.content;
    res.status(200).json({ content });
  } else {
    res.status(200).json({ content: "" });
  }
}
