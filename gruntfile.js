module.exports = function(grunt) {
    grunt.initConfig({
        //tasks in here in object notation
        less: {
            dev: {
                options: {
                    compress: false,
                    sourceMap: false
                },
                files: {
                    "css/style.css": "css/less/main.less"
                }
            },
            dist: {
                options: {
                    compress: true,
                    sourceMap: false
                },
                files: {
                    "deploy/css/style.css": "css/less/main.less"
                }
            }
        },
        concat: {
            main: {
                src: ['js/main.js'],
                dest: 'deploy/js/main.js',
            },
            plugins: {
                src: ['js/plugins.js'],
                dest: 'deploy/js/plugins.js',
            },
        },
        clean: {
            dist: [
                'deploy'
            ]
        },
        jshint: {
            dev: ['js/*.js']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'deploy/img/'
                }]
            }
        },
        htmlbuild: {
            dist: {
                src: ['*.{html,xml}'],
                dest: 'deploy/',
                options: {
                    beautify: true,
                    relative: true,
                },
            },
            css: {
                src: ['css/normalize.css'],
                dest: 'deploy/css'
            }
        },
        watch: {
            html: {
                files: ['*.html'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: ['css/less/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    livereload: true,
                }
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['jshint'],
                options: {
                    event: ['all'],
                    livereload: true,
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('stage', ['less:dev', 'jshint']);
    grunt.registerTask('deploy', ['clean:dist', 'jshint', 'concat', 'less:dist', 'newer:imagemin', 'htmlbuild']);
};
