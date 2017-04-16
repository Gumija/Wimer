import { observable, computed, action } from 'mobx';

class DocumentStore {

  @observable docInfos = []

  @computed get recentDocs () {
    return this.docInfos.sort((a, b) => a.last_opened > b.last_opened ? -1 : 1);
  }

  @computed get uploadedDocs () {
    return this.docInfos.sort((a, b) => a.uploaded > b.uploaded ? -1 : 1);
  }

  @observable highlights = [
    {
      id: 0,
      
    }
  ];

  @action addDocumentInfo(docinfo){
    this.docInfos.push(docinfo);
  }

}

var documentStore = new DocumentStore();
export default documentStore;