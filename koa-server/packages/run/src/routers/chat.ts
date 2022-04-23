import Router from 'koa-router';

const router = new Router()
router.prefix('/ws')

router.get('/chat', async (ctx, next) => {
  console.log(ctx.app)
  // const app = koaWebsocket(new Koa());
  // app.ws.use(Router.all('/chat', function (ctx) {
  //   ctx.websocket.send('Hello World');
  //   ctx.websocket.on('message', function (message) {
  //     // do something with the message from client
  //     console.log(message);
  //   });
  // }));
  // app.listen(4001);

  await next()
})

export default router;