export default app => {
  return {
    devServer: {
      port: 4000
    },
    mysql: {
      host: 'localhost',
      user: 'root',
      password: '1234',
      database: 'second_shopping'
    },
  }
}