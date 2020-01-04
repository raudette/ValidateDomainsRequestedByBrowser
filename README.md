# ValidateDomainsRequestedByBrowser

A proof of concept demonstrating how browser automation can be used to monitor and detect magecart-style web skimming attacks

for complete details, visit <https://articles.hotelexistence.ca/posts/browserautomationtodetectwebskimming/>

# Pre-requisites:
- Node: <https://nodejs.org/en/>
- Chrome: <https://www.google.com/chrome/>
- Chrome automation driver: <http://chromedriver.storage.googleapis.com/index.html> 
- Code for this project from: <https://github.com/raudette/ValidateDomainsRequestedByBrowser>

# Running Test Scripts

1. TestProject

*ValidateDomainsRequestedByBrowser\TestProject\TestProject.js* - This is a small web application that hosts a simple form on http://localhost:3000/ on your PC which we'll use as a target for our automation script. Go into the TestProject folder, install the dependencies with NPM & start the application:

```
npm install
node TestProject.js
```

2. ValidateDomainsRequestedByBrowser

*ValidateDomainsRequestedByBrowser\ValidateDomainsRequestedByBrowser.js* - This is the web automation script that runs against the test project. The chromedriver.exe file, downloaded as a pre-requisite, can be copied into this folder if you did not install it in your path. Go into the ValidateDomainsRequestedByBrowser folder, install the dependencies with NPM & start the application.

```
npm install
node ValidateDomainsRequestedByBrowser.js
```

This application will complete the form, and review the domains requested by the browswer through the automation against the domains listed in domainwhitelist.txt
