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
                withSonarQubeEnv('sonarqube-api') {
                    script {
                        def customDotnetImage = 'dotnet-sdk-sonarscanner'

                        def solutionPath = 'TodoApp.Api/TodoApp.sln'
                        def projectKey = 'TodoApp.Api'

                        docker.image(customDotnetImage).inside {
                            sh "dotnet sonarscanner begin /k:\"${projectKey}\" /d:sonar.login=\"${env.SONAR_AUTH_TOKEN}\""
                            sh "dotnet build ${solutionPath}"
                            sh "dotnet sonarscanner end /d:sonar.login=\"${env.SONAR_AUTH_TOKEN}\""
                        }
                    }
                }
            }
        }
    }
}