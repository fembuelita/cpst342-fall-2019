# Assignment: Converting your website into a web application

Remember the syllabus contains useful links for this unit that may aid you  in the below tasks. I especially recommend <https://javascript.info> -- it is one of the most well-written and comprehensive-yet-simple JavaScript tutorials I've seen to-date.

## Overview
For this assignment, you'll be:

* Beginning the conversion from a static HTML site into a dynamic web application
* Using your website from Unit 2 as the base for Unit 3
* Incorporating JavaScript from Bootstrap
* Writing your own jQuery-free JavaScript to interact with the DOM (using Vanilla JS)
* Performing basic form validation and responding to the user differently based on validity
* Use `Fetch` to send AJAX requests to connect to a REST API
  - Using Promises and handling failures
* Integrating with JavaScript's primary package manager: [NPM](https://www.npmjs.com/)
* Using MomentJS as an embedded library
* Interacting with `localStorage` APIs
* Using an automation tool/task runner like Gulp to build your compiled files

Essentially, there are two core ideas for this assignment: using JavaScript in your front-end application; and using JavaScript tools for developing your application. I recommend you go through these tasks one-by-one in the order they are listed below to make your life easier. This is an _agile_ approach that takes more time but gives you steady deliverables and check-points for each process.

This assignment is expected to be harder than the previous two and is worth more points as a result. You should start soon on it so you have time to ask any questions before the day it is due.

## Your mission, should you choose to accept it (you should)

### Set up

Either start a new repository for Unit 3 or create a git branch in your current repository so you can keep `master` on Unit 2 stable so you always have a point you can return to if needed. See the syllabus links for git on branching or just create a new repository and manually copy/paste your files from the current repository into that one (excluding the hidden `.git` directory).

We'll be applying the structural conventions we discussed in Unit 2 for this unit. 
  - Inside the root directory for your site, you should have a directory `/assets`. Inside that directory should be a directory `/css`. 
    - If you did not already have this, move your SCSS & CSS into the `/assets/css` directory and update your paths inside the HTML files.
  - Inside `/assets` create a directory `/js`
  - Your root directory should now look like below (you won't have the JS file just yet and your HTML file names may be different)
  
```
.
├── about.html
├── assets
│   ├── css
│   │   ├── style.css
│   │   └── style.scss
│   └── js
│       └── app.js
├── form.html
└── index.html
```

Ensure your site is working as-expected. Commit any unsaved items and push to your repository if applicable.


### Hooking up to Bootstrap

Now that you have an environment you can work in without affecting the stability of your Unit 2 application, you're ready to dive into JavaScript.

Bootstrap uses jQuery to support Bootstrap's built-in JS functions. At one point, jQuery was effectively the ruler of most things JavaScript. However, because it was so useful ECMA International adopted parts of its core functionality and many of the features that once made jQuery so powerful are now natively part of ECMAScript. For this reason, it's generally better to avoid using jQuery and use native JS as this will improve performance reduce dependencies. It also allows you to integrate more easily with newer JS frameworks going forward, such as React. **Because of this, I want you to _only_ use jQuery for Bootstrap components and we'll use "vanilla JS" for everything else.** If you opt to use jQuery, I'll accept the solution but you'll lose some points.

However, since Bootstrap requires jQuery to function, you should be sure to include jQuery and Bootstrap's JS. Follow [Bootstrap's JS instructions](https://getbootstrap.com/docs/4.3/getting-started/introduction/#js) to connect the JS dependencies from a CDN.

Next, create a new JS file for your site either in the root directory or a subdirectory of your choosing (I suggest `/assets/js/`). You should name the file something like `app.js`. This is going to be the core JS for your application. Now add a `<script src="/assets/js/app.js"></script>` tag to your footer _after_ the tags you added for Bootstrap but _before_ the `</body>` tag. 

Now that you have JS installed, check your webpage. Inspect the Chrome Web Inspector console and ensure no 404 errors are present. If you see a 404 error, you should resolve those before moving on as it may be your JS failing to load.

#### Connecting your Alert Components
Now that you have JS connected, you can make the first steps of making your static site a dynamic web application by hiding both the alerts until the time is right. 

Add a class `d-none` to each of your two alerts you added to the form in Unit 2. This will make them disappear from the view but still be part of the DOM by setting their CSS `display` property to `none`.

Now navigate to your `app.js` file and add `$('.alert').alert();` to the first line of the document. Save your changes and reload your web page. You'll note that nothing appears to happen yet. This is because the alerts are hidden still because of the `d-none` class.

So, what does `$('.alert').alert();` do? The `$` is a shortcut for writing `jQuery`. `jQuery` is a function, so you use `()` after it. Inside the `()` you specify a selector. jQuery and CSS use the same selectors, so `$('.alert')` is selecting all HTML elements with a CSS class of `alert`. Then we use _chaining_ to say for each `.alert` call the Bootstrap `alert()` method. This is not the same as `window.alert()` as `alert()` there belongs to the `window` object. 

In effect, our code does nothing, _yet_! It will allow us to do interesting things later on, though.

Finally, wrap the JS code you just wrote in a function called `myAppOnload` and after that write an event handler for listening to the `document` to finish loading. Call the function when the event is completed. I'm providing the finished code for that here, but going forward you'll need to do these yourself. (Curious to know when to use `load` vs `DOMContentLoaded`? Check out this helpful answer <https://stackoverflow.com/a/588048>.)

##### Variant A

```js
// we accept a param e (for event) even though we're not using it. The event handler will automatically pass the event to the function. We could leave it out entirely since we're not using it, but I think it's helpful to see it.
function myAppOnload(e) {
  $('.alert').alert();
}
document.addEventListener('DOMContentLoaded', myAppOnload); // notice we do NOT call myAppOnload, we only pass the name of it. The event listener will call it (by using () after the name) when the event is triggered
```

##### Variant B With Old Syntax

This does the same as variant A, but uses a closure. This is the most common approach.

```js
document.addEventListener('DOMContentLoaded', function(e) {
  $('.alert').alert();
});
```

##### Variant C With Arrow Syntax

This does the same as variants a & b, but uses a closure with arrow syntax. This will not run on Internet Explorer with transpiling using Babel or something similar.

```js
document.addEventListener('DOMContentLoaded', e => {
  $('.alert').alert();
});
```

### Listening for form submission
Before going any further, save your changes, commit, and push them to your repository.

Now we're going to add a handler for the form submission. On your form page (I'll call it `form.html` from now on, but you can name yours however you like), add an ID of `contact` to the `<form>` tag, so that it looks like:
`<form id="contact">`

We want to listen for a submission to the form. In other words, when the form is submitted an _event_ is triggered and we want JavaScript to _intercept_ that event and _prevent default_ form handling from occurring. A default form handler would be to send the _serialized form data_ using the `method` attribute in the `<form>` tag (defaults to `GET` but is one of the HTTP verbs) to the url specified in the `action` attribute (defaults to `#` which is the current page--this is called a _post back_). We haven't specified `method` or `action` here, which you should normally do for all applications. We are not doing it because we'll use JS to intercept the form submission and send it using AJAX later on. In a "real life" application, you should specify `action` and `method` in all cases because even if you're using JS to intercept the events, if the user disables JS in their browser you want the site to still function--even if that makes taking the user to an error page that says you must enable JS to use this app.

In order to intercept the form submission event, then, we need to add an event listener. You can use the `addEventListener()` method again like we did earlier. You should connect it to the form itself, though. If you're doing this with vanilla JS, that would look like:

```js
document.getElementById("contact").addEventListener("submit", (e) => {
  e.preventDefault(); // prevents the event from taking the default action of sending the form as a postback event using GET
}); 
```

if you're using jQuery--which I'd prefer you don't--it would look like this:

```js
$("#contact").on("submit", (e) => {
  e.preventDefault(); // prevents the event from taking the default action of sending the form as a postback event using GET
}); 
```

Now when the form is submitted, nothing will happen. That's a good start! To make this more interesting, we want to instead validate the form and show a success or failure message based on the result. We'll wait to actually send the data anywhere just yet.

To actually validate the form, you have a few choices. You can create your own custom logic by checking each element in the form to ensure a value--and a sensical value--was passed. You can do that by iterating over the form fields or by referring to each one individually and checking its value using JS. I recommend this approach over the following, and you can [get additional guidance through MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation). Once you're ready to show or hide the alerts, you'll want to select them using `document.getElementById` (hint, you'll want to give each an ID) and use `classList.remove('d-none');` like `document.getElementById("success-alert").classList.remove("d-none");` -- don't forget to do this conditionally based on if the form is valid or not, _and_ to hide the opposite alert if it's showing! 

Alternatively, Bootstrap provides some basic form validation tools out of the box. You can use these (and use jQuery for them, if you like): <https://getbootstrap.com/docs/4.3/components/forms/#validation>. This might _replace_ the alert components. It's up to you based on how you approach this problem. Do what makes sense for you. If you're not using the alerts, be sure to remove them from your HTML and remove the JS we added earlier so you are free of clutter.

Once you form validation is working, save your changes, commit, and push to your repository.
 
### More Bootstrap!

Before moving onto the move advance JS portion, let's add more [Bootstrap components](https://getbootstrap.com/docs/4.3/components/) that use JS. You have done this already as part of lab but without the JS portion. Select any _two_ additional _different_ types of components than the alert (if you have other Bootstrap components on your site already, you can use these) and hook up the JS to your app. Be sure to place the JS initializations inside the your document onload function! You can do whichever components you like, so long as you have at least two integrated with JS.

Check your application, save your changes, commit, and push to your repository.


### Making the form actually work using AJAX
There are some free contact form submission tools out there you can use. Check out <https://formsubmit.co/> and <https://formspree.io/> for a couple examples. They will have you add a few form fields and set the `method` and `action` attributes for your `<form>` tag. 

Wait a minute! We're preventing default on the form submission, meaning the form `action` will _never_ be called. How do we solve this? Recall earlier I mentioned that we want the form to work even if a user doesn't have JS enabled? Well, if they don't, the form will "just work" but the experience won't be as nice. Because _I_ will have JS enabled when grading your submission, you want to _be certain_ your form uses _AJAX_ to send the API call to the URL specified in the `action` attribute of the form. 

So...what's an AJAX and how does one use it? AJAX is an acronym for "Asynchronous JavaScript and XML" and essentially it means sending an HTTP request somewhere using JavaScript. The XML portion of it is a little bit dated but the acronym sticks. You can perform an AJAX request by using the fetch API that's built into modern browsers. Previously, you would use the [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest) but the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is much more user friendly for simpler requests, like those we'll be doing here.

*Note:* Fetch is not available on IE, so this feature will not work on IE without using a [polyfill](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) like [this one](https://github.com/github/fetch).

After verifying the form submission is valid, instead of displaying the success alert, you should first send the form to the _API endpoint_ (the destination URL). You can use the properties of your `<form>` tag itself to determine the method and action. Example:

```js
const form = document.getElementById("contact");
const method = form.getAttribute("method");
const action = form.getAttribute("action");
```

When you're ready to send the request, which you can [find all the details by reading fetch's documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), you can use the properties above like:

```js
const form = document.getElementById("contact");
form.addEventListener('submit', e => {
    e.preventDefault();
    const method = form.getAttribute("method");
    const action = form.getAttribute("action");
    const submitForm = async (evt) => {
        return await fetch(action, {
            method, // shorthand for method: method
            mode: 'cors', // make sure you are running through HTTP:// and not file://
            body: new FormData(form) // see <https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData>
        });
    };
    
    // @todo handle submitForm Promise
    // @see <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Response_objects>
    // @see <https://javascript.info/async>
    // on a successful promise/submission, display a success alert 
    // on a failure promise/submission, display a failure (danger) alert

});
```

Check your email after receiving a positive success signal from fetch to ensure it is working. Note that certain form submission tools allow only 50 submissions or so per month, so you may need to use multiple tools if you exceed this limit during development.

Now that everything is working again, save your changes, commit, and push them to your repository.

### Recording page view data in local storage
Let's move on to setting up some basic analytics for your app. Most apps will use something like Google Analytics at minimum to track metrics, but we're going to write our own _really_ crude/simple analytics. 

For each page the user views, we want to track this in `localStorage`. In particular, we want to record:

* what page the user visited
* the time of their visit (I recommend storing in ISO-8601 format)

You should use [MomentJS](https://momentjs.com/) to record the timestamp for this -- it'll be much easier to use than JavaScript's built-in Date object. For _now_, download MomentJS from the home page using the download box near the top-left. Do not use npm or yarn _yet_, unless you're ready for that step (we'll being doing this later, but remember the _agile_ approach mentioned above). You can get ISO-8601 format by using the default formatting options in Moment: `moment().format();`

You can get the page _path_ by using `window.location.pathname`. See <https://js-tricks.info/javascript/how-to-get-current-url-path-in-javascript/> for more information.

Now that you are able to record the page (path) as well as the date using moment, add those to localStorage. Hint: you will want to use an array so you can store more than one entry, and push items to that array as they are added.

You can inspect your localStorage by using the Chrome Web Inspector. From the inspector, go to "Application" then expand "Local Storage" from the left sidebar. Select the url that applies to the current host and then find the key that matches what you set. You can also just use the "Console" tool in the inspector by typing `localStorage` and seeing its output.

Once you have a working--or partially working--solution, save your changes, commit, and push them to your repository.

### Viewing page view data from local storage
Next let's set up a page where we can see the page view data. We'll be using a `<table>` to display this data. Use a [Bootstrap table](https://getbootstrap.com/docs/4.3/content/tables/) to get you started with styling. You can use [Bootstrap Data Tables](https://datatables.net/examples/styling/bootstrap4) for 10 points of extra credit if you are interested in it. Make sure you specify this in your README so I don't forget to give it to you. 

For each `<tr>` in `<tbody>` you should output one row/record within the `localStorage` array that you're tracking data. Be sure to remove the sample data from the skeleton above.

Save your changes, commit, and push.

### Giving user privacy controls
On the page where the user page views can be tracked, we want to enable the user to clear their storage. This is pretty straight forward using `localStorage.clear()` but you'll want to hook it up to a JS event. The event should be some sort of Bootstrap Button or a basic `<a>` tag that the user can click on to clear the cache. The user should receive some sort of notification when the cache has been cleared. 

Additionally, the page should either refresh afterwards (`window.location.reload()`) or the table should reload. The second is more complex but will be made much easier in Unit 4 when we work with React.. :)

Save your changes, commit, and push.

### Prepping the app for build
Now that you have the core pieces for your application written, we need to write some JavaScript to process the build portion. Just like you've done with Java or C in the past where you have compiled your source code, we are going to do a similar process with JavaScript that concatenates and minifies our source code. We can also run these through transpiler tools like SASS and Babel to provide support for legacy browsers and autoprefix CSS for browsers with different CSS rule support.  

Inside this assignment you'll see a directory `sample-app`. Copy the following files from the root directory into your assignment's root directory: `.gitignore`, `package.json`, `gulpfile.js`, and `webpack.config.js`.

We'll talk about each of these files in lecture. Hopefully you've done some reading in the syllabus recommended reading links and these files sound familiar. If not, you can learn more about each of these by following the links in the syllabus for this unit. 

For simplicity, I'm providing fully written build files for you. All you need to do is customize the source files for each tool--gulp and webpack--to tell it where to find and output your core stylesheet and core JS file. Once you update it, be sure to also update your HTML files to point to the new `build` or `dist`(ribution) directories. See `sample-app/index.html` for examples. 

Next, remove your MomentJS file you manually downloaded and remove the reference to it from your HTML files so you no longer have something like `<script src="moment.js"></script>` in your HTML file. We'll _bundle_ all our needed JS files into a single file as part of our _build_ process so we link only a single JS file, like you can see in `sample-app/index.html`.

Now, update your `app.js` file to `require()` moment like you see in `sample-app/assets/js/app.js`. This will, during your build process, automatically include the moment.js source files in your JS bundle. 

All of your application code should now be updated and you simply need to build the app. Save your changes, commit, and push to GitHub.

### Building the application
Using the command line, `cd` into your root directory of your assignment. Then, run `npm install` to automatically install the _dependencies_ in `package.json`. You may see a few warnings about peer requirements and possibly some outdated packages or deprecation warnings, but you should see a success message when you're done about how many packages were installed. The output should look _something_ like:

```bash
$ npm install

> fsevents@1.2.9 install /Users/elly-luc/luc/cpst342/2019-fall/instructor/assignments/unit-3/sample-app/node_modules/fsevents
> node install

node-pre-gyp WARN Using request for node-pre-gyp https download
[fsevents] Success: "/Users/elly-luc/luc/cpst342/2019-fall/instructor/assignments/unit-3/sample-app/node_modules/fsevents/lib/binding/Release/node-v64-darwin-x64/fse.node" is installed via remote

> node-sass@4.13.0 install /Users/elly-luc/luc/cpst342/2019-fall/instructor/assignments/unit-3/sample-app/node_modules/node-sass
> node scripts/install.js

Cached binary found at /Users/elly-luc/.npm/node-sass/4.13.0/darwin-x64-64_binding.node

> node-sass@4.13.0 postinstall /Users/elly-luc/luc/cpst342/2019-fall/instructor/assignments/unit-3/sample-app/node_modules/node-sass
> node scripts/build.js

Binary found at /Users/elly-luc/luc/cpst342/2019-fall/instructor/assignments/unit-3/sample-app/node_modules/node-sass/vendor/darwin-x64-64/binding.node
Testing binary
Binary is fine
npm WARN cpst342-unit-3@1.0.0 No description
npm WARN cpst342-unit-3@1.0.0 No repository field.
npm WARN cpst342-unit-3@1.0.0 No license field.

added 784 packages from 452 contributors and audited 15668 packages in 9.443s
found 0 vulnerabilities
```

You only have to install once, so we're done with this now. You'll be able to see all of the installed dependencies in `./node_modules`.

Next we need to run the build command. You should do this everytime you update your application. If you find this process tedious, you can install watchers to your `gulpfile.js` such that every time you change a SCSS or JS file it automatically rebuilds.

To run the build, from your root directory, run `gulp`. If you just wish to build the CSS you can run `gulp css` and if you just wish to build the JS you can run `gulp js`. We're using Gulp as our task runner here and web use Webpack to bundle our JS. Technically Webpack can also do our CSS for us, but my personal preference is to use Gulp for this as I find it more straight forward. You can use whichever you prefer! There are, of course, other build tools as well, but these two are both very commonly used.

After running `gulp` from the command line, you'll see output like:

```bash
$ gulp
[13:13:20] Using gulpfile ~/luc/cpst342/2019-fall/instructor/assignments/unit-3/sample-app/gulpfile.js
[13:13:20] Starting 'default'...
[13:13:20] Starting 'css'...
[13:13:20] Starting 'js'...
[13:13:20] Finished 'css' after 407 ms
(node:11461) [DEP0097] DeprecationWarning: Using a domain property in MakeCallback is deprecated. Use the async_context variant of MakeCallback or the AsyncResource class instead.
[13:13:22] Finished 'js' after 1.7 s
[13:13:22] Finished 'default' after 1.7 s
```

You may or may not see the deprecation warning above. You can disregard that for this project. If you get errors during either of these processes, you need to check your paths you updated in the prep step earlier. Read carefully the error messages for details and see the lecture for guidance.

Finally, you should inspect your page to ensure it's loading the JS bundle file and CSS file from the build directory. These files have been minified and the CSS has been _autoprefixed_ to improve load time and add browser support, respectively. If you're using JS newer than ES6 you'll want to update your webpack config to use Babel to transpile your code to ES5 or ES6. That's not discussed in this assignment, but there are a lot of great resources you can find online.

If your page looks like it did before the build process, you don't see errors in the console, and your JS is still functioning, then you're good to go!

## Checking your work

Let's verify you meet the requirements:

1. Form validates
1. Form works with or without JS enabled
1. Form AJAX uses Fetch API
1. Form shows alerts (success or danger) based on whether or not form was able to send the email
1. Site JS does not use jQuery aside from where Bootstrap tells you to (I encourage you to use plain ol' JS for this anyway)
1. There are at least 2 Bootstrap Components with JS (or jQuery) connected to them
1. Page views are tracked to `localStorage` (both the date and the page path)
1. There is a page with a table on it that shows page views for the current user
1. (Optional 10 points extra credit) use a Bootstrap Data Table instead of a basic Bootstrap Table
1. The user has the ability to flush the tracking storage via a button on that page
1. A README.md or README.txt is supplied that notes anything requested in this document and lists team member names
1. MomentJS is imported using NPM 
1. JS and SASS are both built/compiled using Gulp and Webpack
1. A single JS file is produced and imported to replace `momentjs` and `app.js`
1. (Optional 10 points extra credit) connect Bootstrap to your build process and have a single stylesheet to import as well as a single JS file for everything, instead of 1 CSS + 1 JS for bootstrap & 1 CSS + 1 JS for your custom app portion.
1. Cite your sources in your README and JS/HTML/CSS source files.