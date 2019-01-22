function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    let parsed = JSON.parse(xmlHttp.responseText);
    //console.log(parsed.english)
    return(parsed.english)
    
}