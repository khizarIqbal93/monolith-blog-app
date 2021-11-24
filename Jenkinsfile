pipeline {

    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_ACCOUNT_ID = credentials('AWS_ACCOUNT_ID')
        AWS_ECR_ID = credentials('ecr_admin')
        registry = 'https://603825719481.dkr.ecr.eu-west-1.amazonaws.com'
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
                npm run cy:run
                """
            }
        }

        stage("Build app image") {
                steps {
                    script {
                        dockerImage = docker.build "blog_app" + ":$BUILD_NUMBER"
                        // sh """
                        // echo "building app image"
                        // docker image build -t blog_app:$BUILD_NUMBER .
                        // docker images
                        // """
                    }

                }
        }
        


        stage('Push to ECR') {
            steps {
                script {
                    // sh """
                    // aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin $registry
                    // echo "authenticated :)"
                    // docker tag blog_app:$BUILD_NUMBER $registry/blog_app:$BUILD_NUMBER
                    // docker images
                    // docker push $registry/blog_app:$BUILD_NUMBER
                    // """
                    docker.withRegistry("https://" + registry, "ecr:eu-west-1:" + AWS_ECR_ID) {
                        dockerImage.push()
                    }

                }
            }
        }
        // aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 603825719481.dkr.ecr.eu-west-1.amazonaws.com
               
    }
    post {
        cleanup {
            cleanWs()
        }
    }

}

