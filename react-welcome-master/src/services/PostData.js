
export function PostData(type, userData) {
    let BaseURL = 'https://sf08egy5ga.execute-api.us-east-1.amazonaws.com/prod';
    let BaseURL1 ='https://olmcd29xk7.execute-api.us-east-1.amazonaws.com/prod';

    //let BaseURL = 'http://localhost/PHP-Slim-Restful/api/';

    return new Promise((resolve, reject) =>{
      var BaseURLnew=null
    if (type==='login'){
      BaseURLnew=BaseURL1
    }
    else{
      BaseURLnew=BaseURL
    }
         
        fetch(BaseURLnew, {
            method: 'POST',
            body: JSON.stringify(userData),
              headers:{
                'Content-Type':'application/json'
              }
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });

  
      });
}