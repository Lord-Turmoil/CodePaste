@ECHO OFF

@REM delete all files in dist folder
rmdir /s /q dist

@REM create dist folder
mkdir dist

ECHO Minifying HTML
@REM set options
set options=--collapse-whitespace --remove-comments --remove-script-type-attributes --minify-css true --minify-js true
CALL html-minifier src/index.html -o dist/index.html %options%

ECHO Minifying CSS
CALL npx postcss src/css -d dist/css

ECHO Minifying JS
@REM create dist folder
mkdir dist\js
@REM set options
set options=--compress --mangle reserved=['$']
@REM iterate all js files in src/js folder
for %%f in (src\js\*.js) do (
    @REM minify js file
    @REM CALL npx terser %%f -o dist\js\%%~nxf %options%
    CALL uglifyjs %%f -o dist\js\%%~nxf %options%
)

ECHO Minifying Version
CALL python minify_json.py src/version.json dist/version.json

ECHO Copying Assets
xcopy src\res dist\res /s /e /i /q
copy src\favicon.png dist\favicon.png

ECHO Complete!
