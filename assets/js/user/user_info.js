//入口函数
$(function () {
    //1.定义校验规则
    var form = layui.form;
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6 ){
                return "昵称长度为1-6位之间！";
            }
        }
    });
    //2.初始化用户信息
    initUserInfo();
    //初始化用户信息封装，后面还要用；
    //封装函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            succcess: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                //成功， 后渲染
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    //3.表单重置
    $("#btnReset").on("click", function (e) {
        //阻止重置
        e.preventDefault();
        //从新用户渲染
        initUserInfo()
    })
    //4.修改用户信息
    $(".layui-form").on("submit", function (e) {
        //阻止默认提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                //成功
                layer.msg("恭喜您，修改用户信息成功！");
                //调用父框架的全局方法
                window.parent.getUserInfo()
            }
        })
    })




})