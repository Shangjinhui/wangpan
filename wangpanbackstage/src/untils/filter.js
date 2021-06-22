import Vue from 'vue';

Vue.filter('Zhanwei',item=>{
    item = item?item.toLowerCase():'';
    switch(item){
        case 'png':
        case 'jpg':
        case 'gif':
            return require('@/assets/img/picture.png');
        case 'ai':
            return require('@/assets/img/yulan/AI.png');
        case 'xls':
        case 'xlsx':
            return require('@/assets/img/yulan/excel.png');
        case 'mp4':
        case 'avi':
        case 'mov':
        case 'ogg':
        case 'webm':
            return require('@/assets/img/yulan/mp4.png');
        case 'pdf':
            return require('@/assets/img/yulan/pdf.png');
        case 'ppt':
        case 'pptx':
            return require('@/assets/img/yulan/ppt.png');
        case 'psd':
            return require('@/assets/img/yulan/Ps.png');
        case 'ttf':
        case 'otf':
            return require('@/assets/img/yulan/ttfotf.png');
        case 'doc':
        case 'docx':
            return require('@/assets/img/yulan/word.png');
        default:
            return require('@/assets/img/yulan/other.png');
    }
})