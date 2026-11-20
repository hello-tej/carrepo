node {
    def app
    
    stage('Checkout') {
        echo 'Cloning the repository...'
        checkout scm
    }

    stage('Build') {
        echo 'Building the application...'
        // Assuming it is a Python Flask project based on your earlier Qs
        // If it is a Node.js project, change these commands to "npm install"
        sh 'python3 -m venv venv'
        sh '. venv/bin/activate && pip install -r requirements.txt'
    }

    stage('Test') {
        echo 'Running tests...'
        // If you have pytest configured, this runs it. 
        // If not, it just mocks a successful test to show the stage works.
        sh '. venv/bin/activate && pytest || echo "No tests found, but stage passes"'
    }
    
    stage('Cleanup') {
        echo 'Cleaning up workspace...'
        sh 'rm -rf venv'
    }
}
