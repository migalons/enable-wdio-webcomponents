module.exports = function (toBeSplitted) {
    return toBeSplitted.match(/\\?.|^$/g).reduce((p, c) => {
        if(c === '"' || c=== "'"){
            p.quote ^= 1;
            p.a[p.a.length-1] += c.replace(/\\(.)/,"$1");
        }else if(!p.quote && c === ' ' ){
            p.a.push('');
        }else{
            p.a[p.a.length-1] += c.replace(/\\(.)/,"$1");
        }
        return  p;
    }, {a: ['']}).a.filter((item)=>item)

}