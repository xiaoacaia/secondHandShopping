改项目为一个简易的二手平台交易网站, 所用到的技术如下

前端: vue3, vue-router, vuex, element-plus, vite

后端: lerna, koa, koa-router, mysql2, @koa/cors

### 后端代码

后代代码结构如下

<img src="README.assets/image-20220404190318515.png" alt="image-20220404190318515" style="zoom:67%;" />

后端代码通过 `lerna` 创建, 通过 `lerna create` 命令在 `packages` 中创建 2 个子包

- core: 框架核心工程
- run: 负责项目具体业务

在最外层 `package.json` 中

```
"dev": "cross-env NODE_ENV=development nodemon -e ts,ejs --exec ts-node -T ./packages/run/src/index.ts"
```

运行 `run/src/index.ts` 下的代码

```ts
import Run from 'core/src'
Run({ appPath: __dirname })
```

在 `core/src/index.ts` 下 有类似如下代码, 用于启动项目

```ts
const hooks = ['mysql', 'bodyparser', 'cors', 'router', 'lift'];
export default async function Run(params: Params) {
  const allHooks: Hook[] = await getHooks(hooks);
  for (const hook of allHooks) {
    await hook.default(app)
}
  
export const getHooks = async (hooks: string[]) => {
  const result: any[] = []
  for (let i = 0;i < hooks.length;i++) {
    const hook = await import(path.join(__dirname, "../hooks", hooks[i]));
    result.push(hook)
  }
  return result
}
```

hooks 表明在 `core/src/hooks` 下的所有文件名, 该目录主要存放框架中各类独立模块的实现

#### 连接数据库

在 `core/src/hooks/mysql.ts` 下, 使用 msql2 , 并将创建的连接存入 `ctx.mysql` 中, 方便之后通过 ctx 使用

```ts
import mysql from 'mysql2';
export default async (app) => {
  const config = app.config?.mysql || {};
  if (config?.host && config?.user && config?.password && config?.database) {
    const connection = mysql.createConnection(config);
    connection.connect();
    app.use((ctx, next) => {
      ctx.mysql = connection;
      return next()
    })
  }
}
```

### 数据库

mysql 使用两张表

分类表 category

![image-20220404184350360](README.assets/image-20220404184350360.png)

商品表 goods

![image-20220404184403413](README.assets/image-20220404184403413.png)

查询语句

```sql
select g.id,g.good_name,c.category_name,g.good_description,g.price,g.src from goods g,category c where g.category_id = c.id
```

### 前端代码

#### 主界面

<img src="README.assets/image-20220325154011222.png" alt="image-20220325154011222" style="zoom: 50%;" />

#### 模糊查询

<img src="README.assets/image-20220325154224500.png" alt="image-20220325154224500" style="zoom:50%;" />

#### 商品详情界面

<img src="README.assets/image-20220325154019151.png" alt="image-20220325154019151" style="zoom:50%;" />

#### 付款界面

<img src="README.assets/image-20220325154044790.png" alt="image-20220325154044790" style="zoom:50%;" />

#### 订单界面

<img src="README.assets/image-20220325154148468.png" alt="image-20220325154148468" style="zoom:50%;" />
