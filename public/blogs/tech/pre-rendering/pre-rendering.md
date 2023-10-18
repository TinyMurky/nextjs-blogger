---
title: 'Two Forms of Pre-rendering'
date: '2023-03-14'
tag: '後端'
readTime: 5
cover: './images/testPic.jpg'
description: 'We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.'
---
![image info](./images/testPic.jpg)

# This is Code Test
```javascript
import { remark } from "remark"
import html from "remark-html"
import remark2rehype from 'remark-rehype'
import highlight from 'rehype-highlight'
  
const processedContent= await remark()
	.use(html)
	.use(remark2rehype)
	.use(highlight)
	.process(matterResult.content)
```

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.