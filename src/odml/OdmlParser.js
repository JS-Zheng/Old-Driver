import Node from './Node'

class OdmlParser {

  groupTags(txt) {
    return txt.match(/\[\s*([A-Za-z]+)\s*]([\S\s,]+?)\[\/\s*([A-Za-z]+)+\s*]/g)
  }

  parseTag(tag) {
    let m = tag.match(/\[\s*(img|video|iframe+)\s*]([\S\s,]+?)\[\/\s*(img|video|iframe+)\s*]/)
    if (m == null || m.length < 3 || m[1] !== m[3]) return
    let tagName = m[1].trim()
    let content = m[2].trim()
    return new Node(tagName, content)
  }
}

export default OdmlParser