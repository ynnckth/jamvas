# K8s Deployment

## Minikube setup for local cluster
**Prerequisites**: install minikube

Start the local minikube single-node cluster: 
> minikube start

Optionally run K8s dashboard from minikube:
> minikube dashboard

Enable the minikube ingress add-on:
> minikube addons enable ingress

Apply the current K8s configuration (-R is used to recursively apply all files under the current directory):
> kubectl apply -R -f .

### Accessing the cluster

One way to access a service of the cluster from the local machine is through **port-forwarding** to the services: 

Port forward service to local machine (service is running inside cluster at port 80):
Example to access the backend service:
> kubectl port-forward service/jamvas-backend-service 8080:80

Access on local machine through: `localhost:8080`

Alternative is to access the application's services through the configured ingress. 
For this, you need to add an entry to your known hosts file under `/etc/hosts`.
```
127.0.0.1	jamvas.fun
```
The host `jamvas.fun` is specified in `jamvas-ingress.yaml`. 


Run the minikube tunnel command:
> minikube tunnel

Access your application at the configured host: 
> http://jamvas.fun

---

## Next Steps / Open Points

- [x] Deploy backend
- [x] Deploy frontend
- [x] Define services and ingress
- [ ] Why do we need the `minikube tunnel` command?
- [ ] Hide k8s secrets (check in definition but not actual values)
- [ ] Helm
- [ ] ArgoCD
