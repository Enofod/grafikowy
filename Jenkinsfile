node() {
    try {
        checkout()
        runBackend()
        runFrontend()
        currentBuild.result = "SUCCESS"
    } catch (err) {
        echo err.getMessage()
        currentBuild.result = "FAILURE"
    }
}

def checkout() {
    stage('Checkout') {
        checkout scm
    }
}

def runBackend() {
    stage('Run backend') {
        dir('backend') {
            sh "./gradlew clean build"
            sh "sudo cp ./build/libs/grafikowy-backend.jar /var/grafikowy"
            sh "sudo service grafikowy-backend restart"
        }
    }
}

def runFrontend() {
    stage('Run frontend') {
        dir('frontend') {
            sh 'sudo npm install'
            sh 'sudo ng build -e server'
	    sh 'sudo rm -rf /var/www/html/'
	    sh 'sudo mkdir -p /var/www/html/'
            sh 'sudo cp -r ./dist/* /var/www/html/'
        }
    }
}