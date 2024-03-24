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
