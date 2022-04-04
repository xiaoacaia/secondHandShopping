import mysql from 'mysql2';
export default async (app) => {
  const config = app.config?.mysql || {};
  if (config?.host && config?.user && config?.password && config?.database) {
    try {
      const connection = mysql.createConnection(config);
      connection.connect();
      app.use((ctx, next) => {
        ctx.mysql = connection;
        return next()
      })
    } catch (error) {
    }
  }
}
