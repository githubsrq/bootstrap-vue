; (function () {
    const template = `<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
        
        <slot name="dashboard"></slot>

        <dashboard :hobbies="hobbies" @delete_hobby="deleteHobby"></dashboard>
  
        <h2 class="sub-header">Section title</h2>
        <home-list :empList="empList" :deleteEmp="deleteEmp"></home-list>

      </div>`

    window.AppHome = {
        template, // template: template,

        data() { // alt+shift 
            return {
                hobbies: ['coding', '睡觉', '打豆豆', '看书'],
                empList: []
            }
        },

        created() {
            axios.get('http://127.0.0.1:5500/bootstrap-vue/emp.json')
                .then(response => {//function (response) {
                    console.log(response.data, this);
                    this.empList = response.data
                })
                .catch(error => {//function (error) {
                    alert(error.message)
                })
        },

        methods: {
 
            deleteEmp(index) {
                this.empList.splice(index, 1)
            },
            deleteHobby(index) {
                this.hobbies.splice(index, 1)
            }
        },

        components: {  
            Dashboard,  
            HomeList  
        }
    }
})()