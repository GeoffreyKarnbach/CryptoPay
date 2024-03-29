@echo off

cd /d "run_infra"

for %%f in (*.bat) do (
    echo Running script: %%f
    start "%%~nf" /b cmd /c "%%f"
)

pause