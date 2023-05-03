def call(String customDotnetImage, String solutionPath, String projectKey) {
    withSonarQubeEnv('sonarqube-api') {
        script {
            docker.image(customDotnetImage).inside("-v ${WORKSPACE}/${solutionPath}:/src") {
                sh "dotnet sonarscanner begin /k:${projectKey} /d:sonar.login=${env.SONAR_AUTH_TOKEN}"
                sh "dotnet build /src/${solutionPath}"
                sh "dotnet sonarscanner end /d:sonar.login=${env.SONAR_AUTH_TOKEN}"
            }
        }
    }
}