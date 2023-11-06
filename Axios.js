function saveCrudCrud(event){
    event.preventDefault();

    //To retrieve data similar to document.getElementById
    const Name=event.target.username.value;
    const Email=event.target.email.value;
    const Phone=event.target.phone.value;

    //to store everything in an object but local storage takes only strings as key & value
    const Obj={
        NAME:Name,
        EMAIL:Email,
        PHONE:Phone,
        // _id:id   //to aceess the id to delete from server
    }

    //to send data from frontend to backend
    axios.post("https://crudcrud.com/api/a0249748201b4a11ae7719efa38fbc78/AxiosData",Obj)
    .then((response)=>{
        showUserOnScreen(response.data)
        //console.log(response)       // not required on console
    })
    .catch((err)=>{
        console.log(err)
    })

    //to store the object in the local storage
    // localStorage.setItem(Obj.EMAIL,JSON.stringify(Obj))
    // showUserOnScreen(Obj);
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/a0249748201b4a11ae7719efa38fbc78/AxiosData")
        .then((response)=>{
            console.log(response); 
            //On logging the response we see that the data is in the form of an Array of Objects
            for(var i=0;i<response.data.length;i++){  //going through the Array of Objects
                showUserOnScreen(response.data[i]);   //Showing each element of the array[basically each object]
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})


function showUserOnScreen(Obj){
    let parent=document.getElementById("listOfItems") //ul tag
    let child=document.createElement('li') //creating a new list element
    child.textContent=Obj.NAME +' - '+ Obj.EMAIL +' - '+ Obj.PHONE +'  '  //taking values from Object 'Obj' to show on screen

    const deleteButton= document.createElement('input')
    deleteButton.type="button"
    deleteButton.value="DELETE"
    deleteButton.onclick=()=>{
        // localStorage.removeItem(Obj.EMAIL) //removing the entire object from local storage
        // console.log(Obj._id)  
        let deletedElem=Obj._id;
        axios.delete(`https://crudcrud.com/api/a0249748201b4a11ae7719efa38fbc78/AxiosData/${deletedElem}`)
        .then((response)=>{
            // console.log(response.data); 
            parent.removeChild(child)  // removing that particular li element fron the screen
        })
        .catch((err)=>{
            console.log(err);
        })
  
       
    }
    const editButton=document.createElement('input')
    editButton.type='button'
    editButton.value='EDIT'
    editButton.onclick=()=>{
        // localStorage.removeItem(Obj.EMAIL)  //same as delete button 
        axios.put(`https://crudcrud.com/api/a0249748201b4a11ae7719efa38fbc78/AxiosData/${Obj._id}`,{
            NAME:document.getElementById('NameInputTag').value,  //to set these values to name,email &phone from input boxes/tags
            EMAIL:document.getElementById('EmailInputTag').value,
            PHONE:document.getElementById('PhoneInputTag').value
        })
        .then((response)=>{
            // console.log(response.data); 
            parent.removeChild(child)  // removing that particular li element fron the screen
            document.getElementById('NameInputTag').value=Obj.NAME //populating the name into the input box
            document.getElementById('EmailInputTag').value=Obj.EMAIL
            document.getElementById('PhoneInputTag').value=Obj.PHONE
        })
        .catch((err)=>{
            console.log(err);
        })
        // parent.removeChild(child)   //same as delete button 
     
    }


    child.appendChild(editButton);
    child.appendChild(deleteButton);
    parent.appendChild(child);
}