export function removePushAtPosition<T>(arg: Array<T>, obj: T, pos: number): Array<T> {
  const index = arg.findIndex(o => o === obj);
  if (index > -1) {
    arg.splice(index, 1);
    arg.splice(pos, 0, obj);
  }
  return arg;
}

export function remove<T>(arg: Array<T>, obj: T): Array<T> {
  const index = arg.findIndex(o => o === obj);
  if (index > -1) {
    arg.splice(index, 1);
  }
  return arg;
}

export function add<T>(arg: Array<T>, obj: T, pos: number): Array<T> {
  arg.splice(pos, 0, obj);
  return arg;
}