export function chunk(...args: any[]): any[] {
  const [arr, len] = args as [any, number];
  const rest: (typeof arr)[] = [];
  for (let i = 0; i < arr.length; i += len) { rest.push(arr.slice(i, i + len)); }
  return rest;
}
