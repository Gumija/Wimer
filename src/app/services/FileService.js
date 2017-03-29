import LoremIpsum from './lorem_ipsum.txt';

class FileService {
  getFileFromUrl(url: string) {
    // let text = require('./lorem_ipsum.txt');
    let text = atob(LoremIpsum.substr(23))
    console.log(text);
    return text;
  }

  reqListener(e) {
    let data = this.responseText;
    console.log(data);
}

}

var fileService = new FileService();
export default fileService;