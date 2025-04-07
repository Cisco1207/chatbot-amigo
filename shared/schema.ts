import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const chatMessages = pgTable("chatMessages", {
  id: serial("id").primaryKey(),
  sessionId: text("sessionId").notNull(),
  content: text("content").notNull(),
  sender: text("sender").notNull(), // 'user' or 'bot'
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  sessionId: true,
  content: true,
  sender: true,
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  reportType: text("reportType").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  name: text("name"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertReportSchema = createInsertSchema(reports).pick({
  reportType: true,
  location: true,
  description: true,
  name: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;
