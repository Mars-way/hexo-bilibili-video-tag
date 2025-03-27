# hexo-bilibili-video-tag
在 Hexo 文章/页面中通过BV号嵌入 Bilibili 视频。
优先使用 Bilibili 官方API获取 BVID，当 API 失败或网络不可用时回退到本地转换

## 安装
```bash
npm install --save hexo-bilibili-video-tag
```

## 使用方法
插件支持BV号:
```bash
{% bilibili BV1pCQKYbESJ %}
```
---

# hexo-bilibili-video-tag
Embed Bilibili videos in Hexo posts/pages using BV ID.

## About
> This is a [Hexo](http://hexo.io/) tag plugin for embedding [Bilibili](http://bilibili.com/) videos in posts/pages

## Installation
```bash
npm install --save hexo-bilibili-video-tag
```

## Usage
The plugin supports BV ID:
```bash
{% bilibili BV1pCQKYbESJ %}
```

## Features
Prioritize using Bilibili official API to get BVID, fallback to local conversion when API fails or network is unavailable

## License
MIT License