app.controller('registryCtrl', ['$scope', function($scope){
	$scope.items = [
		{
			num: 1,
			registerDate: '22.12.2222',
			sum: '123123',
			paymentDate: '11.11.1234',
			data: [{
				number: '1',
				code: '2222',
				city: 'Moscow',
				price: '1235p',
				bounty: '777p',
				sum: '9000p',
				sumPayment: '9500p',
				status: 'moving'
			}]
		},
		{
			num: 2,
			registerDate: '33.13.3333',
			sum: '133133',
			paymentDate: '11.11.1334',
			data: [{
				number: '1',
				code: '3333',
				city: 'Moscow',
				price: '1335p',
				bounty: '777p',
				sum: '9000p',
				sumPayment: '9500p',
				status: 'moving'
			}, {
				number: '1',
				code: '4444',
				city: 'Moscow',
				price: '1445p',
				bounty: '777p',
				sum: '9000p',
				sumPayment: '9500p',
				status: 'moving'
			}]
		},
		{
			num: 3,
			registerDate: '44.14.4444',
			sum: '144144',
			paymentDate: '11.11.1444',
			data: [{
				number: '1',
				code: '4444',
				city: 'Moscow',
				price: '1445p',
				bounty: '777p',
				sum: '9000p',
				sumPayment: '9500p',
				status: 'moving'
			}]
		}
	];
	$scope.toggleItem = function(item){
		item.showed = !item.showed;
	}
}]);