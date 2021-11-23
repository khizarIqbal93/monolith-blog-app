pipeline {

    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_ECR_ID = credentials('ecr_admin_id')
    }

    options {
        timestamps()
    }

    stages {
        
        stage("Build") {
            steps {
                echo "Building now"
                sh """
                npm install
                touch .env
                echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" >> .env
                echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" >> .env
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

        stage("Build app image") {
            steps {
            node { 
                docker.build('blog_app')
            }

            }
        }

        // stage('Push to ECR') {
        //     steps {
        //         script {
        //             docker.withRegistry(
        //                 'https://603825719481.dkr.ecr.eu-west-1.amazonaws.com',
        //                 'ecr:eu-west-1:${AWS_ECR_ID}') {
        //                 def blogImage = docker.build('blog_app')
        //                 blogImage.push('blogImage:${BUILD_NUMBER}')
        //                 }
        //         }
  
        //     }
        // }
               

    }
    post {
        cleanup {
            cleanWs()
        }
    }
}
