pipeline {

    agent any

    options {
        timestamps()
    }

    stages {
        
        stage("Build") {
            steps {
                echo "Building now"
                sh """
                npm install
                node app.js
                """
                
            }
        } 
        
        stage('testing') {
            parallel {
                stage("Unit Test") {
                    steps{
                        echo "Testing now"
                        sh """
                        npm test
                        """
                    }       
                }
                stage('UI test') {
                    steps {
                        echo "UI test with cypress"
                        sh """
                        npm run cypress:open
                        """
                    }
                }
            }
        }
        
    }
    post {
        cleanup {
            cleanWs()
        }
    }
}