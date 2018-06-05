/* eslint-disable no-console */

const app = require('../server')

// const isProd = process.env.NODE_ENV === 'production'
// const useMicroCache = process.env.MICRO_CACHE !== 'false'

// // since this app has no user-specific content, every page is micro-cacheable.
// // if your app involves user-specific content, you need to implement custom
// // logic to determine whether a request is cacheable based on its url and
// // headers.
// // 10-minute microcache.
// // https://www.nginx.com/blog/benefits-of-microcaching-nginx/
// const cacheMiddleware = microcache.cacheSeconds(10 * 60, req => useMicroCache && req.originalUrl)

// app.get('*', isProd ? render : (req, res) => {
//   readyPromise.then(() => render(req, res))
// }, cacheMiddleware)

const port = process.env.PORT || 8095
const host = process.env.HOST || '0.0.0.0'
app.listen(port, host, () => {
  console.log(`server started at ${host}:${port}`)
})
