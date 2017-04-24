
class DocumentProxy {
  getDocuments = async () => {
    let res = await fetch('/docInfos');
    return await res.json();
  }

  getDocument = async (id) => {
    let res = await fetch(`/docInfos/${id}`);
    return await res.json();
  }

  getFile = async (id) => {
    let res = await fetch(`/download/${id}`);
    return await res.text();
  }

  updateTitle = async (id, title) => {
    fetch(`/document/update/${id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: title }),
    })
  }
}

var documentProxy = new DocumentProxy();
export default documentProxy;