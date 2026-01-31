import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

// Compare password
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Get user from request (mengambil token dari cookie)
export function getUserFromRequest(request: NextRequest): JWTPayload | null {
  const token = request.cookies.get('token')?.value
  if (!token) return null
  return verifyToken(token)
}

// Check if user is admin
export function isAdmin(user: JWTPayload | null): boolean {
  return user?.role === 'admin'
}
