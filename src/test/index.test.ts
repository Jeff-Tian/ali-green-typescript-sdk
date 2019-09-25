import assert = require('assert')
import AliGreen from '../index'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe('smoke', function() {
  it('works', () => {
    assert(true)
  })
})

describe('image scan ', () => {
  let mock: MockAdapter

  before(() => {
    mock = new MockAdapter(axios)
    mock.onPost(/.+/).replyOnce(200, {
      code: 200,
      data: [
        {
          code: 200,
          dataId: '5c6a3ed0-4ba3-11e9-9ed2-0feb314f6823',
          extras: {},
          msg: 'OK',
          results: [{ label: 'porn', rate: 99.700005, scene: 'porn', suggestion: 'block' }],
          taskId: 'img2EKGYsZAA937nPwc83jzso-1qpXRa',
          url: 'https://img.alicdn.com/tfs/TB1k_g9l26H8KJjSspmXXb2WXXa-600-600.jpg',
        },
      ],
      msg: 'OK',
      requestId: '2DC22050-3640-4FE4-A7E5-D82355DA5FFD',
    })
  })

  it('调用接口', async () => {
    const res = await AliGreen.pornScan(
      ['https://img.alicdn.com/tfs/TB1k_g9l26H8KJjSspmXXb2WXXa-600-600.jpg'],
      'yourAccessKeyId',
      'yourAccessKeySecret',
    )

    assert.deepStrictEqual(res.data.data[0].results, [
      {
        label: 'porn',
        rate: 99.700005,
        scene: 'porn',
        suggestion: 'block',
      },
    ])
  })
})

describe('text scan ', () => {
  let mock: MockAdapter

  before(() => {
    mock = new MockAdapter(axios)

    mock.onPost(/.+/).replyOnce(200, {
      msg: 'OK',
      code: 200,
      data: [
        {
          msg: 'OK',
          code: 200,
          dataId: 'xxxx$rdBjUC1C-1rd9Ah',
          results: [
            {
              rate: 50.0,
              suggestion: 'review',
              details: [
                {
                  hintWords: [
                    {
                      context: '奥巴马',
                    },
                  ],
                  contexts: [
                    {
                      libCode: '123456',
                      libName: '您自定义的词库名称',
                      context: '特朗普',
                    },
                  ],
                  label: 'politics',
                },
              ],
              label: 'politics',
              scene: 'antispam',
            },
          ],
          content: '奥巴马特朗普昨日在白宫进行了会面',
          filteredContent: '***特朗普昨日在白宫进行了会面',
          taskId: 'xxxxxxyyyyyy-xxxx',
        },
      ],
      requestId: 'yyyyyyyy-862F-4BAE-8B4E-xxxxxxx',
    })
  })
  it('调用接口', async () => {
    const res = await AliGreen.textScan(['奥巴马特朗普昨日在白宫进行了会面'], 'yourAccessKeyId', 'yourAccessKeySecret')

    assert.deepStrictEqual(res.data.data[0].results[0].label, 'politics')
  })
})
