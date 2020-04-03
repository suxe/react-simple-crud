import _ from "lodash"

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize
  // with lodash we create new itms array easely for paginate
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value()
}

export function orderTable(items, orderBy, orderDir) {
  return _(items)
    .orderBy(orderBy, orderDir)
    .value()
}
