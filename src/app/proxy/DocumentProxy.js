
class DocumentProxy {
  getDocuments = async () => {
    let res = await fetch('/docInfos');
    return await res.json();
  }

  getFile = async (id) => {
    let res = await fetch(`/download/${id}`);
    return await res.text();
  }
}

var documentProxy = new DocumentProxy();
export default documentProxy;