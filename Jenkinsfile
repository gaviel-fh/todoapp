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

        stage('Static Code Analysis') {
            steps {
                def scannerHome = tool 'SonarScanner for MSBuild'
                def customDotnetImage = 'dotnet-sdk-sonarscanner'
                def solutionPath = 'TodoApp.Api/TodoApp.sln'
                def projectKey = 'TodoApp.Api'

                withSonarQubeEnv('sonarqube-api') {
                    script {
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