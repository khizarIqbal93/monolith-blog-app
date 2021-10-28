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
        
        
        stage("User interface tests"){
            steps{
                echo "Deploying now"
                sh """
                npm run cypress:open
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