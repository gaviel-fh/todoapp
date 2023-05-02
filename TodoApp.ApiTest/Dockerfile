FROM mcr.microsoft.com/dotnet/sdk:7.0 AS test

WORKDIR /src

# Copy projects
COPY TodoApp.Api/TodoApp.Api.csproj TodoApp.Api/
COPY TodoApp.ApiTest/TodoApp.ApiTest.csproj TodoApp.ApiTest/

# Restore dependencies
RUN dotnet restore "TodoApp.Api/TodoApp.Api.csproj"
RUN dotnet restore "TodoApp.ApiTest/TodoApp.ApiTest.csproj"

# Copy source code
COPY TodoApp.Api/ ./TodoApp.Api/
COPY TodoApp.ApiTest/ ./TodoApp.ApiTest/

WORKDIR "/src/TodoApp.ApiTest"

# Run tests
RUN dotnet test --no-restore -c Release
