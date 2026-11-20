Before running any Kubernetes commands, the cluster must be running.

bash
minikube start
What happens: Minikube spins up a virtual machine (or Docker container) and configures kubectl to point to it.

Expected Output: You will see a lot of text ending with an emoji and: Done! kubectl is now configured to use "minikube" cluster.

🚀 Step 1: Create the Nginx Deployment
We use an imperative command to create a Deployment. A Deployment manages the Pods for us.

bash
kubectl create deployment nginx-deployment --image=nginx
What happens: Kubernetes pulls the official nginx image from Docker Hub and creates 1 Pod running Nginx.

Expected Output: deployment.apps/nginx-deployment created

🌐 Step 2: Create the Service File
We need to expose the Nginx deployment to the outside world. We will create a YAML file.

In VS Code, create a file named exactly: nginx-service.yaml
Paste this exact code into it and save:

yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx-deployment
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30090   # Exposes the service on port 30090
Why: The selector tells the service to route traffic to the nginx-deployment pods. The nodePort forces Kubernetes to use port 30090 instead of a random port.

⚙️ Step 3: Apply the Service File
Now, tell Kubernetes to read your YAML file and create the service.

bash
kubectl apply -f nginx-service.yaml
What happens: Kubernetes reads the file and creates the nginx-service.

Expected Output: service/nginx-service created

🔍 Step 4: Verify the Service
Check if the service was created with the correct port.

bash
kubectl get services
Expected Output: Look at the PORT(S) column. It should say 80:30090/TCP.

🖥️ Step 5: View in Browser
Since you are on Windows with Docker Desktop, the easiest way to view the app is to let Minikube give you a direct URL.

  ________________________________________________
minikube start
kubectl create deployment nginx-deployment --image=nginx
kubectl apply -f nginx-service.yaml
kubectl get svc
minikube service nginx-service --url
kubectl scale deployment nginx-deployment --replicas=4
kubectl get pods
kubectl get svc
___________________________________________________
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  type: NodePort
  selector:
    app: nginx-deployment
  ports:
    - port: 80
      targetPort: 80
      nodePort: 30090   # Exposes the service on port 30090
_________________________________________________
bash
minikube service nginx-service --url
What happens: Minikube prints a URL like http://127.0.0.1:51234.

Action: Copy that URL and paste it into your web browser. You will see the "Welcome to nginx!" page. 📸 Take a screenshot for your lab record.

📈 Step 6: Scale the Deployment to 4 Replicas
The question asks to scale Nginx to 4 replicas. We will ask Kubernetes to run 4 copies of our pod.

bash
kubectl scale deployment nginx-deployment --replicas=4
What happens: Kubernetes creates 3 more Nginx pods (total = 4).

Expected Output: deployment.apps/nginx-deployment scaled

📋 Step 7: List All Pods
Verify that the scaling worked and all 4 pods are running.

bash
kubectl get pods
What happens: Shows all pods in the default namespace.

Expected Output: You will see nginx-deployment-xxxxxxx listed 4 times, all with a Running status.

📋 Step 8: List All Services
List the services one final time to show the state.

bash
kubectl get services
Expected Output: You will see the kubernetes service (default) and your nginx-service.

📸 Take a screenshot of the kubectl get pods and kubectl get services commands for your lab record.

🧹 Step 9: Cleanup (Bonus)
If you want to clean up your environment after the test to save resources:

bash
kubectl delete deployment nginx-deployment
kubectl delete service nginx-service
minikube stop


