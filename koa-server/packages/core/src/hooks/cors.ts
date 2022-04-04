const cors = require('@koa/cors')

export default async (app) => {
  app.use(cors({
    origin: '*'
  }))
}