import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const knowledgeExplorerOptions = {
  title: "知识库",
  folderDefaultState: "collapsed" as const,
  folderClickBehavior: "collapse" as const,
  useSavedState: true,
  sortFn: (a: any, b: any) => {
    const folderRank: Record<string, number> = {
      concepts: 1,
      methods: 2,
      papers: 3,
      questions: 4,
      raw: 5,
    }

    if (a.isFolder && b.isFolder) {
      const ar = folderRank[a.slugSegment] ?? 99
      const br = folderRank[b.slugSegment] ?? 99
      if (ar !== br) return ar - br
    }

    if (!a.isFolder && b.isFolder) return 1
    if (a.isFolder && !b.isFolder) return -1

    return a.displayName.localeCompare(b.displayName, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  },
  filterFn: (node: any) => {
    const filePath = node.data?.filePath ?? ""
    if (node.slugSegment === "tags") return false
    if (node.slugSegment === "maps") return false
    if (filePath.includes("wiki/maps/AI 文献知识库工作流.md")) return false
    return true
  },
  mapFn: (node: any) => {
    const filePath = node.data?.filePath ?? ""

    if (node.isFolder) {
      const folderNames: Record<string, string> = {
        wiki: "知识库",
        concepts: "概念",
        methods: "方法",
        papers: "论文",
        questions: "问题",
        raw: "图像资源",
        zotero: "Zotero",
        images: "论文图表",
      }
      if (folderNames[node.slugSegment]) node.displayName = folderNames[node.slugSegment]
      return node
    }

    let name = node.displayName
    const yearMatch = filePath.match(/\/papers\/[^/]+\/(\d{4})\s*-/)
    const year = yearMatch ? `${yearMatch[1]} ` : ""
    name = name.replace(/\s*-\s*[a-z][A-Za-z0-9]+$/, "")

    if (name.length > 28) {
      name = `${name.slice(0, 28)}...`
    }

    if (filePath.includes("/wiki/papers/")) {
      node.displayName = `${year}${name}`
    } else if (
      filePath.includes("/wiki/concepts/") ||
      filePath.includes("/wiki/methods/") ||
      filePath.includes("/wiki/questions/")
    ) {
      node.displayName = name
    }
    return node
  },
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(knowledgeExplorerOptions),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(knowledgeExplorerOptions),
  ],
  right: [],
}
