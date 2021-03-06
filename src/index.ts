import crypto from 'crypto'
import uuidV1 = require('uuid/v1')
import axios, { AxiosRequestConfig } from 'axios'

export default class AliGreen {
  static async textScan(texts, accessKeyId, accessKeySecret) {
    const bizConfig = {
      accessKeyId,
      accessKeySecret,
      path: '/green/text/scan',
      clientInfo: { ip: '127.0.0.1' },
      requestBody: JSON.stringify({
        scenes: ['antispam'],
        tasks: texts.map(t => ({
          dataId: uuidV1(),
          content: t,
        })),
      }),
      hostname: 'green.cn-shanghai.aliyuncs.com',
      greenVersion: '2017-01-12',
    }

    return AliGreen.detect(bizConfig)
  }
  static async pornScan(imageUrls, accessKeyId, accessKeySecret) {
    const bizConfig = {
      accessKeyId,
      accessKeySecret,
      path: '/green/image/scan',
      clientInfo: { ip: '127.0.0.1' },
      requestBody: JSON.stringify({
        bizType: 'Green',
        scenes: ['porn'],
        tasks: imageUrls.map(url => ({
          dataId: uuidV1(),
          url,
        })),
      }),
      hostname: 'green.cn-shanghai.aliyuncs.com',
      greenVersion: '2017-01-12',
    }

    return AliGreen.detect(bizConfig)
  }
  static async detect(bizConfig) {
    const { path, clientInfo, requestBody, greenVersion, hostname } = bizConfig
    const gmtCreate = new Date().toUTCString()
    const md5 = crypto.createHash('md5')

    const requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Content-MD5': md5
        .update(requestBody)
        .digest()
        .toString('base64'),
      Date: gmtCreate,
      'x-acs-version': greenVersion,
      'x-acs-signature-nonce': uuidV1(),
      'x-acs-signature-version': '1.0',
      'x-acs-signature-method': 'HMAC-SHA1',
    }

    AliGreen.sign(requestHeaders, bizConfig)
    const options: AxiosRequestConfig = {
      baseURL: 'https://' + hostname,
      url: path + '?clientInfo=' + encodeURIComponent(JSON.stringify(clientInfo)),
      method: 'POST',
      headers: requestHeaders,
      data: bizConfig.requestBody,
    }

    return axios(options)
  }

  static sign(requestHeaders, bizConfig) {
    const { accessKeyId, accessKeySecret, path, clientInfo } = bizConfig

    const authorization = crypto
      .createHmac('sha1', accessKeySecret)
      .update(
        `POST
application/json
${requestHeaders['Content-MD5']}
application/json
${requestHeaders['Date']}
x-acs-signature-method:HMAC-SHA1
x-acs-signature-nonce:${requestHeaders['x-acs-signature-nonce']}
x-acs-signature-version:1.0
x-acs-version:2017-01-12
${path}?clientInfo=${JSON.stringify(clientInfo)}`,
      )
      .digest()
      .toString('base64')

    requestHeaders.Authorization = 'acs ' + accessKeyId + ':' + authorization
  }
}
