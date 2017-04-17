import { observable, computed, action } from 'mobx';

class DocumentStore {

  @observable docInfos = []

  @observable currentFile = {
    id: -1,
    file: '',
  };

  @computed get recentDocs() {
    return this.docInfos.sort((a, b) => a.last_opened > b.last_opened ? -1 : 1);
  }

  @computed get uploadedDocs() {
    return this.docInfos.sort((a, b) => a.uploaded > b.uploaded ? -1 : 1);
  }

  @observable highlights = [
    {
      id: 0,

    }
  ];

  @action addDocumentInfo(docinfo) {
    let doc = this.docInfos.find(doc => doc.id === docinfo.id)
    if (doc) {
      this.docInfos.splice(this.docInfos.indexOf(doc), 1);
    }
    this.docInfos.push(docinfo);
  }

  @action setCurrentFile(value) {
    this.currentFile = value;
  }

}

var documentStore = new DocumentStore();
export default documentStore;