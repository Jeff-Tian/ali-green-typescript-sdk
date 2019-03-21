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
