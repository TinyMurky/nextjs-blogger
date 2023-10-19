// id是md檔案的檔名
// 用gray-matter取出md file的標題
interface Blog {
  id: string,
  path: string,
  category: string
  title: string,
  date: string,
  tag: string,
  readTime: number,
  cover: string | null,
  description: string
}

// BlogPost多一個content
interface BlogWithContent extends Blog {
  contentHtml: string;
}