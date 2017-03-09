class Vue {
    constructor(option) {
        this.ele = document.querySelector(option.el);
        this.data = option.data;
        this.parse = eval(this.compile());
        this.render();
    }
    render() {
        this.ele.innerHTML = this.parse(this.data);
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
    }
  }
});