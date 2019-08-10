(function (root) {
    const $contentTitle = document.querySelector('.app-content-title'),
        $contentText = document.querySelector('.app-content-text'),
        $breadcrumbsContainer = document.querySelector('.app-content .breadcrumbs');

    function createCollapser($treeNode, treeNode) {
        const $collapser = document.createElement('span');

        if (treeNode.collapsed) {
            $collapser.innerText = '+';
            $treeNode.classList.add('collapsed');
            $treeNode.setAttribute('collapsed', true);
        } else {
            $collapser.innerText = '-';
            $treeNode.setAttribute('collapsed', true);
        }

        $treeNode.prepend($collapser);
    }

    function createTreeNode(level, treeNode, $parent) {
        treeNode.collapsed = treeNode.collapsed || false;

        const $treeNode = document.createElement('div');
        $treeNode.setAttribute('data-level', level || 0);
        $treeNode.className = 'tree-node';
        $treeNode.node = treeNode;
        $parent.appendChild($treeNode);

        const $treeNodeText = document.createElement('p');
        $treeNodeText.innerText = treeNode.name;
        const depthIndentation = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navigation-depth-indentation').trim())
        $treeNode.style.paddingLeft = (level * depthIndentation) + 'px';

        const $treeNodeChildren = document.createElement('div');
        $treeNodeChildren.className = 'children';

        $treeNode.appendChild($treeNodeText);
        $treeNode.appendChild($treeNodeChildren);

        if (treeNode.children && !treeNode.isRoot) {
            createCollapser($treeNode, treeNode);
        }

        return $treeNodeChildren;
    }

    function constructBreadcrumbs($node, breadcrumbs) {
        if ($node.classList && $node.classList.contains('tree-node')) {
            console.log($node.node.name);
            breadcrumbs.push($node.node.name);

            if ($node.node.isRoot) {
                return breadcrumbs.reverse();
            }
        }

        if ($node.parentNode) {
            return constructBreadcrumbs($node.parentNode, breadcrumbs);
        }
    }

    function clearChildren($el) {
        while ($el.children.length) {
            $el.children[0].remove();
        }
    }

    function renderBreadcrumbs(breadcrumbs) {
        clearChildren($breadcrumbsContainer);

        breadcrumbs.forEach((breadcrumb, index) => {
            const $breadcrumb = document.createElement('span');
            $breadcrumb.innerText = breadcrumb + (index < breadcrumbs.length - 1 ? ' >' : '');
            $breadcrumbsContainer.appendChild($breadcrumb);
        })
    }

    function renderContent($node, node) {
        $contentTitle.innerText = node.name;
        $contentText.innerText = node.content;

        const breadcrumbs = constructBreadcrumbs($node, []);
        renderBreadcrumbs(breadcrumbs);
    }

    root.Tree = {
        update: function () {
            if (root.Tree.current.$el && root.Tree.current.rootTreeNode) {
                root.Tree.render(root.Tree.current.$el, root.Tree.current.rootTreeNode);
            }
        },
        render: function ($el, rootTreeNode) {
            root.Tree.current = {
                $el: $el,
                rootTreeNode: rootTreeNode
            };

            clearChildren($el);

            // Function to render or re-render the tree navigation.
            rootTreeNode.isRoot = true;
            const $rootTreeNode = createTreeNode(0, rootTreeNode, $el);
            window.$rootTreeNode = $rootTreeNode;

            $rootTreeNode.addEventListener('click', e => {
                if (e.target.tagName === 'p' || e.target.tagName === 'P') {
                    // Its a title node. Render content.
                    renderContent(e.target.parentNode, e.target.parentNode.node);
                } else if (e.target.tagName === 'span' || e.target.tagName === 'SPAN') {
                    // Its a collapser. Collapse/Expand the node.
                    const $node = e.target.parentNode,
                        node = $node.node;

                    if (node.collapsed) {
                        $node.classList.remove('collapsed');
                    } else {
                        $node.classList.add('collapsed');
                    }

                    node.collapsed = !node.collapsed;
                    $node.querySelector('span').innerText = node.collapsed ? '+' : '-';
                }
            });

            function visit($treeNode, treeNode) {
                function consume($treeNode, treeNode, level) {
                    if (treeNode.children) {
                        treeNode.children.forEach(childTreeNode => {
                            // Create a new node and use that.
                            const $childTreeNode = createTreeNode(level, childTreeNode, $treeNode);

                            consume($childTreeNode, childTreeNode, level + 1);
                        });
                    }
                }

                consume($treeNode, treeNode, 1);
            }

            visit($rootTreeNode, rootTreeNode);
        }
    }
}(window.App));