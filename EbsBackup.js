var AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-1'
});

var ec2 = new AWS.EC2();

var nameFilter = 'BackupVolume';

var filters = {
    Filters: [
        {
            Name: 'tag:Name',
            Values: [
			    nameFilter
		    ]
	    }
    ]
};

exports.handler = function (event, context, callback) {
    ec2.describeVolumes(filters, function (err, data) {

        for (var i = 0; i < data.Volumes.length; i++) {
            var params = {
                VolumeId: data.Volumes[i].VolumeId,
            };
            ec2.createSnapshot(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else console.log(data)
            });
        }
    });
};