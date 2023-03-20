
function antimatterdimensionsdecrypt ( text ) {
  // remove AntimatterDimensionsSavefileFormatAAB and EndOfSavefile
  text = text.slice(37, -13);
  // fix special characters
  text = text.replace(/0c/g, "/").replace(/0b/g, "+").replace(/0a/g, "0");
  // base64 decode
  text = atob(text);
  // zlib inflate
  text = Uint8Array.from(Array.from(text).map(i => i.charCodeAt(0)));
  text = pako.inflate(text)
  text = new TextDecoder().decode(text);
  return text;
}

function antimatterdimensionsencrypt ( text ) {
  text = new TextEncoder().encode(text);
  text = pako.deflate(text);
  text = Array.from(text).map(i => String.fromCharCode(i)).join("");
  // base64 encode
  text = btoa(text);
  // fix special characters
  text = text.replace(/0/g, "0a").replace(/\+/g, "0b").replace(/\//g, "0c");
  // add AntimatterDimensionsSavefileFormatAAB and EndOfSavefile
  text = "AntimatterDimensionsSavefileFormatAAB" + text + "EndOfSavefile";
  return text;
}
