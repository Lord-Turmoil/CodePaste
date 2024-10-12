# Mimic CI/CD pipeline to deploy project to remote host
#
# To run this script, you should have PowerShell 7.0 or later installed.
# You can download it at https://github.com/PowerShell/PowerShell/releases
#
# To auto-deploy Hexo blog to remote host, follow these steps:
#
# 1. Create a .env file with the following content:
#       ```
#       username@hostname
#       /path/to/deploy
#       app-name
#       build folder
#       ```
#    - `username@hostname` can also be the connection name in your SSH config file.  
#    - `app-name` is the name of the app folder on the remote host, thus the final path
#      will be `/path/to/deploy/app-name`.
#    - `build folder` is the folder to be deployed, e.g. `dist` for npm projects.
#
# 2. Run this script under project root directory.
#

# Read first and second line from .env file and raise error if not found
$envFile = Get-Content .env
$hostConnection = $envFile[0]
if (-not $hostConnection) {
    Write-Host "Error: hostConnection not found in .env file" -ForegroundColor Red
    exit 1
}
$deployPath = $envFile[1]
if (-not $deployPath) {
    Write-Host "Error: deployPath not found in .env file" -ForegroundColor Red
    exit 1
}
$tempPath = "$deployPath/tmp"
$app = $envFile[2]
if (-not $app) {
    Write-Host "Error: app not found in .env file" -ForegroundColor Red
    exit 1
}
$build = $envFile[3]
if (-not $build) {
    Write-Host "Error: build not found in .env file" -ForegroundColor Red
    exit 1
}

# Pack build folder into tar.gz
Write-Host "Packing build folder into tar.gz"
$randomString = -join ((65..90) + (97..122) | Get-Random -Count 10 | % {[char]$_})
$archiveName = "$randomString.tar.gz"
tar -czf $archiveName $build

# Copy archive to remote host
Write-Host "Copying archive to remote host"
scp $archiveName ${hostConnection}:/tmp/$archiveName

# Execute remote commands:
Write-Host "Executing deploy commands"
$commands= @(
    " rm -rf $tempPath/$build $deployPath/$app",
    " && tar -xzf /tmp/$archiveName -C $tempPath --overwrite",
    " && mv $tempPath/$build $deployPath/$app",
    " && rm /tmp/$archiveName"
)
ssh $hostConnection $commands

# Delete archive
Write-Host "Finishing up"
Remove-Item $archiveName
