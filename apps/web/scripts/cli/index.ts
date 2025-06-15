import path from 'path'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generateFile } from './utils/generateFile'
import { templateMap } from './utils/templateMap'
import { fixNameCase } from './utils/fiixNameCase'

yargs(hideBin(process.argv))
  .command(
    'g [type] [target]',
    'Generate a new component, interface, class, hook, or module',
    (yargs) => {
      return yargs
        .positional('type', {
          describe: 'Type to generate (component | interface | class | hook | module)',
          type: 'string',
        })
        .positional('target', {
          describe: 'Path or name (e.g., modules/foo or just Foo)',
          type: 'string',
        })
        .option('dry-run', {
          type: 'boolean',
          description: 'Print output instead of writing files',
          default: false,
        })
    },
    async (argv) => {
      const { type, target, dryRun } = argv
      if (!type || !target) {
        console.error('Please provide both type and target')
        return
      }

      const fullPath = path.normalize(target)
      const parsed = path.parse(fullPath)

      const rawName = parsed.name
      const dirPath = parsed.dir
      if (type === 'module') {
        /**
         * @todo handle module generation logic
         */
      } else {
        const fixedName = fixNameCase(rawName, type)
        const templatePath = `templates/${type}.ejs`
        const ext = type === 'component' || 'module' ? '.tsx' : '.ts'

        const baseDir = dirPath ? `src/${dirPath}` : templateMap[type]
        const outputPath = path.join(baseDir, `${fixedName}${ext}`)

        await generateFile(templatePath, outputPath, { name: fixedName }, type, dryRun)
      }
    },
  )
  .demandCommand()
  .help()
  .parse()
