module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['PhantomJS'],
    files: [
      './javascripts/src/*.js',
      './javascripts/**/*.js'
    ]
  });
};