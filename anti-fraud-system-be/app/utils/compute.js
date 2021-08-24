function bytesToSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1000; // or 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // eslint-disable-next-line no-restricted-properties
  return `${(bytes / Math.pow(k, i)).toPrecision(3)} ${sizes[i]}`;
}

module.exports = {
  bytesToSize,
};
