import { apiRequest } from "./queryClient";

interface Resource {
  id: number;
  title: string;
  content: string;
  category: string;
  icon: string;
}

interface ChatbotResponse {
  text: string;
  quickReplies?: string[];
  resource?: Resource;
}

// Helper to wait a specified amount of time
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendMessage(sessionId: string, message: string): Promise<ChatbotResponse> {
  try {
    const response = await apiRequest("POST", `/api/sessions/${sessionId}/messages`, { text: message });
    return {
      text: response.botMessage.text,
      quickReplies: response.quickReplies,
      resource: response.resource
    };
  } catch (error) {
    console.error("Error sending message to chatbot:", error);
    return {
      text: "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo."
    };
  }
}

export async function createNewSession(): Promise<{ sessionId: string, initialMessage: string, quickReplies: string[] }> {
  try {
    const response = await apiRequest("POST", "/api/sessions", {});
    return {
      sessionId: response.sessionId,
      initialMessage: "¡Hola! Soy AmigBot, tu asistente contra el bullying. Estoy aquí para escucharte y ayudarte. ¿Cómo puedo apoyarte hoy?",
      quickReplies: response.initialResponse?.quickReplies || []
    };
  } catch (error) {
    console.error("Error creating new chat session:", error);
    return {
      sessionId: "error",
      initialMessage: "Error al iniciar la sesión. Por favor, recarga la página.",
      quickReplies: []
    };
  }
}

export async function getResourcesByCategory(category: string): Promise<Resource[]> {
  try {
    return await apiRequest("GET", `/api/resources/category/${category}`, null);
  } catch (error) {
    console.error(`Error fetching resources for category ${category}:`, error);
    return [];
  }
}

export async function getAllResources(): Promise<Resource[]> {
  try {
    return await apiRequest("GET", "/api/resources", null);
  } catch (error) {
    console.error("Error fetching all resources:", error);
    return [];
  }
}

export async function submitReport(sessionId: string, type: string, description: string): Promise<boolean> {
  try {
    await apiRequest("POST", "/api/reports", {
      type,
      description,
      sessionId
    });
    return true;
  } catch (error) {
    console.error("Error submitting report:", error);
    return false;
  }
}
