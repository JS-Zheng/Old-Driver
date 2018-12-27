import LPCodeHelper from "./utils/LPCodeHelper";
import OdmlParser from "./odml/OdmlParser";
import ElementProtoManager from "./utils/ElementProtoManager";

let NODE_ENV = process.env.NODE_ENV
let dev = NODE_ENV !== 'production';

class OldDriverHandler {

  constructor() {
    this.elProtoManager = new ElementProtoManager("od");
  }

  observe() {
    let contentArea = document.getElementById("contentArea")
    // Handle existing posts
    this.handleParagraphs(contentArea.getElementsByTagName("p"))
  }

  handleParagraphs(paras) {
    if (paras == null || paras.length === 0) return

    this.odmlParser = new OdmlParser();

    Array.from(paras).forEach(p => {
        if (dev) p.style.backgroundColor = "#f56"
        let tags = this.odmlParser.groupTags(p.innerText)
        if (tags == null || tags.length < 1) return
        // Clear text of p
        p.innerText = ""

        let fragment = document.createDocumentFragment()
        fragment.appendChild(this.elProtoManager.createElement("br"))

        let elements = []
        for (let i = 0, tag; tag = tags[i]; i++) {
          let node = this.odmlParser.parseTag(tag)
          let tagName = node.tagName
          let codes = node.content.split(",")

          codes.forEach(c => {
            c = c.trim()
            let src = LPCodeHelper.restoreLink(c)
            if (dev) console.log(`Restore [${c}]: ${src}`)
            let el = this.elProtoManager.createElementWithClz(tagName, "item")
            el.src = src
            el.classList.add("swiper-slide");
            elements.push(el)
          })
        }

        let container = this.elProtoManager.createElement("div")
        // todo: append to swiper
        elements.forEach(el => {
          let wrapper = this.elProtoManager.createElement("div")
          wrapper.appendChild(el)
          container.appendChild(wrapper)
        })

        fragment.appendChild(container)
        p.parentNode.appendChild(fragment)
      }
    )
  }
}

export default OldDriverHandler