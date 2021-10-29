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
             
        
        stage('testing') {
            parallel {
                stage('UI test') {
                    steps {
                        echo "UI test with cypress"
                        sh """
                        sleep 20
                        npm run cy:run
                        """
                    }
                }
                stage("Run the server") {
                    steps {
                        timeout(2){
                            script{
                                try{
                                    echo "running now"
                                    sh """
                                    node app.js
                                    """
                                } catch (Throwable e) {
                                    currentBuild.result = "SUCCESS"
                                }
                            }
                        }
                    }  
                }
            }
        
        }
        stage("Deploy") {
            steps{
                echo "Deploying"
                sh """
                git push heroku main
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