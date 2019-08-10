(function (root) {
    const tree = {
        name: 'Root',
        content: 'This is the root node',
        children: [{
            name: 'Test',
            content: 'Eu id hendrerit taciti imperdiet sociosqu phasellus condimentum diam. Primis bibendum dictum velit ad fames donec mattis adipiscing. Vehicula mauris cubilia vitae pede. Porta integer accumsan elit sagittis luctus.',
            children: [{
                name: 'Nested Node1',
                content: 'Fusce montes hac inceptos turpis pharetra. Pretium consequat ullamcorper sodales hac conubia justo porta turpis nisl. Nisl vel quam sodales cubilia auctor. Hac consectetur phasellus mus aliquam accumsan dui. Non pellentesque quam malesuada gravida mi justo.',
                collapsed: true,
                children: [{
                    name: 'Allo',
                    content: 'Phasellus nascetur ultricies eleifend nam vivamus metus aliquet. Blandit elit quis porttitor eros risus per nec congue ultricies. Nullam consequat magnis eget congue. Ac curabitur risus iaculis dapibus. Euismod eu auctor dapibus scelerisque facilisis lobortis ad sed commodo.'
                }]
            }, {
                name: 'Nested Node 2',
                content: 'Hac etiam nascetur ornare dui vestibulum eget odio dolor ullamcorper. Ultricies duis habitasse tristique hendrerit. Potenti aliquam semper massa cubilia ante nisi felis. Neque nunc magna ad dignissim adipiscing justo aptent. Potenti elit tempor nunc lobortis fermentum. Etiam sociosqu accumsan pharetra proin iaculis dolor pede. Ornare dictum eros potenti maecenas. Donec parturient nam tellus ultricies consectetuer adipiscing. Suspendisse penatibus vivamus adipiscing gravida non sagittis laoreet varius.'
            }]
        }, {
            name: 'Another Node',
            content: 'Maecenas nostra blandit cras mus integer. Maecenas pulvinar vivamus potenti vel eget turpis. Malesuada ultrices congue aliquam hendrerit. Sodales si congue sed condimentum ligula pellentesque. Vehicula est in lacinia efficitur vivamus urna hac nam habitasse. Nam senectus ex lacinia feugiat tristique. Pulvinar dignissim quam class ornare auctor consectetuer ac fermentum. Elit eget mauris dignissim dictumst torquent.'
        }]
    };

    root.tree = tree;

    root.Tree.render(document.querySelector('.app-navigation'), tree);
}(window.App));