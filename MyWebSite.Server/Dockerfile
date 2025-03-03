## Use the official .NET SDK image for building
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
#WORKDIR /
#
## Install Node.js for building client-side assets
#RUN apt-get update && apt-get install -y nodejs npm
#
## Copy and restore the project
#COPY ["MyWebSite.Server/MyWebSite.Server.csproj", "MyWebSite.Server/"]
#RUN dotnet restore "./MyWebSite.Server/MyWebSite.Server.csproj"
#
## Copy everything and build the project
#COPY . .
#WORKDIR "/MyWebSite.Server"
#RUN dotnet build "./MyWebSite.Server.csproj" -c Release -o /app/build
#
## Publish the project
#RUN dotnet publish "MyWebSite.Server/MyWebSite.Server.csproj" --no-restore -c Release -o /app/publish /p:UseAppHost=false
#
## Use the official ASP.NET runtime image for running the app
#FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
#WORKDIR /app
#COPY --from=build /app/publish .
#ENTRYPOINT ["dotnet", "MyWebSite.Server.dll"]

# Use the .NET SDK image with Node.js support
FROM mcr.microsoft.com/dotnet/sdk:8.0-bookworm-slim AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs npm

# Copy and build the project
COPY ["MyWebSite.Server/MyWebSite.Server.csproj", "MyWebSite.Server/"]
RUN dotnet restore "./MyWebSite.Server/MyWebSite.Server.csproj"
COPY . .
WORKDIR "/src/MyWebSite.Server"
RUN dotnet publish "./MyWebSite.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0-bookworm-slim AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyWebSite.Server.dll"]