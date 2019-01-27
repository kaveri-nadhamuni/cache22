function httpGet()
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://www.ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location', false ); // false for synchronous request
    xmlHttp.send( null );
    let parsed = JSON.parse(xmlHttp.responseText);
    console.log(parsed.english)
    return(parsed.english)
    
}

function submitPromptHandler() {
    let promptText = httpGet();

    const input = {
        prompt: promptText,
    };

    post('/api/prompt', input)
    
}

/*var midnight = "0:00:00";
var now = null;
now = moment().format("H:mm:ss");

if (now === midnight){
    let promptText = httpGet();

    const input = {
        prompt: promptText,
    };

    post('/api/prompt', input);
}*/

const testButton = document.getElementById('testbtnID');
testButton.addEventListener('click', submitPromptHandler);



