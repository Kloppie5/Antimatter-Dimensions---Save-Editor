async function onloadfile ( event ) {
  md.log("onloadfile");
  var rawtext = await event.target.files[0].text();
  populateRaw(rawtext);
  populateDecoded(rawtext);
  populateValues(rawtext);
}
function populateRaw ( rawtext ) {
  md.log("populateRaw");
  document.querySelector("textarea[id='saveFileTextArea']").value = rawtext;
}
function populateDecoded ( rawtext ) {
  md.log("populateDecoded");
  var decrtext = antimatterdimensionsdecrypt(rawtext);
  document.querySelector("textarea[id='saveFileDecodedTextArea']").value = decrtext;
}
function populateValues ( rawtext ) {
  md.log("populateValues");
  var decrtext = antimatterdimensionsdecrypt(rawtext);
  var data = JSON.parse(decrtext);
  var saveFileValues = document.querySelectorAll(".saveFileValue");
  for ( var i = 0; i < saveFileValues.length; i++ ) {
    var saveFileValue = saveFileValues[i];
    var path = saveFileValue.id;
    var value = data;
    var pathParts = path.split("/");
    for ( var j = 0; j < pathParts.length; j++ ) {
        value = value[pathParts[j]];
    }
    saveFileValue.value = value;
  }
}
function onsavechanged ( event ) {
  md.log("onsavechanged");
  var rawtext = event.target.value;
  populateDecoded(rawtext);
  populateValues(rawtext);
}
function onvaluechanged ( event ) {
  md.log("onvaluechanged");
  var path = event.target.id;
  var value = event.target.value;
  var pathParts = path.split("/");
  var text = JSON.parse(document.querySelector("textarea[id='saveFileDecodedTextArea']").value);
  md.dump(text);
  var value = text;
  for ( var j = 0; j < pathParts.length - 1; j++ ) {
    value = value[pathParts[j]];
  }
  value[pathParts[pathParts.length - 1]] = event.target.value;
  var rawtext = JSON.stringify(text);
  document.querySelector("textarea[id='saveFileDecodedTextArea']").value = rawtext;
  var encrtext = antimatterdimensionsencrypt(rawtext);
  document.querySelector("textarea[id='saveFileTextArea']").value = encrtext;
}
function onsavefile ( event ) {
  md.log("onsavefile");
  var blob = new Blob([saveFileTextArea.value], {type: "text/plain;charset=utf-8"});
  var a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "AntimatterDimensionsSaveEdited.txt";
  a.click();
}
