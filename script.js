
fetch('data.json',{
  method:'GET',
  headers:{
    'Content-Type':'application/json'
  }
})
  .then(res=>res.json())
  .then(data=>{
    var collector ='';
    var filterCollect='';
    var Output = data;
    let filterRay = [];
    

    function checker(checkNew){
      if (checkNew == true){
        return `<label class="class-new">new!</label>`;
      }
      else{
        return "";
      }
    }
    function Featured(checkFeat){
      if (checkFeat == true){
        return `<label class="class-feature">Featured</label>`;
      }
      else{
        return "";
      }
    }function expertise(tools,lang){
      let combine = lang.concat(tools);
      let holder = '';
      for(i=0; i<combine.length; i++){
        holder += `<li>${combine[i]}</li>`
      }
      return holder;
    }
    function filterArray(){
      for(let i = 0; i < Output.length; i++){
        var ray1 = Output[i].languages;
        var ray2 = Output[i].tools;
        if(!filterRay.includes(Output[i].role)){
          filterRay.push(Output[i].role);
        }
              
        if (ray1.length > 0){
          for(let j=0; j < ray1.length; j++){
            if(!filterRay.includes(ray1[j])){
              filterRay.push(ray1[j]);
            }
          }
        }
        if (ray2.length > 0){
          for(let k=0; k < ray2.length; k++){
            if(!filterRay.includes(ray2[k])){
              filterRay.push(ray2[k]);
            }
          }
        } 
      }
      return filterRay;
    }

    
    

    /*let nextButton = document.getElementById('next');
    nextButton.addEventListener("click",()=>{
      let filter0 = document.getElementById('filter0');
      filter0.style.marginLeft = "-200px";
    });
    let prevButton = document.getElementById('previous');
    prevButton.addEventListener("click",()=>{
      let filter0 = document.getElementById('filter0');
      filter0.style.marginLeft = "30px";
    });*/

    for (let i = 0; i<Output.length; i++){
      collector += `
      <div class="listing" id=${Output[i].id}>
        <img class="logo" src="${Output[i].logo}">
        <div class="job">
          <div class="part1">
            <div class="name">
              <strong>${Output[i].company}</strong>
              <div class="feature-holder">
                ${checker(Output[i].new)}
                ${Featured(Output[i].featured)}
              </div> 
            </div>
            <h1 class="job-title">${Output[i].position}</h1>
            <ul class="require">
              <li>${Output[i].postedAt}</li>
              <li>${Output[i].contract}</li>
              <li>${Output[i].location}</li>
            </ul>
          </div>
          <ul class="skill">
            <li>${Output[i].role}</li>${expertise(Output[i].tools,Output[i].languages)}
            
          </ul>
        </div>
      </div>
      `  
    }

    document.getElementById('contains').innerHTML = collector;
    var name = document.getElementsByClassName("class-new");
    for(let j = 0; j<name.length; j++){
      var nameNode = name[j].parentNode;
      var Parentnode = nameNode.parentNode;
      var GparentNode = Parentnode.parentNode;
      GparentNode.parentNode.classList.add("side-border");
    }
    filterArray();
    for(let i=0; i<filterRay.length; i++){
      filterCollect += `
      <div id=${"filter"+i} class ="filter_contain">
        <div class="filter">${filterRay[i]}</div>
        <!--<span>x</span>-->
      </div>
      `
    
    }  
    document.getElementById('filter-box').innerHTML = filterCollect;
    let filter = document.querySelectorAll(".filter");
    let ul = document.querySelectorAll('.skill');
    let li, textContent, grandNode;
    let elArray = [];

    filter.forEach(elements =>{
      elements.addEventListener("click",()=>{
        let value = elements.innerHTML;
        elements.classList.toggle("active");
        if (!elArray.includes(value)){
          elArray.push(value);
        }
        else{
          const index = elArray.indexOf(value);
          if (index > -1) {
            elArray.splice(index, 1);
          }
        }
        

        ul.forEach(el =>{
          li = el.querySelectorAll('li')
          let liArray = [];
          li.forEach(el => {
            textContent = el.innerHTML;
            if (!liArray.includes(textContent)){
              liArray.push(textContent);
            }
          });
          grandNode = el.parentNode.parentNode;

          grandNode.style.display = "none";
          var val = elArray.every(filterdItem =>{
            return liArray.includes(filterdItem);
          });
          if (val === true){
            grandNode.style.display = '';
          }
        });
      });      
    });
    function laptopWidth(x) {
      if (x.matches) { // If media query matches
        let nextButton = document.getElementById('next');
        nextButton.style.display = "block";
        nextButton.addEventListener("click",()=>{
          let filter0 = document.getElementById('filter0');
          filter0.style.marginLeft = "-300px";
        });
        let prevButton = document.getElementById('previous');
        prevButton.style.display = "block";
        prevButton.addEventListener("click",()=>{
          let filter0 = document.getElementById('filter0');
          filter0.style.marginLeft = "10px";
        });
      } 
    }
    function tabWidth(x) {
      if (x.matches) { // If media query matches
        let nextButton = document.getElementById('next');
        nextButton.style.display = "block";
        nextButton.addEventListener("click",()=>{
          let filter0 = document.getElementById('filter0');
          filter0.style.marginLeft = "-400px";
        });
        let prevButton = document.getElementById('previous');
        prevButton.style.display = "block";
        prevButton.addEventListener("click",()=>{
          let filter0 = document.getElementById('filter0');
          filter0.style.marginLeft = "10px";
        });
      } 
    }
      
    
    var x1 = window.matchMedia("(max-width: 700px) and (min-width: 552px)")
    x1.addEventListener("change",tabWidth)

    var x = window.matchMedia("(max-width: 1120px) and (min-width: 700px)")
    x.addEventListener("change",laptopWidth)

    var x2 = window.matchMedia("(min-width: 1121px)")
    x2.addEventListener("change", ()=>{
      let nextButton = document.getElementById('next');
      let prevButton = document.getElementById('previous');
      nextButton.style.display = "none";
      prevButton.style.display = "none";
      
    });


  })
  .catch(err => { throw err });
  window.onscroll = function(){scrollFunction()};

  function scrollFunction(){
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
      document.getElementById('main-header').style.height = "50px";
      document.getElementById('filter-box').style.top = "60%";
    }
    else{
      document.getElementById('main-header').style.height = "120px";
      document.getElementById('filter-box').style.top = "50%";

    }
  }
  
  
