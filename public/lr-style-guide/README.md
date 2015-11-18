# Land Registry style guide

Derived from GOV.UK Elements, this style guide aims to produce consumable static assets
 for public facing applications.

## How can my app consume this style guide?

Everything you’re aiming to consume is in the ```lr-styleguide``` directory.

### Simple consumption

If you have no need to compile sass / js assets, and want to keep it very simple,
simply pop the following into ```/static/```:

```
/lr-styleguide
    /css
        styleguide-ie6.css
        styleguide-ie7.css
        styleguide-ie8.css
        styleguide.css
    /images
        * all files
    /js
        styleguide.min.js
```

The following code in your ```<head>``` will give you the styles:

```
<!--[if gt IE 8]><!--><link href="/static/lr-styleguide/css/styleguide.css" media="screen" rel="stylesheet" type="text/css" /><!--<![endif]-->
<!--[if IE 8]><link href="/static/lr-styleguide/css/styleguide-ie8.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
<!--[if IE 7]><link href="/static/lr-styleguide/css/styleguide-ie7.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
<!--[if IE 6]><link href="/static/lr-styleguide/css/styleguide-ie6.css" media="screen" rel="stylesheet" type="text/css" /><![endif]-->
```

Then, just before your closing ```</body>``` tag, add the following:
```
<script type="text/javascript" src="/static/lr-styleguide/js/styleguide.min.js"></script>
```
Note that ```styleguide.js``` includes:

* jquery 1.11.3
* details tag polyfill
* selection-buttons.js and bind.js polyfill from the GOV.UK Frontend Toolkit

All assets are concatenated and minified.

### More complex consumption

#### Git Submodule

You could include the style guide as a git submodule:

```git submodule add https://github.com/LandRegistry/lr-style-guide.git ./path/to/lr-style-guide```

Link to the individual files as above.

#### Flask + Flask Assets (+ web-assets)

If you want to incorporate the style guide files into an asset pipeline, some considerations...

##### SASS

Make sure you've sorted out your scss load paths, for example: ```static/lr-styleguide/sass```

You also need to make sure you've set up a load path to GOV.UK frontend toolkit stylesheets - which you need to have installed seperately. It’s a dependency. For example: ```static/govuk_frontend_toolkit/stylesheets```

Within ```lr-styleguide/sass``` are 4 stylesheets:

* styleguide.scss
* styleguide-ie8.scss
* styleguide-ie7.scss
* styleguide-ie6.scss

These files ```@import``` everything in the GOV.UK frontend toolkit and ```partials```

These are the files you need to output to the frontend as css (see simple method above). Create your bundles accordingly.

##### Javascript

Here’s an example bundle for concatenated and minified js output:

```
js = Bundle('govuk_frontend_toolkit/javascripts/vendor/polyfills/bind.js',
            'govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js',
            'govuk_frontend_toolkit/javascripts/govuk/stick-at-top-when-scrolling.js',
            'govuk_frontend_toolkit/javascripts/govuk/stop-scrolling-at-footer.js',
            'lr-styleguide/js/vendor/polyfills/details.polyfill.js',
            'lr-styleguide/js/vendor/jquery/jquery-1.11.3.js',
            'lr-styleguide/js/components/buttons-actions.js',
            'lr-styleguide/js/components/case-list.js',
            'lr-styleguide/js/components/inits.js',
            filters='rjsmin', output='lr-styleguide/js/styleguide.min.js')
assets.register('styleguide_js', js)
```

## Working on this style guide

### Getting started

The style guide itself has a Node / Grunt workflow to produce assets.

```grunt``` will build assets.
