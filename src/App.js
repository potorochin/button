import React from 'react';
import './App.css'
import jwt from 'jsonwebtoken';


class App extends React.Component{

  constructor(props) {
    super(props);
  }


  sendRequest = async function (payload, JWT, iframe){
    
    let response = await fetch("https://localhost:8000/api/checkout", {
      method:"POST",
      body:JSON.stringify(payload),
      mode: 'cors',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Request-Method':'POST',
        'Access-Control-Request-Headers':'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With,Access-Control-Allow-Origin,header,browser-timezone,browser-screen-width,browser-screen-height,x-auth-token',
        "x-auth-token":JWT
      }
    });
    
    let result = await response.json();
    console.log(result)

    iframe.src = result.data.url
    document.body.appendChild(iframe);
  }

  buttonPay = () => {
    var iframe = document.createElement('iframe');
    iframe.onload = function() {

        //some custom settings
        this.width="500px";
        this.height="700px"; 
        this.style= "left: 35%; z-index: 100; position:fixed;";
        this.passing=0; 
        this.frameBorder="0";

        // var href = iframe.contentWindow.location.href;
        // var origin = iframe.contentWindow.location.origin;
        // var url = iframe.contentWindow.location.url;
        // var path = iframe.contentWindow.location.pathname;

        // console.log("href: ", href)
        // console.log("origin: ", origin)
        // console.log("path: ", path)
        // console.log("url: ", url)
    };

    var privateKey = '-----BEGIN RSA PRIVATE KEY-----' + 
    'MIIBOAIBAAJBALBQY3tS7N1EkVEtvaUfPVLQHqxh0YZJXldfX8Oc50KXVGG9tDeZ' + 
    'Ni/GYYhxsN4OJQo7MD0pafacQ6KGF1TrTEkCARECQHx0+u2j8n4SSHWJswslHDp0' + 
    'yluQV6oVrAFwf9Vfsk0eWqj05Ue71zT4iE0xCCURqpR9akPAStvcNRkS/0kn2bEC' + 
    'IQDdjS9G+7Mi+dO0q35rqUP6HQBW2PYpf0YNuRz3j2gO3QIhAMu6iNMWRqJVkpZv' + 
    'mHmq8SPwM9gu4tZqiOqwjjYd4B5dAiEAw3yTIIO8Let+kFsVMdGWVSil8kb3Ucqn' + 
    'OUj7cQYQhZUCIEfne5XLoHWHnSYJRN+lvoUnmdPUUA9w5QeJm5qhIeyZAiAxlSP/' + 
    'vwngBQy1F0/Sdrd8rSU1jOUnRgi3StjeXHu3kQ==' + 
    '-----END RSA PRIVATE KEY-----\n'
    
  
    var payload = {
      'merchant_name': 'new_test',
      'version': '1',
      'action': 'purchase',
      'order_id': Date.now().toString(),
      'currency':'UAH',
      'amount': '1.00',
      'description': '',
      'language': 'uk',
      'redirect_url': 'https://www.google.com/',
    }

    
    var JWT = jwt.sign( Object.assign(payload, {'timestamp':Date.now().toString()}), privateKey, { algorithm: "RS256" } );

    this.sendRequest(payload, JWT, iframe)
    
  }
 

  render(){

    return (   
      <div className="App"> 
        <div className="Button-Pay" onClick={this.buttonPay}>
          <div className="Button-Pay-Text">
            PAY
          </div>
        </div>
      </div>
     
    )
  }

}


export default App;

 