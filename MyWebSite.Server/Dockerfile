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

# Use .NET SDK image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy only the server project files
COPY ["MyWebSite.Server/MyWebSite.Server.csproj", "MyWebSite.Server/"]
RUN dotnet restore "MyWebSite.Server/MyWebSite.Server.csproj"

# Copy the rest of the server project
COPY MyWebSite.Server/ MyWebSite.Server/
WORKDIR /app/MyWebSite.Server

# Publish the server project
RUN dotnet publish "MyWebSite.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyWebSite.Server.dll"]