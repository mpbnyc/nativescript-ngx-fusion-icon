# How to use
In order to make a usable {N} plugin from this repo:
1. `cd publish`
2. `sh pack.sh` (there will be error messages here, which can be safely ignored for now)
3. copy the output .tgz file into the root directory of the {N} project you want to add the plugin to
4. `tns plugin add nativescript-ngx-fusion-icon-0.0.1.tgz`
5. import the `FusionModule` in the root module of your {N} project. you may now use the fusion components.