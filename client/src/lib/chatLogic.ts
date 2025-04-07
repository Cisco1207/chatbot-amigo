import { v4 as uuidv4 } from "uuid";

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
}

// Helper to match user inputs with predefined responses
export function getChatbotResponse(userMessage: string): string {
  const normalizedMessage = userMessage.toLowerCase().trim();
  
  // Keywords map for pattern matching
  const responseMap: [string[], string][] = [
    [
      ['burla', 'burlan', 'insulta', 'insultan', 'molestan', 'dicen', 'bullying verbal', 'apodos', 'nombres'],
      "El bullying verbal puede ser muy doloroso. ¿Has intentado hablar con un profesor o adulto de confianza sobre esto? También es importante recordar que las palabras de quienes hacen bullying reflejan más sobre ellos que sobre ti."
    ],
    [
      ['golpea', 'golpean', 'pega', 'pegan', 'empuja', 'empujan', 'bullying físico', 'agresión'],
      "El bullying físico es muy serio y debe ser reportado de inmediato. Tu seguridad es lo más importante. ¿Hay algún adulto en tu escuela o en casa con quien puedas hablar hoy mismo sobre esto?"
    ],
    [
      ['excluyen', 'ignoran', 'aíslan', 'amigos', 'amistad', 'solo', 'sola', 'nadie'],
      "Sentirse excluido puede ser muy difícil. Recuerda que mereces amistades genuinas que te valoren. ¿Has considerado unirte a algún club o actividad donde puedas conocer personas con intereses similares a los tuyos?"
    ],
    [
      ['internet', 'redes', 'whatsapp', 'facebook', 'instagram', 'tiktok', 'mensajes', 'fotos', 'cyberbullying'],
      "El cyberbullying puede ser muy invasivo. Es importante que guardes evidencia (capturas de pantalla) y que no respondas a las provocaciones. ¿Has bloqueado a esas personas y considerado reportar el contenido a la plataforma?"
    ],
    [
      ['miedo', 'asustado', 'asustada', 'temor', 'ansiedad', 'nervios'],
      "Es normal sentir miedo en estas situaciones. Tu seguridad emocional y física es prioridad. ¿Hay alguien de confianza a quien puedas contarle cómo te sientes? Compartir tu experiencia puede ayudar a reducir ese miedo."
    ],
    [
      ['ayuda', 'ayudar', 'ayude', 'apoyo', 'aconsejar', 'consejo'],
      "Me alegra que busques ayuda. Un primer paso importante es hablar con un adulto de confianza como un profesor, consejero escolar o familiar. Ellos pueden intervenir directamente. ¿Hay alguien así en tu vida?"
    ],
    [
      ['padres', 'mamá', 'papá', 'profesor', 'profesora', 'adulto', 'contar', 'decir'],
      "Hablar con adultos de confianza es muy valiente y un paso crucial. Si sientes que no te escucharon la primera vez, intenta ser muy claro sobre cómo te afecta la situación y pide ayuda específica. ¿Quieres que hablemos sobre cómo abordar esta conversación?"
    ],
    [
      ['defenderme', 'defender', 'enfrentar', 'responder', 'confrontar'],
      "Es importante defenderte de forma segura. Mantén la calma, usa un tono firme y aléjate de la situación. Recuerda que no es recomendable responder con más agresión. ¿Quieres que hablemos de estrategias específicas para tu situación?"
    ],
    [
      ['testigo', 'presencié', 'vi', 'observé', 'amigo', 'compañero', 'ayudar a otro'],
      "Es muy valioso que quieras ayudar a alguien que sufre bullying. Puedes mostrarle apoyo, incluirlo en actividades, y animar a otros a hacer lo mismo. También pueden reportar juntos la situación a un adulto. ¿Quieres más ideas sobre cómo ser un buen aliado?"
    ],
    [
      ['deprimido', 'deprimida', 'triste', 'llorar', 'suicidio', 'morir', 'no quiero vivir'],
      "Me preocupa mucho lo que me cuentas. Es muy importante que hables con un adulto de confianza o llames a la Línea de Ayuda contra el Acoso Escolar (900 018 018) de inmediato. Estos sentimientos son señales que necesitan atención profesional urgente. No estás solo/a en esto."
    ]
  ];
  
  // Check for matches in user message
  for (const [keywords, response] of responseMap) {
    if (keywords.some(keyword => normalizedMessage.includes(keyword))) {
      return response;
    }
  }
  
  // Default responses if no keyword match
  const defaultResponses = [
    "Gracias por compartir eso conmigo. ¿Podrías darme más detalles para poder ayudarte mejor?",
    "Es importante que sepas que no estás solo/a. ¿Hay algo específico sobre esta situación que te preocupe más?",
    "Entiendo que puede ser difícil hablar sobre esto. ¿Te gustaría que te diera algunos consejos generales sobre cómo manejar situaciones de bullying?",
    "Lo que me cuentas es importante. ¿Has podido hablar con algún adulto de confianza sobre esto?",
    "Estoy aquí para escucharte y ayudarte. ¿Hay alguna pregunta específica que tengas sobre cómo manejar esta situación?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Create a new session with welcome message
export function createNewSession(): ChatSession {
  const sessionId = uuidv4();
  
  return {
    id: sessionId,
    messages: [
      {
        id: uuidv4(),
        content: "¡Hola! Puedes hablar conmigo sobre cualquier situación de bullying que estés viviendo o viendo. ¿En qué puedo ayudarte hoy?",
        sender: "bot",
        timestamp: new Date()
      }
    ]
  };
}
