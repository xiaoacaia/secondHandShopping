import Koa from 'koa';
import path from 'path';
import { getHooks, deepMerge } from './utils'
import { Hook, KoaApp } from './types';
import koaWebsocket from 'koa-websocket';
import route from 'koa-route'

const hooks = ['mysql', 'bodyparser', 'cors', 'router', 'lift'];

type Params = {
  appPath: string;
}

export default async function Run(params: Params) {
  const app = koaWebsocket(new Koa());
  const { appPath } = params;
  app.appPath = appPath;

  const env = process.env.NODE_ENV
  const extName = app.extName = env === 'development' ? '.ts' : '.js';

  const baseConfig = await import(path.join(appPath, `config/config.base${extName}`))
  const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`));
  app.config = deepMerge(baseConfig.default(app), curConfig.default(app));

  const allHooks: Hook[] = await getHooks(hooks);
  for (const hook of allHooks) {
    try {
      await hook.default(app);
    } catch (error) { }
  }


app.ws.use(route.all('/chat', function (ctx) {
  ctx.websocket.on('message', function (message) {
    for (const client of app.ws.server.clients) {
      client.send(message.toString())
    }
  });
}));

}

