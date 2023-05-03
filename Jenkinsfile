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
                        def solutionPath = 'TodoApp.Api'
                        def projectKey = 'TodoApp'

                        docker.image(customDotnetImage).inside("-v ${WORKSPACE}/${solutionPath}:/src") {
                            sh "dotnet sonarscanner begin /k:${projectKey} /d:sonar.login=${env.SONAR_AUTH_TOKEN}"
                            sh "dotnet build ${solutionPath}"
                            sh "dotnet sonarscanner end /d:sonar.login=${env.SONAR_AUTH_TOKEN}"
                        }
                    }
                }
            }
        }
    }
}