import Router from 'koa-router';
const router = new Router()
router.prefix('/goods')

router.get('/selectAll', ctx => {
  const sql = `select g.id,g.good_name,c.category_name,g.good_description,g.price,g.src from goods g,category c where g.category_id = c.id`
  return new Promise<void>(resolve => {
    ctx.mysql.query(sql, (err, res) => {
      if (err) throw err;
      ctx.body = res
      resolve();
    });
  })
})

router.get('/getChat', ctx => {
  if (!ctx.query.id) return
  const sql = `select chat from goods where id = ${ctx.query.id}`
  return new Promise<void>(resolve => {
    ctx.mysql.query(sql, (err, res) => {
      if (err) throw err;
      ctx.body = res
      resolve();
    });
  })
})

router.post('/updateChat', ctx => {
  const data = ctx.request.body
  const id = data.id
  if (!id) return
  const message = data.data
  const sql = `update goods set chat='${JSON.stringify(message)}' where id = ${id}`
  return new Promise<void>(resolve => {
    ctx.mysql.execute(sql, (err, res) => {
      if (err) throw err;
      ctx.body = res
      resolve();
    });
  })
})

export default router;