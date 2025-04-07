import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { nanoid } from "nanoid";
import { 
  insertMessageSchema, 
  insertReportSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new session
  app.post("/api/sessions", async (req: Request, res: Response) => {
    const sessionId = nanoid();
    
    // Create welcome message from bot
    await storage.createMessage({
      text: "¡Hola! Soy AmigBot, tu asistente contra el bullying. Estoy aquí para escucharte y ayudarte. ¿Cómo puedo apoyarte hoy?",
      sender: "bot",
      timestamp: Date.now(),
      sessionId
    });
    
    // Get initial response with quick replies
    const initialResponse = await storage.getResponseByPattern("hola");
    
    res.json({ 
      sessionId,
      initialResponse 
    });
  });
  
  // Get all messages for a session
  app.get("/api/sessions/:sessionId/messages", async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const messages = await storage.getMessagesBySessionId(sessionId);
    res.json(messages);
  });
  
  // Send a message and get a response
  app.post("/api/sessions/:sessionId/messages", async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    
    try {
      // Validate the request body
      const validatedBody = insertMessageSchema.parse({
        ...req.body,
        sessionId,
        timestamp: Date.now(),
        sender: "user"
      });
      
      // Store user message
      const userMessage = await storage.createMessage(validatedBody);
      
      // Generate bot response based on message content
      const botResponse = await storage.getResponseByPattern(validatedBody.text);
      
      // Store bot response
      const botMessage = await storage.createMessage({
        text: botResponse?.text || "Lo siento, no entendí eso. ¿Puedes intentar con otras palabras?",
        sender: "bot",
        timestamp: Date.now(),
        sessionId
      });
      
      // Get resource if applicable
      let resource = undefined;
      if (botResponse?.resourceId) {
        resource = await storage.getResourceById(botResponse.resourceId);
      }
      
      res.json({
        userMessage,
        botMessage,
        quickReplies: botResponse?.quickReplies || [],
        resource
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Mensaje inválido", details: error.errors });
      } else {
        res.status(500).json({ error: "Error al procesar el mensaje" });
      }
    }
  });
  
  // Get all resources
  app.get("/api/resources", async (req: Request, res: Response) => {
    const resources = await storage.getAllResources();
    res.json(resources);
  });
  
  // Get resources by category
  app.get("/api/resources/category/:category", async (req: Request, res: Response) => {
    const { category } = req.params;
    const resources = await storage.getResourcesByCategory(category);
    res.json(resources);
  });
  
  // Submit a bullying report
  app.post("/api/reports", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedBody = insertReportSchema.parse({
        ...req.body,
        timestamp: Date.now()
      });
      
      // Store the report
      const report = await storage.createReport(validatedBody);
      res.json(report);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Reporte inválido", details: error.errors });
      } else {
        res.status(500).json({ error: "Error al crear el reporte" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
