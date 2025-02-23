import { Command, flags } from '@oclif/command';
import { Options } from '@reactant/types';
import { build } from '@reactant/core';

export default class Build extends Command {
  static description = 'build platform';

  static examples = ['$ reactant build ios'];

  static flags = {
    config: flags.string({ char: 'c', required: false }),
    debug: flags.boolean({ char: 'd', required: false })
  };

  static args = [{ name: 'PLATFORM', required: true }];

  async run() {
    const { args, flags } = this.parse(Build);
    const options: Options = {
      config: JSON.parse(flags.config || '{}'),
      debug: !!flags.debug
    };
    return build(args.PLATFORM, options);
  }
}
