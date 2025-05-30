import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // Ambil token dari Bearer
        } else if (req.headers.token) {
            token = req.headers.token; // Ambil token langsung dari header 'token'
        } else {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        if (!token) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: token_decode.id };
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Not Authorized Login Again" });
    }
};

export default authUser;