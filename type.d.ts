import matter from 'gray-matter'

type BundleResult = {
  code: string,
  frontmatter: {
    [key: string]: any
  },
  errors: Message[],
  matter: Omit<matter.GrayMatterFile<string>, "data"> & {
    data: {
      [key: string]: any
    }
  }
}