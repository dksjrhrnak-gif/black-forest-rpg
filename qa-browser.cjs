/* Optional cloud egress proxy; CI/local QA keep the existing direct route by default. */
module.exports = function launchOptions() {
  const options = {headless:true};
  if (process.env.BF_CHROMIUM) options.executablePath = process.env.BF_CHROMIUM;
  if (process.env.BF_USE_ENV_PROXY === '1') {
    const configured = process.env.HTTPS_PROXY || process.env.https_proxy;
    if (!configured) throw new Error('BF_USE_ENV_PROXY requires an existing HTTPS_PROXY binding');
    const url = new URL(configured);
    options.proxy = {
      server: `${url.protocol}//${url.hostname}${url.port ? ':'+url.port : ''}`,
      bypass: '127.0.0.1,localhost',
      ...(url.username ? {username:decodeURIComponent(url.username)} : {}),
      ...(url.password ? {password:decodeURIComponent(url.password)} : {})
    };
  }
  return options;
};
