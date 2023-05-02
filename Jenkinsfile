@Library('my-shared-library') _

pipeline{
    agent any

    stages{
        stage("Git Checkout"){
            steps{
                gitCheckout(
                    branch: 'main',
                    url: 'https://github.com/gaviel-fh/todoapp'
                )
            }
        }

        stage("Unit Test .Net Backend"){
            steps{
                script{
                    sh "docker build -f TodoApi.ApiTest/Dockerfile -t todoapp-apitest ."
                }
            }
        }
    }
}