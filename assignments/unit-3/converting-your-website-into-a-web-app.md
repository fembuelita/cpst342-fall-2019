# Assignment: Converting your website into a web application

Remember the syllabus contains useful links for this unit that may aid you  in the below tasks. I especially recommend <https://javascript.info> -- it is one of the most well-written and comprehensive-yet-simple JavaScript tutorials I've seen to-date.

## Overview
For this assignment, you'll be:

* Beginning the conversion from a static HTML site into a dynamic web application
* Using your website from Unit 2 as the base for Unit 3
* Incorporating JavaScript from Bootstrap
* Writing your own jQuery-free JavaScript to interact with the DOM
* Performing basic form validation and responding to the user differently based on validity
* Integrating with JavaScript's primary package manager: [NPM](https://www.npmjs.com/)
* Using MomentJS as an embedded library
* Using an automation tool/task runner like Gulp to build your compiled files
* Use AJAX to connect to a REST API

Essentially, there are two core ideas for this assignment: using JavaScript in your front-end application; and using JavaScript tools for developing your application. I recommend you go through these tasks one-by-one in the order they are listed below to make your life easier. This is an _agile_ approach that takes more time but gives you steady deliverables and check-points for each process.

This assignment is expected to be harder than the previous two and is worth more points as a result. You should start soon on it so you have time to ask any questions before the day it is due.

## Set up

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


## Hooking up to Bootstrap

Now that you have an environment you can work in without affecting the stability of your Unit 2 application, you're ready to dive into JavaScript.

Bootstrap uses jQuery to support Bootstrap's built-in JS functions. At one point, jQuery was effectively the ruler of most things JavaScript. However, because it was so useful ECMA International adopted parts of its core functionality and many of the features that once made jQuery so powerful are now natively part of ECMAScript. For this reason, it's generally better to avoid using jQuery and use native JS as this will improve performance reduce dependencies. It also allows you to integrate more easily with newer JS frameworks going forward, such as React.

However, since Bootstrap requires jQuery to function, you should be sure to include jQuery and Bootstrap's JS. Follow [Bootstrap's JS instructions](https://getbootstrap.com/docs/4.3/getting-started/introduction/#js) to connect the JS dependencies from a CDN.

Next, create a new JS file for your site either in the root directory or a subdirectory of your choosing (I suggest `/assets/js/`). You should name the file something like `app.js`. This is going to be the core JS for your application. Now add a `<script src="/assets/js/app.js"></script>` tag to your footer _after_ the tags you added for Bootstrap but _before_ the `</body>` tag. 

Now that you have JS installed, check your webpage. Inspect the Chrome Web Inspector console and ensure no 404 errors are present. If you see a 404 error, you should resolve those before moving on as it may be your JS failing to load.

### Connecting your Alert Components
Now that you have JS connected, you can make the first steps of making your static site a dynamic web application by hiding both the alerts until the time is right. 

Add a class `d-none` to each of your two alerts you added to the form in Unit 2. This will make them disappear from the view but still be part of the DOM by setting their CSS `display` property to `none`.

Now navigate to your `app.js` file and add `$('.alert').alert();` to the first line of the document. Save your changes and reload your web page. You'll note that nothing appears to happen yet. This is because the alerts are hidden still because of the `d-none` class.

So, what does `$('.alert').alert();` do? The `$` is a shortcut for writing `jQuery`. `jQuery` is a function, so you use `()` after it. Inside the `()` you specify a selector. jQuery and CSS use the same selectors, so `$('.alert')` is selecting all HTML elements with a CSS class of `alert`. Then we use _chaining_ to say for each `.alert` call the Bootstrap `alert()` method. This is not the same as `window.alert()` as `alert()` there belongs to the `window` object. 

In effect, our code does nothing, _yet_! It will allow us to do interesting things later on, though.

Finally, wrap the JS code you just wrote in a function called `myAppOnload` and after that write an event handler for listening to the `document` to finish loading. Call the function when the event is completed. I'm providing the finished code for that here, but going forward you'll need to do these yourself. (Curious to know when to use `window.onload` vs `document.onload`? Check out this helpful answer <https://stackoverflow.com/a/588048>.)

#### Variant A

```js
// we accept a param e (for event) even though we're not using it. The event handler will automatically pass the event to the function. We could leave it out entirely since we're not using it, but I think it's helpful to see it.
function myAppOnload(e) {
  $('.alert').alert();
}
document.addEventListener('onload', myAppOnload); // notice we do NOT call myAppOnload, we only pass the name of it. The event listener will call it (by using () after the name) when the event is triggered
```

#### Variant B With Old Syntax

This does the same as variant A, but uses a closure. This is the most common approach.

```js
document.addEventListener('onload', function(e) {
  $('.alert').alert();
});
```

#### Variant C With Arrow Syntax

This does the same as variants a & b, but uses a closure with arrow syntax. This will not run on Internet Explorer with transpiling using Babel or something similar.

```js
document.addEventListener('onload', e => {
  $('.alert').alert();
});
```

