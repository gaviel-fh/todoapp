@Library('my-shared-library') _

pipeline{
    agent any

    stages{
        stage("Git Checkout"){
            steps{
                checkout SCM
            }
        }

        stage("Unit Test .Net Backend"){
            steps{
                script{
                    sh "docker build -f TodoApp.ApiTest/Dockerfile -t todoapp-apitest ."
                }
            }
        }
    }
}