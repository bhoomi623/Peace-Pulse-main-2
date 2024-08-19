document.addEventListener('DOMContentLoaded',function(){
    const cookiename ="user"
    if (!checkCookie(cookiename)){window.location.href='../html/login.html'}
})
function checkCookie(name) {
    // Get all cookies as a single string
    const cookies = document.cookie;

    // Create a regular expression to match the desired cookie
    const regex = new RegExp(`(^|; )${encodeURIComponent(name)}=([^;]*)`);

    // Test the regular expression against the cookies string
    const match = cookies.match(regex);

    // If a match is found, return true; otherwise, return false
    return match ? true : false;
}