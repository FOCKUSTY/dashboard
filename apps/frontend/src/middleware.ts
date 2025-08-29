import { NextRequest } from "next/server";
import { createCorsMiddleware } from "next-armored/cors";

const corsMiddleware = createCorsMiddleware({
  origins: ["https://auth-zemt.onrender.com", "http://localhost:3001"],
});

export function middleware(request: NextRequest) {
  return corsMiddleware(request);
}

export const config = {
  matcher: ["/api/:path*"],
};