class AbsComponentFactory {
  constructor(elProtoManager) {
    this.elProtoManager = elProtoManager;
  }

  create(deep = true) {
    let name = this.getName();
    let proto = this.elProtoManager.getProto(name);
    if (!proto) {
      proto = this.createProto(name);
      this.elProtoManager.setProto(name, proto);
    }
    return proto.cloneNode(deep);
  }

  createProto(name) {
    let proto = this.elProtoManager.createElementWithClz('div', name, true);
    this.setupProto(proto);
    return proto;
  }

  getName() {
    throw new Error('abstract method');
  }

  setupProto(proto) {
    throw new Error('abstract method');
  }
}

export default AbsComponentFactory;