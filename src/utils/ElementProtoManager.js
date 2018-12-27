class ElementProtoManager {

  constructor(clzPrefix) {
    this.prefix = clzPrefix;
    this.nativeElsProto = {}
    this.componentsProto = {}
  }

  getProto(key, isNativeEl = false) {
    if (isNativeEl) return this.nativeElsProto[key];
    return this.componentsProto[key]
  }

  setProto(key, proto, isNativeEl = false) {
    if (isNativeEl)
      this.nativeElsProto[key] = proto;
    else
      this.componentsProto[key] = proto;
  }

  createElementWithClz(tagName, clzName = null, noPrefix = false) {
    const key = '' + tagName + clzName + noPrefix;
    let proto = this.getProto(key);

    if (!proto) {
      proto = this.createElement(tagName);
      if (clzName) {
        clzName = noPrefix ? clzName : this.getPrefixClzName(clzName);
        proto.classList.add(clzName);
      }
      this.setProto(key, proto);
    }

    return proto.cloneNode(false);
  }

  createElement(tagName) {
    let proto = this.getProto(tagName, true);
    if (!proto) {
      proto = document.createElement(tagName);
      this.setProto(tagName, proto, true);
    }
    return proto.cloneNode(false);
  }

  getPrefixClzName(clzName) {
    if (this.prefix == null || this.prefix === "") return clzName;
    return this.prefix + "-" + clzName;
  }

  addPrefixClzToElement(el, clzName) {
    el.classList.add(this.getPrefixClzName(clzName));
  }
}

export default ElementProtoManager