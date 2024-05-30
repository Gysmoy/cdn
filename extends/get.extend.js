const GET = {}

let urlParams = new URLSearchParams(location.search);
[...urlParams].forEach(get => GET[get[0]] = get[1]);

class URI {
  static redirect = (uri, params) => {
    const urlParams = new URLSearchParams(params);
    document.location.href = `${uri}?${urlParams}`
  }
  static hash = (hash) => {
    document.location.hash = hash
  }
  static alter = (uri, params) => {
    const history = window.history;
    const urlParams = new URLSearchParams(params);
    history.pushState(null, null, `${uri}?${urlParams}`);
  }
}