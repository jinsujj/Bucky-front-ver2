## Bucky-front-ver2   
### 바디프로필의 모든 것 버키입니다.
<br/>       
            
   
> ### [필수 설치]
* sudo npm install --save init -y
* sudo npm install --save react react-dom next 
* sudo npm install yarn -g
* yarn add --dev typescript @types/react
<br/> 

> ### [실행]
* npm run dev
* yarn dev 
<br/> 

> ### [Nginx]
80 포트를 3000 포트로 redirect    

```
location / {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $http_host;
          proxy_set_header X-NginX-Proxy true;

          proxy_pass http://127.0.0.1:3000/;
          proxy_redirect off;
        }
```
<br/> 
> ### [Load Balancer]
 
```
Nginx 웹 서버에서 로드 밸런싱을 사용하지 않고 
AWS ELB 를 통해서 Application Load Balancer 를 사용하며 ELB 에서 
SSL 을 붙여 준다 
                        _______________________________________________________
Client  ->   80 port -> |AWS(Load Balancer) -> 80 port -> AWS(EC2) -- 3000port |
        ->  443 port -> |______________________________________________________|
        
```
