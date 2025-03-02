# Build and publish the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Install Node.js for front-end assets if needed
RUN apt-get update && apt-get install -y nodejs npm

# Copy and restore the project
COPY ["MyWebSite.Server/MyWebSite.Server.csproj", "MyWebSite.Server/"]
RUN dotnet restore "./MyWebSite.Server/MyWebSite.Server.csproj"

# Copy everything and build
COPY . .
WORKDIR "/src/MyWebSite.Server"
RUN dotnet build "./MyWebSite.Server.csproj" -c Release -o /app/build

# Publish the project
RUN dotnet publish "MyWebSite.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Final stage with runtime only
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyWebSite.Server.dll"]