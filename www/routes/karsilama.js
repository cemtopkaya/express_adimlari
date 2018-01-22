let express = require('express');
let router = express.Router();

class WWW {
    all(q, r, next) {

        next();
    }

    default(q, r, n) {
        r.send(`Merhaba dünya Hoşgeldin ${new Date().getTime()}
        <br/>
        <a href=login>Giriş yap</a>
        <br/>
        <a href=logout>Çıkış yap</a>
        <br/>
        <a href=timeoutTest>Timeout Test</a>`);
    }
    
    timeoutTest(q, r, n) {
        console.log('timeoutTest olacak ama send olmayacağı için timeout hatasına düşecek');
    }
    
    login(q, r, n) {
        console.log('Çıkış yapılacak!');
        r.send('Giriş Yapıldı <a href=logout>Çıkış Yap</a>' + new Date().getTime());
    }
    
    logout(q, r, n) {
        console.log('Çıkış yapılacak!');
        r.send('Çıkış Yapıldı <a href=/>Home</a>' + new Date().getTime());
    }
}

let k = new WWW();

router.use(k.all);
router.get('/', k.default);
router.get('/logout', k.logout);
router.get('/login', k.login);
router.get('/timeoutTest', k.timeoutTest);

module.exports = router;