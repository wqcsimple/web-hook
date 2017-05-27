const Core = require('node-api-base');
const Util = require('node-api-base').Util;
const Log = require('node-api-base').Log;
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);
app.use(Core.errorHandler);
app.use(Core.notFoundHandler);

function execute(context, command) {
    Log.i(command);
    Util.execute(command)
        .then(() => {
            context.finish('done')
        })
        .catch(e => {
            context.finish({error: Util.getFormattedJson(e)})
        })
    ;
}

function executeAndReturn(context, command) {
    Util.execute(command)
        .then((res) => {
            let template = require('./response');
            let resData = res.split("\n").reverse().join('<br />');

            context.response.send(template(resData));
        })
        .catch(e => {
            context.finish({error: Util.getFormattedJson(e)})
        })
}

var api = {
    '~/launch/boot-test-api': [context => execute(context, '/opt/script/boot_test_api')],
    '~/launch/boot-gh-api': [context => execute(context, '/opt/script/boot_gh_web')],
    '~/launch/boot-video-view-web': [context => execute(context, '/opt/script/boot_video_view_web')],
    '~/launch/boot-lexiang-web': [context => execute(context, '/opt/script/boot_lexiang_web')],
    '~/launch/boot_whis_blog': [context => execute(context, '/opt/script/boot_whis_blog')],
    '~/launch/test': [context => executeAndReturn(context, 'ls /Users/whis/Workspace/whis')],
};

Core.install(router, api);


var server = app.listen(50000, function () {
    var host = server.address().address;
    var port = server.address().port;
    Log.i(`app listening at http://${host}:${port}`);
});
