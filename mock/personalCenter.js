'use strict';

const qs = require('qs')

module.exports = {
	'GET /api/getUserInfo': function(req, res){
		setTimeout(function(){
			res.json({
				success: true,
				data: {
					name: '刘正伟',
					phone: '15202186317'
				}
			});
		},500)
	},
	'POST /api/getAccountList': function(req, res){
		setTimeout(function(){
			res.json({
				success: true,
				data: {
					name: '刘正伟',
					phone: '15202186317'
				}
			});
		},500)
	},
	'GET /api/getEidtUserInfo': function(req, res){
		setTimeout(function(){
			res.json({
				code: 0,
				success: true,
				data: {
					sex: ['男'],
					IdCard:"5335",
					IdCardOffice:"5435",
					eContact:"54",
					eContactPhone:"5435",
					fixedPhone:"543"
				}
			});
		},500)
	},
	'POST /api/reviseUserInfo': function(req, res){
		setTimeout(function(){
			res.json({
				code: 0,
				success: true,
				data: {
					
				}
			});
		},500)
	},
	'GET /api/getIsContact': function(req, res){
		setTimeout(function(){
			res.json({
				code: 0,
				success: true,
				data: {

				}
			});
		},500)
	},
	'GET /api/getIsOpenAccount': function(req, res){
		setTimeout(function(){
			res.json({
				code: 0,
				success: true,
				data: {
					
				}
			});
		},500)
	},
	'POST /api/getServiceCharge': function(req, res){
		setTimeout(function(){
			res.json({
				code: 0,
				success: true,
				data: {
					
				}
			});
		},500)
	},

}