module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        bowerInstall: {

            myTask: {
                ignorePath: /^\/|(\.\.\/){1,2}/,
                fileTypes: {
                    php: {
                        block: /(([\s\t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
                        detect: {
                            js: /<script.*src=['"](.+)['"]>/gi,
                            css: /<link.*href=['"](.+)['"]/gi
                        },
                        replace: {
                            js: '<script src="\{\{ asset(\'{{filePath}}\') \}\}" ></script>',
                            css: '<link rel="stylesheet" href="\{\{ asset(\'{{filePath}}\') \}\}" />'
                        }
                    }
                },
                src: [
                    './resources/views/master.blade.php'   // .html support...
                ]
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            }

        }
    });



    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-bower-install');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};
