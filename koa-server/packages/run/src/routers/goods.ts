import Router from 'koa-router';
const router = new Router()
router.prefix('/goods')
// router.get('/getinfo', async (ctx, next) => {
//   ctx.body = "test"
//   await next()
// })

const sql = `select g.id,g.good_name,c.category_name,g.good_description,g.price,g.src from goods g,category c where g.category_id = c.id`

router.get('/selectAll', ctx => {
  return new Promise<void>(resolve => {
    ctx.mysql.query(sql, (err, res) => {
      if (err) throw err;
      ctx.body = res
      resolve();
    });
  })
})

export default router;