pipeline{
    agent any

    stages{
        stage("Git Checkout"){
            steps{
                checkout scm
            }
        }

        stage("Unit Test .Net Backend"){
            steps{
                script{
                    // sh "dotnet test -p TodoApp.ApiTest/TodoApp.ApiTest.csproj"
                    sh "docker build -f TodoApp.ApiTest/Dockerfile -t todoapp-apitest ."
                }
            }
        }
// dotnet sonarscanner begin /k:TodoApp /d:sonar.host.url=http://172.23.0.1:9000 /d:sonar.login=squ_b55e03c242f6c0659420f3a08f54a098cef2fc4f 

        stage('Static Code Analysis') {
            steps {
                withSonarQubeEnv('sonarqube-api') {
                    script {
                        def scannerHome = tool 'SonarScanner for MSBuild'
                        def customDotnetImage = 'dotnet-sdk-sonarscanner'
                        def solutionPath = 'TodoApp.Api/TodoApp.sln'
                        def projectKey = 'TodoApp.Api'
                        
                        docker.image(customDotnetImage).inside {
                            sh "dotnet ${scannerHome}/SonarScanner.MSBuild.dll begin /k:\"TodoApp\""
                            sh "dotnet build ${solutionPath}"
                            sh "dotnet ${scannerHome}/SonarScanner.MSBuild.dll end"
                        }
                    }
                }
            }
        }
    }
}