;(function () {
    const template = `<div class="jumbotron">
        <h1>{{ id }}</h1>
        <h2>{{ sportDetail.title }}</h2>
        <p>{{ sportDetail.content }}</p>
    </div>`

    window.SportDetail = {
        template,
        data () { // data 只会初始化一次，后面点击之后不会进行重新赋值
            return {
                id: null,
                sportDetail: {}
            }
        },

        created() {
            // 第一次初始化组件时，要调用函数进行获取id并查找数据
            this.getRportById ()
        },

        methods: {
            getRportById () {
                // 1. 获取路由地址中的 id值, -0 把id从字符串转为数字
                this.id = this.$route.params.id - 0
                axios.get('http://127.0.0.1:5500/bootstrap-vue/db/sport.json')
                .then(response => {
                    const sportArr = response.data
                   
                    this.sportDetail = sportArr.find(detail => {
                        // this 如果要代表 当前组件对象，则 回调函数要使用箭头函数
                        return detail.id === this.id
                    })
                })
                .catch(error => {
                    alert(error.message)
                })
                
            }
        },

        watch: {  
            '$route': function () {
                this.getRportById()
            }
        }
    }
})()