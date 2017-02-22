/**
 * Created by Administrator on 2017/2/22.
 */
var info = {
    userName: '',
    certification: 'ID_Type_01',
    cardId: '',
    isError: false,
    date: '',
    certifications: [{
        id: 'ID_Type_01',
        name: '身份证'
    },{
        id: 'ID_Type_02',
        name: '护照'
    },{
        id: 'ID_Type_03',
        name: '军人证'
    },{
        id: 'ID_Type_04',
        name: '回乡证'
    },{
        id: 'ID_Type_05',
        name: '台胞证'
    },{
        id: 'ID_Type_06',
        name: '港澳通行证'
    },{
        id: 'ID_Type_07',
        name: '户口簿'
    },{
        id: 'ID_Type_08',
        name: '出生证明'
    },{
        id: 'ID_Type_09',
        name: '其他'
    }]
};
var app = new Vue({
    el: '#infoInput',
    data: info,
    methods: {
        okEvent: function () {
            debugger
        }
    },
    computed: {
        okBtn: function(){
            if(!!this.userName && !!this.cardId && !this.isError){
                if(this.isShow){
                    if(!!this.date){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }
            }
            return true;
        },
        isShow: function () {
            if(this.certification == "ID_Type_09"){
                return true;
            }
            return false;
        }
    },
    watch: {
        cardId: {
            handler: function (val, oldVal) {
                var sel = this.certification;
                if(sel == "ID_Type_01" || sel == "ID_Type_07"){
                    this.isError = !idCardValidate(val);
                }
            }
        },
        certification: {
            handler: function (val, oldVal) {
                if(val != "ID_Type_01" && val != "ID_Type_07"){
                    this.isError = false;
                }
            }
        }
    }
});
