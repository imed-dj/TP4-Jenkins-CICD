pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Getting source code from Git'
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                echo 'Building project and running tests'

                bat 'docker run --rm -v "%WORKSPACE%:/app" -w /app node:20-alpine sh -c "npm install && npm test"'
            }

            post {
                always {
                    junit testResults: 'reports/junit.xml',
                          allowEmptyResults: true
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t tp4-jenkins-app:%BUILD_NUMBER% .'
            }
        }

        stage('Deployment') {
            steps {
                bat '''
                    docker rm -f tp4-jenkins-app 2>NUL
                    docker run -d --name tp4-jenkins-app -p 3000:3000 tp4-jenkins-app:%BUILD_NUMBER%
                '''
            }
        }
    }
}
