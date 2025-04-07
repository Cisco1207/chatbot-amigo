import {
  users, type User, type InsertUser,
  messages, type Message, type InsertMessage,
  resources, type Resource, type InsertResource,
  responses, type Response, type InsertResponse,
  reports, type Report, type InsertReport
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesBySessionId(sessionId: string): Promise<Message[]>;
  
  // Resource operations
  getAllResources(): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  getResourceById(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Response operations
  getAllResponses(): Promise<Response[]>;
  getResponseByPattern(pattern: string): Promise<Response | undefined>;
  createResponse(response: InsertResponse): Promise<Response>;
  
  // Report operations
  createReport(report: InsertReport): Promise<Report>;
  getAllReports(): Promise<Report[]>;
  updateReportStatus(id: number, status: string): Promise<Report | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  private resources: Map<number, Resource>;
  private responses: Map<number, Response>;
  private reports: Map<number, Report>;
  
  private userIdCounter: number;
  private messageIdCounter: number;
  private resourceIdCounter: number;
  private responseIdCounter: number;
  private reportIdCounter: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.resources = new Map();
    this.responses = new Map();
    this.reports = new Map();
    
    this.userIdCounter = 1;
    this.messageIdCounter = 1;
    this.resourceIdCounter = 1;
    this.responseIdCounter = 1;
    this.reportIdCounter = 1;
    
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Add default resources
    const defaultResources: InsertResource[] = [
      {
        title: "Guía de Seguridad",
        content: "Consejos sobre cómo manejar situaciones de acoso en el recreo: Mantente cerca de otros estudiantes o adultos, Informa de inmediato a un profesor de guardia, No respondas con agresión.",
        category: "resources",
        icon: "fas fa-shield-alt"
      },
      {
        title: "Cómo Reportar",
        content: "Pasos para reportar incidentes de bullying: Habla con un profesor o consejero, Describe específicamente lo que sucedió, Mantén un registro de incidentes.",
        category: "reporting",
        icon: "fas fa-bullhorn"
      },
      {
        title: "Tipos de Bullying",
        content: "Información sobre los diferentes tipos de bullying: Físico (golpes, empujones), Verbal (insultos, apodos), Social (exclusión, rumores), Cibernético (mensajes, fotos).",
        category: "learning",
        icon: "fas fa-graduation-cap"
      },
      {
        title: "Cómo Ayudar",
        content: "Formas de ayudar a alguien que sufre bullying: No te quedes mirando, Incluye a la persona afectada en tus actividades, Repórtalo a un adulto de confianza.",
        category: "help",
        icon: "fas fa-hands-helping"
      }
    ];
    
    defaultResources.forEach(resource => this.createResource(resource));
    
    // Add default responses
    const defaultResponses: InsertResponse[] = [
      {
        pattern: "hola",
        text: "¡Hola! Soy AmigBot, tu asistente contra el bullying. Estoy aquí para escucharte y ayudarte. ¿Cómo puedo apoyarte hoy?",
        quickReplies: ["Estoy siendo acosado", "Veo a alguien siendo acosado", "Quiero informarme"],
        resourceId: null
      },
      {
        pattern: "acosado",
        text: "Lamento mucho que estés pasando por esto. Es importante que sepas que no estás solo y que no es tu culpa. ¿Puedes contarme más sobre lo que está sucediendo? También es importante que lo hables con un adulto de confianza, como un profesor o familiar.",
        quickReplies: ["¿Cómo le digo a un profesor?", "Me da miedo hablar", "Reportar esta situación"],
        resourceId: 1
      },
      {
        pattern: "miedo",
        text: "Es normal sentir miedo, pero hablar de lo que te está pasando es muy valiente. Puedes empezar escribiendo lo que quieres decir o practicando con alguien de confianza. También puedes mostrarle esta conversación a un adulto para ayudarte a explicar.",
        quickReplies: ["¿A quién puedo hablar?", "Tengo miedo a represalias", "Necesito más consejos"],
        resourceId: null
      },
      {
        pattern: "tipos",
        text: "Existen diferentes tipos de bullying: físico (golpes, empujones), verbal (insultos, burlas), social (exclusión, rumores) y cibernético (mensajes, fotos). Todos son igualmente dañinos y ninguno es aceptable.",
        quickReplies: ["¿Cómo identifico bullying?", "¿Qué hago si veo bullying?", "Más información"],
        resourceId: 3
      },
      {
        pattern: "ayudar",
        text: "¡Es genial que quieras ayudar! Si ves que alguien sufre bullying: no te quedes mirando, muestra apoyo a la persona afectada, no compartas contenido ofensivo, y reporta la situación a un adulto. Tu apoyo puede marcar una gran diferencia.",
        quickReplies: ["¿Cómo apoyo a un amigo?", "¿Debo intervenir?", "Quiero reportar bullying"],
        resourceId: 4
      },
      {
        pattern: "reportar",
        text: "Reportar el bullying es importante. Puedes hablar con un profesor, consejero escolar o familiar. Describe específicamente lo que ocurrió, cuándo y dónde. No es acusar, es protegerte a ti y a otros.",
        quickReplies: ["¿Qué información necesito?", "¿Será confidencial?", "Hacer un reporte ahora"],
        resourceId: 2
      },
      {
        pattern: "default",
        text: "Gracias por compartir. Estoy aquí para ayudarte con información sobre bullying. ¿Te gustaría saber más sobre cómo manejar situaciones de acoso, aprender sobre tipos de bullying, o cómo reportar incidentes?",
        quickReplies: ["Manejar situaciones", "Tipos de bullying", "Reportar incidentes"],
        resourceId: null
      }
    ];
    
    defaultResponses.forEach(response => this.createResponse(response));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  // Message methods
  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const newMessage: Message = { ...message, id };
    this.messages.set(id, newMessage);
    return newMessage;
  }

  async getMessagesBySessionId(sessionId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  // Resource methods
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values())
      .filter(resource => resource.category === category);
  }

  async getResourceById(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(resource: InsertResource): Promise<Resource> {
    const id = this.resourceIdCounter++;
    const newResource: Resource = { ...resource, id };
    this.resources.set(id, newResource);
    return newResource;
  }

  // Response methods
  async getAllResponses(): Promise<Response[]> {
    return Array.from(this.responses.values());
  }

  async getResponseByPattern(pattern: string): Promise<Response | undefined> {
    // Find the most appropriate response based on pattern matching
    // This is a simple implementation that could be improved with natural language processing
    const lowerPattern = pattern.toLowerCase();
    
    // First try exact match
    for (const response of this.responses.values()) {
      if (response.pattern.toLowerCase() === lowerPattern) {
        return response;
      }
    }
    
    // Then try contains
    for (const response of this.responses.values()) {
      if (lowerPattern.includes(response.pattern.toLowerCase())) {
        return response;
      }
    }
    
    // Return default response if no match
    return Array.from(this.responses.values())
      .find(response => response.pattern === "default");
  }

  async createResponse(response: InsertResponse): Promise<Response> {
    const id = this.responseIdCounter++;
    const newResponse: Response = { ...response, id };
    this.responses.set(id, newResponse);
    return newResponse;
  }

  // Report methods
  async createReport(report: InsertReport): Promise<Report> {
    const id = this.reportIdCounter++;
    const newReport: Report = { ...report, id, status: "new" };
    this.reports.set(id, newReport);
    return newReport;
  }

  async getAllReports(): Promise<Report[]> {
    return Array.from(this.reports.values());
  }

  async updateReportStatus(id: number, status: string): Promise<Report | undefined> {
    const report = this.reports.get(id);
    if (!report) return undefined;
    
    const updatedReport: Report = { ...report, status };
    this.reports.set(id, updatedReport);
    return updatedReport;
  }
}

export const storage = new MemStorage();
