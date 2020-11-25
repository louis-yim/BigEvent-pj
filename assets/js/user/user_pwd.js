$(function () {

    let form = layui.form;
    let layer = layui.layer;
    form.verify({

        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        aaa: function (value, item) {
            let oldPwd = $('[name=oldPwd]').val();
            if (value === oldPwd) {
                return '原密码和新密码一致'
            }
        },

        bbb: function (value, item) {

            let newPwd = $('[name=newPwd]').val();

            if (value !== newPwd) {
                return '新密码和确定密码不一致'
            }

        }

    });

    $('#userPwd').submit(function (e) {
        e.preventDefault();

        let data = $(this).serialize()
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('重置密码失败' + res.message)
                }
                layer.msg('重置密码成功')

                $('#userPwd').get(0).reset();
            }
        })

    })

})