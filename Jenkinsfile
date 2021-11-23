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
                """
                
            }
        } 
        
        stage("Unit Test") {
            steps{
                echo "Testing now"
                sh """
                npm test
                """
            }       
        }
    
                
        stage("Run the app") {
            steps {
                script{
                    echo "running now"
                    sh """
                    node app.js &
                    """
                    }  
                }
        }

        stage('Cypress test') {
            steps {
                echo "UI test with cypress"
                sh """
                sleep 1
                npm run cy:run
                """
            }
        }

        stage('Kill app') {
            steps {
                echo "Killing app"
                sh """
                kill -9 \$!
                """
            }
        }
               

        


    }
    post {
        cleanup {
            cleanWs()
        }
    }
}
