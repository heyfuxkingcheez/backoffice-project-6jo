async function logIn () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await axios({
        method:"POST",
        url: '/api/auth/login',
        data:{
            "email": email,
            "password": password
        }
    }).then((res)=>{
        console.log(res);
    }).catch(error=>{
        console.log(error);
        throw new Error(error);
    });
}

const checkoutBtn = document.getElementById('submit');
checkoutBtn.addEventListener('click', logIn);