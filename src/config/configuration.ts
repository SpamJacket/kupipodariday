export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES),
    synchronize:
      process.env.NODE_ENV === 'production'
        ? Boolean(process.env.SYNCHRONIZE_PROD)
        : Boolean(process.env.SYNCHRONIZE_DEV),
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'not-very-secret',
    ttl:
      (process.env.NODE_ENV === 'production'
        ? process.env.JWT_TTL_PROD
        : process.env.JWT_TTL_DEV) || '900s',
  },
});
