// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      './node_modules/jquery/dist/jquery.min.js',
      './tests/vendor/jasmine-jquery.js',
      './node_modules/govuk_frontend_toolkit/javascripts/govuk/selection-buttons.js',
      './javascripts/src/*.js',
      './javascripts/**/*.js',
      {
        pattern: './tests/fixtures/*.html', 
        include: false
      }
    ]
  });
};