const Item = require('../models/Item');
const mongoose = require('mongoose')



module.exports.myrequest_get = (req,res)=>{
    Item.find({postedBy:req.query.postedBy})
    .select('_id name description address prerequisite date postedBy')
    .exec()
    .then(docs=>{
        const response = {
            items: docs.map(docs=>{
                return {
                    _id:docs._id,
                    name:docs.name,
                    description:docs.description,
                    address:docs.address,
                    prerequisite:docs.prerequisite,
                    date:docs.date,
                    postedBy:docs.postedBy
                }
            })
        }
        res.render('myrequest',{response});
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports.requestitem_get = (req,res)=>{
    res.render('requestitem');
}


module.exports.requestitem_post = (req,res)=>{

    const newitem=new Item({
        _id: mongoose.Types.ObjectId(),
        postedBy:req.body.postedBy,
        name:req.body.name,
        address:req.body.address,
        prerequisite:req.body.prerequisite,
        description:req.body.description
    });
    newitem.save()
    .then(newitem=>{
        res.redirect('/donatable');
    })
    .catch(err=>{
        console.log(err);
    });
}

module.exports.donatable = (req,res)=>{

    Item.find().select('_id name description address prerequisite date postedBy')
    .exec()
    .then(docs=>{
        const response = {
            items: docs.map(docs=>{
                
                return {
                    id:docs._id,
                    name:docs.name,
                    description:docs.description,
                    address:docs.address,
                    prerequisite:docs.prerequisite,
                    date:docs.date,
                    //postedBy:docs.postedBy
                }
            })
        }
        res.render('donatable',{response});
    })
    .catch()

}


module.exports.edititem_get = (req,res)=>{
    const id=req.query.key;
    
    Item.findById(id)
    .select('_id name description address prerequisite date postedBy')
    .exec()
    .then(docs=>{
        const response = {
            _id:docs._id,
            name:docs.name,
            description:docs.description,
            address:docs.address,
            prerequisite:docs.prerequisite,
            date:docs.date,
            postedBy:docs.postedBy
        }
        res.render('edititem',{response});
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports.edititem_post = (req,res)=>{
    

    //console.log(req.body);

    const id=req.body.id;

    const updateditems={
        name:req.body.name,
        description:req.body.description,
        address:req.body.address,
        prerequisite:req.body.prerequisite,
    };

    Item.updateOne({_id:id},{$set:updateditems})
    .exec()
    .then(result=>{
        res.redirect('/donatable');
    })
    .catch()

}


module.exports.deleteitem = (req,res)=>{
    const id=req.query.key;

    Item.deleteOne({_id:id})
    .exec()
    .then((result)=>{
        Item.find({postedBy:req.query.postedBy})
        .select('name description address prerequisite date postedBy')
        .exec()
        .then(docs=>{
            const response = {
                items: docs.map(docs=>{
                    return {
                        name:docs.name,
                        description:docs.description,
                        address:docs.address,
                        prerequisite:docs.prerequisite,
                        date:docs.date,
                        postedBy:docs.postedBy
                    }
                })
            }
            res.render('myrequest',{response});
        })
        .catch()
    })
    .catch()
}




module.exports.viewitem = (req,res)=>{
    Item.find({_id:req.query.id})
    .select('_id name description address prerequisite date postedBy')
    .exec()
    .then(docs=>{
        const response = {
            items: docs.map(docs=>{
                return {
                    _id:docs._id,
                    name:docs.name,
                    description:docs.description,
                    address:docs.address,
                    prerequisite:docs.prerequisite,
                    date:docs.date,
                    postedBy:docs.postedBy
                }
            })
        }
        res.render('viewitem',{response});
    })
    .catch((err)=>{
        console.log(err);
    })
}