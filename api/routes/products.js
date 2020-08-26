const express = require("express");
const router = express.Router();

const Product = require('../models/product');


router.get('/', (req, res) => {
    
    Product.find()
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({error: err});
     }); 
});

router.post('/', (req, res) => {
    const product = new Product({
        
         name: req.body.name,
         price: req.body.price
     });
    product.save().then(result => {
        console.log(result);
        })
        .catch(err => console.log(err));
    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
        });
});


router.get('/:productId', (req, res) => {
   const id = req.params.productId;
   Product.findById(id)
   .exec()
   .then(doc => {
       console.log(doc);
       res.status(200).json(doc);
   })
   .catch(err =>{
     console.log(err);
     res.status(500).json({error: err});
    });        
});

router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.update({_id: id}, {$set: {name: req.body.name, price: req.body.price}})
    // Product.updateOne({_id: id}, {$set: updateOps})
      .exec()
      .then( docUpdate =>{
          res.status(200).json(docUpdate)
      })
     
      .catch( err =>{
        console.log(err);
        res.status(500).json({
            error :err
        })
    })
    
                     
 });
 router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(doc => {
        console.log('Product deleted');
        res.status(200).json('Product deleted');
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({error: err});
     }); 
                    
});          
    

module.exports = router;