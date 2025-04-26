import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        // Cek jika token ada dan formatnya benar
        if (!token || req.headers.authorization.split(" ")[0] !== "Bearer") {
            return res.status(401).json({ success: false, message: "No token provided or incorrect format" });
        }

        // Verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Menyimpan decoded user ke dalam request

        next(); // Melanjutkan ke handler berikutnya
    } catch (err) {
        // Jika token tidak valid atau kesalahan lain
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default authMiddleware;