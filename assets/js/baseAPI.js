//1.开发环境服务器地址
var baseURL = "http://ajax.frontend.itheima.net"
//2.测试环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net"
//3.生产环境服务器的地址
// var baseURL = "http://ajax.frontend.itheima.net"
//拦截所有ajax请求:get/post/ajax;
//处理参数
$.ajaxPrefilter(function (params) {
    //对需要权限的接口配置头信息
    //必须以my开头才行

    //拼接对应环境的服务器地址
    params.url = baseURL + params.url;
    //alert(params.url);

    //对需要权限的接口配置头信息
    //必须以my开头才行
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    //3.拦截所有响应，判断身份认证信息
    params.complete = function (res) {
        console.log(res.responseJSON)
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            //1.清空本地token
            localStorage.removeItem("token");
            //2.页面跳转
            location.href = '/login.html';
        }
    }
});
