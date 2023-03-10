const dir = {
    input: 'src',
    output: 'dist',
    includes: 'partials',
    layouts: 'layouts',
    data: 'data',
};

const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = eleventyConfig => {
    eleventyConfig.addPassthroughCopy(`${dir.input}/assets/images`);
    eleventyConfig.addPassthroughCopy(`${dir.input}/assets/fonts`);
    eleventyConfig.addPassthroughCopy(`${dir.input}/assets/video`);

    // Watch CSS files for changes
    eleventyConfig.addWatchTarget("./src/");

    //layout aliasing
    module.exports = function(eleventyConfig) {eleventyConfig.addLayoutAlias('default', 'layouts/default.html');};

    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.setLiquidOptions({
        jsTruthy: true
    });

    return {
        dir,
        htmlTemplateEngine: "liquid"
    };
  };