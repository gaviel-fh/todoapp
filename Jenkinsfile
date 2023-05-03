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

        // stage('Static Code Analysis - Dotnet') {
        //     steps {
        //         withSonarQubeEnv('sonarqube-api') {
        //             script {
        //                 def customDotnetImage = 'static-code-analysis'
        //                 def solutionPath = 'TodoApp.Api'
        //                 def projectKey = 'TodoApp.Api'

        //                 docker.image(customDotnetImage).inside("-v ${WORKSPACE}/${solutionPath}:/src") {
        //                     sh "dotnet sonarscanner begin /k:${projectKey} /d:sonar.login=${env.SONAR_AUTH_TOKEN}"
        //                     sh "dotnet build ${solutionPath}"
        //                     sh "dotnet sonarscanner end /d:sonar.login=${env.SONAR_AUTH_TOKEN}"
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('Static Code Analysis - Angular') {
        //     steps {
        //         withSonarQubeEnv('sonarqube-api') {
        //             script {
        //                 def staticCodeAnalysisImage = 'static-code-analysis'
        //                 def angularPath = 'TodoApp.Client'
        //                 def projectKey = 'TodoApp.Client'

        //                 docker.image(staticCodeAnalysisImage).inside("-v ${WORKSPACE}/${angularPath}:/app") {
        //                     dir(angularPath) {
        //                         sh "npm ci"
        //                         sh "sonar-scanner -Dsonar.projectKey=${projectKey} -Dsonar.sources=src -Dsonar.login=${env.SONAR_AUTH_TOKEN}"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

        stage('Build and Push Docker Images') {
            def apiProjectName = 'todoapp.api'
            def apiDockerfilePath = 'TodoApp.Api/Dockerfile'
            def clientProjectName = 'todoapp.client'
            def clientDockerfilePath = 'TodoApp.Client/Dockerfile'
            def majorVersion = 0
            def minorVersion = 0
            def patchVersion = env.BUILD_NUMBER
            def versionTag = "${majorVersion}.${minorVersion}.${patchVersion}"

            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'Dockerhub-Credentials', 
                    usernameVariable: 'DOCKER_HUB_USERNAME', 
                    passwordVariable: 'DOCKER_HUB_PASSWORD')
                    ]) {
                        
                    script {
                        // Build and tag API project
                        sh "docker build -t ${DOCKER_HUB_USERNAME}/${apiProjectName}:${versionTag} -f ${apiDockerfilePath} ."

                        // Build and tag Client project
                        sh "docker build -t ${DOCKER_HUB_USERNAME}/${clientProjectName}:${versionTag} -f ${clientDockerfilePath} ."
                    }

                    script {
                        // Log in to Docker Hub
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"

                        // Push API project
                        sh "docker push ${DOCKER_HUB_USERNAME}/${apiProjectName}:${versionTag}"

                        // Push Client project
                        sh "docker push ${DOCKER_HUB_USERNAME}/${clientProjectName}:${versionTag}"
                    }
                }
            }
        }
    }
}