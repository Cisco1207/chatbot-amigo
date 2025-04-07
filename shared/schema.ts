import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema for authentication (basic implementation)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Chat message schema
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  sender: text("sender").notNull(), // 'user' or 'bot'
  timestamp: integer("timestamp").notNull(), // Unix timestamp
  sessionId: text("session_id").notNull(), // To group messages by anonymous session
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  text: true,
  sender: true,
  timestamp: true,
  sessionId: true,
});

// Resources schema for educational content
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'resources', 'reporting', 'learning', 'help'
  icon: text("icon"), // Font Awesome icon class
});

export const insertResourceSchema = createInsertSchema(resources).pick({
  title: true,
  content: true,
  category: true,
  icon: true,
});

// Responses schema for bot pre-programmed responses
export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  pattern: text("pattern").notNull(), // Keyword or pattern to match
  text: text("text").notNull(), // Bot response text
  quickReplies: jsonb("quick_replies"), // Array of quick reply options
  resourceId: integer("resource_id"), // Optional reference to a resource
});

export const insertResponseSchema = createInsertSchema(responses).pick({
  pattern: true,
  text: true,
  quickReplies: true,
  resourceId: true,
});

// Reports schema for bullying reports
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // Type of bullying
  description: text("description").notNull(),
  timestamp: integer("timestamp").notNull(),
  sessionId: text("session_id").notNull(),
  status: text("status").default("new"),
});

export const insertReportSchema = createInsertSchema(reports).pick({
  type: true,
  description: true,
  timestamp: true,
  sessionId: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Response = typeof responses.$inferSelect;
export type InsertResponse = z.infer<typeof insertResponseSchema>;

export type Report = typeof reports.$inferSelect;
export type InsertReport = z.infer<typeof insertReportSchema>;
