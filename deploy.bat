@echo off

mkdir temp

@REM copy css, js, res folder into temp
xcopy /s /e /y /q css temp\css\
xcopy /s /e /y /q js temp\js\
xcopy /s /e /y /q res temp\res\
@REM copy favicon.png, index.html into temp
xcopy /q favicon.png temp
xcopy /q index.html temp
@REM copy publish
call PseudoFTP.Client transfer -s temp -i CodePaste --overwrite
rmdir /s /q temp
