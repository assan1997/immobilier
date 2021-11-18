var express = require('express');
var axios = require('axios');
var router = express.Router();
/* GET home page. */
router.get('/', (req, res) => {
  axios.get('https://apiimmobilier.herokuapp.com/allItems').then((result) => {
    let homeItems = result.data.homeItems;
    let othersItems = result.data.othersItems;
    res.render('index', { homeItems: homeItems, othersItems: othersItems });
  });
});
router.get('/propriete/:id', (req, res) => {
  axios
    .get(`https://apiimmobilier.herokuapp.com/item/${req.params.id}`)
    .then((result) => {
      res.render('single-property', { item: result.data });
    });
});
router.get('/search', (req, res) => {
  res.redirect('/');
});
router.post('/search', (req, res) => {
  let datas = {
    ...req.body,
  };
  axios
    .get(
      `https://apiimmobilier.herokuapp.com/search/?location=${datas.location}&propertyType=${datas.propertyType}&status=${datas.status}&rooms=${datas.rooms}&baths=${datas.baths}`
    )
    .then((items) => {
      res.render('search', { homeItems: items.data });
    });
});
module.exports = router;
