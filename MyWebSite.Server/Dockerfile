FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
EXPOSE 7015
EXPOSE 5244

FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["MyWebSite.Server/MyWebSite.Server.csproj", "MyWebSite.Server/"]
RUN dotnet restore "MyWebSite.Server/MyWebSite.Server.csproj"
COPY ["MyWebSite.Server/", "MyWebSite.Server/"]
WORKDIR "/src/MyWebSite.Server"
RUN dotnet build "MyWebSite.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "MyWebSite.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false 
&& echo "=== Published Images ===" && ls -R /app/publish/Resources/Images || echo "No images found!"

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "MyWebSite.Server.dll"]
## Use .NET SDK image
#FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
#WORKDIR /app
#
## Copy only the server project files
#COPY ["MyWebSite.Server/MyWebSite.Server.csproj", "MyWebSite.Server/"]
#RUN dotnet restore "MyWebSite.Server/MyWebSite.Server.csproj"
#
## Copy the rest of the server project
#COPY MyWebSite.Server/ MyWebSite.Server/
#WORKDIR /app/MyWebSite.Server
#
## Publish the server project
#RUN dotnet publish "MyWebSite.Server.csproj" -c Release -o /app/publish /p:UseAppHost=false
#
## Runtime image
#FROM mcr.microsoft.com/dotnet/aspnet:8.0
#WORKDIR /app
#COPY --from=build /app/publish .
#
## Expose port 5000
#EXPOSE 7015
#
## Tell .NET to listen on all network interfaces
#ENV ASPNETCORE_URLS=http://+:7015
#
#ENTRYPOINT ["dotnet", "MyWebSite.Server.dll"]

