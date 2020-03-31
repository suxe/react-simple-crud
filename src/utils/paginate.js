import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // with lodash we create new itms array easely for paginate
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
