module.exports = function (grunt) {
    grunt.initConfig({
        
        clean: {
          tests: "tests"  
        },
        
        msdeploypack: {
            test1: {
                options: {
                    package: "tests/app1.zip"
                },
                
                src: "."
            },
            
            test2: {
                options: {
                    package: "tests/app2.zip"
                },
                
                src: "lib",
                dest: "bin"
            },
            
            test3: {
                options: {
                    package: "tests/app3.zip"
                },
                
                files: [{
                    expand: true,
                    cwd: "lib",
                    src: "*.*",
                    dest: "."
                }]
            },
            
            test4: {
                options: {
                    package: "tests/app4.zip"
                },
                
                files: [{
                    expand: true,
                    cwd: "lib",
                    src: "*.*",
                    dest: "bin"
                }]
            }
        }
    });

    grunt.loadTasks("tasks");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", ["clean", "msdeploypack"]);
};