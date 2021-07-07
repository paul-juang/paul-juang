
/*
document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("#form").onsubmit = () => {
        const email = document.querySelector("#email").value
        const password = document.querySelector("#password").value

        const data = new FormData();       
        data.append('email', email); //why append does not work
        data.append('password', password);
        console.log("data: ", data)    

        const xhr = new XMLHttpRequest()
        xhr.open("POST", "/login")
        xhr.setRequestHeader('Content-type', 'application/json') //x-www-form-urlencoded 

        xhr.onload = () => {
            const response =xhr.responseText;
            console.log("response: ",response);
         }   

        xhr.send(data);

        return false

    }

})
*/

/*
let req = new Request(uri, option)
option: method, headers, body, mode

let headers = new Headers()
headers.append(key, value)
content-type,
*/


document.addEventListener("DOMContentLoaded", () => {
    
    document.querySelector("#form").onsubmit = () => {
        console.log('get here')
    	const email = document.querySelector("#email").value
	    const password = document.querySelector("#password").value
/*
        let uri = "/login"
        let h = new Headers()
        h.append('Content-Type','application/json')
        let req = new Request(uri, {
            method: 'POST',
            headers: h,
            mode: 'cors',
            body: JSON.stringify({email, password})
        })

        fetch(req)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err.message) )
*/
		fetch("/login", {            
			method: "POST",
			headers: {
            'Content-Type': 'application/json'
            },
			body: JSON.stringify({email:email, password:password})		
		})
		.then(res => res.json())	
        .then(data => console.log(data))        	
		.catch(err => console.log(err.message))

		return false

    }

})
/**/