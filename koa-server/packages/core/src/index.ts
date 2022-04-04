import Koa from 'koa';
import path from 'path';
import { getHooks, deepMerge } from './utils'
import { Hook, KoaApp } from './types';
const hooks = ['mysql', 'bodyparser', 'cors', 'router', 'lift'];

type Params = {
  appPath: string;
}

export default async function Run(params: Params) {
  const app: KoaApp = (new Koa()) as KoaApp;
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
    } catch (error) {
    }
  }
}

