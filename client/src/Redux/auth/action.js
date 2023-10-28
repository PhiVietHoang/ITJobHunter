import axios from "axios"

export const actions={
  LOGIN_REQUEST:"LOGIN_REQUEST",
    LOGIN_SUCCESS:"LOGIN_SUCCESS",
    LOGIN_FAILURE:"LOGIN_FAILURE",
    REGISTER_SUCCESS:"REGISTER_SUCCESS",
    REGISTER_REQUEST:"REGISTER_REQUEST",
    REGISTER_FAILURE:"REGISTER_FAILURE"
}

export const loginRequest=()=>{
    return {
        type:actions.LOGIN_REQUEST,
        
    }
}
export const loginSuccess=(data,name)=>{
    return {
        type:actions.LOGIN_SUCCESS,
        payload:{data,name}
        
    }
}

export const loginFailure=(err)=>{
    return {
        type:actions.LOGIN_FAILURE,
        payload:err
        
    }
}


export const registerRequest=()=>{
    return {
        type:actions.REGISTER_REQUEST,
        
    }
}
export const registerSuccess=(data,name)=>{

    return {
        type:actions.REGISTER_SUCCESS,
        payload:{data,name}
        
    }
}

export const registerFailure=(err)=>{
    return {
        type:actions.REGISTER_FAILURE,
        payload:err
        
    }
}

 const loginUser=(payload)=>(dispatch)=>{
     console.log(payload,"payload")

     const  {username,password}=payload
    const requestAction=loginRequest()
    dispatch(requestAction)
    
    axios({
        url:"https://masai-api-mocker.herokuapp.com/auth/login",
        method:"POST",
        data:{
          password,username
        }
       })
       .then(res=>{
          
        //  alert(res.data.token)
        alert("login Success")
        const successAction =loginSuccess(res.data.token,username)
       
          dispatch(successAction);
        
       })
       .catch(err=>{
      
         const errorAction =loginFailure(err)
       
          dispatch(errorAction)
       })

}


const registerUser=(payload)=>(dispatch)=>{
    console.log("payload",payload)
   const {name,email,mobile,password,description,username} =payload
 console.log(payload)
  const requestAction=registerRequest()
  dispatch(requestAction)
  
  axios({
      url:"https://masai-api-mocker.herokuapp.com/auth/register",
      method:"POST",
      data:{
      name,email,mobile,password,description,username
      }
     })
     .then(res=>{
        console.log("res",res)
       alert(res.data.message)
     
      const successAction =registerSuccess(res.data.message,name)
     
        dispatch(successAction);
      
     })
     .catch(err=>{
    
       const errorAction =registerFailure(err)
     
        dispatch(errorAction)
     })

}



export {loginUser,registerUser}