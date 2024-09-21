import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export interface Project {
  id: number;
  industry_id: number;
  name: string;
  description: string;
  link: string;
}

export interface Industry {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface ProjectWithIndustry extends Project {
  industry_name: string;
  industry_icon: string;
  industry_color: string;
}

const dbPath = path.join(process.cwd(), 'projects.db');

async function openDb() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

export async function getAllProjectsWithIndustries(): Promise<ProjectWithIndustry[]> {
  const db = await openDb();
  return db.all<ProjectWithIndustry[]>(`
    SELECT p.*, i.name as industry_name, i.icon as industry_icon, i.color as industry_color
    FROM projects p
    JOIN industries i ON p.industry_id = i.id
  `);
}

export async function getAllIndustries(): Promise<Industry[]> {
  const db = await openDb();
  return db.all<Industry[]>('SELECT * FROM industries');
}

export async function getProjectById(id: number): Promise<ProjectWithIndustry | undefined> {
  const db = await openDb();
  return db.get<ProjectWithIndustry>(`
    SELECT p.*, i.name as industry_name, i.icon as industry_icon, i.color as industry_color
    FROM projects p
    JOIN industries i ON p.industry_id = i.id
    WHERE p.id = ?
  `, id);
}