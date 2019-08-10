(function (root) {
    root.App = {
        name: 'Tree View App',
        version: '0.0.1'
    };

    require('./tree');
    require('./main');

    console.log('Running Application', root.App);
}(window));