export default app => {
    // Health Check Middleware
    app.all('/health-check', (req, res) => {
        return res.send('OK');
    });

    app.all('/ping', (req, res) => {
        return res.send('OK');
    });

}
