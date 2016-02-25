const express = require('express')
const request = require('request-promise')

const app = express()
const STATUS_CODE = {
  INVALID_PARAMETER: 103,
  INTERNAL_ERROR: 102
}

app.get('/', (req, res) => {
  const url = req.query.url

  if (!url) {
    res.send({
      type: 'Error',
      data: [{
        code: STATUS_CODE.INVALID_PARAMETER,
        message: '缺少 URL'
      }]
    })
  }

  const API_URL = `http://heckyesmarkdown.com/go/?u=${url}`

  request(API_URL)
    .then(html => {
      if (!html) {
        res.send({
          type: 'Error',
          data: [{
            code: STATUS_CODE.INVALID_PARAMETER,
            message: '未返回数据'
          }]
        })
      }

      res.send({
        type: 'Text',
        data: [html]
      })
    })
    .catch(err => {
      console.error(err)
      console.error(err.stack)

      res.send({
        type: 'Error',
        data: [{
          code: STATUS_CODE.INTERNAL_ERROR,
          message: err.toString()
        }]
      })
    })
})

app.listen(3000, () => {
  console.log('app listening on port 3000')
})
