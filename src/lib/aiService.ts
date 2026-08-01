export async function generateResponse(prompt: string) {
  return {
    success: true,
    provider: "OpenAI",
    response: `Respuesta simulada para: ${prompt}`,
  };
}