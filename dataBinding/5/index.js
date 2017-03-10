class Vue {
    constructor(option) {
        this.ele = document.querySelector(option.el);
        this.data = new Observer(option.data);
        this.parse = eval(this.compile());
        this.init();
    }
    init() {
        this.data.$watch('all',this.render.bind(this));
        this.render();
    }
    render() {
        const html = this.parse(this.data);
        if(!this.html || this.html != html){
            this.html = this.ele.innerHTML = html;
        }
    }
    compile() {
        const evalExpr = /\{\{([\w\.]*(\[\d+\])*)\}\}/g;
        let template = this.ele.innerHTML
                            .replace(/[\r\t\n]/g, " ")
                            .replace(evalExpr,"',data.$1,'");

        template = "output.push('" + template + "');";

        const script =
            `(function parse(data){
                var output = [];
                ${ template };
                return output.join("");
            })`;

        return script;
    }
}

let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25
    },
    school: 'bupt',
    major: 'computer'
  }
});
app.data.school = 'SJTU';
app.data.user.name = 'xiaoming';
app.data.user = {
    name: 'sophia',
    age: 18
}