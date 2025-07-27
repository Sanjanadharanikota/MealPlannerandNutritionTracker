function checkAuth(req, res, next) {
    // Get token from local storage
    const token = localStorage.getItem('token');
    
    // Check if no token
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    try {
        // Add token to all API requests
        req.headers['x-auth-token'] = token;
        next();
    } catch (err) {
        window.location.href = '/login.html';
    }
}
