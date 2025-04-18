window.addEventListener('load', function(evt) {
    const currentPage = evt.target.location.pathname;
    const user = JSON.parse(localStorage.getItem('user'));
    
    let allowedPages = ['/', '/index.html', '/smth.html'];

    if (!user && allowedPages.includes(currentPage)){
        window.location.replace("/pages.login.html");
    }

    if(user && !allowedPages.includes(currentPage)){
        window.location.replace('/index.html');
    }

});
