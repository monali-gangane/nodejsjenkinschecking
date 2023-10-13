pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: 'master']], userRemoteConfigs: [[url: 'https://github.com/yourusername/your-repo.git']]])
            }
        }
        // Add other stages as needed
    }
}
