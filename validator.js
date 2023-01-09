/*
let options = {
    pass1:string['pass1'],
    pass2:string['pass2'],
    element:string['p-err'],
    type:int:[0,1,2 are valid values],
    callback:fn[function(i){}]called when pass1&pass2 are valid [i bool (valid/invalid)],
    callback_pass1:fn[function(i){}]called when pass1 is valid/invalid [i bool (valid/invalid)],
    callback_pass2:fn[function(i){}]called when pass2 is valid/invalid [i bool (valid/invalid)]
    }
*/
let validatePassword = function(options) {
    options.pass1 = '#' + options.pass1;
    options.pass2 = '#' + options.pass2;
    $(options.pass1 + ',' + options.pass2)
        .on('input change', ()=>{
            let e = {}
            let p1 = $(options.pass1).val();
            let p2 = $(options.pass2).val();
            //validate length
            e.l = p1.length > 7 && p1.length < 64?1:0;//len 8-64
            //validate letter
            e.a = p1.match(/[a-z]/)?1:0;//at least one letter
            //validate capital letter
            e.b = p1.match(/[A-Z]/)?1:0;//at least one capital letter
            //validate letter or capital letter
            e.c = p1.match(/[a-zA-Z]/)?1:0;//at least one capital letter
            //validate number
            e.n = p1.match(/\d/)?1:0;//at least one number
            //special character
            e.s = p1.match(/[\^@$!%*?&\[\]()\-_=+`~.{}\\,:;|/]/)?1:0;//at least one of those
            //match passwords
            e.m = (p1 === p2 && (p1 !== ''))?1:0;
            //cognito passwords options switch
            switch (options.type) {
                case 0:
                    //letter number capital letter and special char
                    e.valid = (e.l + e.a + e.b + e.n + e.s) === 5;
                    delete e.c;
                    break;
                case 1:
                    //letter number capital letter
                    e.valid = (e.l + e.a + e.b + e.n) === 4;
                    delete e.s;
                    delete e.c;
                    break;
                case 2:
                    //letter and number
                    e.valid = (e.l + e.c + e.n) === 3;
                    delete e.s;
                    delete e.a;
                    delete e.b;
                    break;
            }
            let i = 0;
            $.each(e, (key, pass)=>{
                //count valid passes
                i = i + pass;
                //set style of each sub-errors
                $('#' + options.element + '-' + key)
                    .css('color', pass?'green':'gray');
            });
            if(options.helpers) {
                //hide results if nothing was filled (optional, if not used, the pass counter is not needed)
                $('.' + options.element + '-container')
                    .css('visibility',i===0?'hidden':'visible');
            }
            //call when pass1 is valid/invalid
            if(options.callback_pass1) {
                options.callback_pass1(e.valid);
            }
            //call when pass2 is valid/invalid
            if(options.callback_pass2) {
                options.callback_pass2(e.m);
            }
            //call when all is valid (pass1&pass2)
            if(options.callback) {
                options.callback(!(e.valid && e.m), $(pass1).val());
            }
        });
}
