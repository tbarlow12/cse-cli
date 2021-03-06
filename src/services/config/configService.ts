import { ProjectCreationOptions } from "../../commands/commands/project/commands/init/projectInit";
import { ConfigValue, FileConstants } from "../../constants";
import { AgileConfig, GitHubConfig, ProjectorConfig, SharedOptions } from "../../models";
import { Config, FileUtils } from "../../utils";
import { AgileServiceProvider } from "../agile";
import { AzureDevOpsProviderOptions } from "../agile/providers";

/**
 * Class dealing with the Projector configuration.
 */
export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-module-boundary-types
  public static createInitialConfig(options: ProjectCreationOptions): ProjectorConfig {
    const { agileProvider } = options;
    return {
      agile: agileProvider ? this.createAgileConfig(agileProvider) : undefined,
      github: this.createGithubConfig(),
    };
  }

  public static getExistingConfig(options?: SharedOptions): ProjectorConfig {
    const githubToken = options?.githubToken;
    const configFile = options?.configFile;

    const config = FileUtils.readJson<ProjectorConfig>(configFile || FileConstants.configFileName);

    if (!githubToken) {
      return config ? config : {};
    }

    if (!config) {
      return {
        github: {
          personalAccessToken: githubToken,
        },
      };
    }

    return {
      ...config,
      github: {
        ...config.github,
        personalAccessToken: githubToken,
      },
    };
  }

  private static createAgileConfig(provider: AgileServiceProvider): AgileConfig {
    const now = new Date();
    return {
      providerName: provider,
      providerOptions: this.getProviderOptions(),
      sprints: {
        startDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        lengthOfSprintInDays: Config.getValue(ConfigValue.DefaultSprintLength),
        daysBetweenSprints: Config.getValue(ConfigValue.DefaultDaysBetweenSprints),
        numberOfSprints: Config.getValue(ConfigValue.DefaultNumberOfSprints),
        sprintIndexStart: Config.getValue(ConfigValue.DefaultSprintStartIndex),
        sprintNamePattern: Config.getValue(ConfigValue.DefaultSprintNamePattern),
      },
    };
  }

  private static createGithubConfig(): GitHubConfig {
    return {
      personalAccessToken: "{Not required, but allows for greater API limit when reading from GitHub repos}",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getProviderOptions(): any {
    // Only support AzDO for now. Leaving this here for when there are more options
    return {
      baseUrl: "{Base URL for Azure DevOps organization}",
      projectName: "{Name of Azure DevOps project}",
      personalAccessToken: "{Go to 'https://dev.azure.com/{organization}/_usersSettings/tokens' to generate token}",
    } as AzureDevOpsProviderOptions;
  }
}
