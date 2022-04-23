import Router from 'koa-router';
const router = new Router()
router.prefix('/user')

router.get('/select', ctx => {
  const sql = `select * from user`
  return new Promise<void>(resolve => {
    ctx.mysql.query(sql, (err, res) => {
      if (err) throw err;
      ctx.body = res
      resolve();
    });
  })
})
export default router;