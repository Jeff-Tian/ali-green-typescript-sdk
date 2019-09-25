# ali-green-typescript-sdk

> 阿里云盾内容安全服务提供的内容检测 API SDK
> (TypeScript 版)

[![npm download][download-image]][download-url]
[![NPM version](https://badge.fury.io/js/ali-green-typescript-sdk.png)](http://badge.fury.io/js/ali-green-typescript-sdk)
[![Build Status](https://travis-ci.com/Jeff-Tian/ali-green-typescript-sdk.svg?branch=master)](https://travis-ci.com/Jeff-Tian/ali-green-typescript-sdk)
[![Dependencies Status](https://david-dm.org/Jeff-Tian/ali-green-typescript-sdk.png)](https://david-dm.org/jeff-tian/ali-green-typescript-sdk)
[![Coverage Status](https://coveralls.io/repos/github/Jeff-Tian/ali-green-typescript-sdk/badge.svg?branch=master)](https://coveralls.io/github/Jeff-Tian/ali-green-typescript-sdk?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/Jeff-Tian/ali-green-typescript-sdk)

[download-image]: https://img.shields.io/npm/dm/ali-green-typescript-sdk.svg?style=flat-square
[download-url]: https://npmjs.org/package/ali-green-typescript-sdk

## 安装

```shell
npm install ali-green-typescript-sdk --save
```

## 功能列表

- 图片鉴黄
- 文本垃圾内容检测

```typescript
import AliGreen from 'ali-green-typescript-sdk'
import assert = require('assert')

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
```

详细参见 [官方 文档](https://help.aliyun.com/document_detail/70292.html?spm=a2c4g.11186623.6.579.36a67a17uGxJhf)

## 开发

1. 修改代码后跑

   ```shell
   npm test
   ```

   确保测试通过。

2. `git commit`
3. `npm version patch/minor/major`
4. `npm publish`

## 发布日志

- 1.1.0 文本垃圾内容检测
- 1.0.0 图片鉴黄
