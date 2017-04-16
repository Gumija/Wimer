import DocumentStore from '../stores/DocumentStore';
import proxy from '../proxy/DocumentProxy';

class DocumentService {
  getDocuments = async () => {
    let documentJson = await proxy.getDocuments();
    for (let docinfo of documentJson) {
      DocumentStore.addDocumentInfo({
        id: docinfo.id,
        title: docinfo.title,
        preview: "",
        last_opened: new Date(),
        fileType: docinfo.type,
      })
    }
  }

  getFile = async (document) => {
    let file = await proxy.getFile(document.id);
    return file;
  }
}

var documentService = new DocumentService();
export default documentService;