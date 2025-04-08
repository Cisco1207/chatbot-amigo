import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { v4 as uuidv4 } from "uuid";
import { 
  insertChatMessageSchema,
  insertReportSchema
} from "@shared/schema";
import { getChatbotResponse, getQuickReplySuggestions } from "../shared/chatbotLogic";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route('/api');

  // Chat messages routes
  app.get('/api/chat/:sessionId', async (req: Request, res: Response) => {
    try {
      const sessionId = req.params.sessionId;
      const messages = await storage.getChatMessagesBySessionId(sessionId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener mensajes', error });
    }
  });

  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const parsed = insertChatMessageSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: 'Datos inválidos', errors: parsed.error });
      }
      
      // Create user message
      const userMessage = await storage.createChatMessage(parsed.data);
      
      // Generate bot response
      const botResponse = getChatbotResponse(parsed.data.content);
      
      // Generate quick reply suggestions based on the context
      const quickReplies = getQuickReplySuggestions(botResponse);
      
      // Store bot response
      const botMessage = await storage.createChatMessage({
        sessionId: parsed.data.sessionId,
        content: botResponse,
        sender: 'bot'
      });
      
      res.json({ 
        userMessage, 
        botMessage,
        quickReplies 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar el mensaje', error });
    }
  });

  // Session initialization
  app.get('/api/session/new', (req: Request, res: Response) => {
    const sessionId = uuidv4();
    const welcomeMessage = "¡Hola! Soy tu asistente contra el bullying. Estoy aquí para escucharte, ayudarte y brindarte recursos útiles. ¿En qué puedo ayudarte hoy?";
    const quickReplies = [
      "¿Qué es el bullying?",
      "Estoy sufriendo bullying",
      "Quiero ayudar a un amigo",
      "Soy testigo de bullying",
      "¿Cómo prevengo el bullying?"
    ];
    
    res.json({ 
      sessionId,
      welcomeMessage,
      quickReplies
    });
  });

  // Reports routes
  app.post('/api/reports', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const parsed = insertReportSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: 'Datos inválidos', errors: parsed.error });
      }
      
      // Create report
      const report = await storage.createReport(parsed.data);
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el reporte', error });
    }
  });

  app.get('/api/reports', async (req: Request, res: Response) => {
    try {
      const reports = await storage.getAllReports();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener reportes', error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
