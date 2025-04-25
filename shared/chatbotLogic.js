"use strict";
// Shared chatbot logic for server-side response generation
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuickReplySuggestions = getQuickReplySuggestions;
exports.getChatbotResponse = getChatbotResponse;
// Helper to get quick reply suggestions based on context
function getQuickReplySuggestions(lastMessage) {
    var normalizedMessage = lastMessage.toLowerCase().trim();
    // Default quick replies that apply to most conversations
    var defaultSuggestions = [
        "¿Qué puedo hacer si sufro bullying?",
        "¿Cómo puedo ayudar a un amigo?",
        "¿Qué es el cyberbullying?",
        "Necesito ayuda urgente",
        "¿Puedo hablar con alguien más?"
    ];
    // Context-specific quick replies
    if (normalizedMessage.includes("bullying físico") ||
        normalizedMessage.includes("golpea") ||
        normalizedMessage.includes("pega")) {
        return [
            "¿Debo defenderme físicamente?",
            "¿Cómo puedo evitar estos encuentros?",
            "¿Qué debo decirle a mis padres?",
            "Tengo miedo de ir a la escuela"
        ];
    }
    else if (normalizedMessage.includes("cyberbullying") ||
        normalizedMessage.includes("internet") ||
        normalizedMessage.includes("redes")) {
        return [
            "¿Debo eliminar mis redes sociales?",
            "¿Cómo bloqueo a alguien?",
            "¿Debo reportarlo?",
            "¿Cómo guardo evidencia?"
        ];
    }
    else if (normalizedMessage.includes("amigos") ||
        normalizedMessage.includes("solo") ||
        normalizedMessage.includes("sola")) {
        return [
            "¿Cómo puedo hacer nuevos amigos?",
            "Me siento muy solo/a",
            "¿Por qué nadie quiere estar conmigo?",
            "¿Cómo puedo ser más social?"
        ];
    }
    return defaultSuggestions;
}
// Helper to match user inputs with predefined responses
function getChatbotResponse(userMessage) {
    var normalizedMessage = userMessage.toLowerCase().trim();
    // Greeting responses (handle first to prioritize)
    var greetings = ['hola', 'hello', 'hi', 'hey', 'saludos', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal'];
    if (greetings.some(function (greeting) { return normalizedMessage.startsWith(greeting); })) {
        var greetingResponses = [
            "¡Hola! Soy tu asistente contra el bullying. ¿En qué puedo ayudarte hoy?",
            "¡Hola! Estoy aquí para escucharte y ayudarte con situaciones de bullying. ¿Cómo te sientes hoy?",
            "¡Saludos! Me alegra que estés aquí. Puedes contarme cualquier situación que te preocupe relacionada con el bullying.",
            "¡Hola! Soy tu amigo virtual contra el bullying. ¿Hay algo específico de lo que quieras hablar hoy?"
        ];
        return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    // Self-introduction responses
    if (normalizedMessage.includes('quién eres') ||
        normalizedMessage.includes('qué eres') ||
        normalizedMessage.includes('cómo te llamas')) {
        return "Soy un asistente virtual especializado en ayudar a niños y adolescentes que enfrentan situaciones de bullying. Estoy aquí para escucharte, ofrecerte consejos y recursos útiles. ¿Cómo puedo ayudarte hoy?";
    }
    // Thank you responses
    if (normalizedMessage.includes('gracias') ||
        normalizedMessage.includes('thanks') ||
        normalizedMessage.includes('te lo agradezco')) {
        var thankResponses = [
            "¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda apoyarte?",
            "No hay de qué. Recuerda que siempre puedes venir a hablar conmigo. ¿Hay algo más que quieras compartir?",
            "Me alegra poder ayudarte. ¿Te gustaría hablar de algo más?",
            "Para eso estoy aquí. ¿Necesitas algún otro consejo o recursos?"
        ];
        return thankResponses[Math.floor(Math.random() * thankResponses.length)];
    }
    // Goodbye responses
    if (normalizedMessage.includes('adiós') ||
        normalizedMessage.includes('chao') ||
        normalizedMessage.includes('hasta luego') ||
        normalizedMessage.includes('bye')) {
        var goodbyeResponses = [
            "¡Hasta pronto! Recuerda que estoy aquí cuando me necesites. Cuídate mucho.",
            "Adiós por ahora. Recuerda que eres valioso/a y mereces respeto. Estoy aquí cuando quieras hablar de nuevo.",
            "Nos vemos pronto. Recuerda que no estás solo/a en esto. ¡Cuídate!",
            "¡Hasta luego! Si necesitas ayuda en cualquier momento, no dudes en volver a escribirme."
        ];
        return goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)];
    }
    // How are you responses
    if (normalizedMessage.includes('cómo estás') ||
        normalizedMessage.includes('cómo te va') ||
        normalizedMessage.includes('qué tal estás')) {
        return "Estoy bien, gracias por preguntar. Lo más importante es cómo estás tú. ¿Hay algo con lo que pueda ayudarte hoy?";
    }
    // Keywords map for pattern matching (original responses)
    var responseMap = [
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
        ],
        [
            ['gafas', 'lentes', 'anteojos'],
            "Que se burlen de ti por usar lentes es injusto y doloroso. Usar lentes es completamente normal y no define quién eres como persona. ¿Has podido hablar con algún profesor o adulto sobre estas burlas?"
        ],
        [
            ['gordo', 'gorda', 'peso', 'delgado', 'flaco', 'flaca', 'cuerpo'],
            "Los comentarios sobre el cuerpo de otra persona nunca son aceptables. Cada persona es única y valiosa tal como es. ¿Te gustaría que habláramos sobre cómo responder cuando alguien hace ese tipo de comentarios?"
        ],
        [
            ['no me ayudan', 'no hacen nada', 'ignoran', 'no importa'],
            "Es frustrante cuando sientes que nadie te ayuda. A veces los adultos no entienden la gravedad de la situación o no saben cómo actuar. ¿Has intentado hablar con otro adulto diferente o ser muy específico sobre exactamente qué está pasando y cómo te afecta?"
        ],
        [
            ['qué es bullying', 'qué significa bullying', 'definición de bullying', 'dime sobre el bullying'],
            "El bullying es un comportamiento agresivo y repetitivo donde alguien con más poder daña intencionalmente a otra persona que tiene menos poder. Puede ser verbal (insultos), físico (golpes), social (exclusión) o en internet (cyberbullying). ¿Te gustaría saber más sobre algún tipo específico?"
        ],
        [
            ['qué hago', 'qué debo hacer', 'cómo reacciono', 'cómo actuó'],
            "Si estás experimentando bullying, estos son algunos pasos importantes: 1) Mantén la calma y aléjate. 2) Habla con un adulto de confianza como padres o profesores. 3) Documenta lo sucedido (fechas, nombres, lugares). 4) Recuerda que no es tu culpa y no estás solo/a. ¿Qué paso te resulta más difícil?"
        ]
    ];
    // Check for matches in user message
    for (var _i = 0, responseMap_1 = responseMap; _i < responseMap_1.length; _i++) {
        var _a = responseMap_1[_i], keywords = _a[0], response = _a[1];
        if (keywords.some(function (keyword) { return normalizedMessage.includes(keyword); })) {
            return response;
        }
    }
    // Default responses if no keyword match
    var defaultResponses = [
        "Gracias por compartir eso conmigo. ¿Podrías darme más detalles para poder ayudarte mejor?",
        "Es importante que sepas que no estás solo/a. ¿Hay algo específico sobre esta situación que te preocupe más?",
        "Entiendo que puede ser difícil hablar sobre esto. ¿Te gustaría que te diera algunos consejos generales sobre cómo manejar situaciones de bullying?",
        "Lo que me cuentas es importante. ¿Has podido hablar con algún adulto de confianza sobre esto?",
        "Estoy aquí para escucharte y ayudarte. ¿Hay alguna pregunta específica que tengas sobre cómo manejar esta situación?"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}
