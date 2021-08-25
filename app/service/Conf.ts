import { Service } from 'egg';

/**
 * Config Service
 */
export default class ConfigService extends Service {
  /**
   * sayHi to you
   * @param name - your name
   */
  public async addConfig(name: string) {
    return `hi, ${name}`;
  }
}
