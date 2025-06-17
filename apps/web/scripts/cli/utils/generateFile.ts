import fs from 'fs'
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { templateMap } from './templateMap'

// Handle __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function generateFile(
  templatePath: string,
  outputPath: string,
  data: unknown,
  type: keyof typeof templateMap,
  dryRun: boolean,
) {
  const fullTemplatePath = path.resolve(__dirname, '..', templatePath)
  const fullOutputPath = path.resolve(process.cwd(), outputPath)
  if (dryRun) {
    const output = chalk.green(fullOutputPath)
    return console.log(output)
  }
  const content = await ejs.renderFile(fullTemplatePath, data)

  const dir = path.dirname(fullOutputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(fullOutputPath, content, 'utf-8')
  console.log(chalk.green(`${type} generated successfull`.toUpperCase()))
  console.log(chalk.green(`File generated: ${fullOutputPath}`))
}
