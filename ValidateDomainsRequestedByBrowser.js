//We use this to parse hostnames
var psl = require('psl')

// Setup Selenium with logging
var webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require('selenium-webdriver')
var pref = new webdriver.logging.Preferences();
pref.setLevel('browser', webdriver.logging.Level.ALL);
pref.setLevel('driver', webdriver.logging.Level.ALL);
pref.setLevel('performance', webdriver.logging.Level.ALL);

var fs = require('fs')
let domainwhitelist = []  //we'll store our 'good' whitelisted domains here
let domainoutboundlist =[] //list of domains the browser requests 
let domaininvestigatelist =[]//list of outbound domains that weren't in the whitelist

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname
    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];
    return hostname;
}

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

//process to load our list of acceptable domains
async function load_domainwhitelist() {
    fs.readFile('./domainwhitelist.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        domainwhitelist = data.toString().split("\n")
        for (i = 0; i < domainwhitelist.length; i++) {
            domainwhitelist[i]=domainwhitelist[i].trim()
        }
    })
}

async function generate_domainoutboundlist() {

    var driver = await new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .setLoggingPrefs(pref).build();

    //Automate the transaction we want to monitor
    //Build the web automation script here
    await driver.manage().logs();
    await driver.manage().setTimeouts({ implicit: 2000 });//, pageLoad:       10, script: 10 } )
    await driver.get("http://localhost:3000")
    await wait(3000);    
    await driver.findElement(By.id("firstname")).click()
    await driver.findElement(By.id("firstname")).sendKeys("John")
    await wait(1000);    
    await driver.findElement(By.id("lastname")).click()
    await driver.findElement(By.id("lastname")).sendKeys("Smith")
    await wait(1000);    
    await driver.findElement(By.id("secretaccountnumber")).click()
    await driver.findElement(By.id("secretaccountnumber")).sendKeys("90210")
    await wait(5000);    
    await driver.findElement(By.id("submit")).click()    
    await wait(10000);    
    logs = await driver.manage().logs().get('performance')
    await driver.quit()
    //End of automation script

    //Get the list of domains the browswer has requested during the execution of the script
    for (i = 0; i < logs.length; i++) {
        messagestring = logs[i].message;
        var message = JSON.parse(messagestring)
        if (message.message.method === "Network.requestWillBeSent") {
            var parsed = psl.parse(extractHostname(message.message.params.request.url));
            var domainrequested = parsed.subdomain + '.' + parsed.domain
            if (domainoutboundlist.indexOf(domainrequested) === -1) {
                domainoutboundlist.push(domainrequested)
            }
        }
    }
}

async function review_outboundlist() {
    //build array of non-whitelisted domains requested
    for (i = 0; i < domainoutboundlist.length; i++) {
        if (domainwhitelist.indexOf(domainoutboundlist[i].trim()) === -1) {
            domaininvestigatelist.push(domainoutboundlist[i].trim())
        }
    }

    //Action.  If scripted, you could add an email alert here or some other type of notification
    if (domaininvestigatelist.length > 0) {
        console.log("\n\n\nThe browser made requests to the following domains which were not on your whitelist and should be investigated")
        for (i = 0; i < domaininvestigatelist.length; i++) {
            console.log(domaininvestigatelist[i])
        }
    }
    else {
        console.log("\n\n\nAll domains requested by the browser were in your whitelist")
        }
    }


async function runtest() {
    await load_domainwhitelist()
    await generate_domainoutboundlist()
    await review_outboundlist()
}

runtest()
