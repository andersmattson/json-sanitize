
// The structure to test against
var structure = {
	name: String,
	created: Date,
	comments:[{
		commentator: Number,
		text: String,
		id: Number,
		votes: [Number]
	}],
	ids: [Number],
	user: {
		name: String,
		email: /^[a-z\.]+@[a-z\.]+/,
		email2: /^[a-z\.]+@[a-z\.]+/,
		isadmin: Boolean
	},
	len: function(arr) {return arr.length;},
	strs: [String],
	arraytest: [Number],
	arraytest2: Number,
	arrtest3: [[Number]]
};

// The data to test
var testObject = {
	name: 'Blog post',
	created: 1231231231231,
	comments: [
		{
			id: '12',
			commentator: 53,
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
			votes: [1243, 123423, 412342324]
		},{
			id: 13,
			commentator: 19,
			text: 'glk jhsdf glsdkjfhglsdkfjgh sldkfjhg sldkfjgh slkdfjh sdfjg'
		}
	],
	ids: [1, 2, '123', 'anders', true],
	user: {
		name: 'Anders Mattson',
		email: 'asdasd',
		email2: 'asdasd@example.com',
		isadmin: true,
		thisiscrap: 'Nonsens'
	},
	crap: {
		'that': 'shouldnt be there'
	},
	len: [1,3,5,6,3,2],
	strs: ["a","b",true],
	arraytest: [1,2,3],
	arraytest2: 12,
	arrtest3: [
		['a','b'],
		[1,2,'we'],
		null
	]
};

test('Casting and filtering tests', function(){

	// QUnit tests
	var result = filterJson(testObject, structure, true);
	equal(result.name, 'Blog post', 'result.name');
	equal(result.created.getTime(), 1231231231231, "result.created");
	deepEqual(result.comments, [
		{
			id: 12,
			commentator: 53,
			text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
			votes: [1243, 123423, 412342324]
		},{
			id: 13,
			commentator: 19,
			text: 'glk jhsdf glsdkjfhglsdkfjgh sldkfjhg sldkfjgh slkdfjh sdfjg'
		}
	], "comments");
	
	deepEqual(result.user, {
		name: 'Anders Mattson',
		email2: 'asdasd@example.com',
		isadmin: true
	}, 'user');
	
	equal(result.crap, undefined, 'no crap');
	equal(result.len, 6, 'length');
	deepEqual(result.strs, ["a", "b", "true"], "result.strs");
	deepEqual(result.ids, [1,2,123], "result.ids");
	deepEqual(result.arraytest, [1,2,3], "result.arraytest");
	deepEqual(result.arraytest2, 12, "result.arraytest2");
	deepEqual(result.arrtest3, [[],[1,2]], "arrtest3 is correct");
});

