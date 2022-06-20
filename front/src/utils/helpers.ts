function isLocalHost(url: string) {
  return url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1;
}

function isURL(url: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );

  return pattern.test(url) && !isLocalHost(url);
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const changeLocation = (url: string) => {
  window.location.href = !/^https?:\/\//i.test(url) ? 'http://' + url : url;
};

export { changeLocation, copyToClipboard, isURL };
