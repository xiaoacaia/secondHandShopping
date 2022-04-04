import glob from 'glob';
import path from 'path';
import compose from 'koa-compose';

export default async (app) => {
  const routerFiles = glob.sync(path.resolve(app.appPath, './routers', `**/*${app.extName}`));
  const registerRouter = async () => {
    let routers: any[] = [];
    for (let file of routerFiles) {
      const router = await import(file);
      routers.push(router.default.routes());
    }
    return compose(routers)
  }
  app.use(await registerRouter())
}
