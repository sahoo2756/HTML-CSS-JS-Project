// Make a object which will get the custmor details and verify it . Stor the data into an object.

// Step1: 

// ## Make an UI which able to shows the rooms and when a cusomer click on it then it will show an pop up box for fulfill the details about custmor and just store into the object.


const imgContainer = document.querySelector(".imgContainer");
const getInputFromUrlFeild = document.querySelector("#enterUrl");
const submitBtn = document.querySelector("#submitBtn");
const addImgBtn = document.querySelector("#addImgBtnContainer #addImgBtn");
const popUpBox = document.querySelector("#main .popUpBox");
const closeBtn = document.querySelector(".popUpBox #closeBtn")


closeBtn.addEventListener('click' , ()=>{
    popUpBox.setAttribute('id' , 'inactive');
});

addImgBtn.addEventListener('click' , function(event){
    // console.log(event)
    popUpBox.removeAttribute('id');  
    gsap.to(popUpBox , {
        opacity:1
    })
    gsap.from(popUpBox , {
        y:40+ "vh",
        duration:.8,
        // opacity:0,
    })
});

submitBtn.addEventListener('click' , function() {
    
    let value = getInputFromUrlFeild.value.trim();
    if(value === '') {
        alert("Enter  URL")
    } else {
          let imgTag = document.createElement('img');
          imgTag.src = value;
          imgContainer.appendChild(imgTag)
            gsap.to(popUpBox , {
                opacity:0,
                duration:.8
            })
        
            setTimeout(()=>{
                popUpBox.setAttribute('id' , 'inactive');
                getInputFromUrlFeild.value = ' '
                console.log('hello')
            } , .800)
            
        }
        
        
});




const imageSourceLink = {
    0 : 'https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGF6JTIwaG90ZWwlMjByb29tcyUyMGZvciUyMGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',

    1 : 'https://media.istockphoto.com/id/834771946/photo/bedroom-with-decoration-and-copy-space.webp?b=1&s=170667a&w=0&k=20&c=a3dumWDeNxEewZTe311rpio_jyGIjZBcjBslS8F_ME4=' ,
    
    2 : 'https://media.istockphoto.com/id/1135892487/photo/interior-design-of-bedroom.webp?b=1&s=170667a&w=0&k=20&c=lqqw6nXZiq1lIbuUmnPt5uBYTglpp2paGhD6qndi6Xw=',

    3 : 'https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.webp?b=1&s=170667a&w=0&k=20&c=I6CS04DMvxKlhD29uLfWWOb4SghqKeMl8pr1rSi0RIU=',
    
    4 : 'https://media.istockphoto.com/id/1300135335/photo/luxurious-bedroom-interior-at-nigh-with-messy-bed-leather-armchairs-closet-and-garden-view.webp?b=1&s=170667a&w=0&k=20&c=qWAi8QHaemZN4QH_p5ctt6b3qLErA02QryTsVr0hGxc=',
    
    5 : 'https://media.istockphoto.com/id/1438444441/photo/oak-internal-doors.webp?b=1&s=170667a&w=0&k=20&c=hjz4GfRYYssUaedW_PQmWXRczABuLToVeV90NmipJig=',

}
















const myArr = [];

function createImgTag(numberOfImages) {
    for(let i=0; i < numberOfImages; i++) {
        const imgTag = document.createElement('img');        
            if(!(imageSourceLink[i] === undefined)){
                imgTag.src = imageSourceLink[i];            // value will be return
                imgTag.alt = `This is image is ${i}`;
                myArr.push(imgTag);
            }   
    }
}


createImgTag(60)
// console.log(myArr)


