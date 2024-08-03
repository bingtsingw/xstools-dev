import gitUserName from 'git-user-name';
import { packageJson, template } from 'mrm-core';
import { join } from 'path';

module.exports = () => {
  const mit = 'LICENSE';
  template(mit, join(__dirname, './mit.txt'))
    .apply({
      year: new Date().getFullYear(),
      fullName: gitUserName(),
    })
    .save();

  packageJson().set('license', 'MIT').save();
};
