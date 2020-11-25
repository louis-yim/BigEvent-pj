$(function () {
    let form = layui.form;
    let layer = layui.layer;
    fn();
    function fn() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取用户基本信息失败！");
                }
                // layer.msg("获取用户成功")
                form.val('userForm', res.data)
            }
        })
    }



    $('#resetBtn').click(function (e) {
        e.preventDefault();
        fn();
    })

    $('#userForm').submit(function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                layer.msg('修改用户信息成功！')
                window.parent.getInformation();

            }

        })

    })

    form.verify({
        abb: function (value, item) {

            if (value.length > 6) {

                return '昵称长度必须为1-6位';
            }
        }

    })
})