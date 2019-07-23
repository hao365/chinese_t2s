// ==UserScript==
// @name         简繁转换
// @namespace    https://github.com/hao365/chinese_t2s/
// @version      0.1
// @description  中文网页繁简体转换油猴脚本
// @author       Gao
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    var b = '';
    var d = location.host.split('.').pop();
    if (d == 'tw' || d == 'hk' || d == 'mo') {
        b = 'domain';
    }
    if (!b) {
        var llst = ['ab', 'aa', 'af', 'ak', 'sq', 'am', 'ar', 'an', 'hy', 'as', 'av', 'ae', 'ay', 'az', 'bm', 'ba', 'eu', 'be', 'bn', 'bh', 'bi', 'bs', 'br', 'bg', 'my', 'ca', 'ch', 'ce', 'ny', 'cv', 'kw', 'co', 'cr', 'hr', 'cs', 'da', 'dv', 'nl', 'dz', 'eo', 'et', 'ee', 'fo', 'fj', 'fi', 'fr', 'ff', 'gl', 'gd', 'gv', 'ka', 'de', 'el', 'kl', 'gn', 'gu', 'ht', 'ha', 'he', 'hz', 'hi', 'ho', 'hu', 'is', 'io', 'ig', 'id', 'in', 'ia', 'ie', 'iu', 'ik', 'ga', 'it', 'ja', 'jv', 'kl', 'kn', 'kr', 'ks', 'kk', 'km', 'ki', 'rw', 'rn', 'ky', 'kv', 'kg', 'ko', 'ku', 'kj', 'lo', 'la', 'lv', 'li', 'ln', 'lt', 'lu', 'lg', 'lb', 'gv', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mh', 'mo', 'mn', 'na', 'nv', 'ng', 'nd', 'ne', 'no', 'nb', 'nn', 'ii', 'oc', 'oj', 'cu', 'or', 'om', 'os', 'pi', 'ps', 'fa', 'pl', 'pt', 'pa', 'qu', 'rm', 'ro', 'ru', 'se', 'sm', 'sg', 'sa', 'sr', 'sh', 'st', 'tn', 'sn', 'ii', 'sd', 'si', 'ss', 'sk', 'sl', 'so', 'nr', 'es', 'su', 'sw', 'ss', 'sv', 'tl', 'ty', 'tg', 'ta', 'tt', 'te', 'th', 'bo', 'ti', 'to', 'ts', 'tr', 'tk', 'tw', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa', 'cy', 'wo', 'fy', 'xh', 'yi', 'ji', 'yo', 'za', 'zu'];
        var l;
        if (document.querySelector('meta[http-equiv="Content-Language"]')) {
            l = document.querySelector('meta[http-equiv="Content-Language"]').getAttribute('content');
        }
        if (!l && document.querySelector('meta[property="og:locale"]')) {
            l = document.querySelector('meta[property="og:locale"]').getAttribute('content');
        }
        if (!l && document.querySelector('html')) {
            l = document.querySelector('html').getAttribute('lang') || document.querySelector('html').getAttribute('xml:lang');
        }
        if (l) {
            l = l.toLowerCase();
            for (var i = 0; i < llst.length; i++) {
                if (l.indexOf(llst[i]) == 0) {
                    return;
                }
            }
            if (/[-_](cn|sg|my|hans)/.test(l)) {
                return;
            }
            if (/[-_](tw|hk|mo|hant)/.test(l)) {
                b = 'lang';
            }
        }
    }
    if (!b) {
        var c = document.querySelector('meta[http-equiv=Content-Type]') ? document.querySelector('meta[http-equiv=Content-Type]').getAttribute('content') : '';
        if (c) {
            c = c.toLowerCase();
            if (/charset=(gb2312|gbk)/.test(c)) {
                return;
            }
            if (/charset=(big5|hkscs|cns11643)/.test(c)) {
                b = 'Content-Type';
            }
        }
    }
    if (!b) {
        var c = document.querySelector('meta[charset]') ? document.querySelector('meta[charset]').getAttribute('charset') : '';
        if (c) {
            c = c.toLowerCase();
            if (/gb2312|gbk/.test(c)) {
                return;
            }
            if (/big5|hkscs|cns11643/.test(c)) {
                b = 'meta[charset]';
            }
        }
    }
    if (!b) {
        var desc = document.title + decodeURIComponent(location.href);
        var s = 'meta[itemprop=name],meta[itemprop=description],meta[name=title],meta[name=keywords],meta[name=description],meta[property="og:site_name"],meta[property="og:title"],meta[property="og:url"],meta[property="og:keywords"],meta[property="og:description"],meta[property="twitter:description"]';
        var q = document.querySelectorAll(s);
        var c = '';
        for (var i = 0; i < q.length; i++) {
            c = q[i].getAttribute('content');
            desc += c ? c : '';
        }
        if (/[網頁國電灣歡臺為華資訊體麼類學詢種級閱]/.test(desc)) {
            b = 'meta desc';
        }
    }
    if (!b) {
        var css = '';
        for (var i = 0; i < document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            try {
                for (var j = 0; j < sheet.cssRules.length; j++) {
                    css += sheet.cssRules[j].cssText;
                }
            } catch (e) {
                break;
            }
        }
        if (css == '') {
            var q = document.querySelectorAll('style');
            var c = '';
            for (var i = 0; i < q.length; i++) {
                c = q[i].innerHTML;
                css += c ? c : '';
            }
        }
        if (/體|軟|繁|驛|儷|蘋|JhengHei|正黑|CJK TC|PingFang TC/i.test(css)) {
            b = 'css';
        }
    }
    if (!b && window.parent) {
        var n, walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                return (['SCRIPT', 'STYLE'].indexOf(node.tagName) != -1) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        }, false), s = '';
        while (n = walker.nextNode()) {
            if (n.nodeType == 3 && n.data)
                s += n.data;
        }
        walker = null;
        if (/[應檢舉鐘評論網頁號關開訪註幫會圖聯員讚歡]/.test(s)) {
            b = 'frame text';
        }
    }
    if (!b) {
        return;
    }

    var jian = ['圆', '局', '卫', '纾', '碱', '盐', '闲', '凤', '即', '雕', '念', '踪', '折', '向', '荡', '秋', '千', '绕', '哗', '签', '吊', '愈', '团', '尝', '搜', '卷', '布', '升', '占', '抵', '翱', '鳖', '痴', '皋', '硅', '碱', '碱', '秸', '净', '霉', '啮', '拖', '抬', '叹', '瓮', '羡', '蝎', '艳', '涌', '游', '扎', '泄', '凶', '恤', '泛', '群', '辄', '眷', '岳', '斗', '焰', '迹', '钟', '弦', '赞', '岩', '吁', '炼', '弥', '乃', '余', '辟', '鉴', '画', '梁', '咨', '回', '勋', '伙', '周', '吁', '拼', '啰', '么', '于', '䌶', '䌺', '䞍', '鲃', '鳚', '丢', '并', '干', '乱', '亚', '伫', '余', '并', '来', '仑', '侣', '俣', '系', '伣', '侠', '伥', '俩', '俫', '仓', '个', '们', '伦', '伟', '侧', '侦', '伪', '杰', '伧', '伞', '备', '佣', '偬', '传', '伛', '债', '伤', '倾', '偻', '仅', '佥', '侨', '仆', '伪', '侥', '偾', '价', '仪', '侬', '亿', '侩', '俭', '傧', '俦', '侪', '尽', '偿', '优', '储', '俪', '傩', '傥', '俨', '兑', '儿', '兖', '内', '两', '册', '幂', '净', '冻', '凛', '凯', '别', '删', '刭', '则', '克', '刹', '刬', '刚', '剥', '剐', '剀', '创', '划', '剧', '刘', '刽', '刿', '剑', '剂', '劲', '动', '务', '勋', '胜', '劳', '势', '勚', '劢', '励', '劝', '匀', '匦', '汇', '匮', '区', '协', '却', '厍', '厕', '厌', '厉', '厣', '参', '叁', '丛', '咤', '吴', '呐', '吕', '呙', '员', '呗', '吣', '问', '启', '哑', '启', '唡', '㖞', '唤', '丧', '乔', '单', '哟', '呛', '啬', '唝', '吗', '呜', '唢', '哔', '叹', '喽', '呕', '啧', '尝', '唛', '哗', '唠', '啸', '叽', '哓', '呒', '啴', '嘘', '咝', '哒', '哝', '哕', '嗳', '哙', '喷', '吨', '当', '咛', '吓', '哜', '噜', '啮', '呖', '咙', '亸', '喾', '严', '嘤', '啭', '嗫', '嚣', '冁', '呓', '嘱', '囱', '囵', '国', '围', '园', '圆', '图', '团', '埯', '垭', '采', '执', '坚', '垩', '垴', '埚', '尧', '报', '场', '块', '茔', '垲', '埘', '涂', '坞', '埙', '尘', '堑', '垫', '坠', '堕', '坟', '墙', '垦', '坛', '𡒄', '垱', '压', '垒', '圹', '垆', '坏', '垄', '垅', '坜', '坝', '壮', '壶', '壸', '寿', '够', '梦', '夹', '奂', '奥', '奁', '夺', '奖', '奋', '姹', '妆', '姗', '奸', '娱', '娄', '妇', '娅', '娲', '妫', '媪', '妈', '妪', '妩', '娴', '婳', '妫', '娆', '婵', '娇', '嫱', '嫒', '嬷', '嫔', '婴', '婶', '娈', '孙', '学', '孪', '宫', '寝', '实', '宁', '审', '写', '宽', '宠', '宝', '将', '专', '寻', '对', '导', '尴', '届', '尸', '屃', '屉', '屡', '层', '屦', '属', '冈', '岘', '岛', '峡', '崃', '岗', '峥', '岽', '岚', '嵝', '崭', '岖', '嵚', '崂', '峤', '峣', '峄', '崄', '岙', '嵘', '岭', '屿', '岿', '峦', '巅', '巯', '帅', '师', '帐', '带', '帧', '帏', '帼', '帻', '帜', '币', '帮', '帱', '干', '么', '几', '库', '厕', '厢', '厩', '厦', '厨', '厮', '庙', '厂', '庑', '废', '广', '廪', '庐', '厅', '弑', '弪', '张', '强', '弹', '弥', '弯', '汇', '彝', '彦', '后', '径', '从', '徕', '复', '征', '彻', '恒', '耻', '悦', '悮', '怅', '闷', '恶', '恼', '恽', '恻', '爱', '惬', '悫', '怆', '恺', '忾', '栗', '态', '愠', '惨', '惭', '恸', '惯', '悫', '怄', '怂', '虑', '悭', '庆', '忧', '惫', '怜', '凭', '愦', '惮', '愤', '悯', '怃', '宪', '忆', '恳', '应', '怿', '懔', '怼', '懑', '恹', '惩', '懒', '怀', '悬', '忏', '惧', '慑', '恋', '戆', '戋', '戗', '戬', '战', '戯', '戏', '户', '抛', '十', '捝', '挟', '舍', '扪', '扫', '抡', '挜', '挣', '挂', '采', '拣', '扬', '换', '挥', '损', '摇', '捣', '揾', '抢', '掴', '掼', '搂', '挚', '抠', '抟', '掺', '捞', '挦', '撑', '挠', '㧑', '挢', '掸', '拨', '抚', '扑', '揿', '挞', '挝', '捡', '拥', '掳', '择', '击', '挡', '㧟', '担', '据', '挤', '拟', '摈', '拧', '搁', '掷', '扩', '撷', '摆', '擞', '撸', '扰', '摅', '撵', '拢', '拦', '撄', '搀', '撺', '携', '摄', '攒', '挛', '摊', '搅', '揽', '败', '叙', '敌', '数', '敛', '毙', '斓', '斩', '断', '时', '晋', '昼', '晕', '晖', '旸', '畅', '暂', '晔', '历', '昙', '晓', '向', '暧', '旷', '昽', '晒', '书', '会', '胧', '东', '锨', '极', '栅', '杆', '栀', '枧', '条', '枭', '棁', '弃', '枨', '枣', '栋', '栈', '栖', '梾', '桠', '杨', '枫', '桢', '业', '极', '杩', '荣', '榅', '桤', '构', '枪', '梿', '椠', '椁', '桨', '桩', '乐', '枞', '楼', '标', '枢', '样', '朴', '树', '桦', '桡', '桥', '机', '椭', '横', '檩', '柽', '档', '桧', '槚', '检', '樯', '梼', '台', '槟', '柠', '槛', '柜', '橹', '榈', '栉', '椟', '橼', '栎', '橱', '槠', '栌', '枥', '橥', '榇', '蘖', '栊', '榉', '樱', '栏', '权', '椤', '栾', '榄', '棂', '钦', '欧', '欤', '欢', '岁', '历', '归', '殁', '残', '殒', '殇', '㱮', '殚', '殓', '殡', '歼', '杀', '壳', '壳', '毁', '殴', '毵', '牦', '毡', '氇', '气', '氢', '氩', '氲', '决', '没', '冲', '况', '汹', '浃', '泾', '凉', '泪', '渌', '沦', '渊', '涞', '浅', '涣', '减', '涡', '测', '浑', '凑', '浈', '汤', '沩', '准', '沟', '温', '沧', '灭', '涤', '荥', '沪', '滞', '渗', '卤', '浒', '浐', '滚', '满', '渔', '沤', '汉', '涟', '渍', '涨', '溆', '渐', '浆', '颍', '泼', '洁', '沩', '潜', '润', '浔', '溃', '滗', '涠', '涩', '浇', '涝', '涧', '渑', '泽', '滪', '泶', '浍', '淀', '浊', '浓', '湿', '泞', '济', '涛', '滥', '潍', '滨', '溅', '泺', '滤', '滢', '渎', '泻', '浏', '濒', '泸', '沥', '潇', '潆', '潴', '泷', '濑', '潋', '澜', '沣', '滠', '洒', '漓', '滩', '灏', '漤', '湾', '滦', '滟', '灾', '为', '乌', '烃', '无', '炼', '炜', '烟', '茕', '焕', '烦', '炀', '煴', '荧', '炝', '热', '颎', '炽', '烨', '灯', '炖', '烧', '烫', '焖', '营', '灿', '烛', '烩', '烬', '焘', '烁', '炉', '烂', '争', '为', '爷', '尔', '墙', '牍', '牵', '荦', '犊', '牺', '状', '狭', '狈', '狰', '犹', '狲', '犸', '狱', '狮', '奖', '独', '狯', '猃', '狝', '狞', '获', '猎', '犷', '兽', '獭', '献', '猕', '猡', '现', '珐', '珲', '玮', '玚', '琐', '瑶', '莹', '玛', '玱', '琏', '玑', '瑷', '珰', '环', '玺', '琼', '珑', '璎', '瓒', '瓯', '产', '产', '亩', '毕', '异', '画', '当', '畴', '叠', '痉', '疴', '痖', '疯', '疡', '痪', '瘗', '疮', '疟', '瘆', '疭', '瘘', '瘘', '疗', '痨', '痫', '瘅', '疠', '瘪', '痒', '疖', '症', '疬', '癞', '癣', '瘿', '瘾', '痈', '瘫', '癫', '发', '皑', '疱', '皲', '皱', '盗', '盏', '尽', '监', '盘', '卢', '眦', '众', '困', '睁', '睐', '眍', '䁖', '瞒', '瞆', '睑', '眬', '瞩', '矫', '硁', '硖', '砗', '砚', '硕', '砀', '砜', '确', '码', '硙', '砖', '碜', '碛', '矶', '硗', '碱', '础', '碍', '矿', '砺', '砾', '矾', '砻', '禄', '祸', '祯', '祎', '祃', '御', '禅', '礼', '祢', '祷', '秃', '籼', '税', '秆', '禀', '种', '称', '谷', '稣', '积', '颖', '秾', '穑', '秽', '稳', '获', '稆', '窝', '洼', '穷', '窑', '窎', '窭', '窥', '窜', '窍', '窦', '灶', '窃', '竖', '竞', '笔', '笋', '笕', '䇲', '笺', '筝', '节', '范', '筑', '箧', '筼', '笃', '筛', '筚', '箦', '篓', '箪', '简', '篑', '箫', '筜', '签', '帘', '篮', '筹', '箓', '箨', '籁', '笼', '笾', '簖', '篱', '箩', '粤', '糁', '粪', '粮', '粝', '籴', '粜', '纟', '纠', '纪', '纣', '约', '红', '纡', '纥', '纨', '纫', '纹', '纳', '纽', '纾', '纯', '纰', '纼', '纱', '纮', '纸', '级', '纷', '纭', '纴', '纺', '䌷', '细', '绂', '绁', '绅', '纻', '绍', '绀', '绋', '绐', '绌', '终', '组', '䌹', '绊', '绗', '结', '绝', '绦', '绔', '绞', '络', '绚', '给', '绒', '绖', '统', '丝', '绛', '绝', '绢', '绑', '绡', '绠', '绨', '绣', '绤', '绥', '经', '综', '缍', '绿', '绸', '绻', '线', '绶', '维', '绹', '绾', '纲', '网', '绷', '缀', '纶', '绺', '绮', '绽', '绰', '绫', '绵', '绲', '缁', '紧', '绯', '绿', '绪', '绬', '绱', '缃', '缄', '缂', '线', '缉', '缎', '缔', '缗', '缘', '缌', '编', '缓', '缅', '纬', '缑', '缈', '练', '缏', '缇', '致', '萦', '缙', '缢', '缒', '绉', '缣', '缊', '缞', '缚', '缜', '缟', '缛', '县', '绦', '缝', '缡', '缩', '纵', '缧', '䌸', '缦', '絷', '缕', '缥', '总', '绩', '绷', '缫', '缪', '缯', '织', '缮', '缭', '绕', '绣', '缋', '绳', '绘', '系', '茧', '缰', '缳', '缲', '缴', '䍁', '绎', '继', '缤', '缱', '缬', '纩', '续', '累', '缠', '缨', '纤', '缵', '缆', '钵', '坛', '罂', '罚', '骂', '罢', '罗', '罴', '羁', '芈', '羟', '义', '习', '翘', '耧', '耢', '圣', '闻', '联', '聪', '声', '耸', '聩', '聂', '职', '聍', '听', '聋', '肃', '胁', '脉', '胫', '脱', '胀', '肾', '胨', '脶', '脑', '肿', '脚', '肠', '腽', '肤', '胶', '腻', '胆', '脍', '脓', '脸', '脐', '膑', '腊', '胪', '脏', '脔', '臜', '临', '台', '与', '兴', '举', '旧', '舱', '舣', '舰', '舻', '艰', '艳', '刍', '苧', '苎', '兹', '荆', '庄', '茎', '荚', '苋', '华', '苌', '莱', '万', '莴', '叶', '荭', '荮', '苇', '药', '荤', '莼', '莳', '莅', '苍', '荪', '盖', '莲', '苁', '莼', '荜', '卜', '蒌', '蒋', '葱', '茑', '荫', '荨', '蒇', '荞', '荬', '芸', '莸', '荛', '蒉', '荡', '芜', '萧', '蓣', '蕰', '荟', '蓟', '芗', '蔷', '荙', '莶', '荐', '萨', '苧', '荠', '蓝', '荩', '艺', '药', '薮', '蕴', '苈', '蔼', '蔺', '蕲', '芦', '苏', '蕴', '苹', '藓', '蔹', '茏', '兰', '蓠', '萝', '蔂', '处', '虚', '虏', '号', '亏', '虬', '蛱', '蜕', '蚬', '蜡', '蚀', '猬', '虾', '蜗', '蛳', '蚂', '萤', '蝼', '螀', '蛰', '蝈', '螨', '虮', '蝉', '蛲', '虫', '蛏', '蚁', '蝇', '虿', '蛴', '蝾', '蜡', '蛎', '蟏', '蛊', '蚕', '蛮', '众', '术', '同', '胡', '卫', '冲', '只', '衮', '袅', '里', '补', '装', '里', '制', '复', '裈', '袆', '裤', '裢', '褛', '亵', '裥', '袯', '袄', '裣', '裆', '褴', '袜', '衬', '袭', '见', '觃', '规', '觅', '视', '觇', '觋', '觍', '觎', '亲', '觊', '觏', '觐', '觑', '觉', '览', '觌', '观', '觞', '觯', '触', '讠', '订', '讣', '计', '讯', '讧', '讨', '讦', '讱', '训', '讪', '讫', '托', '记', '讹', '讶', '讼', '䜣', '诀', '讷', '讻', '访', '设', '许', '诉', '诃', '诊', '注', '诂', '诋', '讵', '诈', '诒', '诏', '评', '诐', '诇', '诎', '诅', '词', '咏', '诩', '询', '诣', '试', '诗', '诧', '诟', '诡', '诠', '诘', '话', '该', '详', '诜', '诙', '诖', '诔', '诛', '诓', '夸', '志', '认', '诳', '诶', '诞', '诱', '诮', '语', '诚', '诫', '诬', '误', '诰', '诵', '诲', '说', '说', '谁', '课', '谇', '诽', '谊', '訚', '调', '谄', '谆', '谈', '诿', '请', '诤', '诹', '诼', '谅', '论', '谂', '谀', '谍', '谞', '谝', '诨', '谔', '谛', '谐', '谏', '谕', '咨', '讳', '谙', '谌', '讽', '诸', '谚', '谖', '诺', '谋', '谒', '谓', '誊', '诌', '谎', '谜', '谧', '谑', '谡', '谤', '谦', '谥', '讲', '谢', '谣', '谣', '谟', '谪', '谬', '谫', '讴', '谨', '谩', '证', '谲', '讥', '谮', '识', '谯', '谭', '谱', '谵', '译', '议', '谴', '护', '诪', '誉', '谫', '读', '变', '雠', '谗', '让', '谰', '谶', '谠', '谳', '岂', '竖', '丰', '猪', '豮', '猫', '贝', '贞', '贠', '负', '财', '贡', '贫', '货', '贩', '贪', '贯', '责', '贮', '贳', '赀', '贰', '贵', '贬', '买', '贷', '贶', '费', '贴', '贻', '贸', '贺', '贲', '赂', '赁', '贿', '赅', '资', '贾', '贼', '赈', '赊', '宾', '赇', '赒', '赉', '赐', '赏', '赔', '赓', '贤', '卖', '贱', '赋', '赕', '质', '赍', '账', '赌', '赖', '赗', '赚', '赙', '购', '赛', '赜', '贽', '赘', '赟', '赠', '赞', '赝', '赡', '赢', '赆', '赃', '赑', '赎', '赝', '赣', '赃', '赪', '赶', '赵', '趋', '趱', '迹', '践', '踊', '跄', '跸', '蹒', '踪', '跷', '跶', '趸', '踌', '跻', '跃', '踯', '跞', '踬', '蹰', '跹', '蹑', '蹿', '躜', '躏', '躯', '车', '轧', '轨', '军', '轪', '轩', '轫', '轭', '软', '轷', '轸', '轱', '轴', '轵', '轺', '轲', '轶', '轼', '较', '辂', '辁', '辀', '载', '轾', '辄', '挽', '辅', '轻', '辆', '辎', '辉', '辋', '辍', '辊', '辇', '辈', '轮', '辌', '辑', '辏', '输', '辐', '辗', '舆', '辒', '毂', '辖', '辕', '辘', '转', '辙', '轿', '辚', '轰', '辔', '轹', '轳', '办', '辞', '辫', '辩', '农', '迳', '这', '连', '进', '运', '过', '达', '违', '遥', '逊', '递', '远', '适', '迟', '迁', '选', '遗', '辽', '迈', '还', '迩', '边', '逻', '逦', '郏', '邮', '郓', '乡', '邹', '邬', '郧', '邓', '郑', '邻', '郸', '邺', '郐', '邝', '酂', '郦', '酝', '丑', '酝', '医', '酱', '酦', '酿', '衅', '酾', '酽', '释', '厘', '钅', '钆', '钇', '钌', '钊', '钉', '钋', '针', '钓', '钐', '钏', '钒', '钗', '钍', '钕', '钎', '钯', '钫', '钘', '钭', '钚', '钠', '钝', '钩', '钤', '钣', '钑', '钞', '钮', '钧', '钙', '钬', '钛', '钪', '铌', '铈', '钶', '铃', '钴', '钹', '铍', '钰', '钸', '铀', '钿', '钾', '钜', '铊', '铉', '铇', '铋', '铂', '钷', '钳', '铆', '铅', '钺', '钵', '钩', '钲', '钼', '钽', '铏', '铰', '铒', '铬', '铪', '银', '铳', '铜', '铚', '铣', '铨', '铢', '铭', '铫', '铦', '衔', '铑', '铷', '铱', '铟', '铵', '铥', '铕', '铯', '铐', '铞', '锐', '销', '锈', '锑', '锉', '铝', '锒', '锌', '钡', '铤', '铗', '锋', '铻', '锊', '锓', '铘', '锄', '锃', '锔', '锇', '铓', '铺', '锐', '铖', '锆', '锂', '铽', '锍', '锯', '钢', '锞', '录', '锖', '锫', '锩', '铔', '锥', '锕', '锟', '锤', '锱', '铮', '锛', '锬', '锭', '锜', '钱', '锦', '锚', '锠', '锡', '锢', '错', '录', '锰', '表', '铼', '锝', '锨', '锪', '钔', '锴', '锳', '锅', '镀', '锷', '铡', '钖', '锻', '锽', '锸', '锲', '锘', '锹', '锾', '键', '锶', '锗', '镁', '锿', '镅', '镑', '镕', '锁', '镉', '镈', '镃', '钨', '蓥', '镏', '铠', '铩', '锼', '镐', '镇', '镒', '镋', '镍', '镓', '镌', '镎', '镞', '镟', '链', '镆', '镙', '镠', '镝', '铿', '锵', '镗', '镘', '镛', '铲', '镜', '镖', '镂', '錾', '镚', '铧', '镤', '镪', '锈', '铙', '铴', '镣', '铹', '镦', '镡', '钟', '镫', '镢', '镨', '锎', '锏', '镄', '镌', '镰', '镯', '镭', '铁', '镮', '铎', '铛', '镱', '铸', '镬', '镔', '鉴', '镲', '锧', '镴', '铄', '镳', '镥', '镧', '钥', '镵', '镶', '镊', '镩', '锣', '钻', '銮', '凿', '镢', '长', '门', '闩', '闪', '闫', '闬', '闭', '开', '闶', '闳', '闰', '闲', '间', '闵', '闸', '阂', '阁', '阀', '闺', '闽', '阃', '阆', '闾', '阅', '阅', '阊', '阉', '阎', '阏', '阍', '阈', '阌', '阒', '板', '闱', '阔', '阕', '阑', '阇', '阗', '阘', '闿', '阖', '阙', '闯', '关', '阚', '阓', '阐', '阛', '闼', '坂', '陉', '陕', '阵', '阴', '陈', '陆', '阳', '陧', '队', '阶', '陨', '际', '随', '险', '隐', '陇', '隶', '只', '隽', '虽', '双', '雏', '杂', '鸡', '离', '难', '云', '电', '霡', '雾', '霁', '雳', '霭', '灵', '靓', '静', '腼', '靥', '鼗', '巩', '绱', '鞒', '缰', '鞑', '鞯', '韦', '韧', '韨', '韩', '韪', '韬', '韫', '韵', '响', '页', '顶', '顷', '项', '顺', '顸', '须', '顼', '颂', '颀', '颃', '预', '顽', '颁', '顿', '颇', '领', '颌', '颉', '颐', '颏', '头', '颒', '颊', '颋', '颕', '颔', '颈', '颓', '频', '颓', '颗', '题', '额', '颚', '颜', '颙', '颛', '颜', '愿', '颡', '颠', '类', '颟', '颢', '顾', '颤', '颥', '显', '颦', '颅', '颞', '颧', '风', '飐', '飑', '飒', '台', '刮', '飓', '飔', '飏', '飖', '飕', '飗', '飘', '飙', '飚', '飞', '饣', '饥', '饤', '饦', '饨', '饪', '饫', '饬', '饭', '饮', '饴', '饲', '饱', '饰', '饳', '饺', '饸', '饼', '饷', '养', '饵', '饹', '饻', '饽', '馁', '饿', '馂', '饾', '肴', '馄', '馃', '饯', '馅', '馆', '糇', '饧', '馉', '馇', '馎', '饩', '馏', '馊', '馌', '馍', '馒', '馐', '馑', '馓', '馈', '馔', '饥', '饶', '飨', '餍', '馋', '馕', '马', '驭', '冯', '驮', '驰', '驯', '驲', '驳', '驻', '驽', '驹', '驵', '驾', '骀', '驸', '驶', '驼', '驷', '骂', '骈', '骇', '骃', '骆', '骎', '骏', '骋', '骍', '骓', '骔', '骒', '骑', '骐', '骛', '骗', '骙', '骞', '骘', '骝', '腾', '驺', '骚', '骟', '骡', '蓦', '骜', '骖', '骠', '骢', '驱', '骅', '骕', '骁', '骣', '骄', '验', '惊', '驿', '骤', '驴', '骧', '骥', '骦', '骊', '骉', '肮', '髅', '脏', '体', '髌', '髋', '发', '松', '胡', '须', '鬓', '斗', '闹', '阋', '阄', '郁', '魉', '魇', '鱼', '鱽', '鱾', '鲀', '鲁', '鲂', '鱿', '鲄', '鲅', '鲆', '鲌', '鲉', '鲏', '鲇', '鲐', '鲍', '鲋', '鲊', '鲒', '鲘', '鲞', '鲕', '鲖', '鲔', '鲛', '鲑', '鲜', '鲓', '鲪', '鲝', '鲧', '鲠', '鲩', '鲤', '鲨', '鲬', '鲻', '鲯', '鲭', '鲞', '鲷', '鲴', '鲱', '鲵', '鲲', '鲳', '鲸', '鲮', '鲰', '鲺', '鳀', '鲫', '鳊', '鳈', '鲗', '鳂', '鲽', '鳇', '鳅', '鲾', '鳄', '鳆', '鳃', '鳒', '鳑', '鳋', '鲥', '鳏', '鳎', '鳐', '鳍', '鳁', '鲢', '鳌', '鳓', '鳘', '鲦', '鲣', '鲹', '鳗', '鳛', '鳔', '鳉', '鳙', '鳕', '鳖', '鳟', '鳝', '鳜', '鳞', '鲟', '鲼', '鲎', '鲙', '鳣', '鳡', '鳢', '鲿', '鲚', '鳠', '鳄', '鲈', '鲡', '鸟', '凫', '鸠', '凫', '鸤', '凤', '鸣', '鸢', '䴓', '鸩', '鸨', '鸦', '鸰', '鸵', '鸳', '鸲', '鸮', '鸱', '鸪', '鸯', '鸭', '鸸', '鸹', '鸻', '䴕', '鸿', '鸽', '䴔', '鸺', '鸼', '鹀', '鹃', '鹆', '鹁', '鹈', '鹅', '鹄', '鹉', '鹌', '鹏', '鹐', '鹎', '鹊', '鹓', '鹍', '䴖', '鸫', '鹑', '鹒', '鹋', '鹙', '鹕', '鹗', '鹖', '鹛', '鹜', '䴗', '鸧', '莺', '鹟', '鹤', '鹠', '鹡', '鹘', '鹣', '鹚', '鹚', '鹢', '鹞', '鸡', '䴘', '鹝', '鹧', '鹥', '鸥', '鸷', '鹨', '鸶', '鹪', '鹔', '鹩', '鹫', '鹇', '鹬', '鹰', '鹭', '鸴', '䴙', '鹯', '鹱', '鹲', '鸬', '鹴', '鹦', '鹳', '鹂', '鸾', '卤', '咸', '鹾', '盐', '丽', '麦', '麸', '面', '么', '黄', '黉', '点', '党', '黪', '黡', '黩', '黾', '鼋', '鼍', '鼹', '齐', '斋', '赍', '齑', '齿', '龀', '龁', '龂', '龅', '龇', '龃', '龆', '龄', '龈', '龊', '龉', '龋', '腭', '龌', '龙', '厐', '庞', '龚', '龛', '龟', '䜥', '䞌', '䢂'];
    var fan = ['円', '侷', '衞', '悆', '硷', '塩', '閒', '鳯', '卽', '鵰', '唸', '踨', '摺', '嚮', '盪', '鞦', '韆', '遶', '譁', '籤', '弔', '癒', '糰', '嚐', '蒐', '捲', '佈', '陞', '佔', '牴', '翺', '鼈', '癡', '臯', '矽', '堿', '鹼', '稭', '淨', '黴', '齧', '扡', '擡', '歎', '甕', '羨', '蠍', '豔', '湧', '遊', '紮', '洩', '兇', '卹', '氾', '羣', '輙', '睠', '嶽', '鬭', '燄', '蹟', '鍾', '絃', '讚', '巖', '訏', '鍊', '瀰', '迺', '餘', '闢', '鑑', '畫', '樑', '谘', '迴', '勳', '夥', '週', '籲', '拚', '囉', '麼', '於', '䊷', '䋙', '䝼', '䰾', '䲁', '丟', '並', '乾', '亂', '亞', '佇', '馀', '併', '來', '侖', '侶', '俁', '係', '俔', '俠', '倀', '倆', '倈', '倉', '個', '們', '倫', '偉', '側', '偵', '偽', '傑', '傖', '傘', '備', '傭', '傯', '傳', '傴', '債', '傷', '傾', '僂', '僅', '僉', '僑', '僕', '僞', '僥', '僨', '價', '儀', '儂', '億', '儈', '儉', '儐', '儔', '儕', '儘', '償', '優', '儲', '儷', '儺', '儻', '儼', '兌', '兒', '兗', '內', '兩', '冊', '冪', '凈', '凍', '凜', '凱', '別', '刪', '剄', '則', '剋', '剎', '剗', '剛', '剝', '剮', '剴', '創', '劃', '劇', '劉', '劊', '劌', '劍', '劑', '勁', '動', '務', '勛', '勝', '勞', '勢', '勩', '勱', '勵', '勸', '勻', '匭', '匯', '匱', '區', '協', '卻', '厙', '厠', '厭', '厲', '厴', '參', '叄', '叢', '吒', '吳', '吶', '呂', '咼', '員', '唄', '唚', '問', '啓', '啞', '啟', '啢', '喎', '喚', '喪', '喬', '單', '喲', '嗆', '嗇', '嗊', '嗎', '嗚', '嗩', '嗶', '嘆', '嘍', '嘔', '嘖', '嘗', '嘜', '嘩', '嘮', '嘯', '嘰', '嘵', '嘸', '嘽', '噓', '噝', '噠', '噥', '噦', '噯', '噲', '噴', '噸', '噹', '嚀', '嚇', '嚌', '嚕', '嚙', '嚦', '嚨', '嚲', '嚳', '嚴', '嚶', '囀', '囁', '囂', '囅', '囈', '囑', '囪', '圇', '國', '圍', '園', '圓', '圖', '團', '垵', '埡', '埰', '執', '堅', '堊', '堖', '堝', '堯', '報', '場', '塊', '塋', '塏', '塒', '塗', '塢', '塤', '塵', '塹', '墊', '墜', '墮', '墳', '墻', '墾', '壇', '壈', '壋', '壓', '壘', '壙', '壚', '壞', '壟', '壠', '壢', '壩', '壯', '壺', '壼', '壽', '夠', '夢', '夾', '奐', '奧', '奩', '奪', '奬', '奮', '奼', '妝', '姍', '姦', '娛', '婁', '婦', '婭', '媧', '媯', '媼', '媽', '嫗', '嫵', '嫻', '嫿', '嬀', '嬈', '嬋', '嬌', '嬙', '嬡', '嬤', '嬪', '嬰', '嬸', '孌', '孫', '學', '孿', '宮', '寢', '實', '寧', '審', '寫', '寬', '寵', '寶', '將', '專', '尋', '對', '導', '尷', '屆', '屍', '屓', '屜', '屢', '層', '屨', '屬', '岡', '峴', '島', '峽', '崍', '崗', '崢', '崬', '嵐', '嶁', '嶄', '嶇', '嶔', '嶗', '嶠', '嶢', '嶧', '嶮', '嶴', '嶸', '嶺', '嶼', '巋', '巒', '巔', '巰', '帥', '師', '帳', '帶', '幀', '幃', '幗', '幘', '幟', '幣', '幫', '幬', '幹', '幺', '幾', '庫', '廁', '廂', '廄', '廈', '廚', '廝', '廟', '廠', '廡', '廢', '廣', '廩', '廬', '廳', '弒', '弳', '張', '強', '彈', '彌', '彎', '彙', '彞', '彥', '後', '徑', '從', '徠', '復', '徵', '徹', '恆', '恥', '悅', '悞', '悵', '悶', '惡', '惱', '惲', '惻', '愛', '愜', '愨', '愴', '愷', '愾', '慄', '態', '慍', '慘', '慚', '慟', '慣', '慤', '慪', '慫', '慮', '慳', '慶', '憂', '憊', '憐', '憑', '憒', '憚', '憤', '憫', '憮', '憲', '憶', '懇', '應', '懌', '懍', '懟', '懣', '懨', '懲', '懶', '懷', '懸', '懺', '懼', '懾', '戀', '戇', '戔', '戧', '戩', '戰', '戱', '戲', '戶', '拋', '拾', '挩', '挾', '捨', '捫', '掃', '掄', '掗', '掙', '掛', '採', '揀', '揚', '換', '揮', '損', '搖', '搗', '搵', '搶', '摑', '摜', '摟', '摯', '摳', '摶', '摻', '撈', '撏', '撐', '撓', '撝', '撟', '撣', '撥', '撫', '撲', '撳', '撻', '撾', '撿', '擁', '擄', '擇', '擊', '擋', '擓', '擔', '據', '擠', '擬', '擯', '擰', '擱', '擲', '擴', '擷', '擺', '擻', '擼', '擾', '攄', '攆', '攏', '攔', '攖', '攙', '攛', '攜', '攝', '攢', '攣', '攤', '攪', '攬', '敗', '敘', '敵', '數', '斂', '斃', '斕', '斬', '斷', '時', '晉', '晝', '暈', '暉', '暘', '暢', '暫', '曄', '曆', '曇', '曉', '曏', '曖', '曠', '曨', '曬', '書', '會', '朧', '東', '杴', '极', '柵', '桿', '梔', '梘', '條', '梟', '梲', '棄', '棖', '棗', '棟', '棧', '棲', '棶', '椏', '楊', '楓', '楨', '業', '極', '榪', '榮', '榲', '榿', '構', '槍', '槤', '槧', '槨', '槳', '樁', '樂', '樅', '樓', '標', '樞', '樣', '樸', '樹', '樺', '橈', '橋', '機', '橢', '橫', '檁', '檉', '檔', '檜', '檟', '檢', '檣', '檮', '檯', '檳', '檸', '檻', '櫃', '櫓', '櫚', '櫛', '櫝', '櫞', '櫟', '櫥', '櫧', '櫨', '櫪', '櫫', '櫬', '櫱', '櫳', '櫸', '櫻', '欄', '權', '欏', '欒', '欖', '欞', '欽', '歐', '歟', '歡', '歲', '歷', '歸', '歿', '殘', '殞', '殤', '殨', '殫', '殮', '殯', '殲', '殺', '殻', '殼', '毀', '毆', '毿', '氂', '氈', '氌', '氣', '氫', '氬', '氳', '決', '沒', '沖', '況', '洶', '浹', '涇', '涼', '淚', '淥', '淪', '淵', '淶', '淺', '渙', '減', '渦', '測', '渾', '湊', '湞', '湯', '溈', '準', '溝', '溫', '滄', '滅', '滌', '滎', '滬', '滯', '滲', '滷', '滸', '滻', '滾', '滿', '漁', '漚', '漢', '漣', '漬', '漲', '漵', '漸', '漿', '潁', '潑', '潔', '潙', '潛', '潤', '潯', '潰', '潷', '潿', '澀', '澆', '澇', '澗', '澠', '澤', '澦', '澩', '澮', '澱', '濁', '濃', '濕', '濘', '濟', '濤', '濫', '濰', '濱', '濺', '濼', '濾', '瀅', '瀆', '瀉', '瀏', '瀕', '瀘', '瀝', '瀟', '瀠', '瀦', '瀧', '瀨', '瀲', '瀾', '灃', '灄', '灑', '灕', '灘', '灝', '灠', '灣', '灤', '灧', '災', '為', '烏', '烴', '無', '煉', '煒', '煙', '煢', '煥', '煩', '煬', '熅', '熒', '熗', '熱', '熲', '熾', '燁', '燈', '燉', '燒', '燙', '燜', '營', '燦', '燭', '燴', '燼', '燾', '爍', '爐', '爛', '爭', '爲', '爺', '爾', '牆', '牘', '牽', '犖', '犢', '犧', '狀', '狹', '狽', '猙', '猶', '猻', '獁', '獄', '獅', '獎', '獨', '獪', '獫', '獮', '獰', '獲', '獵', '獷', '獸', '獺', '獻', '獼', '玀', '現', '琺', '琿', '瑋', '瑒', '瑣', '瑤', '瑩', '瑪', '瑲', '璉', '璣', '璦', '璫', '環', '璽', '瓊', '瓏', '瓔', '瓚', '甌', '產', '産', '畝', '畢', '異', '畵', '當', '疇', '疊', '痙', '痾', '瘂', '瘋', '瘍', '瘓', '瘞', '瘡', '瘧', '瘮', '瘲', '瘺', '瘻', '療', '癆', '癇', '癉', '癘', '癟', '癢', '癤', '癥', '癧', '癩', '癬', '癭', '癮', '癰', '癱', '癲', '發', '皚', '皰', '皸', '皺', '盜', '盞', '盡', '監', '盤', '盧', '眥', '眾', '睏', '睜', '睞', '瞘', '瞜', '瞞', '瞶', '瞼', '矓', '矚', '矯', '硜', '硤', '硨', '硯', '碩', '碭', '碸', '確', '碼', '磑', '磚', '磣', '磧', '磯', '磽', '礆', '礎', '礙', '礦', '礪', '礫', '礬', '礱', '祿', '禍', '禎', '禕', '禡', '禦', '禪', '禮', '禰', '禱', '禿', '秈', '稅', '稈', '稟', '種', '稱', '穀', '穌', '積', '穎', '穠', '穡', '穢', '穩', '穫', '穭', '窩', '窪', '窮', '窯', '窵', '窶', '窺', '竄', '竅', '竇', '竈', '竊', '竪', '競', '筆', '筍', '筧', '筴', '箋', '箏', '節', '範', '築', '篋', '篔', '篤', '篩', '篳', '簀', '簍', '簞', '簡', '簣', '簫', '簹', '簽', '簾', '籃', '籌', '籙', '籜', '籟', '籠', '籩', '籪', '籬', '籮', '粵', '糝', '糞', '糧', '糲', '糴', '糶', '糹', '糾', '紀', '紂', '約', '紅', '紆', '紇', '紈', '紉', '紋', '納', '紐', '紓', '純', '紕', '紖', '紗', '紘', '紙', '級', '紛', '紜', '紝', '紡', '紬', '細', '紱', '紲', '紳', '紵', '紹', '紺', '紼', '紿', '絀', '終', '組', '絅', '絆', '絎', '結', '絕', '絛', '絝', '絞', '絡', '絢', '給', '絨', '絰', '統', '絲', '絳', '絶', '絹', '綁', '綃', '綆', '綈', '綉', '綌', '綏', '經', '綜', '綞', '綠', '綢', '綣', '綫', '綬', '維', '綯', '綰', '綱', '網', '綳', '綴', '綸', '綹', '綺', '綻', '綽', '綾', '綿', '緄', '緇', '緊', '緋', '緑', '緒', '緓', '緔', '緗', '緘', '緙', '線', '緝', '緞', '締', '緡', '緣', '緦', '編', '緩', '緬', '緯', '緱', '緲', '練', '緶', '緹', '緻', '縈', '縉', '縊', '縋', '縐', '縑', '縕', '縗', '縛', '縝', '縞', '縟', '縣', '縧', '縫', '縭', '縮', '縱', '縲', '縳', '縵', '縶', '縷', '縹', '總', '績', '繃', '繅', '繆', '繒', '織', '繕', '繚', '繞', '繡', '繢', '繩', '繪', '繫', '繭', '繮', '繯', '繰', '繳', '繸', '繹', '繼', '繽', '繾', '纈', '纊', '續', '纍', '纏', '纓', '纖', '纘', '纜', '缽', '罈', '罌', '罰', '罵', '罷', '羅', '羆', '羈', '羋', '羥', '義', '習', '翹', '耬', '耮', '聖', '聞', '聯', '聰', '聲', '聳', '聵', '聶', '職', '聹', '聽', '聾', '肅', '脅', '脈', '脛', '脫', '脹', '腎', '腖', '腡', '腦', '腫', '腳', '腸', '膃', '膚', '膠', '膩', '膽', '膾', '膿', '臉', '臍', '臏', '臘', '臚', '臟', '臠', '臢', '臨', '臺', '與', '興', '舉', '舊', '艙', '艤', '艦', '艫', '艱', '艷', '芻', '苎', '苧', '茲', '荊', '莊', '莖', '莢', '莧', '華', '萇', '萊', '萬', '萵', '葉', '葒', '葤', '葦', '葯', '葷', '蒓', '蒔', '蒞', '蒼', '蓀', '蓋', '蓮', '蓯', '蓴', '蓽', '蔔', '蔞', '蔣', '蔥', '蔦', '蔭', '蕁', '蕆', '蕎', '蕒', '蕓', '蕕', '蕘', '蕢', '蕩', '蕪', '蕭', '蕷', '薀', '薈', '薊', '薌', '薔', '薘', '薟', '薦', '薩', '薴', '薺', '藍', '藎', '藝', '藥', '藪', '藴', '藶', '藹', '藺', '蘄', '蘆', '蘇', '蘊', '蘋', '蘚', '蘞', '蘢', '蘭', '蘺', '蘿', '虆', '處', '虛', '虜', '號', '虧', '虯', '蛺', '蛻', '蜆', '蜡', '蝕', '蝟', '蝦', '蝸', '螄', '螞', '螢', '螻', '螿', '蟄', '蟈', '蟎', '蟣', '蟬', '蟯', '蟲', '蟶', '蟻', '蠅', '蠆', '蠐', '蠑', '蠟', '蠣', '蠨', '蠱', '蠶', '蠻', '衆', '術', '衕', '衚', '衛', '衝', '衹', '袞', '裊', '裏', '補', '裝', '裡', '製', '複', '褌', '褘', '褲', '褳', '褸', '褻', '襇', '襏', '襖', '襝', '襠', '襤', '襪', '襯', '襲', '見', '覎', '規', '覓', '視', '覘', '覡', '覥', '覦', '親', '覬', '覯', '覲', '覷', '覺', '覽', '覿', '觀', '觴', '觶', '觸', '訁', '訂', '訃', '計', '訊', '訌', '討', '訐', '訒', '訓', '訕', '訖', '託', '記', '訛', '訝', '訟', '訢', '訣', '訥', '訩', '訪', '設', '許', '訴', '訶', '診', '註', '詁', '詆', '詎', '詐', '詒', '詔', '評', '詖', '詗', '詘', '詛', '詞', '詠', '詡', '詢', '詣', '試', '詩', '詫', '詬', '詭', '詮', '詰', '話', '該', '詳', '詵', '詼', '詿', '誄', '誅', '誆', '誇', '誌', '認', '誑', '誒', '誕', '誘', '誚', '語', '誠', '誡', '誣', '誤', '誥', '誦', '誨', '說', '説', '誰', '課', '誶', '誹', '誼', '誾', '調', '諂', '諄', '談', '諉', '請', '諍', '諏', '諑', '諒', '論', '諗', '諛', '諜', '諝', '諞', '諢', '諤', '諦', '諧', '諫', '諭', '諮', '諱', '諳', '諶', '諷', '諸', '諺', '諼', '諾', '謀', '謁', '謂', '謄', '謅', '謊', '謎', '謐', '謔', '謖', '謗', '謙', '謚', '講', '謝', '謠', '謡', '謨', '謫', '謬', '謭', '謳', '謹', '謾', '證', '譎', '譏', '譖', '識', '譙', '譚', '譜', '譫', '譯', '議', '譴', '護', '譸', '譽', '譾', '讀', '變', '讎', '讒', '讓', '讕', '讖', '讜', '讞', '豈', '豎', '豐', '豬', '豶', '貓', '貝', '貞', '貟', '負', '財', '貢', '貧', '貨', '販', '貪', '貫', '責', '貯', '貰', '貲', '貳', '貴', '貶', '買', '貸', '貺', '費', '貼', '貽', '貿', '賀', '賁', '賂', '賃', '賄', '賅', '資', '賈', '賊', '賑', '賒', '賓', '賕', '賙', '賚', '賜', '賞', '賠', '賡', '賢', '賣', '賤', '賦', '賧', '質', '賫', '賬', '賭', '賴', '賵', '賺', '賻', '購', '賽', '賾', '贄', '贅', '贇', '贈', '贊', '贋', '贍', '贏', '贐', '贓', '贔', '贖', '贗', '贛', '贜', '赬', '趕', '趙', '趨', '趲', '跡', '踐', '踴', '蹌', '蹕', '蹣', '蹤', '蹺', '躂', '躉', '躊', '躋', '躍', '躑', '躒', '躓', '躕', '躚', '躡', '躥', '躦', '躪', '軀', '車', '軋', '軌', '軍', '軑', '軒', '軔', '軛', '軟', '軤', '軫', '軲', '軸', '軹', '軺', '軻', '軼', '軾', '較', '輅', '輇', '輈', '載', '輊', '輒', '輓', '輔', '輕', '輛', '輜', '輝', '輞', '輟', '輥', '輦', '輩', '輪', '輬', '輯', '輳', '輸', '輻', '輾', '輿', '轀', '轂', '轄', '轅', '轆', '轉', '轍', '轎', '轔', '轟', '轡', '轢', '轤', '辦', '辭', '辮', '辯', '農', '逕', '這', '連', '進', '運', '過', '達', '違', '遙', '遜', '遞', '遠', '適', '遲', '遷', '選', '遺', '遼', '邁', '還', '邇', '邊', '邏', '邐', '郟', '郵', '鄆', '鄉', '鄒', '鄔', '鄖', '鄧', '鄭', '鄰', '鄲', '鄴', '鄶', '鄺', '酇', '酈', '醖', '醜', '醞', '醫', '醬', '醱', '釀', '釁', '釃', '釅', '釋', '釐', '釒', '釓', '釔', '釕', '釗', '釘', '釙', '針', '釣', '釤', '釧', '釩', '釵', '釷', '釹', '釺', '鈀', '鈁', '鈃', '鈄', '鈈', '鈉', '鈍', '鈎', '鈐', '鈑', '鈒', '鈔', '鈕', '鈞', '鈣', '鈥', '鈦', '鈧', '鈮', '鈰', '鈳', '鈴', '鈷', '鈸', '鈹', '鈺', '鈽', '鈾', '鈿', '鉀', '鉅', '鉈', '鉉', '鉋', '鉍', '鉑', '鉕', '鉗', '鉚', '鉛', '鉞', '鉢', '鉤', '鉦', '鉬', '鉭', '鉶', '鉸', '鉺', '鉻', '鉿', '銀', '銃', '銅', '銍', '銑', '銓', '銖', '銘', '銚', '銛', '銜', '銠', '銣', '銥', '銦', '銨', '銩', '銪', '銫', '銬', '銱', '銳', '銷', '銹', '銻', '銼', '鋁', '鋃', '鋅', '鋇', '鋌', '鋏', '鋒', '鋙', '鋝', '鋟', '鋣', '鋤', '鋥', '鋦', '鋨', '鋩', '鋪', '鋭', '鋮', '鋯', '鋰', '鋱', '鋶', '鋸', '鋼', '錁', '錄', '錆', '錇', '錈', '錏', '錐', '錒', '錕', '錘', '錙', '錚', '錛', '錟', '錠', '錡', '錢', '錦', '錨', '錩', '錫', '錮', '錯', '録', '錳', '錶', '錸', '鍀', '鍁', '鍃', '鍆', '鍇', '鍈', '鍋', '鍍', '鍔', '鍘', '鍚', '鍛', '鍠', '鍤', '鍥', '鍩', '鍬', '鍰', '鍵', '鍶', '鍺', '鎂', '鎄', '鎇', '鎊', '鎔', '鎖', '鎘', '鎛', '鎡', '鎢', '鎣', '鎦', '鎧', '鎩', '鎪', '鎬', '鎮', '鎰', '鎲', '鎳', '鎵', '鎸', '鎿', '鏃', '鏇', '鏈', '鏌', '鏍', '鏐', '鏑', '鏗', '鏘', '鏜', '鏝', '鏞', '鏟', '鏡', '鏢', '鏤', '鏨', '鏰', '鏵', '鏷', '鏹', '鏽', '鐃', '鐋', '鐐', '鐒', '鐓', '鐔', '鐘', '鐙', '鐝', '鐠', '鐦', '鐧', '鐨', '鐫', '鐮', '鐲', '鐳', '鐵', '鐶', '鐸', '鐺', '鐿', '鑄', '鑊', '鑌', '鑒', '鑔', '鑕', '鑞', '鑠', '鑣', '鑥', '鑭', '鑰', '鑱', '鑲', '鑷', '鑹', '鑼', '鑽', '鑾', '鑿', '钁', '長', '門', '閂', '閃', '閆', '閈', '閉', '開', '閌', '閎', '閏', '閑', '間', '閔', '閘', '閡', '閣', '閥', '閨', '閩', '閫', '閬', '閭', '閱', '閲', '閶', '閹', '閻', '閼', '閽', '閾', '閿', '闃', '闆', '闈', '闊', '闋', '闌', '闍', '闐', '闒', '闓', '闔', '闕', '闖', '關', '闞', '闠', '闡', '闤', '闥', '阪', '陘', '陝', '陣', '陰', '陳', '陸', '陽', '隉', '隊', '階', '隕', '際', '隨', '險', '隱', '隴', '隸', '隻', '雋', '雖', '雙', '雛', '雜', '雞', '離', '難', '雲', '電', '霢', '霧', '霽', '靂', '靄', '靈', '靚', '靜', '靦', '靨', '鞀', '鞏', '鞝', '鞽', '韁', '韃', '韉', '韋', '韌', '韍', '韓', '韙', '韜', '韞', '韻', '響', '頁', '頂', '頃', '項', '順', '頇', '須', '頊', '頌', '頎', '頏', '預', '頑', '頒', '頓', '頗', '領', '頜', '頡', '頤', '頦', '頭', '頮', '頰', '頲', '頴', '頷', '頸', '頹', '頻', '頽', '顆', '題', '額', '顎', '顏', '顒', '顓', '顔', '願', '顙', '顛', '類', '顢', '顥', '顧', '顫', '顬', '顯', '顰', '顱', '顳', '顴', '風', '颭', '颮', '颯', '颱', '颳', '颶', '颸', '颺', '颻', '颼', '飀', '飄', '飆', '飈', '飛', '飠', '飢', '飣', '飥', '飩', '飪', '飫', '飭', '飯', '飲', '飴', '飼', '飽', '飾', '飿', '餃', '餄', '餅', '餉', '養', '餌', '餎', '餏', '餑', '餒', '餓', '餕', '餖', '餚', '餛', '餜', '餞', '餡', '館', '餱', '餳', '餶', '餷', '餺', '餼', '餾', '餿', '饁', '饃', '饅', '饈', '饉', '饊', '饋', '饌', '饑', '饒', '饗', '饜', '饞', '饢', '馬', '馭', '馮', '馱', '馳', '馴', '馹', '駁', '駐', '駑', '駒', '駔', '駕', '駘', '駙', '駛', '駝', '駟', '駡', '駢', '駭', '駰', '駱', '駸', '駿', '騁', '騂', '騅', '騌', '騍', '騎', '騏', '騖', '騙', '騤', '騫', '騭', '騮', '騰', '騶', '騷', '騸', '騾', '驀', '驁', '驂', '驃', '驄', '驅', '驊', '驌', '驍', '驏', '驕', '驗', '驚', '驛', '驟', '驢', '驤', '驥', '驦', '驪', '驫', '骯', '髏', '髒', '體', '髕', '髖', '髮', '鬆', '鬍', '鬚', '鬢', '鬥', '鬧', '鬩', '鬮', '鬱', '魎', '魘', '魚', '魛', '魢', '魨', '魯', '魴', '魷', '魺', '鮁', '鮃', '鮊', '鮋', '鮍', '鮎', '鮐', '鮑', '鮒', '鮓', '鮚', '鮜', '鮝', '鮞', '鮦', '鮪', '鮫', '鮭', '鮮', '鮳', '鮶', '鮺', '鯀', '鯁', '鯇', '鯉', '鯊', '鯒', '鯔', '鯕', '鯖', '鯗', '鯛', '鯝', '鯡', '鯢', '鯤', '鯧', '鯨', '鯪', '鯫', '鯴', '鯷', '鯽', '鯿', '鰁', '鰂', '鰃', '鰈', '鰉', '鰍', '鰏', '鰐', '鰒', '鰓', '鰜', '鰟', '鰠', '鰣', '鰥', '鰨', '鰩', '鰭', '鰮', '鰱', '鰲', '鰳', '鰵', '鰷', '鰹', '鰺', '鰻', '鰼', '鰾', '鱂', '鱅', '鱈', '鱉', '鱒', '鱔', '鱖', '鱗', '鱘', '鱝', '鱟', '鱠', '鱣', '鱤', '鱧', '鱨', '鱭', '鱯', '鱷', '鱸', '鱺', '鳥', '鳧', '鳩', '鳬', '鳲', '鳳', '鳴', '鳶', '鳾', '鴆', '鴇', '鴉', '鴒', '鴕', '鴛', '鴝', '鴞', '鴟', '鴣', '鴦', '鴨', '鴯', '鴰', '鴴', '鴷', '鴻', '鴿', '鵁', '鵂', '鵃', '鵐', '鵑', '鵒', '鵓', '鵜', '鵝', '鵠', '鵡', '鵪', '鵬', '鵮', '鵯', '鵲', '鵷', '鵾', '鶄', '鶇', '鶉', '鶊', '鶓', '鶖', '鶘', '鶚', '鶡', '鶥', '鶩', '鶪', '鶬', '鶯', '鶲', '鶴', '鶹', '鶺', '鶻', '鶼', '鶿', '鷀', '鷁', '鷂', '鷄', '鷈', '鷊', '鷓', '鷖', '鷗', '鷙', '鷚', '鷥', '鷦', '鷫', '鷯', '鷲', '鷳', '鷸', '鷹', '鷺', '鷽', '鷿', '鸇', '鸌', '鸏', '鸕', '鸘', '鸚', '鸛', '鸝', '鸞', '鹵', '鹹', '鹺', '鹽', '麗', '麥', '麩', '麵', '麽', '黃', '黌', '點', '黨', '黲', '黶', '黷', '黽', '黿', '鼉', '鼴', '齊', '齋', '齎', '齏', '齒', '齔', '齕', '齗', '齙', '齜', '齟', '齠', '齡', '齦', '齪', '齬', '齲', '齶', '齷', '龍', '龎', '龐', '龔', '龕', '龜', '𧩙', '𧵳', '𨋢'];

    var hWords = {
        '暱稱': '昵称',
        '維他命': '维生素',
        '螢幕': '屏幕',
        '太空穿梭機': '航天飞机',
        '計程車': '出租车',
        '計數機': '计算器',
        '鎖匙': '钥匙',
        '身分證': '身份证',
        '士多啤梨': '草莓',
        '咪高峰': '麦克风',
        '雪櫃': '冰箱',
        '滑鼠': '鼠标',
        '伺服器': '服务器',
        '應用程式': '应用程序',
        '駭客': '黑客',
        '硬碟': '硬盘',
        '光碟': '光盘',
        '搜尋': '搜索',
        '網路': '网络',
        '位元組': '字节',
        '印表機': '打印机',
        '捷運': '轻轨',
        '北韓': '朝鲜',
        '網咖': '网吧',
        '行動電話': '手机',
        '行動裝置': '移动设备',
        '透過': '通过',
        '西元': '公元',
        '幼稚園': '幼儿园',
        '易開罐': '易拉罐',
        '鳳梨': '菠萝',
        '奇異果': '猕猴桃',
        '紐西蘭': '新西兰',
        '柳丁': '橙子',
        '專門店': '专卖店',
        '智慧財產權': '知识产权',
        '智慧財產': '知识产权',
        '寮國': '老挝',
        '昇降': '升降',
        '瞭解': '了解',
        '加值': '增值',
        '灣總統': '湾省长',
        '甚麼': '什么',
        '計畫': '计划',
        '回覆': '回复',
        '姊姊': '姐姐'
    };

    document.title = w(document.title);
    f(document.body);
    var obCfg = {childList: true, subtree: true};
    var subscr = function (mutations) {
        ob.disconnect();
        for (var i in mutations) {
            f(mutations[i].target);
        }
        ob.observe(document.body, obCfg);
    }
    var ob = new MutationObserver(subscr);
    ob.observe(document.body, obCfg);
    function f(el) {
        var n, walker = document.createTreeWalker(el, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                return (['SCRIPT', 'STYLE'].indexOf(node.tagName) != -1) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        }, false);
        while (n = walker.nextNode()) {
            switch (n.nodeType) {
                case Node.ELEMENT_NODE:
                    if (n.tagName == 'INPUT') {
                        var t = n.type.toLowerCase(), a;
                        switch (t) {
                            case 'button':
                            case 'submit':
                            case 'reset':
                                a = ['value'];
                                break;
                            case 'text':
                            case 'search':
                                a = ['onfocus', 'onfocusout', 'onblur', 'placeholder', 'value'];
                                break;
                            case 'password':
                                a = ['placeholder'];
                                break;
                            default:
                                a = [];
                        }
                        for (var i = 0; i < a.length; i++) {
                            var v = n.getAttribute(a[i]);
                            if (v && v != '') {
                                n.setAttribute(a[i], w(v));
                            }
                        }
                    }
                    break;
                case Node.TEXT_NODE:
                    n.data = w(n.data);
                    break;
            }
        }
        walker = null
    }
    function w(t) {
        for (var k in hWords) {
            t = t.split(k).join(hWords[k]);
        }
        var r = '';
        for (var i = 0; i < t.length; i++) {
            var c = t.charAt(i);
            if (/[\u4e00-\u9fa5]/.test(c)) {
                var p = fan.indexOf(c);
                if (p != -1) {
                    c = jian[p];
                }
            }
            r += c;
        }
        return r;
    }
})();
