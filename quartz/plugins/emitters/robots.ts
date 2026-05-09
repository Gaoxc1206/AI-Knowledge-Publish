import { FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

export const Robots: QuartzEmitterPlugin = () => ({
  name: "Robots",
  async *emit(ctx) {
    yield write({
      ctx,
      content: "User-agent: *\nDisallow: /\n",
      slug: "robots" as FullSlug,
      ext: ".txt",
    })
  },
})
