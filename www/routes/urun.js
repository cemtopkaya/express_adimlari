let express = require('express');
let router = express.Router();

router.use((q, r, n) => {
    console.log('Önce bu çalışsın');
    n();
});

router.get((q, r) => {
    r.send('Merhaba dünya');
});

module.exports = router;