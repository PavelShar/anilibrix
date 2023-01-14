// Use only for autocompletion in IDE
module.exports = {
    resolve: {
        alias: {
            '@': __dirname + '/src/renderer/src',
            '@main': __dirname + '/src/main',
            '@utils': __dirname + '/src/renderer/src/utils',
            '@views': __dirname + '/src/renderer/src/views',
            '@store': __dirname + '/src/renderer/src/store',
            '@mixins': __dirname + '/src/renderer/src/mixins',
            '@router': __dirname + '/src/renderer/src/router',
            '@assets': __dirname + '/src/renderer/src/assets',
            '@preload': __dirname + '/src/preload',
            '@package': __dirname + '/package.json',
            '@plugins': __dirname + '/src/renderer/src/plugins',
            '@layouts': __dirname + '/src/renderer/src/layouts',
            '@proxies': __dirname + '/src/renderer/src/proxies',
            '@components': __dirname + '/src/renderer/src/components',
            '@composables': __dirname + '/src/renderer/src/composables',
            '@transformers': __dirname + '/src/renderer/src/transformers',
        }
    }
};
