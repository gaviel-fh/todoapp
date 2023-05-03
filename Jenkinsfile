pipeline{
    agent any

    stages{
        stage("Setup") {
            steps {
                script {
                    deleteDir()
                }
            }
        }

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
                script {
                    def staticCodeAnalysis = load './cicd/staticCodeAnalysis.groovy'
                    staticCodeAnalysis('dotnet-sdk-sonarscanner', 'TodoApp.Api', 'TodoApp')
                }
            }
        }
    }
}