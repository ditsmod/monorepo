export class ModuleConfigService {
  cryptoSecret = process.env.CRYPTO_SECRET;
  sizeXsrfToken = 20;
  xsrfCookieName = 'XSRF-TOKEN';
}
