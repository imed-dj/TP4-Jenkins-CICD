
pipeline {
    agent any

    environment {
        APP_NAME = 'tp4-jenkins-app'
        APP_PORT = '3000'
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Getting source code from GitHub'
                checkout scm
            }
        }

        stage('Docker Environment') {
            steps {
                echo 'Checking Docker environment'
                sh 'docker --version'
                sh 'docker version'
            }
        }

        stage('Build and Test') {
            steps {
                echo 'Building project and running tests'

                sh '''
                    docker run --rm \
                    -v "$WORKSPACE:/app" \
                    -w /app \
                    node:20-alpine \
                    sh -c "npm install && npm test"
                '''
            }

            post {
                always {
                    junit testResults: 'reports/junit.xml'
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image'

                sh '''
                    docker build \
                    -t tp4-jenkins-app:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Deployment') {
            steps {
                echo 'Deploying application'

                sh '''
                    docker rm -f tp4-jenkins-app || true

                    docker run -d \
                    --name tp4-jenkins-app \
                    -p 3000:3000 \
                    tp4-jenkins-app:${BUILD_NUMBER}
                '''
            }
        }
    }
}
