/**
 * Settings
 * Turn on/off build features
 */

var settings = {
	clean: true,
	scripts: true,
	polyfills: false,
	styles: true,
	svgs: true,
	copy: true,
	reload: true
};


/**
 * Paths to project folders
 */

var paths = {
	input: 'src/',
	output: 'dist/',
	scripts: {
		input: 'src/js/*',
		polyfills: '.polyfill.js',
		output: 'dist/js/'
	},
	styles: {
		input: 'src/scss/**/*.{scss,sass}',
		output: 'dist/css/'
	},
	nunjucks: {
		input: 'src/nunjucks/pages/**/*.+(html|nunjucks)',
		output: 'dist/',
		templates: 'src/nunjucks/templates'
	},
	svgs: {
		input: 'src/svg/*.svg',
		output: 'dist/svg/'
	},
	copy: {
		css: {
			input: 'src/copy/css/**/*',
			output: 'dist/css/'
		},
		js: {
			input: 'src/copy/plugins/**/*',
			output: 'dist/js/plugins/'
		},
		fonts: {
			input: 'src/copy/fonts/**/*',
			output: 'dist/fonts/'
		}, 
		images: {
			input: 'src/copy/images/**/*',
			output: 'dist/images/'
		},
		root: {
			input: 'src/copy/root/**/*',
			output: 'dist/'
		}
	},
	reload: './dist/',
	find_replace: {
		input: 'dist/**/*',
		find: 'http://localhost:3000',
		replace_local: 'http://localhost:8888/theDONUT/wp-content/themes/theDONUT',
		replace_live: 'https://thedonut.co/wp-content/themes/theDONUT',
		replace_live_ambassadors: 'https://ambassadors.thedonut.co/wp-content/themes/theDONUT'
	}
};


/**
 * Template for banner to add to file headers
 */

var banner = {
	full:
		'/*!\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %>\n' +
		' * <%= package.license %> License\n' +
		' * <%= package.repository.url %>\n' +
		' */\n\n',
	min:
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n',
	wp:
		'/*\n' +
		'Theme Name: the DONUT\n' +
		'Author: Matt McDonald\n' +
		'Author URI: mattmcdonalddesign.com\n' +
		'Description: the DONUT\n' +
		'Version: 1.0\n' +
		'License: GNU General Public License v2 or later\n' +
		'License URI: http://www.gnu.org/licenses/gpl-2.0.html\n' +
		'*/\n\n'
};


/**
 * Gulp Packages
 */

// General
var {gulp, src, dest, watch, series, parallel} = require('gulp');
var del = require('del');
var fs = require('fs');
var gulpData = require('gulp-data');
var flatmap = require('gulp-flatmap');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var package = require('./package.json');
var replace = require('gulp-replace');

// Scripts
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-terser');
var optimizejs = require('gulp-optimize-js');

// Styles
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-cssnano');

// SVGs
var svgmin = require('gulp-svgmin');

// BrowserSync
var browserSync = require('browser-sync');

// Nunjucks
var nunjucksRender = require('gulp-nunjucks-render');


/**
 * Gulp Tasks
 */

// Remove pre-existing content from output folders
var cleanDist = function (done) {

	// Make sure this feature is activated before running
	if (!settings.clean) return done();

	// Clean the dist folder
	del.sync([
		paths.output
	]);

	// Signal completion
	return done();

};

// Repeated JavaScript tasks
var jsTasks = lazypipe()
	.pipe(header, banner.full, {package: package})
	.pipe(optimizejs)
	.pipe(dest, paths.scripts.output)
	.pipe(rename, {suffix: '.min'})
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.min, {package: package})
	.pipe(dest, paths.scripts.output);

// Lint, minify, and concatenate scripts
var buildScripts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Run tasks on script files
	return src(paths.scripts.input)
		.pipe(flatmap(function(stream, file) {

			// If the file is a directory
			if (file.isDirectory()) {

				// Setup a suffix variable
				var suffix = '';

				// If separate polyfill files enabled
				if (settings.polyfills) {

					// Update the suffix
					suffix = '.polyfills';

					// Grab files that aren't polyfills, concatenate them, and process them
					src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
						.pipe(concat(file.relative + '.js'))
						.pipe(jsTasks());

				}

				// Grab all files and concatenate them
				// If separate polyfills enabled, this will have .polyfills in the filename
				src(file.path + '/*.js')
					.pipe(concat(file.relative + suffix + '.js'))
					.pipe(jsTasks());

				return stream;

			}

			// Otherwise, process the file
			return stream.pipe(jsTasks());

		}));

};

// Lint scripts
var lintScripts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Lint scripts
	return src(paths.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

};

// Process, lint, and minify Sass files
var buildStyles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.styles) return done();

	// Run tasks on all Sass files
	return src(paths.styles.input, { sourcemaps: true })
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: false
		}))
		.pipe(prefix({
			cascade: true,
			remove: true
		}))
		.pipe(header(banner.wp, { package : package }))
		.pipe(dest(paths.styles.output))
		.pipe(rename({suffix: '.min'}))
		.pipe(minify({
			discardComments: {
				removeAll: true
			}
		}))
		.pipe(header(banner.min, { package : package }))
		.pipe(dest(paths.styles.output));

};




var nunjucks = function(done) {
	return src(paths.nunjucks.input)
		.pipe(gulpData(function(){
			return JSON.parse(fs.readFileSync(`./${paths.input}nunjucks/data.json`))
		}))
		.pipe(nunjucksRender({
			path: paths.nunjucks.templates
		}))
		.pipe(dest(paths.nunjucks.output))
};

// Optimize SVG files
var buildSVGs = function (done) {

	// Make sure this feature is activated before running
	if (!settings.svgs) return done();

	// Optimize SVG files
	return src(paths.svgs.input)
		.pipe(svgmin())
		.pipe(dest(paths.svgs.output));

};

// Copy static CSS files into output folder
var copyCSS = function (done) {

	// Make sure this feature is activated before running
	if (!settings.copy) return done();

	// Copy CSS files
	return src(paths.copy.css.input)
		.pipe(dest(paths.copy.css.output));

};

// Copy static JS files into output folder
var copyJS = function (done) {

	// Make sure this feature is activated before running
	if (!settings.copy) return done();

	// Copy JS files
	return src(paths.copy.js.input)
		.pipe(dest(paths.copy.js.output));

};

// Copy font files into output folder
var copyFonts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.copy) return done();

	// Copy Font files
	return src(paths.copy.fonts.input)
		.pipe(dest(paths.copy.fonts.output));

};

// Copy images into output folder
var copyImages = function (done) {

	// Make sure this feature is activated before running
	if (!settings.copy) return done();

	// Copy Image files
	return src(paths.copy.images.input)
		.pipe(dest(paths.copy.images.output));

};

// Copy files into the root dist folder
var copyRootFiles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.copy) return done();

	// Copy Image files
	return src(paths.copy.root.input)
		.pipe(dest(paths.copy.root.output));

};



// Watch for changes to the src directory
var startServer = function (done) {

	// Make sure this feature is activated before running
	if (!settings.reload) return done();

	// Initialize BrowserSync
	browserSync.init({
		server: {
			baseDir: paths.reload
		},
		browser: "Firefox Developer Edition"
	});

	// Signal completion
	done();

};

// Reload the browser when files change
var reloadBrowser = function (done) {
	if (!settings.reload) return done();
	browserSync.reload();
	done();
};

// Watch for changes
var watchSource = function (done) {
	watch(paths.input, series(exports.default, reloadBrowser));
	done();
};

// Find and replace root url in dist folder for local WP
function replaceLocal() {
	return src(paths.find_replace.input)
		.pipe(replace(paths.find_replace.find, paths.find_replace.replace_local))
		.pipe(dest(paths.copy.root.output));
};

// Find and replace root url in dist folder for thedonut.co
function replaceLive() {
	return src(paths.find_replace.input)
		.pipe(replace(paths.find_replace.find, paths.find_replace.replace_live))
		.pipe(dest(paths.copy.root.output));
};

// Find and replace root url in dist folder for thedonut.co
function replaceLiveAmbassadors() {
	return src(paths.find_replace.input)
		.pipe(replace(paths.find_replace.find, paths.find_replace.replace_live_ambassadors))
		.pipe(dest(paths.copy.root.output));
};


/**
 * Export Tasks
 */

// Copy Task
// gulp copy
exports.copy = series(
	copyCSS,
	copyJS,
	copyFonts,
	copyImages,
	copyRootFiles
);

// Default task
// gulp
exports.default = series(
	cleanDist,
	nunjucks,
	parallel(
		buildScripts,
		lintScripts,
		buildStyles,
		buildSVGs,
		exports.copy
	)
);

// Watch and reload
// gulp watch
exports.watch = series(
	exports.default,
	startServer,
	watchSource
);

exports.replace_local = replaceLocal;
exports.replace_live = replaceLive;
exports.replace_live_ambassadors = replaceLiveAmbassadors;