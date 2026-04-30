"use client";
import { useState, useRef, useEffect } from "react";

const SUPPORT_LINKS = {
  liveChat: "#",
  whatsapp: "https://wa.me/820000000000",
  wechat: "#",
  kakao: "#",
};

const CHANNEL_LINKS = {
  whatsappChannel: "#",
  wechat: "#",
  kakaoChannel: "#",
};

const FOOTER_INFO = {
  brand: "KSIM",
  company: "Starphones / N2L",
  email: "starphones@naver.com",
  supportHours: "Mon-Fri 10:00-18:00 (KST)",
};

const PWA_CONFIG = { enabled: false };

const mustHaveApps = [
  {
    name: "Naver Map / Kakao Map",
    description: { en:"Navigation and directions in Korea", zh:"韩国地图和路线导航", ko:"한국 길찾기 / 지도 앱" },
    icon: "/images/apps/map.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "Papago",
    description: { en:"Translation app", zh:"翻译应用", ko:"번역 앱" },
    icon: "/images/apps/papago.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "Kakao T",
    description: { en:"Taxi booking app", zh:"出租车叫车应用", ko:"택시 호출 앱" },
    icon: "/images/apps/kakao-t.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "k.ride",
    description: { en:"Foreigner-friendly taxi app with overseas card payment", zh:"面向外国用户的出租车应用，支持海外银行卡支付", ko:"외국인 친화 택시 앱 / 해외카드 결제 가능" },
    icon: "/images/apps/k-ride.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "KakaoTalk",
    description: { en:"Messaging app used in Korea", zh:"韩国常用聊天应用", ko:"한국에서 많이 쓰는 메신저 앱" },
    icon: "/images/apps/kakaotalk.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
  {
    name: "Subway Korea",
    description: { en:"Subway route and transfer guide", zh:"地铁路线和换乘查询应用", ko:"지하철 노선 / 환승 안내 앱" },
    icon: "/images/apps/subway-korea.png",
    appStoreUrl: "#",
    googlePlayUrl: "#",
  },
];

const travelDataPlans = [
  { refCode:"USIM7D10G",  planName:"10GB / 7 Days",       usageText:"Maps / Chat / Web",                 duration:"7 Days",  data:"10GB",      voiceSms:"Data Only", price:"USD 14", note:"Turn on data roaming before use.", recommended:false },
  { refCode:"USIM15D10G", planName:"10GB / 15 Days",      usageText:"Maps / Chat / Web",                 duration:"15 Days", data:"10GB",      voiceSms:"Data Only", price:"USD 17", note:"Turn on data roaming before use.", recommended:false },
  { refCode:"USIM15D20G", planName:"20GB / 15 Days",      usageText:"SNS / Translation / Light Video",   duration:"15 Days", data:"20GB",      voiceSms:"Data Only", price:"USD 20", note:"Turn on data roaming before use.", recommended:true  },
  { refCode:"USIM30D20G", planName:"20GB / 30 Days",      usageText:"SNS / Maps / Translation",          duration:"30 Days", data:"20GB",      voiceSms:"Data Only", price:"USD 23", note:"Turn on data roaming before use.", recommended:false },
  { refCode:"USIM30D50G", planName:"50GB / 30 Days",      usageText:"YouTube / Instagram / Video Calls", duration:"30 Days", data:"50GB",      voiceSms:"Data Only", price:"USD 34", note:"Turn on data roaming before use.", recommended:true  },
  { refCode:"USIM7DUNL",  planName:"Unlimited / 7 Days",  usageText:"Worry-free data use",               duration:"7 Days",  data:"Unlimited", voiceSms:"Data Only", price:"TBD",    note:"Turn on data roaming before use.", recommended:true  },
  { refCode:"USIM15DUNL", planName:"Unlimited / 15 Days", usageText:"Worry-free data use",               duration:"15 Days", data:"Unlimited", voiceSms:"Data Only", price:"TBD",    note:"Turn on data roaming before use.", recommended:true  },
  { refCode:"USIM30DUNL", planName:"Unlimited / 30 Days", usageText:"Worry-free data use",               duration:"30 Days", data:"Unlimited", voiceSms:"Data Only", price:"TBD",    note:"Turn on data roaming before use.", recommended:true  },
];

const postpaidPlans = [
  { carrier:"LG U+", planName:"Foreigner Student Special Plan", targetVisa:"D-2 / D-4", monthlyPrice:"KRW 29,750", data:"160GB + 5Mbps", voice:"Unlimited calls and texts", contract:"12-month contract", promotion:"Special monthly discount available", requiredDocuments:"Passport, ARC, Korean bank account, school document", caution:"Eligibility depends on visa type, ARC, bank account, and carrier approval.", buttonText:"Check Eligibility" },
  { carrier:"SKT",   planName:"Foreigner Worker Plan",          targetVisa:"E-7 / E-9", monthlyPrice:"KRW 29,750", data:"160GB + 5Mbps", voice:"Unlimited calls and texts", contract:"12-month contract", promotion:"Available for eligible foreign workers",  requiredDocuments:"Passport, ARC, Korean bank account, employment document",  caution:"Final approval depends on carrier verification.", buttonText:"Check Eligibility" },
];

const SEC = {
  HOME:"home", START:"start", IPHONE:"iphone", ANDROID:"android",
  NOT_WORKING:"notWorking", TRAVEL:"travel", CONTACT:"contact",
  CHANNEL:"channel", POSTPAID:"postpaid",
};

const C = {
  en: {
    langLabel:"English",
    hero:{ sub:"Having trouble with your SIM?", desc:"Please choose your language and follow the setup guide." },
    menu:{ start:"Start Guide", iphone:"iPhone Setting", android:"Android Setting", notWorking:"SIM Not Working", travel:"Travel Data SIM Plans", contact:"Contact Support", channel:"Airport Arrival Guide", postpaid:"Postpaid Plans" },
    startGuide:{ title:"Start Guide", steps:["Insert the SIM card into your phone.","Restart your phone.","Turn on Mobile Data.","Turn on Data Roaming.","Set Network Selection to Automatic.","Wait 1-3 minutes for the network to connect."] },
    iphone:{ title:"iPhone Setting", steps:["Go to Settings > Cellular.","Turn on Cellular Data.","Go to Cellular Data Options.","Turn on Data Roaming.","Go to Network Selection.","Turn on Automatic.","Restart your iPhone."] },
    android:{ title:"Android Setting", steps:["Go to Settings > Connections.","Tap Mobile Networks.","Turn on Mobile Data.","Turn on Data Roaming.","Set Network Mode to Auto.","Set Network Operators to Select Automatically.","Restart your phone."] },
    notWorking:{
      title:"SIM Not Working",
      issues:{
        notDetected:{ label:"SIM Not Detected", steps:["Check if the SIM card is inserted correctly.","Try another SIM slot if available.","Restart your phone.","Test the SIM card on another phone if possible.","If it still does not work, contact support."] },
        noSignal:{ label:"No Signal", steps:["Turn Airplane Mode on and off.","Set Network Selection to Automatic.","Restart your phone.","Move to another location and try again.","If there is still no signal, contact support."] },
        dataNotWorking:{ label:"Data Not Working", steps:["Turn on Mobile Data.","Turn on Data Roaming.","Check APN settings if required.","Restart your phone.","If data still does not work, contact support."] },
        esim:{ label:"eSIM Not Activated", steps:["Make sure your phone supports eSIM.","Check if EID appears by dialing *#06#.","Connect to Wi-Fi.","Scan the QR code again.","Restart your phone after installation.","If activation fails, contact support."] },
        refund:{ label:"Refund / Exchange", steps:["Please contact support with your SIM package photo.","Send your purchase location and purchase date.","Refund or exchange may be limited if the issue is caused by an unsupported phone or locked device.","Used SIM products may not be refundable."] },
      }
    },
    travel:{ title:"Travel Data SIM Plans", intro:"Please check your SIM plan by REF number.", caution:"Actual price, data policy, and availability may vary depending on sales channel and promotion.", labels:{ ref:"REF", duration:"Duration", data:"Data", voiceSms:"Voice/SMS", price:"Price", note:"Note", recommended:"Recommended", unlimited:"Unlimited", contactBtn:"Contact Support" } },
    contact:{
      title:"Contact Support",
      prepare:"Before contacting support, please prepare your phone model, SIM number, purchase location, and screenshot.",
      channels:{ whatsapp:"WhatsApp" },
      form:{ title:"Submit a Support Request", name:"Name", phoneModel:"Phone Model", simNumber:"SIM Number / ICCID", purchaseLoc:"Purchase Location", issueType:"Issue Type", issueOptions:["SIM Not Detected","No Signal","Data Not Working","eSIM Not Activated","Refund / Exchange","Other"], screenshot:"Upload Screenshot", message:"Message", submit:"Submit Support Request", success:"Thank you. Our support team will contact you soon." },
    },
    channel:{
      title:"Airport Arrival Guide",
      intro:"Essential tips after arriving in Korea.",
      channelCtaTitle:"Follow KSIM Channel",
      channelCtaDesc:"Follow our channel for SIM setup help, airport arrival tips, special offers, and long-term stay updates.",
      buttons:{ whatsapp:"Follow WhatsApp Channel", wechat:"Add WeChat", kakao:"Add KakaoTalk Channel" },
      disclaimer:"By following our channel, you may receive KSIM updates and promotional information. You can unfollow anytime.",
      footerCta:"Stay connected with KSIM.",
      footerCtaSub:"Follow our channel for support updates and special offers.",
      arrivalBtn:"View Airport Arrival Guide",
      arrival:{ title:"Airport Arrival Guide", cards:[
        { icon:"📶", title:"SIM Setup First", body:"After purchasing KSIM at the airport, insert the SIM card and restart your phone.\nTurn on Mobile Data and Data Roaming.\nSet Network Selection to Automatic and wait 1-3 minutes." },
        { icon:"📡", title:"Airport Wi-Fi", body:"If your SIM is not connected yet, use airport Wi-Fi first.\nThen open KSIM Support and follow the setup guide or contact support." },
        { icon:"✅", title:"Before Leaving the Airport", list:["Check your SIM connection","Connect to airport Wi-Fi if needed","Download essential apps","Buy or top up T-money","Save your hotel address","Save KSIM support contact"] },
        { icon:"🚇", title:"Transportation / T-money", body:"From the airport, you can use AREX, airport bus, subway, or taxi.",
          tmoney:{
            t1:{ label:"Terminal 1 (T1)", items:["CU near Exit 5, Exit 11, or Exit 13 on the 1st floor Arrivals","B1 Transportation Center near AREX entrance"] },
            t2:{ label:"Terminal 2 (T2)", items:["GS25 near Arrival Hall A on the 1st floor","CU near Exit 10 on the 1st floor","CU at the center of B1 Transportation Center"] },
            topup:{ label:"How to top up", items:["Convenience stores","Subway station ticket machines","Airport Railroad / AREX area"] },
            use:{ label:"Where to use", items:["Subway","Bus","Convenience stores","Some taxis"] },
          },
          tip:"Availability may vary by store. If one store does not have a T-money card, please check another convenience store or the AREX area." },
        { icon:"🚕", title:"Taxi App / Payment", body:"", taxiApps:[{ name:"Kakao T", desc:"Most widely used taxi app in Korea.\nYou may be able to use Kakao T with an international phone number.\nIf you do not have a Korean card, choose Pay to Driver.\nYou can usually pay by cash, credit card, or T-money." },{ name:"k.ride", desc:"Foreigner-friendly taxi app by Kakao Mobility.\nSupports Google/Apple login and overseas card payment.\nGood for travelers who want easier in-app payment." },{ name:"Uber", desc:"Uber is also available in Korea for requesting local taxis.\nUseful if you already have an Uber account.\nHowever, Kakao T and k.ride are usually more commonly recommended." }], tip:"Download taxi apps while connected to airport Wi-Fi." },
        { icon:"📱", title:"Must-have Apps", body:"", useMustHaveApps:true, tip:"Download apps while using airport Wi-Fi." },
        { icon:"💳", title:"Payment Tips", body:"Most stores in Korea accept credit/debit cards.\nHowever, some small shops, markets, or transportation top-up machines may require cash.\nKeep a small amount of KRW cash with you." },
        { icon:"🔌", title:"Power Plug Guide", body:"Korea uses Type C / Type F plugs.\nVoltage is 220V.\nIf your plug is different, buy an adapter at an airport shop or convenience store." },
        { icon:"💡", title:"Data Saving Tips", body:"To save mobile data:", list:["Use Wi-Fi for video","Turn off auto-play videos","Lower YouTube video quality","Download maps in advance","Turn off background data for unused apps"] },
        { icon:"🚨", title:"Emergency Numbers", emergency:[{ label:"Police", number:"112" },{ label:"Fire / Ambulance", number:"119" },{ label:"Tourist Information", number:"1330" },{ label:"KSIM Support", number:"Contact us from this page" }] },
        { icon:"📋", title:"Long-term Phone Number Consultation", body:"Staying in Korea long-term?\nIf you have an ARC, you may be eligible for a postpaid mobile plan.\nA Korean phone number registered with ARC may be useful for banking, verification, delivery apps, and online shopping." },
      ]},
    },
    postpaid:{ title:"Postpaid Plans for Long-Term Foreigners in Korea", intro:"Are you staying in Korea for a long time?\nWe also provide postpaid mobile plan consultation for foreign students, workers, and long-term residents in Korea.", eligible:{ title:"Who Can Apply", list:["D-2 / D-4 Student Visa","E-7 / E-9 Worker Visa","Foreign residents with ARC"] }, benefits:{ title:"Key Benefits", list:["Korean mobile number","Monthly billing","Stable data service","Online verification support","Plans for students and workers"] }, docs:{ title:"Required Documents", list:["Passport","Alien Registration Card","Korean bank account","Visa or school/work documents"] }, caution:"Available plans and approval may vary depending on visa type, ARC, Korean bank account, and carrier verification.", cta:"Check Postpaid Plan", planCard:{ carrier:"Carrier", visa:"Target Visa", price:"Monthly Price", data:"Data", voice:"Voice", contract:"Contract", promo:"Promotion", docs:"Required Docs", caution:"Note" } },
    pwa:{ title:"Add KSIM Support to your home screen.", desc:"Quickly access SIM setup, troubleshooting, airport arrival guide, and support contact.", button:"Add to Home Screen", dismiss:"Later" },
    footer:{ company:"Company", email:"Email", hours:"Support Hours" },
  },
  zh: {
    langLabel:"中文",
    hero:{ sub:"您的SIM卡遇到问题了吗？", desc:"请选择您的语言，然后按照设置指南操作。" },
    menu:{ start:"使用指南", iphone:"iPhone设置", android:"Android设置", notWorking:"SIM卡无法使用", travel:"旅行数据SIM套餐", contact:"联系客服", channel:"机场入境指南", postpaid:"后付费套餐" },
    startGuide:{ title:"使用指南", steps:["将SIM卡插入手机。","重启手机。","打开移动数据。","打开数据漫游。","将网络选择设置为自动。","等待1-3分钟连接网络。"] },
    iphone:{ title:"iPhone设置", steps:["打开设置 > 蜂窝网络。","打开蜂窝数据。","进入蜂窝数据选项。","打开数据漫游。","进入网络选择。","打开自动。","重启iPhone。"] },
    android:{ title:"Android设置", steps:["打开设置 > 连接。","点击移动网络。","打开移动数据。","打开数据漫游。","将网络模式设置为自动。","将网络运营商设置为自动选择。","重启手机。"] },
    notWorking:{
      title:"SIM卡无法使用",
      issues:{
        notDetected:{ label:"SIM卡未被检测", steps:["请确认SIM卡是否正确插入。","如果有其他SIM卡槽，请尝试更换卡槽。","重启手机。","如有可能，请在其他手机上测试SIM卡。","如果仍无法使用，请联系客服。"] },
        noSignal:{ label:"无信号", steps:["开启飞行模式后再关闭。","将网络选择设置为自动。","重启手机。","移动到其他位置后再试。","如果仍然没有信号，请联系客服。"] },
        dataNotWorking:{ label:"数据无法使用", steps:["打开移动数据。","打开数据漫游。","如有需要，请检查APN设置。","重启手机。","如果仍无法使用数据，请联系客服。"] },
        esim:{ label:"eSIM未激活", steps:["请确认您的手机支持eSIM。","拨打 *#06#，确认是否显示EID。","连接Wi-Fi。","再次扫描二维码。","安装后重启手机。","如果激活失败，请联系客服。"] },
        refund:{ label:"退款 / 换货", steps:["请联系客服并发送SIM卡包装照片。","请发送购买地点和购买日期。","如果问题是由不支持的手机或锁定手机引起，可能无法退款或更换。","已使用的SIM产品可能无法退款。"] },
      }
    },
    travel:{ title:"旅行数据SIM套餐", intro:"请通过REF编号确认您的SIM套餐。", caution:"实际价格、流量政策和可购买情况可能会根据销售渠道和促销活动而有所不同。", labels:{ ref:"REF", duration:"使用期限", data:"数据流量", voiceSms:"语音/短信", price:"价格", note:"注意事项", recommended:"推荐", unlimited:"无限流量", contactBtn:"联系客服" } },
    contact:{
      title:"联系客服",
      prepare:"联系客服前，请准备手机型号、SIM卡号码、购买地点和手机截图。",
      channels:{ whatsapp:"WhatsApp" },
      form:{ title:"提交支持请求", name:"姓名", phoneModel:"手机型号", simNumber:"SIM卡号码 / ICCID", purchaseLoc:"购买地点", issueType:"问题类型", issueOptions:["SIM卡未被检测","无信号","数据无法使用","eSIM未激活","退款 / 换货","其他"], screenshot:"上传截图", message:"留言", submit:"提交支持请求", success:"感谢您的联系。我们的支持团队将尽快与您联系。" },
    },
    channel:{
      title:"机场入境指南",
      intro:"抵达韩国后马上需要的信息。",
      channelCtaTitle:"关注 KSIM 频道",
      channelCtaDesc:"关注频道，获取SIM卡设置帮助、机场入境实用信息、特别优惠和长期居住套餐信息。",
      buttons:{ whatsapp:"关注 WhatsApp 频道", wechat:"添加微信", kakao:"添加 KakaoTalk 频道" },
      disclaimer:"关注频道后，您可能会收到KSIM的通知和促销信息。您可以随时取消关注。",
      footerCta:"与 KSIM 保持联系。",
      footerCtaSub:"关注我们的频道，获取使用帮助和特别优惠。",
      arrivalBtn:"查看机场入境指南",
      arrival:{ title:"机场入境指南", cards:[
        { icon:"📶", title:"首先设置SIM卡", body:"在机场购买KSIM后，请插入SIM卡并重启手机。\n打开移动数据和数据漫游。\n将网络选择设置为自动，并等待1-3分钟。" },
        { icon:"📡", title:"机场Wi-Fi", body:"如果SIM卡尚未连接，请先使用机场Wi-Fi。\n然后打开KSIM Support，查看设置指南或联系客服。" },
        { icon:"✅", title:"离开机场前确认", list:["确认SIM卡是否连接","如有需要，请连接机场Wi-Fi","下载常用应用","购买或充值T-money交通卡","保存酒店地址","保存KSIM客服联系方式"] },
        { icon:"🚇", title:"交通 / T-money", body:"从机场可以乘坐机场铁路、机场巴士、地铁或出租车。",
          tmoney:{
            t1:{ label:"第1航站楼 (T1)", items:["1楼到达层 Exit 5、Exit 11 或 Exit 13 附近的 CU 便利店","B1 交通中心 / 机场铁路 AREX 入口附近"] },
            t2:{ label:"第2航站楼 (T2)", items:["1楼 Arrival Hall A 附近的 GS25","1楼 Exit 10 附近的 CU","B1 交通中心中央的 CU"] },
            topup:{ label:"充值地点", items:["便利店","地铁站充值机","机场铁路 AREX 附近"] },
            use:{ label:"使用地点", items:["地铁","巴士","便利店","部分出租车"] },
          },
          tip:"各便利店库存可能不同。如果一个店没有T-money卡，请前往其他便利店或机场铁路 AREX 附近确认。" },
        { icon:"🚕", title:"出租车应用 / 支付", body:"", taxiApps:[{ name:"Kakao T", desc:"韩国最常用的出租车应用。\n您可能可以使用海外手机号注册 Kakao T。\n如果没有韩国银行卡，请选择向司机付款。\n通常可以使用现金、信用卡或 T-money 支付。" },{ name:"k.ride", desc:"Kakao Mobility 面向外国用户推出的出租车应用。\n支持 Google/Apple 登录和海外银行卡支付。\n适合希望使用海外银行卡进行应用内支付的旅客。" },{ name:"Uber", desc:"在韩国也可以使用 Uber 应用叫本地出租车。\n如果您已经有 Uber 账号，使用起来会比较方便。\n但在韩国，通常更推荐 Kakao T 或 k.ride。" }], tip:"建议在机场 Wi-Fi 环境下下载出租车应用。" },
        { icon:"📱", title:"必备应用", body:"", useMustHaveApps:true, tip:"建议在机场Wi-Fi环境下下载应用。" },
        { icon:"💳", title:"支付提示", body:"韩国大多数商店支持信用卡/借记卡支付。\n但部分小店、市场或交通卡充值机可能需要现金。\n建议准备少量韩币现金。" },
        { icon:"🔌", title:"插头和电压指南", body:"韩国使用 C型 / F型 插头。\n电压为220V。\n如果插头不同，请在机场商店或便利店购买转换插头。" },
        { icon:"💡", title:"流量节省技巧", body:"节省流量的方法：", list:["视频观看时尽量使用Wi-Fi","关闭视频自动播放","降低YouTube画质","提前下载地图","关闭不常用应用的后台数据"] },
        { icon:"🚨", title:"紧急联系电话", emergency:[{ label:"报警", number:"112" },{ label:"火灾 / 急救", number:"119" },{ label:"旅游咨询", number:"1330" },{ label:"KSIM客服", number:"可通过本页面联系" }] },
        { icon:"📋", title:"长期手机号咨询", body:"计划在韩国长期居住吗？\n如果您持有外国人登录证，可能可以申请后付费手机套餐。\n使用外国人登录证登记的韩国手机号可用于银行、身份认证、外卖应用和网购等服务。" },
      ]},
    },
    postpaid:{ title:"韩国长期居住外国人后付费套餐", intro:"您是否计划在韩国长期居住？\n我们也提供面向外国留学生、外国劳动者和长期居住外国人的后付费手机套餐咨询。", eligible:{ title:"申请对象", list:["D-2 / D-4 留学签证","E-7 / E-9 工作签证","持有外国人登录证的外国人"] }, benefits:{ title:"主要优势", list:["韩国手机号码","每月后付费","稳定的数据服务","可用于部分本人认证","提供适合学生和劳动者的套餐"] }, docs:{ title:"所需材料", list:["护照","外国人登录证","韩国银行账户","签证或学校/工作相关文件"] }, caution:"可办理的套餐和审核结果可能会根据签证类型、外国人登录证、韩国银行账户和运营商审核结果而不同。", cta:"咨询后付费套餐", planCard:{ carrier:"运营商", visa:"适用签证", price:"月费", data:"数据", voice:"语音", contract:"合约", promo:"优惠", docs:"所需材料", caution:"注意" } },
    pwa:{ title:"将 KSIM Support 添加到主屏幕。", desc:"快速查看SIM卡设置、问题解决、机场入境指南和联系客服。", button:"添加到主屏幕", dismiss:"稍后" },
    footer:{ company:"公司", email:"邮箱", hours:"服务时间" },
  },
  ko: {
    langLabel:"한국어",
    hero:{ sub:"유심 사용에 문제가 있으신가요?", desc:"언어를 선택하고 설정 가이드를 따라주세요." },
    menu:{ start:"시작 가이드", iphone:"아이폰 설정", android:"안드로이드 설정", notWorking:"유심 불량/오류", travel:"여행자 데이터 유심 요금제", contact:"고객센터 연결", channel:"공항 도착 가이드", postpaid:"후불제 요금제" },
    startGuide:{ title:"시작 가이드", steps:["유심을 휴대폰에 넣어주세요.","휴대폰을 재부팅해주세요.","모바일 데이터를 켜주세요.","데이터 로밍을 켜주세요.","네트워크 선택을 자동으로 설정해주세요.","1~3분 정도 기다려주세요."] },
    iphone:{ title:"아이폰 설정", steps:["설정 > 셀룰러로 이동하세요.","셀룰러 데이터를 켜주세요.","셀룰러 데이터 옵션으로 이동하세요.","데이터 로밍을 켜주세요.","네트워크 선택으로 이동하세요.","자동을 켜주세요.","아이폰을 재부팅해주세요."] },
    android:{ title:"안드로이드 설정", steps:["설정 > 연결로 이동하세요.","모바일 네트워크를 선택하세요.","모바일 데이터를 켜주세요.","데이터 로밍을 켜주세요.","네트워크 모드를 자동으로 설정해주세요.","통신사 선택을 자동으로 설정해주세요.","휴대폰을 재부팅해주세요."] },
    notWorking:{
      title:"유심 불량/오류",
      issues:{
        notDetected:{ label:"유심 인식 안 됨", steps:["유심이 올바르게 삽입되었는지 확인해주세요.","다른 유심 슬롯이 있다면 변경해보세요.","휴대폰을 재부팅해주세요.","가능하다면 다른 휴대폰에서 유심을 테스트해주세요.","그래도 안 되면 고객센터로 문의해주세요."] },
        noSignal:{ label:"신호 없음", steps:["비행기 모드를 켰다가 다시 꺼주세요.","네트워크 선택을 자동으로 설정해주세요.","휴대폰을 재부팅해주세요.","다른 장소로 이동 후 다시 시도해주세요.","그래도 신호가 없으면 고객센터로 문의해주세요."] },
        dataNotWorking:{ label:"데이터 안 됨", steps:["모바일 데이터를 켜주세요.","데이터 로밍을 켜주세요.","필요한 경우 APN 설정을 확인해주세요.","휴대폰을 재부팅해주세요.","그래도 데이터가 안 되면 고객센터로 문의해주세요."] },
        esim:{ label:"eSIM 개통 실패", steps:["휴대폰이 eSIM을 지원하는지 확인해주세요.","다이얼 화면에서 *#06# 입력 후 EID가 표시되는지 확인해주세요.","Wi-Fi에 연결해주세요.","QR코드를 다시 스캔해주세요.","설치 후 휴대폰을 재부팅해주세요.","개통이 실패하면 고객센터로 문의해주세요."] },
        refund:{ label:"환불 / 교체", steps:["유심 패키지 사진을 고객센터로 보내주세요.","구매 장소와 구매일을 알려주세요.","지원 불가 기기 또는 잠금폰 문제인 경우 환불/교체가 제한될 수 있습니다.","이미 사용된 유심 상품은 환불이 제한될 수 있습니다."] },
      }
    },
    travel:{ title:"여행자 데이터 유심 요금제", intro:"REF번호로 구매하신 유심 상품을 확인해주세요.", caution:"실제 판매가, 데이터 제공 조건, 구매 가능 여부는 판매처와 프로모션에 따라 달라질 수 있습니다.", labels:{ ref:"REF", duration:"이용기간", data:"데이터", voiceSms:"음성/문자", price:"가격", note:"주의사항", recommended:"추천", unlimited:"무제한", contactBtn:"고객센터 연결" } },
    contact:{
      title:"고객센터 연결",
      prepare:"문의 전 휴대폰 기종, 유심번호, 구매 장소, 화면 캡처를 준비해주세요.",
      channels:{ whatsapp:"WhatsApp" },
      form:{ title:"문의 접수", name:"이름", phoneModel:"휴대폰 기종", simNumber:"유심 번호 / ICCID", purchaseLoc:"구매 장소", issueType:"문의 유형", issueOptions:["유심 인식 안 됨","신호 없음","데이터 안 됨","eSIM 개통 실패","환불 / 교체","기타"], screenshot:"화면 캡처 첨부", message:"문의 내용", submit:"문의 접수하기", success:"문의가 접수되었습니다. 담당자가 곧 연락드릴 예정입니다." },
    },
    channel:{
      title:"공항 도착 가이드",
      intro:"한국 도착 후 바로 필요한 정보를 확인하세요.",
      channelCtaTitle:"KSIM 채널 추가하고 혜택 받기",
      channelCtaDesc:"채널을 추가하면 유심 설정 도움, 공항 도착 정보, 특별 혜택, 장기체류 요금제 안내를 받을 수 있습니다.",
      buttons:{ whatsapp:"WhatsApp 채널 추가", wechat:"WeChat 추가", kakao:"KakaoTalk 채널 추가" },
      disclaimer:"채널을 추가하면 KSIM 안내 및 프로모션 정보를 받을 수 있으며, 언제든지 취소할 수 있습니다.",
      footerCta:"KSIM과 계속 연결하세요.",
      footerCtaSub:"채널을 추가하고 유심 안내와 특별 혜택을 받아보세요.",
      arrivalBtn:"공항 도착 가이드 보기",
      arrival:{ title:"공항 도착 가이드", cards:[
        { icon:"📶", title:"유심 설정 먼저", body:"공항에서 KSIM을 구매한 후 유심을 넣고 휴대폰을 재부팅해주세요.\n모바일 데이터와 데이터 로밍을 켜주세요.\n네트워크 선택을 자동으로 설정하고 1~3분 정도 기다려주세요." },
        { icon:"📡", title:"공항 Wi-Fi", body:"유심이 아직 연결되지 않는다면 먼저 공항 Wi-Fi를 사용하세요.\n그다음 KSIM Support에서 설정 안내를 확인하거나 고객센터로 문의하세요." },
        { icon:"✅", title:"공항을 떠나기 전 확인사항", list:["유심 연결 확인","필요 시 공항 Wi-Fi 연결","필수 앱 다운로드","티머니 구매 또는 충전","숙소 주소 저장","KSIM 고객센터 저장"] },
        { icon:"🚇", title:"교통 / 티머니", body:"공항에서는 공항철도, 공항버스, 지하철, 택시를 이용할 수 있습니다.",
          tmoney:{
            t1:{ label:"제1터미널 (T1)", items:["1층 입국장 Exit 5, Exit 11, Exit 13 근처 CU 편의점","B1 교통센터 / 공항철도 AREX 입구 근처"] },
            t2:{ label:"제2터미널 (T2)", items:["1층 Arrival Hall A 근처 GS25","1층 Exit 10 근처 CU","B1 교통센터 중앙 CU"] },
            topup:{ label:"충전 장소", items:["편의점","지하철역 충전기","공항철도 AREX 근처"] },
            use:{ label:"사용처", items:["지하철","버스","편의점","일부 택시"] },
          },
          tip:"매장별 재고가 다를 수 있습니다. 한 곳에 티머니 카드가 없으면 다른 편의점이나 공항철도 AREX 근처를 확인하세요." },
        { icon:"🚕", title:"택시 앱 / 결제", body:"", taxiApps:[{ name:"Kakao T", desc:"한국에서 가장 많이 사용되는 택시 앱입니다.\n해외번호로 Kakao T를 이용할 수 있는 경우가 있습니다.\n한국 카드가 없다면 기사님께 직접 결제를 선택하세요.\n보통 현금, 신용카드, 티머니로 결제할 수 있습니다." },{ name:"k.ride", desc:"Kakao Mobility의 외국인 친화 택시 앱입니다.\nGoogle/Apple 로그인과 해외카드 결제를 지원합니다.\n해외카드로 앱 결제를 원하는 여행객에게 편리합니다." },{ name:"Uber", desc:"한국에서도 Uber 앱으로 현지 택시를 호출할 수 있습니다.\n이미 Uber 계정이 있는 외국인에게는 편할 수 있습니다.\n다만 한국에서는 Kakao T 또는 k.ride를 더 많이 안내합니다." }], tip:"공항 Wi-Fi에 연결된 상태에서 택시 앱을 다운로드하세요." },
        { icon:"📱", title:"한국 필수 앱", body:"", useMustHaveApps:true, tip:"공항 Wi-Fi에 연결된 상태에서 앱을 다운로드하세요." },
        { icon:"💳", title:"결제 팁", body:"한국은 대부분 카드 결제가 가능합니다.\n다만 일부 작은 가게, 시장, 교통카드 충전기에서는 현금이 필요할 수 있습니다.\n소액의 원화 현금을 준비해두면 좋습니다." },
        { icon:"🔌", title:"충전기 / 콘센트 안내", body:"한국은 C타입 / F타입 플러그를 사용합니다.\n전압은 220V입니다.\n플러그 모양이 다르면 공항 매장이나 편의점에서 어댑터를 구매하세요." },
        { icon:"💡", title:"데이터 절약 팁", body:"데이터 절약 방법:", list:["영상 시청은 Wi-Fi 사용","영상 자동재생 끄기","유튜브 화질 낮추기","지도 미리 다운로드","사용하지 않는 앱의 백그라운드 데이터 끄기"] },
        { icon:"🚨", title:"긴급 연락처", emergency:[{ label:"경찰", number:"112" },{ label:"화재 / 응급차", number:"119" },{ label:"관광안내", number:"1330" },{ label:"KSIM 고객센터", number:"이 페이지에서 문의" }] },
        { icon:"📋", title:"장기체류 전화번호 상담", body:"한국에 장기 체류하시나요?\n외국인등록증이 있다면 후불제 요금제 가입 상담이 가능할 수 있습니다.\n외국인등록증으로 등록된 한국 휴대폰 번호는 은행, 본인인증, 배달앱, 온라인 쇼핑 등에 유용할 수 있습니다." },
      ]},
    },
    postpaid:{ title:"장기체류 외국인 전용 후불제 요금제", intro:"한국에 장기 체류하시나요?\n유학생, 외국인 근로자, 장기체류 외국인을 위한 후불제 요금제 상담도 가능합니다.", eligible:{ title:"가입 가능 대상", list:["D-2 / D-4 유학생 비자","E-7 / E-9 근로자 비자","외국인등록증 보유 외국인"] }, benefits:{ title:"주요 장점", list:["한국 휴대폰 번호 사용","매월 후불 청구","안정적인 데이터 이용","일부 온라인 본인인증 가능","유학생/근로자 맞춤 요금제 상담 가능"] }, docs:{ title:"필요 서류", list:["여권","외국인등록증","한국 은행 계좌","비자 또는 학교/근로 관련 서류"] }, caution:"가입 가능 요금제와 승인 여부는 비자 종류, 외국인등록증, 한국 은행계좌, 통신사 심사 결과에 따라 달라질 수 있습니다.", cta:"후불 요금제 상담하기", planCard:{ carrier:"통신사", visa:"대상 비자", price:"월 요금", data:"데이터", voice:"통화", contract:"약정", promo:"프로모션", docs:"필요 서류", caution:"주의사항" } },
    pwa:{ title:"KSIM Support를 홈 화면에 추가하세요.", desc:"유심 설정, 문제 해결, 공항 도착 가이드, 고객센터 연결을 빠르게 확인할 수 있습니다.", button:"홈 화면에 추가", dismiss:"나중에" },
    footer:{ company:"회사", email:"이메일", hours:"운영시간" },
  },
};

const SvgSim = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 2v4h6V2"/><rect x="8" y="10" width="3" height="3" rx="0.5"/><rect x="13" y="10" width="3" height="3" rx="0.5"/><rect x="8" y="15" width="3" height="3" rx="0.5"/><rect x="13" y="15" width="3" height="3" rx="0.5"/></svg>;
const SvgCheck = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgLeft = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgRight = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgDown = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgUp = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SvgHeadset = ({cls}: {cls: string}) => <svg className={cls} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z"/></svg>;
const SvgWa = ({cls}: {cls: string}) => <svg className={cls} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;

function Card({children, cls}: {children: any, cls?: string}) {
  return <div className={"bg-white rounded-2xl shadow-sm border border-gray-100 p-5 " + (cls||"")}>{children}</div>;
}
function CautionBox({text}: {text: string}) {
  return <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-3"><p className="text-amber-800 text-sm leading-relaxed">{text}</p></div>;
}
function InfoBox({text}: {text: string}) {
  return <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4"><p className="text-blue-700 text-xs leading-relaxed">{text}</p></div>;
}
function SecHeader({title, onBack}: {title: string, onBack: () => void}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <button onClick={onBack} className="p-2 rounded-xl bg-gray-100 min-w-11 min-h-11 flex items-center justify-center">
        <SvgLeft cls="w-5 h-5 text-gray-600"/>
      </button>
      <h2 className="text-xl font-bold text-gray-900 leading-tight">{title}</h2>
    </div>
  );
}
function StepList({steps}: {steps: string[]}) {
  return (
    <ol className="space-y-4 mt-2">
      {steps.map(function(s,i) {
        return (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">{i+1}</span>
            <span className="text-gray-700 text-base leading-relaxed pt-1">{s}</span>
          </li>
        );
      })}
    </ol>
  );
}
function TravelCard({plan, labels, onContact}: {plan: any, labels: any, onContact: () => void}) {
  var isUnl = plan.data === "Unlimited";
  var isTBD = plan.price === "TBD";
  return (
    <div className={"bg-white rounded-2xl shadow-sm border overflow-hidden " + (plan.recommended ? "border-teal-400" : "border-gray-100")}>
      {plan.recommended && <div className="bg-teal-500 px-4 py-1.5"><span className="text-white text-xs font-bold">{"⭐ " + labels.recommended}</span></div>}
      <div className="p-5">
        <div className="mb-3"><span className="bg-gray-100 text-gray-500 text-xs font-mono font-bold px-2.5 py-1 rounded-md">{labels.ref + ": " + plan.refCode}</span></div>
        <h4 className="text-2xl font-extrabold text-gray-900 mb-0.5 leading-tight">{plan.planName}</h4>
        <p className="text-xs text-gray-400 mb-4">{plan.usageText}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-400 font-semibold uppercase mb-1">{labels.duration}</p>
            <p className="text-xl font-extrabold text-gray-800">{plan.duration}</p>
          </div>
          <div className={"rounded-xl p-3 text-center " + (isUnl ? "bg-orange-50" : "bg-teal-50")}>
            <p className={"text-xs font-semibold uppercase mb-1 " + (isUnl ? "text-orange-400" : "text-teal-500")}>{labels.data}</p>
            <p className={"text-xl font-extrabold " + (isUnl ? "text-orange-500" : "text-teal-700")}>{plan.data}</p>
            {isUnl && <span className="text-xs font-bold text-orange-500 bg-orange-100 px-1.5 py-0.5 rounded-full">{"∞ " + labels.unlimited}</span>}
          </div>
        </div>
        <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{labels.voiceSms}</span>
            <span className="text-gray-600">{plan.voiceSms}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{labels.price}</span>
            <span className={"text-xl font-extrabold " + (isTBD ? "text-gray-300 italic text-base" : "text-blue-600")}>{plan.price}</span>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mb-4">
          <p className="text-amber-700 text-xs leading-relaxed"><span className="font-semibold">{labels.note + ": "}</span>{plan.note}</p>
        </div>
        <button onClick={onContact} className="w-full py-4 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-12">
          <SvgHeadset cls="w-4 h-4"/>{labels.contactBtn}
        </button>
      </div>
    </div>
  );
}

function ChannelButtons({t}: {t: any}) {
  return (
    <div className="space-y-3">
      <a href={CHANNEL_LINKS.whatsappChannel} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-sm active:scale-95 transition-all min-h-12"><SvgWa cls="w-5 h-5"/>{t.channel.buttons.whatsapp}</a>
      <a href={CHANNEL_LINKS.wechat} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm active:scale-95 transition-all min-h-12"><span className="text-lg">{"💬"}</span>{t.channel.buttons.wechat}</a>
      <a href={CHANNEL_LINKS.kakaoChannel} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold text-sm active:scale-95 transition-all min-h-12"><span className="text-lg">{"💛"}</span>{t.channel.buttons.kakao}</a>
    </div>
  );
}

export default function KSIMSupport() {
  var langState = useState<string|null>(null);
  var lang = langState[0];
  var setLang = langState[1];

  var sectionState = useState(SEC.HOME);
  var section = sectionState[0];
  var setSection = sectionState[1];

  var subIssueState = useState<string|null>(null);
  var subIssue = subIssueState[0];
  var setSubIssue = subIssueState[1];

  var formStateHook = useState({ name:"", phoneModel:"", simNumber:"", purchaseLoc:"", issueType:"", screenshot:null as any, message:"" });
  var formState = formStateHook[0];
  var setFormState = formStateHook[1];

  var formDoneState = useState(false);
  var formDone = formDoneState[0];
  var setFormDone = formDoneState[1];

  var pwaBannerState = useState(false);
  var pwaBanner = pwaBannerState[0];
  var setPwaBanner = pwaBannerState[1];

  var contactRef = useRef<HTMLDivElement>(null);

  useEffect(function() {
    if (PWA_CONFIG.enabled) {
      var dismissed = sessionStorage.getItem("pwa_dismissed");
      if (!dismissed) setPwaBanner(true);
    }
  }, []);

  var t = lang ? C[lang] : null;

  function goHome() { setSection(SEC.HOME); setSubIssue(null); }
  function goContact() {
    setSection(SEC.CONTACT);
    setTimeout(function() {
      if (contactRef.current) contactRef.current.scrollIntoView({behavior:"smooth"});
    }, 100);
  }
  function dismissPwa() { sessionStorage.setItem("pwa_dismissed","1"); setPwaBanner(false); }

  return (
    <div className="min-h-screen font-sans">

      {!lang && (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col items-center justify-center px-5 py-12">
          <div className="w-full max-w-sm text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-xl mb-5">
              <SvgSim cls="w-12 h-12 text-blue-600"/>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">KSIM Support</h1>
            <p className="text-blue-100 text-xl font-semibold mb-1">Having trouble with your SIM?</p>
            <p className="text-blue-200 text-base mb-10">Please choose your language and follow the setup guide.</p>
            <div className="space-y-3">
              {["en","zh","ko"].map(function(code) {
                return (
                  <button key={code} onClick={function() { setLang(code); setSection(SEC.HOME); }} className="w-full py-5 rounded-2xl bg-white text-blue-700 font-bold text-xl shadow-md hover:bg-blue-50 active:scale-95 transition-all">
                    {C[code].langLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {lang && t && (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-xl mx-auto min-h-screen flex flex-col">

            {pwaBanner && (
              <div className="bg-indigo-600 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                      <SvgSim cls="w-5 h-5 text-indigo-600"/>
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold leading-snug">{t.pwa.title}</p>
                      <p className="text-indigo-200 text-xs leading-snug mt-0.5">{t.pwa.desc}</p>
                      <button onClick={dismissPwa} className="mt-2 bg-white text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-lg">{"📲 " + t.pwa.button}</button>
                    </div>
                  </div>
                  <button onClick={dismissPwa} className="text-indigo-200 hover:text-white text-lg flex-shrink-0">{"✕"}</button>
                </div>
              </div>
            )}

            <header className="sticky top-0 z-50 bg-blue-600 shadow-md">
              <div className="px-4 py-3 flex items-center justify-between">
                <button onClick={goHome} className="flex items-center gap-2 text-white font-bold text-lg">
                  <SvgSim cls="w-6 h-6"/><span>KSIM Support</span>
                </button>
                <div className="flex gap-1">
                  {["en","zh","ko"].map(function(code) {
                    return (
                      <button key={code} onClick={function() { setLang(code); }} className={"px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors " + (lang===code ? "bg-white text-blue-600" : "text-blue-200 hover:text-white")}>
                        {C[code].langLabel}
                      </button>
                    );
                  })}
                </div>
              </div>
            </header>

            <main className="flex-1 px-4 py-5 space-y-3">

              {section === SEC.HOME && (
                <div className="space-y-3">
                  <p className="text-center text-gray-500 text-base">{t.hero.desc}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {key:SEC.START,       label:t.menu.start,      cls:"bg-blue-600 hover:bg-blue-700 text-white",       full:false},
                      {key:SEC.IPHONE,      label:t.menu.iphone,     cls:"bg-blue-600 hover:bg-blue-700 text-white",       full:false},
                      {key:SEC.ANDROID,     label:t.menu.android,    cls:"bg-blue-600 hover:bg-blue-700 text-white",       full:false},
                      {key:SEC.NOT_WORKING, label:t.menu.notWorking, cls:"bg-red-500 hover:bg-red-600 text-white",         full:false},
                      {key:SEC.TRAVEL,      label:t.menu.travel,     cls:"bg-teal-600 hover:bg-teal-700 text-white",       full:true},
                      {key:SEC.CHANNEL,     label:t.menu.channel,    cls:"bg-sky-500 hover:bg-sky-600 text-white",         full:false},
                      {key:SEC.POSTPAID,    label:t.menu.postpaid,   cls:"bg-violet-600 hover:bg-violet-700 text-white",   full:false},
                    ].map(function(item) {
                      return (
                        <button key={item.key} onClick={function() { setSection(item.key); setSubIssue(null); }} className={item.cls + " " + (item.full ? "col-span-2" : "") + " rounded-2xl px-4 py-5 flex items-center gap-3 shadow-sm active:scale-95 transition-all min-h-16 text-left"}>
                          <span className="text-base font-bold leading-tight">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {section === SEC.START && <Card><SecHeader title={t.startGuide.title} onBack={goHome}/><StepList steps={t.startGuide.steps}/></Card>}
              {section === SEC.IPHONE && <Card><SecHeader title={t.iphone.title} onBack={goHome}/><StepList steps={t.iphone.steps}/></Card>}
              {section === SEC.ANDROID && <Card><SecHeader title={t.android.title} onBack={goHome}/><StepList steps={t.android.steps}/></Card>}

              {section === SEC.NOT_WORKING && (
                <div className="space-y-4">
                  <Card>
                    <SecHeader title={t.notWorking.title} onBack={goHome}/>
                    {!subIssue ? (
                      <div className="space-y-3">
                        {Object.entries(t.notWorking.issues).map(function(entry) {
                          var key = entry[0];
                          var issue = entry[1] as any;
                          return (
                            <button key={key} onClick={function() { setSubIssue(key); }} className="w-full flex items-center justify-between bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl px-4 py-4 text-left transition-colors min-h-14">
                              <span className="font-semibold text-gray-800">{issue.label}</span>
                              <SvgRight cls="w-5 h-5 text-gray-400"/>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div>
                        <button onClick={function() { setSubIssue(null); }} className="mb-4 text-sm text-blue-600 font-medium flex items-center gap-1">
                          <SvgLeft cls="w-4 h-4"/>{(t.notWorking.issues as any)[subIssue].label}
                        </button>
                        <StepList steps={(t.notWorking.issues as any)[subIssue].steps}/>
                      </div>
                    )}
                  </Card>
                  {subIssue && (
                    <button onClick={goContact} className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-700 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-14">
                      <SvgHeadset cls="w-5 h-5"/>{t.menu.contact}
                    </button>
                  )}
                </div>
              )}

              {section === SEC.TRAVEL && (
                <div className="space-y-4">
                  <Card>
                    <SecHeader title={t.travel.title} onBack={goHome}/>
                    <p className="text-gray-600 text-sm mb-4">{t.travel.intro}</p>
                    <InfoBox text={t.travel.caution}/>
                  </Card>
                  {travelDataPlans.map(function(plan) {
                    return <TravelCard key={plan.refCode} plan={plan} labels={t.travel.labels} onContact={goContact}/>;
                  })}
                </div>
              )}

              {section === SEC.CONTACT && (
                <div ref={contactRef} className="space-y-4">
                  <Card>
                    <SecHeader title={t.contact.title} onBack={goHome}/>
                    <InfoBox text={t.contact.prepare}/>
                    {/* WhatsApp 버튼만 표시 */}
                    <a href={SUPPORT_LINKS.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-green-500 text-white rounded-xl py-5 font-bold text-lg hover:bg-green-600 active:scale-95 transition-all min-h-20 w-full">
                      <SvgWa cls="w-7 h-7"/>{t.contact.channels.whatsapp}
                    </a>
                  </Card>
                  <Card>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{t.contact.form.title}</h3>
                    {formDone ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><SvgCheck cls="w-8 h-8 text-green-600"/></div>
                        <p className="text-green-700 font-semibold">{t.contact.form.success}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {[["name",t.contact.form.name],["phoneModel",t.contact.form.phoneModel],["simNumber",t.contact.form.simNumber],["purchaseLoc",t.contact.form.purchaseLoc]].map(function(pair) {
                          var key = pair[0];
                          var label = pair[1];
                          return (
                            <div key={key}>
                              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
                              <input type="text" value={(formState as any)[key]} onChange={function(e) { setFormState(function(s) { var next = Object.assign({}, s); (next as any)[key] = e.target.value; return next; }); }} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 min-h-12"/>
                            </div>
                          );
                        })}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contact.form.issueType}</label>
                          <select value={formState.issueType} onChange={function(e) { setFormState(function(s) { return Object.assign({}, s, {issueType: e.target.value}); }); }} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 bg-white min-h-12">
                            <option value="">{"-"}</option>
                            {t.contact.form.issueOptions.map(function(opt) { return <option key={opt} value={opt}>{opt}</option>; })}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contact.form.screenshot}</label>
                          <input type="file" accept="image/*" onChange={function(e) { setFormState(function(s) { return Object.assign({}, s, {screenshot: e.target.files?.[0]}); }); }} className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold"/>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1">{t.contact.form.message}</label>
                          <textarea rows={4} value={formState.message} onChange={function(e) { setFormState(function(s) { return Object.assign({}, s, {message: e.target.value}); }); }} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 resize-none"/>
                        </div>
                        <button onClick={function() { setFormDone(true); }} className="w-full py-4 rounded-2xl bg-blue-600 text-white font-bold text-base hover:bg-blue-700 active:scale-95 transition-all min-h-14">{t.contact.form.submit}</button>
                      </div>
                    )}
                  </Card>
                  <Card cls="border border-blue-100 bg-blue-50">
                    <div className="flex items-center gap-2 mb-2"><span className="text-xl">{"📲"}</span><h3 className="text-lg font-bold text-gray-900">{t.channel.channelCtaTitle}</h3></div>
                    <p className="text-gray-600 text-sm mb-3">{t.channel.channelCtaDesc}</p>
                    <p className="text-xs text-gray-400 text-center">{t.channel.disclaimer}</p>
                  </Card>
                </div>
              )}

              {section === SEC.CHANNEL && (
                <div className="space-y-4">
                  <Card>
                    <SecHeader title={t.channel.title} onBack={goHome}/>
                    <p className="text-gray-600 text-sm">{t.channel.intro}</p>
                  </Card>
                  {t.channel.arrival.cards.map(function(card: any, i: number) {
                    return (
                      <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <p className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-base">
                          <span className="text-xl">{card.icon}</span>{card.title}
                        </p>
                        {card.body && <p className="text-sm text-gray-600 whitespace-pre-line mb-3">{card.body}</p>}
                        {card.tmoney && (
                          <div className="space-y-3 mt-2">
                            <div className="grid grid-cols-2 gap-2">
                              {[card.tmoney.t1, card.tmoney.t2].map(function(terminal: any, ti: number) {
                                return (
                                  <div key={ti} className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                                    <p className="text-xs font-bold text-blue-600 mb-2">{terminal.label}</p>
                                    <ul className="space-y-1">
                                      {terminal.items.map(function(item: string, k: number) {
                                        return <li key={k} className="text-xs text-gray-600 flex gap-1.5"><span className="text-blue-300 flex-shrink-0">{"•"}</span>{item}</li>;
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {[card.tmoney.topup, card.tmoney.use].map(function(sec: any, si: number) {
                                return (
                                  <div key={si} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                                    <p className="text-xs font-bold text-gray-600 mb-2">{sec.label}</p>
                                    <ul className="space-y-1">
                                      {sec.items.map(function(item: string, k: number) {
                                        return <li key={k} className="text-xs text-gray-600 flex gap-1.5"><span className="text-gray-300 flex-shrink-0">{"•"}</span>{item}</li>;
                                      })}
                                    </ul>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        {card.taxiApps && (
                          <div className="space-y-2 mt-2">
                            {card.taxiApps.map(function(app: any, j: number) {
                              return (
                                <div key={j} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                                  <p className="text-sm font-bold text-gray-800 mb-1">{app.name}</p>
                                  <p className="text-xs text-gray-600 whitespace-pre-line">{app.desc}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {card.useMustHaveApps && (
                          <div className="space-y-2 mt-2">
                            {mustHaveApps.map(function(app, j) {
                              return (
                                <div key={j} className="bg-white border border-gray-100 rounded-2xl px-3 py-3 flex items-center gap-3 shadow-sm">
                                  <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                                    <img src={app.icon} alt={app.name} className="w-12 h-12 object-cover rounded-xl"
                                      onError={function(e: any) { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}/>
                                    <span className="text-2xl hidden">{"📱"}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 leading-tight">{app.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">{(app.description as any)[lang] || app.description.en}</p>
                                  </div>
                                  <div className="flex-shrink-0 text-gray-300 text-lg">{"↓"}</div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {card.list && (
                          <ul className="mt-2 space-y-1">
                            {card.list.map(function(item: string, k: number) {
                              return <li key={k} className="text-sm text-gray-600 flex gap-2"><span className="text-blue-400 mt-0.5">{"•"}</span>{item}</li>;
                            })}
                          </ul>
                        )}
                        {card.tip && <p className="mt-3 text-xs text-teal-700 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">{"💡 " + card.tip}</p>}
                        {card.emergency && (
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {card.emergency.map(function(item: any, j: number) {
                              return (
                                <div key={j} className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
                                  <p className="text-xs text-red-400 font-semibold mb-1">{item.label}</p>
                                  <p className="text-lg font-extrabold text-red-600">{item.number}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{"📲 " + t.channel.channelCtaTitle}</h3>
                    <p className="text-gray-600 text-sm mb-3">{t.channel.channelCtaDesc}</p>
                    <p className="text-xs text-gray-400 text-center">{t.channel.disclaimer}</p>
                  </div>
                </div>
              )}

              {section === SEC.POSTPAID && (
                <div className="space-y-4">
                  <Card>
                    <SecHeader title={t.postpaid.title} onBack={goHome}/>
                    <p className="text-gray-700 text-sm whitespace-pre-line mb-5">{t.postpaid.intro}</p>
                    <div className="space-y-3 mb-4">
                      {[{data:t.postpaid.eligible,emoji:"🪪"},{data:t.postpaid.benefits,emoji:"✅"},{data:t.postpaid.docs,emoji:"📄"}].map(function(item) {
                        return (
                          <div key={item.data.title} className="bg-gray-50 rounded-xl p-4">
                            <p className="font-bold text-gray-800 mb-2">{item.emoji + " " + item.data.title}</p>
                            <ul className="space-y-1">
                              {item.data.list.map(function(li,i) {
                                return <li key={i} className="text-gray-600 text-sm flex items-start gap-2"><span className="text-blue-400 mt-0.5">{"•"}</span>{li}</li>;
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <CautionBox text={t.postpaid.caution}/>
                  </Card>
                  {postpaidPlans.map(function(plan,idx) {
                    return (
                      <Card key={idx} cls="border-l-4 border-l-blue-500">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{plan.carrier}</span>
                          <span className="text-xs text-gray-500">{plan.targetVisa}</span>
                        </div>
                        <h4 className="text-base font-bold text-gray-900 mb-3">{plan.planName}</h4>
                        <div className="space-y-2 text-sm">
                          {[
                            [t.postpaid.planCard.price,    plan.monthlyPrice,      "font-bold text-blue-700"],
                            [t.postpaid.planCard.data,     plan.data,              ""],
                            [t.postpaid.planCard.voice,    plan.voice,             ""],
                            [t.postpaid.planCard.contract, plan.contract,          ""],
                            [t.postpaid.planCard.promo,    plan.promotion,         "text-emerald-700"],
                            [t.postpaid.planCard.docs,     plan.requiredDocuments, ""],
                          ].map(function(row) {
                            return (
                              <div key={row[0]} className="flex gap-2">
                                <span className="text-gray-400 min-w-20 flex-shrink-0">{row[0]}</span>
                                <span className={"text-gray-800 " + row[2]}>{row[1]}</span>
                              </div>
                            );
                          })}
                        </div>
                        <CautionBox text={plan.caution}/>
                        <button onClick={goContact} className="mt-4 w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 active:scale-95 transition-all min-h-12">{plan.buttonText}</button>
                      </Card>
                    );
                  })}
                  <button onClick={goContact} className="w-full py-4 rounded-2xl bg-violet-600 text-white font-bold text-base hover:bg-violet-700 active:scale-95 transition-all shadow-md min-h-14">{t.postpaid.cta}</button>
                </div>
              )}

            </main>

            {section !== SEC.CONTACT && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 shadow-2xl z-40">
                <button onClick={goContact} className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 active:scale-95 transition-all min-h-14">
                  <SvgHeadset cls="w-6 h-6"/>{t.menu.contact}
                </button>
              </div>
            )}
            {section !== SEC.CONTACT && <div className="h-20"/>}

            <footer className="bg-gray-800 text-gray-400 text-sm px-5 py-8">
              <p className="text-gray-200 font-bold text-base mb-3">{FOOTER_INFO.brand}</p>
              <div className="space-y-2">
                <p><span className="text-gray-300 font-semibold">{t.footer.company + ":"}</span>{" " + FOOTER_INFO.company}</p>
                <p><span className="text-gray-300 font-semibold">{t.footer.email + ":"}</span>{" " + FOOTER_INFO.email}</p>
                <p><span className="text-gray-300 font-semibold">{t.footer.hours + ":"}</span>{" " + FOOTER_INFO.supportHours}</p>
                <p className="pt-3 text-xs text-gray-500">{"© " + new Date().getFullYear() + " " + FOOTER_INFO.brand + " · " + FOOTER_INFO.company + ". All rights reserved."}</p>
              </div>
            </footer>

          </div>
        </div>
      )}

    </div>
  );
}
