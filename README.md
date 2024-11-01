# encrypt-compress-json

一个用于 JSON 数据加密和压缩的轻量级工具库
将JSON进行加密后再进行URLencode编码，适合GET Params传输

## 功能特点

- JSON 数据加密
- JSON 数据压缩
- 支持 UMD 和 ES Module 格式
- 使用 TypeScript 编写，提供完整类型支持

## 安装 

```bash
bun add @miharakinu/encrypt-compress-json
```

## 使用

```javascript
import { EncryptCompress } from '@miharakinu/encrypt-compress-json';

const encryptCompress = new EncryptCompress('your-secret-key');

// 加密并压缩数据
const encodedData = encryptCompress.encode({name: '张三', age: 25});

// 解压缩并解密数据
const decodedData = encryptCompress.decode(encodedData);

console.log(encodedData, decodedData);
```
