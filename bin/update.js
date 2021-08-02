"use strict";

var path = require("path");
var fs = require('fs');
var febs = require("febs");


// for (const key in componentEnum.ComponentName) {
//   if ('navbarView' == componentEnum.ComponentName[key]) {
//     components.push('navbar-view');
//   }
//   else {
//     components.push(componentEnum.ComponentName[key]);
//   }
// }

function pkgVer(workDir) {
  var destFile = path.join(workDir, "package.json");
  if (!febs.file.fileIsExist(destFile)) {
    console.error('file is not existed: ' + destFile);
    process.exit(1);
  }

  var pk = require(destFile);
  var dependencies = pk.dependencies;
  var pkVer = dependencies['bpui.js'];
  if (!pkVer) {
    console.error('bpui.js is not installed');
    process.exit(1);
  }

  while (!Number.isInteger(parseInt(pkVer[0]))) {
    pkVer = pkVer.substr(1);
  }

  var vers = pkVer.split('.');
  return vers.slice(0, 2).join('.');
}

function pkgComponents(workDir) {
  var destFile = path.join(workDir, "package.json");
  if (!febs.file.fileIsExist(destFile)) {
    console.error('file is not existed: ' + destFile);
    process.exit(1);
  }

  var pk = require(destFile);
  var dependencies = pk.dependencies;

  var components = [];
  
  for (var keyDepend in dependencies) {
    if (keyDepend.indexOf('@bpui/') >= 0) {
      components.push(keyDepend);
    }
  }

  return components;
}

function done(args, workDir) {

  var updateComponentName = null;
  if (args.length > 1) {
    updateComponentName = args[1];
  }

  workDir = workDir || process.cwd();
  var pkgver = pkgVer(workDir);

  var destDir = path.join(workDir, "src", "bpui", "style");
  if (!febs.file.dirIsExist(destDir)) {
    throw new Error('directory is not existed: ' + destDir);
    process.exit(1);
  }

  console.log('Will copy style to :\'' + destDir + '\'');

  var components2;
  var components;
  if (updateComponentName) {
    components = [updateComponentName];
    components2 = ['@bpui/' + updateComponentName + '@' + pkgver];
  }
  else {
    components2 = pkgComponents(workDir);
    components = [];
    for (var i = 0; i < components2.length; i++) {
      components.push(febs.string.replace(components2[i], '@bpui/', ''));
      components2[i] = components2[i] + '@' + pkgver;
    }
  }
  
  febs.utils.execCommand("npm", [
    "i",
    ...components2,
    '--save'
    ],
    { cwd: workDir },
    (err, stdout, stderr) => {
      if (!err) {
        stdout && console.log(stdout)
      } else {
        console.error(stdout)
        console.error(stderr)
      }

      if (!stderr && !stdout) {

        var vers = [];
        for (var i = 0; i < components.length; i++) {
          var p = path.join(
            workDir,
            "node_modules",
            "bpui.js",
            "node_modules",
            "@bpui",
            components[i],
            "style"
          );
          if (!file.dirIsExist(p)) {
            p = path.join(workDir, "node_modules", "@bpui", components[i], "style");
          }

          var comm_pkg = require(path.join(workDir, "node_modules", "@bpui", components[i], "package.json"));
          vers.push(comm_pkg.version);

          console.log(`  copy ${components[i] + '@' + comm_pkg.version} style`);

          if (file.dirIsExist(p) && !file.dirIsExist(path.join(destDir, components[i] + '@' + comm_pkg.version))) {
            let comm = components[i] + '@' + comm_pkg.version;
            file.dirCopy(p, path.join(destDir, comm), function () {
              if (file.fileIsExist(path.join(destDir, comm, "unpkg.scss"))) {
                file.fileRemove(path.join(destDir, comm, "unpkg.scss"));
              }
              if (file.fileIsExist(path.join(destDir, comm, "unpkg_class.scss"))) {
                file.fileRemove(path.join(destDir, comm, "unpkg_class.scss"));
              }
            });
          } // if.
        }

        var fcontent = fs.readFileSync(path.join(__dirname, "_index.scss"), { 'encoding': 'utf-8' });
        for (var i = 0; i < components.length; i++) {
          fcontent = fcontent.replace(
            new RegExp(`@import\\s+(\\'||\\")\\./${components[i]}@(\\d|\\.)+(\\'||\\")`),
            './' + components[i] + '@' + vers[i]);
        }
        fs.writeFileSync(path.join(destDir, "_index.scss"), fcontent, { flag: 'w', encoding: 'utf8' });

        console.log("");
        console.log("");
        console.log("**************************************************************");
        console.log("> Success: Copy all components styles to `src/bpui/style`     ");
        console.log(">    import 'src/bpui/style'");
        console.log("**************************************************************");
        console.log("");
        console.log("> Can run 'bpui update' to upate component.");
        console.log("");
        console.log("");
      }
    }
  );
}

module.exports = {
  done: done
};
