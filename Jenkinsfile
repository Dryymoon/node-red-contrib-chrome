#!groovy

pipeline {
    agent {
        docker { image 'node:10-alpine' }
    }
    stages {
        stage('Clone repository') { steps {
            echo 'Pulling...' + env.BRANCH_NAME
            checkout scm
        }}

        stage('Build') { steps {
            sh 'node --version'
        }}
    }
}