function httpGet()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://www.ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location', false ); // false for synchronous request
    xmlHttp.send( null );
    let parsed = JSON.parse(xmlHttp.responseText);
    //console.log(parsed.english)
    return(parsed.english)
    
}

var midnight = "0:00:00";
var now = null;
now = moment().format("H:mm:ss");

if (now === midnight){
    //Added stuff
      var prompt = document.getElementById("prompt-container");
         var result = httpGet();
       prompt.innerHTML = result;
   }

/*if (prompt in database has undefined attributes) {
    generate new prompt model
    (post request)
}
else {
    update existing prompt model
    (using get request)
}
