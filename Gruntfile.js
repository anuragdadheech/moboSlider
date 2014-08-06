module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    // define source files and their destinations
    concat: {
        options: {
            // define a string to put between each file in the concatenated output
            separator: ';'
        },
        dist: {
        // the files to concatenate
            src: ['src/*js'],
            // the location of the resulting JS file
            dest: 'dist/<%= pkg.name %>.js'
        }
    },
    uglify: {
        options :{
            banner:'/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
            preserveComments:false,
            mangle:true
        },
        dist:{
            files: {
                'dist/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']
            }
        }
    },
    watch: {
        js:  { files: 'src/*.js', tasks: [ 'uglify' ] },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['concat', 'uglify' ]);
};
