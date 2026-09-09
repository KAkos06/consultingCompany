FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["ExecutiveInsightUmbraco.csproj", "./"]
COPY ["Directory.Packages.props", "./"]
RUN dotnet restore "ExecutiveInsightUmbraco.csproj"

COPY . .
RUN dotnet publish "ExecutiveInsightUmbraco.csproj" --configuration Release --output /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Production

COPY --from=build /app/publish .
COPY docker/entrypoint.sh /entrypoint.sh
COPY wwwroot/media /app/media-seed

RUN chmod +x /entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
