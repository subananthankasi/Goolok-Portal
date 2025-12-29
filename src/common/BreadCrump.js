export const findBreadcrumb = (tree, pathname, trail = []) => {
  for (const item of tree) {
    if (item.path === pathname) {
      return [...trail, item.title];
    }

    // search children
    if (item.children) {
      const result = findBreadcrumb(item.children, pathname, [...trail, item.label]);
      if (result) return result;
    }
  }

  return null;
};
