function ChargerInfo(el) {
  var code = el.value;
  var type = document.getElementById("typefichier").value;
	
  switch(type){
    case "json":
      GetAndDisplayJSON(code);
      break;
    case "xml":
      GetAndDisplayXML(code);
      break;
  }
	GetAndDisplayTEXT(code);
}

function GetAndDisplayJSON(code){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
      DisplayJSONResponse(JSON.parse(xhr.responseText), code);
		}
	}

  xhr.open("GET", "ajax/peintures.json", true);
  xhr.send();
}
function GetAndDisplayXML(code){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
      DisplayXMLResponse(xhr.responseXML, code);
		}
	}
  
  xhr.open("GET", "ajax/peintures.xml", true);
  xhr.send();
}
function GetAndDisplayTEXT(code){
	var xhr = new XMLHttpRequest();
  var texteFile = "ajax/"+code+".txt";

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
      document.getElementById("info").appendChild(document.createTextNode(xhr.responseText));
		}
	}
  
  xhr.open("GET", texteFile, true);
  xhr.send();
}

function DisplayJSONResponse(json, code){
  var peintures = json.peinture;

  ClearDivMessage();

  for(i = 0; i < peintures.length; i++){
    if(peintures[i].code == code){
      document.getElementById("peinture").src = "img/" + peintures[i].image;
      document.getElementById("titre").appendChild(document.createTextNode(peintures[i].titre));
      document.getElementById("artiste").appendChild(document.createTextNode(peintures[i].artiste));
      document.getElementById("prix").appendChild(document.createTextNode(peintures[i].prix));
    }
  }
}
function DisplayXMLResponse(xml, code){
  var peintures = xml.getElementsByTagName("peinture");

  ClearDivMessage();

  for(i = 0; i < peintures.length; i++){
    if(peintures[i].getElementsByTagName("code")[0].firstChild.nodeValue == code){
      document.getElementById("peinture").src = "img/" + peintures[i].getElementsByTagName("image")[0].firstChild.nodeValue;
      document.getElementById("titre").appendChild(document.createTextNode(peintures[i].getElementsByTagName("titre")[0].firstChild.nodeValue));
      document.getElementById("artiste").appendChild(document.createTextNode(peintures[i].getElementsByTagName("artiste")[0].firstChild.nodeValue));
      document.getElementById("prix").appendChild(document.createTextNode(peintures[i].getElementsByTagName("prix")[0].firstChild.nodeValue));
    }
  }
}

function ClearDivMessage() {
	while (document.getElementById("peinture").firstChild) {
		document.getElementById("peinture").removeChild(document.getElementById("peinture").firstChild);
	}
	while (document.getElementById("titre").firstChild) {
		document.getElementById("titre").removeChild(document.getElementById("titre").firstChild);
	}
	while (document.getElementById("artiste").firstChild) {
		document.getElementById("artiste").removeChild(document.getElementById("artiste").firstChild);
	}
	while (document.getElementById("prix").firstChild) {
		document.getElementById("prix").removeChild(document.getElementById("prix").firstChild);
	}
	while (document.getElementById("info").firstChild) {
		document.getElementById("info").removeChild(document.getElementById("info").firstChild);
	}
}