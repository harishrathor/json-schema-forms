import moduleAliase from 'module-alias';
import path from 'path';



moduleAliase.addAliases({
    '@root'  : __dirname,
    '@modules': path.join(__dirname, 'modules')
  })