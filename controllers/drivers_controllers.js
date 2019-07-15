const Driver=require('../models/driver');

module.exports={
	greeting(req,res){
		res.send({hi: 'there'});
	},

	index(req,res,next){
		Driver.geoNear(
			{type: 'Point',coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
			{spherical: true, maxDistance: 200000}
		)
		.then(drivers=>{
			res.send(drivers);
		})
		.catch(next);
		},

	create(req,res,next){
		// console.log(req.body);
		// res.send({hi: 'there'});
		const driverProps=req.body;
		Driver.create(driverProps)
		.then(driver=>res.send(driver))
		.catch(next);
	},

	edit(req,res,next){
		const driverId=req.params.id;
		const driverProps=req.body;
		Driver.findByIdAndUpdate({_id: driverId},driverProps)
		.then(()=>Driver.findById(driverId))
		.then(driver=>res.send(driver))
		.catch(next);
	},

	remove(req,res,next){
		const driverId=req.params.id;
		Driver.remove({_id: driverId})
		.then(driver=>res.status(204).send(driver))
		.catch(next);
	}
};