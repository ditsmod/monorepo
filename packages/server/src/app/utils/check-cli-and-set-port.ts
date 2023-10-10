/**
 * First, it checks the CLI parameter `--port`, if it does not exist,
 * it returns the default value passed in the parameters `defaultPort` of this function.
 */
export function checkCliAndSetPort(defaultPort: number = 3000): number {
  const portParamIndex = process.argv.findIndex(v => v == '--port');
  return portParamIndex === -1 ? defaultPort : Number(process.argv[portParamIndex + 1]);
}
