
/*
 * GET users listing.
 */

exports.list = function(req, res){
    res.send([
        {
            id: '1234'
        },
        {
            id: '1235'
        },
        {
            id: '1236'
        },
        {
            id: '1237'
        },
        {
            id: '1238'
        },
        {
            id: '1239'
        },
    ]);
};