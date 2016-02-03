/**
 * Created by hfgbarrigas on 01/02/16.
 */
module.exports = function (grunt) {

    var middlewareProxy = function (connect, options, middlewares) {

        //For full page refresh
        middlewares.unshift(
            require('connect-modrewrite')(['^[^\\.]*$ /src/index.html [L]'])
        );

        return middlewares;
    };

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        uglify: {
            options: {
                mangle: true
            },
            build: {
                src: "src/**/*.js",
                dest: "src/min/script.js"
            }
        },

        clean: [
            'target',
            'vendors'
        ],

        less: {
            development: {
                options: {
                    paths: ["css/partials"]
                },
                files: {
                    'css/app.css': 'css/partials/app.less'
                }
            }
        },

        bower: {
            install: {
                options: {
                    install: true,
                    cleanTargetDir: false,
                    cleanBowerDir: false,
                    silent: true,
                    copy: false,
                    targetDir: grunt.file.readJSON('.bowerrc').directory
                }
            }
        },

        watch: {
            options: {
              livereload: true
            },
            js: {
                files: [
                    'src/{,**/}*.js'
                ],
                tasks: ['eslint']
            },
            html: {
                files: [
                    'src/index.html',
                    'src/socialIntegration/templates/**/*.*'
                ]
            },
            less: {
                files: ['css/{,**/}*.less'],
                tasks: ['less:development'],
                options: {
                    livereload: false
                }
            },
            css: {
                files: ['css/{,**/}*.css']
            }
        },

        eslint: {
            options: {
                configFile: 'conf/eslint.json'
            },
            target: [
                'src/**/*.js',
                '!src/min/*.js'
            ]
        },

        connect: {
            options: {
                port: 8081,
                hostname: 'social-integration.tvg.com',
                livereload: 35729
            },
            livereload: {
                options: {
                    port: 8081,
                    hostname: 'social-integration.tvg.com',
                    open: true,
                    livereload: 35729,
                    middleware: middlewareProxy
                }
            }
        }
    });

    /* Run Tasks */
    grunt.registerTask('default', [
        "serve"
    ]);


    grunt.registerTask('serve', [
        'clean',
        'bower',
        'eslint',
        'less:development',
        'connect:livereload',
        'watch'
    ]);

};
