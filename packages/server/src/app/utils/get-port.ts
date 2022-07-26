export function getPort(defaultPort: number = 3000): number {
  const portParamIndex = process.argv.findIndex(v => v == '--port');
  return portParamIndex === -1 ? defaultPort : Number(process.argv[portParamIndex + 1]);
}
