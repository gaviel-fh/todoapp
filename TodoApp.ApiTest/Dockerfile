# Test stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS test
WORKDIR /src
COPY ["TodoApp.Api/TodoApp.Api.csproj", "TodoApp.Api/"]
COPY ["TodoApp.ApiTest/TodoApp.ApiTest.csproj", "TodoApp.ApiTest/"]
RUN dotnet restore "TodoApp.Api/TodoApp.Api.csproj"
RUN dotnet restore "TodoApp.ApiTest/TodoApp.ApiTest.csproj"
COPY . .
WORKDIR "/src/TodoApp.ApiTest"
RUN dotnet test --no-restore -c Release