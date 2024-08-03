import { template } from 'mrm-core'
import { join } from 'path'

module.exports = async () => {
  template('.gitignore', join(__dirname, './_gitignore')).apply().save();
}
