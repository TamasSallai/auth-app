export default {
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3000'),
  redis_url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  cookie_secret:
    process.env.COOKIE_SECRET ||
    'a secret with minimum length of 32 characters',
  cookie_ttl: parseInt(process.env.COOKIE_TTL || '86400'),
  cors_origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
} as const
