import { observable, computed } from 'mobx';

class DocumentStore {

  @observable docInfos = []

  constructor() {
    let doc = (i) => {
      return {
        id: i,
        title: `Analízis ${i}.`,
        preview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisl metus, imperdiet sed varius vel, venenatis in elit. Duis faucibus ultrices nisi, in semper sapien feugiat non. Mauris auctor nulla eget suscipit commodo. Fusce scelerisque eros erat, non cursus lacus facilisis non. Nunc elementum euismod neque et tincidunt. ",
        last_opened: new Date(),
        uploaded: new Date(),
        fileUrl: '',
        fileType: 'txt',
        file: {},
      };
    };
    this.docInfos = [
        doc(1), doc(2), doc(3),
        doc(6), doc(5), doc(4)
      ]
  }

  @computed get recentDocs () {
    return this.docInfos.sort((a, b) => a.last_opened > b.last_opened ? -1 : 1);
  }

  @computed get uploadedDocs () {
    return this.docInfos.sort((a, b) => a.uploaded > b.uploaded ? -1 : 1);
  }

}

var documentStore = new DocumentStore();
export default documentStore;