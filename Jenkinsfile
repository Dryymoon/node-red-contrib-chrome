#!groovy

pipeline {
    agent {
        docker { image 'node:10-alpine' }
    }
    stages {
        stage('Clone repository') {
            echo 'Pulling...' + env.BRANCH_NAME
            checkout scm
        }

        stage('Build') {
            sh 'node --version'
        }
    }
}