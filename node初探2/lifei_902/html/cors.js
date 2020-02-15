
console.log("温恩建执行了额", $)
$.ajax(
    {
        url:"http://127.0.0.1:3003/statistic",
        success: function(res) {
            console.log("qqqingqiuchenggon ")
        },
        error: function(e) {
            console.log("eerror")
            $(".message").text("message from cors!")
        }
    }
    );

console.log("11111111")