node() {
    currentBuild.result = "SUCCESS"
    try {
        runBackend();
    } catch (err) {
        echo err
        currentBuild.result = "FAILURE"
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