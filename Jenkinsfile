pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKERHUB_USER = 'your-dockerhub-username'
        IMAGE_NAME = 'student-dashboard'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${env.BRANCH_NAME}", url: 'https://github.com/<your-username>/k8s-cicd-demo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_USER --password-stdin'
                sh 'docker push $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER'
                sh 'docker tag $DOCKERHUB_USER/$IMAGE_NAME:$BUILD_NUMBER $DOCKERHUB_USER/$IMAGE_NAME:latest'
                sh 'docker push $DOCKERHUB_USER/$IMAGE_NAME:latest'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'dev') {
                        sh 'kubectl apply -f deployment.yaml --namespace=test'
                        sh 'kubectl apply -f service.yaml --namespace=test'
                    } else if (env.BRANCH_NAME == 'main') {
                        sh 'kubectl apply -f deployment.yaml --namespace=production'
                        sh 'kubectl apply -f service.yaml --namespace=production'
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
