//入口函数
$(function () {
    //1.定义验证规则
    var form = layui.form;
    form.verify({
        //所有的密码验证规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //新旧密码不能相同
        samePwd: function (value) {
            if (value === $("[name=oldPwd").val()) {
                return "原密码和旧密码不能相同！";
            }
        },
        //1.3俩次新密码必须相同
        rePwd: function (value) {
            //value是俩次输入的新密码,新密码需要重新获取
            if (value !== $("[name=newPwd").val()) {
                return "俩次新密码输入不一致！";
            }
        },
    })
});
//2.表单提交
$(".layui-form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
        method: "post",
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            layui.layer.msg("修改密码成功！");
            $(".layui-form")[0].reset();
        }
    })
})