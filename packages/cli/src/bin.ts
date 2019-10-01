import Ecosystem from '@ecosystem/core';
import { Actions, getReactantPlatform, PlatformApi } from '@reactant/platform';
import { createConfig, activate } from '@ecosystem/config';
import { handle as handleError } from '@oclif/errors/lib/handle';
import { parse, flags } from '@oclif/parser';
import {
  Config,
  defaultConfig,
  postProcess,
  preProcess
} from '@reactant/config';
import Command from './command';

(async () => {
  try {
    activate(false);
    const output = parse(process.argv, {
      strict: false,
      flags: {
        platform: flags.string({ char: 'p', required: true })
      }
    });
    const platformName = output.flags.platform;
    const config = await createConfig<Config>(
      'reactant',
      defaultConfig,
      { platform: platformName },
      preProcess,
      postProcess
    );
    const ecosystem = new Ecosystem<Config, Actions>(
      'reactant',
      defaultConfig,
      (await getReactantPlatform(platformName, config)).actions,
      Command,
      false,
      preProcess,
      postProcess,
      undefined,
      [new PlatformApi()]
    );
    await ecosystem.run();
  } catch (err) {
    handleError(err);
  }
})();
