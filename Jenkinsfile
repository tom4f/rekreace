pipeline {
    agent any  // Run on any available agent (e.g., your local machine)

    stages {
        stage('Build') {
            steps {
                echo 'Hello, Jenkins! Running the build step.'
            }
        }
        stage('Lint') {
            steps {
                sh 'pnpm run lint'
            }
        }
        stage('Test') {
            steps {
               sh 'pnpm run test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
            }
        }
    }
}
