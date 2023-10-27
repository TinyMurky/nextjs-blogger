import CopyCodePreButton from "@/components/CopyCodePreButton"
import { 
  AncherTagH1,
  AncherTagH2,
  AncherTagH3,
  AncherTagH4,
  AncherTagH5,
  AncherTagH6
} from "@/components/HeadingWithAncherTag"

const mdxComponents = {
  h1: AncherTagH1,
  h2: AncherTagH2,
  h3: AncherTagH3,
  h4: AncherTagH4,
  h5: AncherTagH5,
  h6: AncherTagH6,
  pre: CopyCodePreButton
}

export default mdxComponents