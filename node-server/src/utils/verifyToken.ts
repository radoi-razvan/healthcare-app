// Token format => Authorization: Bearer <token>

function verifyToken(req: any, res: any, next: any) {
  // Get authentication header value
  const bearerHeader = req.headers["x-vamf-jwt"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    // Get token
    const bearerToken = bearer[1];
    // Set token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    res.sendStatus(403);
  }
}

export default verifyToken;
