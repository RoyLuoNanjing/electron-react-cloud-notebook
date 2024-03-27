export const flattenArr = (arr: any) => {
  //@ts-ignore
  return arr.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
};

export const objToArr = (obj: any) => {
  return Object.keys(obj).map((key) => obj[key]);
};

export const getParentNode = (node: any, parentClassName: any) => {
  let current = node;
  while (current !== null) {
    if (current.classList.contains(parentClassName)) {
      return current;
    }

    current = current.parentNode;
  }
  return false;
};
