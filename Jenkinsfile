node() {
    currentBuild.result = "SUCCESS"
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
        sh './backend/gradlew bootRun'
    }
}

def runFrontend() {
    stage('Run frontend') {
        sh 'cd ./frontend'
        sh 'npm install'
        sh 'ng serve'
    }
}