node() {
    try {
        checkout()
        runBackend()
        runFrontend()
    } catch (err) {
        echo err.getMessage()
        currentBuild.result = "FAILURE"
    }
}

def checkout() {
    stage('Checkout'){
        checkout scm
    }
}

def runBackend() {
    stage('Run backend') {
        dir ('backend') {
            sh "./gradlew clean build"
            sh "ln -s ./build/libs/grafikowy-backend.jar /etc/init.d/grafikowy-backend"
            sh "service grafikowy-backend start"
        }
    }
}

def runFrontend() {
    stage('Run frontend') {
        dir ('frontend') {
            sh 'npm install'
            sh 'ng serve'
        }
    }
}