import { Link } from "../models/general/link";
import { ConfigValue } from "../constants";
import config from "config";

export class Config {
  public static getValue<T = string>(valueName: ConfigValue): T {
    return config.get(valueName);
  }

  public static getValueWithDefault<T = string>(valueName: ConfigValue, defaultValue?: T): T | undefined {
    return config.has(valueName) ? config.get(valueName) : defaultValue;
  }

  public static getLink(name: string): Link {
    const links = this.getValue<Link[]>(ConfigValue.Links);
    const matchingLink = links.find((link) => link.name === name);
    if (!matchingLink) {
      throw new Error(`Missing link ${name} in config`);
    }
    return matchingLink;
  }
}
