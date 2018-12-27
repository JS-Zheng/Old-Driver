// LowProfileCode: 低調碼
class LPCodeHelper {

  static restoreLink(code) {
    if (code == null) return '#'
    switch (code.length) {
      case 5:
        return 'http://0rz.tw/' + code
      case 6:
        return 'https://goo.gl/' + code
      case 8:
        return 'https://tinyurl.com/' + code
      default:
        return '#'
    }
  }
}

export default LPCodeHelper