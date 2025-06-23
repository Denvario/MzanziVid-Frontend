export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { prompt, voice } = req.body;

  console.log("Received prompt:", prompt);
  console.log("Voice option:", voice);

  return res.status(200).json({
    success: true,
    message: `Video generated using '${voice}' voice for prompt: ${prompt}`
  });
}
