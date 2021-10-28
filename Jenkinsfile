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
      
        stage("Test") {
            steps{
                echo "Testing now"

                sh """
                   npm test
                """
            }       

        }
        
        
        stage("Deploy"){
            steps{
                echo "Deploying now"

            }
        }
    }
    post {
        cleanup {
            cleanWs()
        }
    }
}