window.onload = function(){
  const url = '../navData.json';

  fetch(url)
    .then(file => file.json())
    // .then(data => console.log(data));
    .then(data => {
      const list = document.querySelector('ul');
      const dropD = document.getElementsByTagName('div')[0];
      const body = document.getElementsByTagName('body')[0];
        // take only the name of every object in JSON and put it like name of button
      const myBtn = data.map(btn => {                       // take only Name from the Object
        return `<li class="topNavLi">${btn.name}</li>`;
      }).join('');
      list.innerHTML = myBtn;                             // put the name into HTML element (<ul> )
        //select every of buttons
      const allLi = document.querySelectorAll('.topNavLi');
      allLi.forEach(everyBtn => {
        everyBtn.addEventListener('click', dropDown);
      });
      dropD.innerHTML = `<ul id="lastUL"></ul>`;
      const contentUl = document.getElementById('lastUL');

        // FUNCTIONS

      function dropDown(){
          // IF click on LI remove the class from all another
        if (!this.classList.contains('active')){
          allLi.forEach(oneLi => oneLi.classList.remove('active'));
        }
        // this.classList.toggle('active');
        this.classList.add('active');

          // IF someone of LI is CHOSEN the dropDown is visible
        if (!allLi.forEach(oneLi => oneLi.classList.contains('active'))) {
          dropD.classList.add('slideDown');
        } else {
          dropD.classList.remove('slideDown');
        }
      }

        // onClick outside of LI navigation - close the DropDown container
      window.onclick = function (event) {
        if(!event.target.classList.contains('topNavLi')){
          dropD.classList.remove('slideDown');

          allLi.forEach(oneLi => oneLi.classList.remove('active'));

          document.getElementById('lastUL').innerHTML = '';
        }
      };

        // IF click on some LI dropDown take it`s content
      allLi.forEach(oneLi => oneLi.addEventListener('click', putContent));

      function putContent(){
        // dropD.innerHTML = this.textContent;
        for(let i=0; i<allLi.length; i++){
          if(this.textContent === data[i].name) {
            let listData = data[i].content;

            let dropList = listData.map( one => {
              return `<li class="contentLi">${one}</li>`
            }).join('');
            // setTimeout(()=> dropD.innerHTML = `<ul id="lastUL"> ${dropList} </ul>`, 500);
            contentUl.innerHTML = `${dropList}`
          }
        }
        moveTransition()
      }

        //function to appear LI
      function moveTransition(){
        let contentLi = document.getElementById('lastUL');
        contentLi.classList.toggle('movePlace');
        setTimeout(()=> contentLi.classList.add('movePlace'), 200);

        // console.log(contentUl.childNodes);
        contentUl.childNodes.forEach(navLi => navLi.addEventListener('click', moveTo));
      }

      function moveTo(e){
        // console.log(this.textContent);
        switch (e.target.textContent) {
          // case 'SweetBakery': window.open('http://bakery-spa.netlify.com');
          case 'SweetBakery': window.open(`${data[0].url[0]}`);
            break;
          // case 'FishingSite': window.open('http://fishing-blog.netlify.com');
          case 'FishingSite': window.open(`${data[1].url[0]}`);
            break;
          case 'buttonOne': console.log(this);
            break;
            default: alert('THIS BUTTON IS NOT SET UP TO NOW !!!')
        }
      }
    });
};
