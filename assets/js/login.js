$(function () {

    $('#gotoResi').click(function () {
        $('.resi').show();
        $('.login').hide();

    })
    $('#gotoLogin').click(function () {
        $('.resi').hide();
        $('.login').show();

    })


    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repass: function (value, item) {

            let pwd = $('.resi input[name=password]').val();

            if (value !== pwd) {

                return "两次输入的密码不一致!";
            }
        }
    });

    $('#resiForm').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);
        // return
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败' + res.message)
                }
                $('#gotoLogin').click();
            }
        })
    })

    $('#loginForm').on('submit', function (e) {
        e.preventDefault();
        let data = $(this).serialize();
        // console.log(data);
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                //存储token数据 用localStorage.setItem
                localStorage.setItem('token', res.token)
                layer.msg(
                    '登录成功，即将跳转到后台主页',
                    {
                        time: 2000
                    },
                    function () {

                        location.href = 'index.html';

                    }
                )
            }
        })
    })
}) 