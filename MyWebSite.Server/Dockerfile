
# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["mywebsite.client/nuget.config", "mywebsite.client/"]
COPY ["MyWebSite.Server/MyWebSite.Server.csproj", "MyWebSite.Server/"]
COPY ["mywebsite.client/mywebsite.client.esproj", "mywebsite.client/"]
RUN dotnet restore "./MyWebSite.Server/MyWebSite.Server.csproj"
COPY . .
WORKDIR "/src/MyWebSite.Server"
RUN dotnet build "./MyWebSite.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./MyWebSite.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyWebSite.Server.dll"]