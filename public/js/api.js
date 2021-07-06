//demo for storing api_key on client
document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('btnReg').addEventListener('click', doReg);
        document.getElementById('btnAll').addEventListener('click', getAll);
        document.getElementById('btnAdd').addEventListener('click', doAdd);
      });
      let currentForm = null;

      function doReg(ev) {
        ev.preventDefault();
        currentForm = 'regForm';
        let email = document.getElementById('email').value;
        let data = JSON.stringify({ email });
        send('api/register', data, 'POST');
      }

      function getAll(ev) {
        ev.preventDefault();
        currentForm = 'getForm';
        //get the list of cheeses
        send('api/cheese', null, 'GET');
      }

      function doAdd(ev) {
        ev.preventDefault();
        currentForm = 'addForm';
        //add a new cheese
        let cheese = document.getElementById('cheese').value;
        let data = JSON.stringify({ cheese });
        send('api/cheese', data, 'POST');
      }

      function send(endpoint, data, method) {
        //do the fetch call
        // QueryString http://localhost:4000/example?api_key=clp1tev3d1rslfil5xd7vvd8l9dgd4
        // URL http://localhost:4000/example/clp1tev3d1rslfil5xd7vvd8l9dgd4
        // header ("x-api-key", "clp1tev3d1rslfil5xd7vvd8l9dgd4")
        let key = sessionStorage.getItem('mySiteAPIKey');
        //let url = `http://localhost:4000/${endpoint}?api_key=${key}`;
        let url;
        // if (currentForm != 'regForm') {
        //   url = `http://localhost:4000/${endpoint}/${key}`;
        // } else {
        url = `http://localhost:3000/${endpoint}`;
        // }
        let h = new Headers();
        if (data) {
          h.append('Content-Type', 'application/json');
        }
        h.append('x-api-key', key);        

        let req = new Request(url, {
          method,
          headers: h,
          body: data,
        });

        fetch(req)
          .then((res) => res.json())
          .then(success)
          .catch(fail);
      }

      function fail(err) {
        //fetch call failed
        console.warn(err.message);
        let pre = document.querySelector(`#${currentForm} .response`);
        pre.textContent = err.message;
      }

      function success(content) {
        //fetch call got JSON
        if ('error' in content) {
          fail(content.error);
          return;
        }
        let data = content.data;
        let pre = document.querySelector(`#${currentForm} .response`);
        pre.textContent = JSON.stringify(data, '\n', 2);
        //we will save our apikey and user _id after registering.
        //Normally you would get these from the API website and use them in your own site
        if (currentForm == 'regForm') {
          //Demo purposes only
          console.log('saving the api key in session storage');
          sessionStorage.setItem('mySiteAPIKey', data.api_key);
          //Demo purposes only
        }
      }