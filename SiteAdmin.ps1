$env:ADMIN_EMAIL = "vvc@vivekvijayandcompany.com"
$env:ADMIN_PASSWORD = "vvCPassw0rd123!"
$env:ADMIN_NAME = "Site Administrator"
npm run admin:provision
Remove-Item Env:ADMIN_EMAIL, Env:ADMIN_PASSWORD, Env:ADMIN_NAME