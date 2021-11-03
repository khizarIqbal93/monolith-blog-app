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
             
        
        stage('UI test') {
            parallel {
                
                stage("Run the app") {
                    steps {
                        script{
                            echo "running now"
                            sh """
                            node app.js
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
                        echo "PID <<<<<<<<"
                        sh """
                        sleep 2
                        MYPID=$(pidof npm)
                        kill -9 \$MYPID
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