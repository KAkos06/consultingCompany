#!/bin/sh
set -eu

media_directory=/app/wwwroot/media
media_marker="$media_directory/.umbraco-media-initialized"

if [ -d /app/media-seed ]; then
  mkdir -p "$media_directory"
  cp -r /app/media-seed/. "$media_directory/"
  touch "$media_marker"
fi

# Ensure both lowercase and TitleCase view filenames exist for Linux case-sensitivity
if [ -d /app/Views ]; then
  [ -f /app/Views/master.cshtml ] && [ ! -f /app/Views/Master.cshtml ] && ln -sf /app/Views/master.cshtml /app/Views/Master.cshtml || true
  [ -f /app/Views/homePage.cshtml ] && [ ! -f /app/Views/HomePage.cshtml ] && ln -sf /app/Views/homePage.cshtml /app/Views/HomePage.cshtml || true
  [ -f /app/Views/contentPage.cshtml ] && [ ! -f /app/Views/ContentPage.cshtml ] && ln -sf /app/Views/contentPage.cshtml /app/Views/ContentPage.cshtml || true
fi

exec dotnet ExecutiveInsightUmbraco.dll
