# grunt-msdeploypack [![NPM version](https://badge.fury.io/js/grunt-msdeploypack.png)](http://badge.fury.io/js/grunt-msdeploypack)

[Grunt][grunt] MS Deploy packager - Create MS Deploy compatible packages in pure node.js

## Getting Started

Install this grunt plugin next to your project's gruntfile with: `npm install grunt-msdeploypack --save-dev`

Then add this line to your project's `Gruntfile.js` :

```javascript
grunt.loadNpmTasks('grunt-msdeploypack');
```

Then specify your config:

```javascript
grunt.initConfig({

    msdeploypack: {
        dist: {
            src: './',
            options: {
                package: "app.js"
            }
        }
    }
    
});
```

[grunt]: https://github.com/gruntjs/grunt

## Release History
* 0.1.0 Initial Release
