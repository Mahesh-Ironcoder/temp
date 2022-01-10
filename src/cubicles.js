var cubicles = {};

cubicles.list = [
	{
		name: 'Sample Cubicle',
		desc: 'Description here',
		noofparticipants: 10,
		status: 'Active',
	},
	{
		name: 'Sample Cubicle1',
		desc: 'Description here',
		noofparticipants: 3,
		status: 'Active',
	},
];

cubicles.getCubicles = function () {
	return cubicles.list;
};

export default cubicles;
