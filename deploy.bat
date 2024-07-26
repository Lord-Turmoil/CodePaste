@ECHO OFF

call minify.bat
call PseudoFTP.Client transfer -s dist -l CodePaste -f --overwrite

PAUSE
