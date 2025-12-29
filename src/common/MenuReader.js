export const extractMenuTree = (elements) => {
  const tree = [];

  elements?.forEach((el) => {
    if (!el || !el.props) return;

    // If submenu
    if (el.props.label) {
      tree.push({
        type: "submenu",
        label: el.props.label,
        children: extractMenuTree(el.props.children),
      });
    }

    // If item
    if (el.props.to) {
      tree.push({
        type: "item",
        title: el.props.title,
        path: el.props.to,
      });
    }
  });

  return tree;
};
